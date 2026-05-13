const fs = require('fs');
const path = require('path');
const { assertArticleAiDisabled } = require('./article-ai-guard');

assertArticleAiDisabled(__filename);

const { z } = require('zod');

let OpenAI;
let zodResponseFormat;

const CURRENT_DATE = '2026-04-15';
const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const PAYLOAD_CONFIGS = [
  {
    name: 'traffic',
    path: path.resolve(
      __dirname,
      'generated',
      'editorial-guides-2026-04-traffic.json',
    ),
  },
  {
    name: 'global',
    path: path.resolve(
      __dirname,
      'generated',
      'editorial-guides-2026-04-global.json',
    ),
  },
];
const ALL_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const TARGET_LANGUAGES = ALL_LANGUAGES.filter((language) => language !== 'en');
const TRANSLATION_BATCH_SIZE = 2;
const GOOGLE_LANGUAGE_CODES = {
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-CN',
  es: 'es',
  pt: 'pt',
  fr: 'fr',
  th: 'th',
  vi: 'vi',
};
const IMAGE_OVERRIDES = {
  'new-zealand-nzeta-2026-guide-cost-validity-transit-2026-04-23': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Auckland%20airport%20international%20terminal.jpg',
    altEn: 'Auckland Airport international terminal',
    captionEn: '*Image source: Wikimedia Commons*',
  },
  'berlin-first-time-travel-guide-2026-04-28': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Berlin%20brandenburg%20airport%20station.jpg',
    altEn: 'Berlin Brandenburg Airport station',
    captionEn: '*Image source: Wikimedia Commons*',
  },
  'taipei-first-time-travel-guide-2026-04-29': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taoyuan%20Airport%20MRT%20at%20Taipei%20Main%20Station.jpg',
    altEn: 'Taoyuan Airport MRT entrance at Taipei Main Station',
    captionEn: '*Image source: Wikimedia Commons*',
  },
};

const translationRecordSchema = z.object({
  language: z.string().trim().min(1),
  title: z.string().trim().min(1).max(180),
  body: z.string().trim().min(1),
});

const translationPayloadSchema = z.object({
  records: z.array(translationRecordSchema).min(1),
});
const translationCache = new Map();

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

function readApiKey() {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }

  const envText = fs.readFileSync(ENV_PATH, 'utf8');
  const apiKey = readEnvValue(envText, 'OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error(`OPENAI_API_KEY was not found in ${ENV_PATH}`);
  }
  return apiKey;
}

function chunkArray(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

function extractH1Title(body) {
  const firstLine = body.split('\n')[0]?.trim();
  if (firstLine && firstLine.startsWith('# ')) {
    return firstLine.slice(2).trim();
  }
  return null;
}

function normalizeArticle(article) {
  article.body = article.body.trim();
  if (!article.body.startsWith('# ')) {
    article.body = `# ${article.title}\n\n${article.body}`;
  }

  const h1Title = extractH1Title(article.body);
  if (h1Title) {
    article.title = h1Title;
  }

  return article;
}

function assertTranslationShape(topic, record) {
  if (!record.body.includes('## ')) {
    throw new Error(
      `Translated article for ${topic.slug} ${record.language} is missing section headings.`,
    );
  }

  if (!record.body.includes('http')) {
    throw new Error(
      `Translated article for ${topic.slug} ${record.language} is missing source URLs.`,
    );
  }

  const imageMatch = record.body.match(/!\[([^\]]+)\]\((https?:\/\/[^)\n]+)\)/);
  if (!imageMatch) {
    throw new Error(
      `Translated article for ${topic.slug} ${record.language} is missing a lead image.`,
    );
  }

  if (!imageMatch[1] || !imageMatch[1].trim()) {
    throw new Error(
      `Translated article for ${topic.slug} ${record.language} has an empty lead-image alt text.`,
    );
  }
}

function extractMarkdownUrls(body) {
  return [...body.matchAll(/\]\((https?:\/\/[^)\n]+)\)/g)].map((match) => match[1]);
}

function restoreCanonicalMarkdownUrls(englishBody, translatedBody) {
  const canonicalUrls = extractMarkdownUrls(englishBody);
  let index = 0;

  const restoredBody = translatedBody.replace(
    /\]\((https?:\/\/[^)\n]+)\)/g,
    (_match, _currentUrl) => {
      const canonicalUrl = canonicalUrls[index];
      index += 1;
      return canonicalUrl ? `](${canonicalUrl})` : _match;
    },
  );

  if (index !== canonicalUrls.length) {
    throw new Error(
      `Canonical URL restoration count mismatch: expected ${canonicalUrls.length}, replaced ${index}.`,
    );
  }

  return restoredBody;
}

function replaceLeadImage(body, image) {
  const blockPattern = /!\[[^\]]*\]\((https?:\/\/[^)\n]+)\)\n\*[^\n]+\*/m;
  const replacement = `![${image.altEn}](${image.url})\n${image.captionEn}`;

  if (blockPattern.test(body)) {
    return body.replace(blockPattern, replacement);
  }

  const imagePattern = /!\[[^\]]*\]\((https?:\/\/[^)\n]+)\)/m;
  if (imagePattern.test(body)) {
    return body.replace(imagePattern, replacement);
  }

  throw new Error('English master is missing a lead image block.');
}

function backupPathFor(payloadPath) {
  return payloadPath.replace(
    /\.json$/,
    '.translation-image-refresh-backup.json',
  );
}

function loadPayload(payloadPath) {
  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Generated payload not found: ${payloadPath}`);
  }

  return JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
}

function ensureBackup(payloadPath) {
  const backupPath = backupPathFor(payloadPath);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(payloadPath, backupPath);
  }

  return backupPath;
}

function buildTranslationPrompt(topic, englishArticle, targetLanguages) {
  return [
    `Current date: ${CURRENT_DATE}`,
    'Translate the English editorial article below into the requested target languages only.',
    'Translate all reader-facing text naturally: title, headings, paragraphs, bullet points, image alt text, image caption, and the sources heading.',
    'Preserve all facts and preserve every URL exactly.',
    'Preserve markdown structure and keep the article publication-ready in each target language.',
    'Do not leave generic English labels such as "What to know first", "Sources", or "Image source" untranslated unless the English is part of a proper noun.',
    'Preserve official site names, product names, airport names, district names, and event names where needed, but localize the surrounding explanatory text naturally.',
    'Return JSON only with this shape: {"records":[{"language":"ko","title":"...","body":"..."}, ...]}.',
    `Topic slug: ${topic.slug}`,
    `Target languages: ${targetLanguages.join(', ')}`,
    `English source article:\n${englishArticle.body}`,
  ].join('\n\n');
}

async function createTranslations(
  client,
  topic,
  englishArticle,
  targetLanguages,
  index,
  batchIndex,
) {
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a senior multilingual editor for a travel publication. Produce natural, publication-quality localizations that remain fully faithful to the source article.',
        },
        {
          role: 'user',
          content: buildTranslationPrompt(topic, englishArticle, targetLanguages),
        },
      ],
      max_completion_tokens: 14000,
      response_format: zodResponseFormat(
        translationPayloadSchema,
        `editorial_guides_translation_refresh_${index}_${batchIndex}`,
      ),
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error(
        `Translation refresh returned empty content for ${topic.slug} batch ${batchIndex}`,
      );
    }

    const payload = translationPayloadSchema.parse(JSON.parse(content));
    const seen = new Set();

    payload.records.forEach((record) => {
      if (!targetLanguages.includes(record.language)) {
        throw new Error(
          `Unexpected translation language for ${topic.slug}: ${record.language}`,
        );
      }
      if (seen.has(record.language)) {
        throw new Error(
          `Duplicate translation language for ${topic.slug}: ${record.language}`,
        );
      }
      seen.add(record.language);
      record.body = restoreCanonicalMarkdownUrls(englishArticle.body, record.body);
      normalizeArticle(record);
      assertTranslationShape(topic, record);
    });

    targetLanguages.forEach((language) => {
      if (!seen.has(language)) {
        throw new Error(`Missing translation for ${topic.slug}: ${language}`);
      }
    });

    return payload.records;
  } catch (error) {
    if (
      error?.code !== 'insufficient_quota' &&
      error?.type !== 'insufficient_quota'
    ) {
      throw error;
    }

    console.warn(
      `OpenAI quota exhausted for ${topic.slug} batch ${batchIndex}; falling back to Google Translate endpoint.`,
    );
    return createTranslationsWithGoogle(topic, englishArticle, targetLanguages);
  }
}

function readSlugFilter() {
  const slugArg = process.argv.find((arg) => arg.startsWith('--slugs='));
  if (!slugArg) {
    return null;
  }

  const values = slugArg
    .slice('--slugs='.length)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return values.length > 0 ? new Set(values) : null;
}

async function translateTextWithGoogle(text, targetLanguage) {
  const trimmed = text.trim();
  if (!trimmed) {
    return text;
  }

  const cacheKey = `${targetLanguage}::${trimmed}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const languageCode = GOOGLE_LANGUAGE_CODES[targetLanguage] ?? targetLanguage;
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', languageCode);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', trimmed);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Fallback translation failed for ${targetLanguage} with status ${response.status}`,
    );
  }

  const payload = await response.json();
  const translated = Array.isArray(payload?.[0])
    ? payload[0]
        .map((entry) => (Array.isArray(entry) ? entry[0] ?? '' : ''))
        .join('')
        .trim()
    : '';

  if (!translated) {
    throw new Error(`Fallback translation returned empty text for ${targetLanguage}`);
  }

  translationCache.set(cacheKey, translated);
  return translated;
}

async function translateMarkdownLineWithGoogle(line, targetLanguage) {
  if (!line.trim()) {
    return line;
  }

  const headingMatch = line.match(/^(#{1,6}\s+)(.*)$/);
  if (headingMatch) {
    return `${headingMatch[1]}${await translateTextWithGoogle(
      headingMatch[2],
      targetLanguage,
    )}`;
  }

  const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    return `![${await translateTextWithGoogle(
      imageMatch[1],
      targetLanguage,
    )}](${imageMatch[2]})`;
  }

  const sourceLinkMatch = line.match(/^(-\s+)\[([^\]]+)\]\(([^)]+)\)$/);
  if (sourceLinkMatch) {
    return `${sourceLinkMatch[1]}[${await translateTextWithGoogle(
      sourceLinkMatch[2],
      targetLanguage,
    )}](${sourceLinkMatch[3]})`;
  }

  const numberedMatch = line.match(/^(\d+\.\s+)(.*)$/);
  if (numberedMatch) {
    return `${numberedMatch[1]}${await translateTextWithGoogle(
      numberedMatch[2],
      targetLanguage,
    )}`;
  }

  const bulletMatch = line.match(/^(-\s+)(.*)$/);
  if (bulletMatch) {
    return `${bulletMatch[1]}${await translateTextWithGoogle(
      bulletMatch[2],
      targetLanguage,
    )}`;
  }

  const italicMatch = line.match(/^\*([^*].*)\*$/);
  if (italicMatch) {
    return `*${await translateTextWithGoogle(
      italicMatch[1],
      targetLanguage,
    )}*`;
  }

  const boldMatch = line.match(/^\*\*(.+)\*\*$/);
  if (boldMatch) {
    return `**${await translateTextWithGoogle(
      boldMatch[1],
      targetLanguage,
    )}**`;
  }

  return translateTextWithGoogle(line, targetLanguage);
}

async function createTranslationsWithGoogle(
  topic,
  englishArticle,
  targetLanguages,
) {
  const records = [];

  for (const targetLanguage of targetLanguages) {
    const translatedLines = [];
    for (const line of englishArticle.body.split('\n')) {
      translatedLines.push(
        await translateMarkdownLineWithGoogle(line, targetLanguage),
      );
    }

    const body = restoreCanonicalMarkdownUrls(
      englishArticle.body,
      translatedLines.join('\n'),
    );
    const title =
      extractH1Title(body) ??
      (await translateTextWithGoogle(englishArticle.title, targetLanguage));
    const record = normalizeArticle({
      language: targetLanguage,
      title,
      body,
    });

    assertTranslationShape(topic, record);
    records.push(record);
  }

  return records;
}

async function main() {
  ({ default: OpenAI } = require('openai'));
  ({ zodResponseFormat } = require('openai/helpers/zod'));
  const slugFilter = readSlugFilter();
  const client = new OpenAI({ apiKey: readApiKey() });
  const summary = [];
  let processedTopicCount = 0;

  for (const payloadConfig of PAYLOAD_CONFIGS) {
    const payload = loadPayload(payloadConfig.path);
    const backupPath = ensureBackup(payloadConfig.path);
    const updatedTopics = [];

    for (const [index, topic] of payload.topics.entries()) {
      if (slugFilter && !slugFilter.has(topic.slug)) {
        continue;
      }

      const englishArticle = topic.records.find(
        (record) => record.language === 'en',
      );

      if (!englishArticle) {
        throw new Error(`Missing English master for ${topic.slug}`);
      }

      normalizeArticle(englishArticle);

      const imageOverride = IMAGE_OVERRIDES[topic.slug];
      if (imageOverride) {
        englishArticle.body = replaceLeadImage(englishArticle.body, imageOverride);
        normalizeArticle(englishArticle);
      }

      const translatedRecords = [];
      const batches = chunkArray(TARGET_LANGUAGES, TRANSLATION_BATCH_SIZE);

      for (const [batchIndex, targetLanguages] of batches.entries()) {
        console.log(
          `Refreshing ${topic.slug} [${targetLanguages.join(', ')}]...`,
        );
        const translatedBatch = await createTranslations(
          client,
          topic,
          englishArticle,
          targetLanguages,
          index,
          batchIndex,
        );

        translatedRecords.push(
          ...translatedBatch.map((record) => ({
            language: record.language,
            slug: topic.slug,
            title: record.title,
            body: record.body,
          })),
        );
      }

      topic.records = [
        {
          language: 'en',
          slug: topic.slug,
          title: englishArticle.title,
          body: englishArticle.body,
        },
        ...translatedRecords,
      ].sort(
        (left, right) =>
          ALL_LANGUAGES.indexOf(left.language) -
          ALL_LANGUAGES.indexOf(right.language),
      );

      updatedTopics.push({
        slug: topic.slug,
        imageUpdated: Boolean(imageOverride),
        recordCount: topic.records.length,
        languages: topic.records.map((record) => record.language),
      });
      processedTopicCount += 1;
    }

    if (updatedTopics.length > 0) {
      fs.writeFileSync(payloadConfig.path, JSON.stringify(payload, null, 2));
    }

    summary.push({
      payload: payloadConfig.name,
      payloadPath: payloadConfig.path,
      backupPath,
      topicCount: updatedTopics.length,
      updatedTopics,
    });
  }

  if (processedTopicCount === 0) {
    throw new Error('No topics were processed. Check the slug filter.');
  }

  console.log(
    JSON.stringify(
      {
        processedTopicCount,
        payloadCount: summary.length,
        summary,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
