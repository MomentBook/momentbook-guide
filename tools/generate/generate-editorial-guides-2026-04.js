const fs = require('fs');
const path = require('path');
const { assertArticleAiDisabled } = require('./article-ai-guard');

assertArticleAiDisabled(__filename);

const { z } = require('zod');

let OpenAI;
let zodResponseFormat;

const CURRENT_DATE = '2026-04-14';
const OUTPUT_PATH = path.resolve(
  __dirname,
  'generated',
  'editorial-guides-2026-04.json',
);
const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const ALL_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const TARGET_LANGUAGES = ALL_LANGUAGES.filter((language) => language !== 'en');
const TRANSLATION_BATCH_SIZE = 1;

const TOPICS = [
  {
    key: 'europe-entry-2026',
    translationGroupId: 'artgrp_J4mQ8xV2pL7c',
    category: 'travel-guide',
    slug: 'europe-entry-rules-2026-ees-etias-guide-2026-03-18',
    publishedAt: '2026-03-18T06:42:00.000Z',
    titleEn:
      'Europe Entry Rules in 2026: What EES Changes Now and When ETIAS Starts Later',
    searchIntent:
      'People need one practical guide that explains what is already live in Europe in 2026, what still is not live, and what they should check before a short-stay trip.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/UKBA_ePassport_gates.jpg',
      altEn: 'ePassport gates at an airport border control area',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The European Commission said the Entry/Exit System (EES) was set to enter into operation on 12 October 2025.',
      'The official Travel to Europe EES information says the new EES started to be operational on 12 October 2025 and was introduced gradually at external borders with full implementation by 10 April 2026.',
      'The EES digitally records entries and exits of non-EU nationals travelling for short stays and registers data such as passport data, fingerprints, and facial images.',
      'The official ETIAS timeline page says ETIAS is not in operation and no action is required from travellers at this point.',
      'The official ETIAS timeline page says ETIAS will launch a few months after the introduction of EES.',
      'The official ETIAS timeline page says ETIAS will affect visa-free travellers from 59 countries and territories travelling to 30 European countries once it starts.',
      'The EEAS explainer emphasizes that visa-free travellers should still follow official launch notices and current passport rules instead of relying on rumours.',
      'Do not state an ETIAS launch date unless the source pack explicitly gives one. Do not state the ETIAS fee because official public pages have changed over time and the safest guidance is to check the official site at launch.',
    ],
    sources: [
      {
        label:
          'European Commission - Commission launches information campaign to inform travellers about the Entry/Exit System',
        url: 'https://home-affairs.ec.europa.eu/news/commission-launches-information-campaign-inform-travellers-about-entryexit-system-2025-09-24_en?prefLang=de',
      },
      {
        label: 'Travel to Europe - Entry/Exit System (EES)',
        url: 'https://travel-europe.europa.eu/en/ees',
      },
      {
        label: 'Travel to Europe - Travel to Europe mobile app (EES)',
        url: 'https://travel-europe.europa.eu/en/ees/Travel-to-Europe-mobile-app.html',
      },
      {
        label: 'Travel to Europe - ETIAS timeline explained',
        url: 'https://travel-europe.europa.eu/en/etias/about-etias/news-corner/etias-timeline-explained',
      },
      {
        label: 'EEAS - Travelling to Europe (ETIAS)',
        url: 'https://www.eeas.europa.eu/delegations/united-states-america/travelling-europe-etias_en?s=253',
      },
    ],
  },
  {
    key: 'kyoto-first-time-2026',
    translationGroupId: 'artgrp_N8rK3dW5sT1q',
    category: 'destination-guide',
    slug: 'kyoto-first-time-travel-guide-2026-03-31',
    publishedAt: '2026-03-31T09:11:00.000Z',
    titleEn:
      'Kyoto First-Time Travel Guide 2026: Areas, Transport, and Respectful Sightseeing',
    searchIntent:
      'First-time Kyoto visitors want a calm practical guide that explains where to stay, how to move around, and how to visit respectfully without making the city harder for residents.',
    image: {
      url: 'https://kyoto.travel/wp-content/uploads/2025/05/VisitKyoto.jpg',
      altEn: 'traditional Kyoto streetscape and temple area in spring light',
      captionEn: '*Image source: Kyoto Travel*',
    },
    facts: [
      'UNESCO says the Historic Monuments of Ancient Kyoto consist of seventeen component parts in Kyoto, Uji, and Otsu.',
      'UNESCO says Kyoto was built in A.D. 794 and served as the cultural centre while acting as the imperial capital until the middle of the 19th century.',
      'Kyoto Travel says the key to sightseeing in Kyoto is to make good use of public transportation such as trains and buses.',
      'Kyoto Travel recommends using both trains and buses, transport passes, and hands-free sightseeing options to move more comfortably.',
      'Kyoto Travel lists multiple one-day or area passes for foreign visitors and visitors using buses, subway, rail, and day-trip routes.',
      'Kyoto Travel says sustainable tourism in Kyoto means choosing environmentally friendly travel, preserving Kyoto culture, and showing respect for the local community.',
      'Kyoto Travel announced the HANDS FREE BUS to help visitors leave luggage and reduce strain on crowded public transport.',
      'Britannica describes Kyoto as one of the largest cities in Japan with a long cultural history and a stable resident population.',
      'Do not invent neighborhood rankings, hotel picks, cherry blossom peak dates, or queue times that are not in the source pack.',
    ],
    sources: [
      {
        label: 'Kyoto Travel - Getting Around Kyoto',
        url: 'https://kyoto.travel/en/getting-around/',
      },
      {
        label: 'Kyoto Travel - In Kyoto',
        url: 'https://kyoto.travel/en/getting-around/in-kyoto/',
      },
      {
        label: 'Kyoto Travel - Sustainable Tourism',
        url: 'https://kyoto.travel/en/sustainable-tourism/',
      },
      {
        label: 'Kyoto Travel - New HANDS FREE BUS has started operating in Kyoto this autumn',
        url: 'https://kyoto.travel/en/news/new_handsfree.html',
      },
      {
        label: 'UNESCO World Heritage Centre - Historic Monuments of Ancient Kyoto',
        url: 'https://whc.unesco.org/en/list/688/',
      },
      {
        label: 'Britannica - Kyoto',
        url: 'https://www.britannica.com/place/Kyoto-Japan/The-people',
      },
    ],
  },
  {
    key: 'songkran-bangkok-2026',
    translationGroupId: 'artgrp_P6vH2nC9mR4x',
    category: 'festival',
    slug: 'songkran-2026-bangkok-guide-2026-04-07',
    publishedAt: '2026-04-07T08:24:00.000Z',
    titleEn:
      'Songkran 2026 in Bangkok: Dates, Best Areas, and Festival Etiquette',
    searchIntent:
      'Travellers need one guide that explains the Bangkok 2026 Songkran schedule, how to join without getting lost, and the cultural meaning behind the water festival.',
    image: {
      url: 'https://www.tatnews.org/wp-content/uploads/2026/04/Maha-Songkran-World-Water-Festival-2026-opening-01.jpg',
      altEn: 'opening ceremony at the Maha Songkran World Water Festival 2026 in Bangkok',
      captionEn: '*Image source: TAT Newsroom*',
    },
    facts: [
      'TAT says the Maha Songkran World Water Festival 2026 in Bangkok ran from 11 to 15 April at Benchakitti Park.',
      'TAT says the event included cultural heritage, live entertainment, regional showcases, food stalls, and water celebration zones.',
      'TAT says visitors were encouraged to use public transport, especially BTS Asok station and MRT Queen Sirikit National Convention Centre station.',
      'UNESCO material on Songkran in Thailand explains that water pouring can be a gesture of respect, blessing, renewal, and polite good wishes for the New Year.',
      'UNESCO material also shows younger people pouring water for senior relatives and elders as a sign of respect and blessing.',
      'TAT travel writing describes Songkran as being held annually from 13 to 15 April and connected to purification, renewal, and a fresh start.',
      'The guide should clearly separate cultural rituals from tourist water-play zones and explain respectful participation.',
      'Do not invent security rules, alcohol rules, or exact road closure maps that are not in the source pack.',
    ],
    sources: [
      {
        label: 'TAT Newsroom - Maha Songkran World Water Festival 2026 opens in Bangkok',
        url: 'https://www.tatnews.org/2026/04/maha-songkran-world-water-festival-2026-opens-in-bangkok/',
      },
      {
        label: 'TAT Newsroom - Thailand to host Maha Songkran World Water Festival 2026 with Saneh Art by Songkran Festival',
        url: 'https://www.tatnews.org/2026/04/thailand-to-host-maha-songkran-world-water-festival-2026-with-saneh-art-by-songkran-festival/',
      },
      {
        label: 'UNESCO Intangible Cultural Heritage - Songkran in Thailand photo essay',
        url: 'https://ich.unesco.org/en/01325?call=slideshow&id=01719&include=slideshow_inc.php&mode=scroll&width=620',
      },
      {
        label: 'TAT Newsroom - How I Ate My Way Through Songkran',
        url: 'https://www.tatnews.org/2025/04/how-i-ate-my-way-through-songkran/',
      },
    ],
  },
  {
    key: 'jet-lag-recovery-2026',
    translationGroupId: 'artgrp_T3cL9qB7wM5k',
    category: 'wellbeing-guide',
    slug: 'jet-lag-recovery-guide-for-long-haul-trips-2026-04-12',
    publishedAt: '2026-04-12T07:36:00.000Z',
    titleEn:
      'Jet Lag Recovery Guide for Long-Haul Trips: Light, Sleep, Melatonin, and Day-One Timing',
    searchIntent:
      'Long-haul travellers want a clear evidence-backed guide on how to reduce jet lag without hype, especially for eastward trips and the first day after arrival.',
    image: {
      url: 'https://www.cdc.gov/yellow-book/media/images/2025/02/7.4-Jet-Lag-Disorder.jpg?_=74086',
      altEn: 'illustration for jet lag disorder and travel across time zones',
      captionEn: '*Image source: CDC Yellow Book*',
    },
    facts: [
      'CDC Yellow Book describes strategic shifting of sleep, timed light exposure, and timed melatonin as core tools for reducing jet lag symptoms.',
      'CDC says shifting sleep toward the destination time zone in the 2 to 3 days before a trip may reduce the time required to adjust after arrival.',
      'CDC says short daytime naps of 20 to 30 minutes can help sustain alertness during the local day, while longer daytime naps may interfere with nighttime sleep.',
      'CDC says morning light after the circadian nadir promotes phase advances and evening light generally promotes phase delays, so timing matters.',
      'CDC says melatonin timing matters and high-dose melatonin above 5 mg is not recommended in this guidance because excess melatonin at the wrong time can worsen misalignment.',
      'The Cochrane review says melatonin was effective in reducing jet lag in eight of ten trials, especially after crossing five or more time zones and particularly for eastward travel.',
      'The Cochrane review says melatonin should be used carefully because timing is important and some people may face risks, including people with epilepsy or those taking warfarin.',
      'The article should stay in the practical travel-wellbeing lane and should not read like individualized medical treatment.',
    ],
    sources: [
      {
        label: 'CDC Yellow Book - Jet Lag Disorder',
        url: 'https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html',
      },
      {
        label: 'Cochrane / PMC - Melatonin for the prevention and treatment of jet lag',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8958662/',
      },
      {
        label: 'PubMed - Bright light, dark and melatonin can promote circadian adaptation in night shift workers',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12395986/',
      },
    ],
  },
];

const englishArticleSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1),
});

const translationRecordSchema = z.object({
  language: z.string().trim().min(1),
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1),
});

const translationPayloadSchema = z.object({
  records: z.array(translationRecordSchema).min(1),
});

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

function buildSourcesSection(topic) {
  return `## Sources\n\n${topic.sources
    .map((source) => `- [${source.label}](${source.url})`)
    .join('\n')}`;
}

function buildEnglishPrompt(topic) {
  return [
    `Current date: ${CURRENT_DATE}`,
    `Write a source-backed editorial guide in English only.`,
    `Use only the facts in the source pack. If a detail is not supported, omit it.`,
    `Do not invent fees, exact launch dates, route times, medical claims, hotel picks, or statistics.`,
    `Tone: calm, specific, practical, search-friendly, and non-hyped.`,
    `Length: 900 to 1400 words.`,
    `Markdown only. No tables. No HTML.`,
    `The H1 title must be exactly: ${topic.titleEn}`,
    `The first image markdown must be exactly: ![${topic.image.altEn}](${topic.image.url})`,
    `The next line after the image must be exactly: ${topic.image.captionEn}`,
    `Required structure:\n1. H1 title\n2. Two short intro paragraphs\n3. ## What to know first with 4 to 6 bullet points\n4. First image + caption\n5. 4 to 6 H2 sections with short paragraphs and bullet lists where helpful\n6. One realistic expectations / what to double-check section\n7. End with the exact sources section provided below`,
    `Primary search intent: ${topic.searchIntent}`,
    `Facts you may rely on:\n- ${topic.facts.join('\n- ')}`,
    `Exact sources section to append verbatim at the end:\n${buildSourcesSection(topic)}`,
  ].join('\n\n');
}

function buildTranslationPrompt(topic, englishArticle, targetLanguages) {
  return [
    `Current date: ${CURRENT_DATE}`,
    `Translate the English editorial guide below into the requested target languages only.`,
    `Preserve all facts. Do not add or remove claims.`,
    `Preserve markdown structure, image URLs, and link URLs.`,
    `Translate the title, headings, paragraphs, bullet points, image alt text, and caption line naturally for each target language.`,
    `Keep source bullet labels exactly as they appear in the English article so the references stay stable across languages.`,
    `Do not introduce local examples, extra safety rules, or extra travel advice that is not in the English article.`,
    `Return JSON with this shape only: {"records":[{"language":"ko","title":"...","body":"..."}, ...]}.`,
    `Target languages: ${targetLanguages.join(', ')}`,
    `English article:\n${englishArticle.body}`,
  ].join('\n\n');
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

function assertArticleShape(topic, article) {
  const imageMatch = article.body.match(/!\[([^\]]+)\]\(([^)]+)\)/);
  if (!imageMatch) {
    throw new Error(`Article for ${topic.key} does not contain an embedded image.`);
  }

  if (!imageMatch[1] || !imageMatch[1].trim()) {
    throw new Error(`Article for ${topic.key} has an empty image alt text.`);
  }

  if (imageMatch[2] !== topic.image.url) {
    throw new Error(`Article for ${topic.key} does not preserve the expected image URL.`);
  }

  topic.sources.forEach((source) => {
    if (!article.body.includes(source.url)) {
      throw new Error(`Article for ${topic.key} is missing source URL: ${source.url}`);
    }
  });
}

async function createEnglishArticle(client, topic, index) {
  const completion = await client.chat.completions.create({
    model: 'gpt-5.4',
    messages: [
      {
        role: 'system',
        content:
          'You write first-party editorial guides for a multilingual travel website. You must stay within the supplied facts, avoid hype, and produce clean markdown.',
      },
      {
        role: 'user',
        content: buildEnglishPrompt(topic),
      },
    ],
    max_completion_tokens: 7000,
    response_format: zodResponseFormat(
      englishArticleSchema,
      `guide_en_${index}`,
    ),
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error(`English generation returned empty content for ${topic.key}`);
  }

  const article = normalizeArticle(englishArticleSchema.parse(JSON.parse(content)));
  assertArticleShape(topic, article);
  return article;
}

async function createTranslations(client, topic, englishArticle, index) {
  const collected = [];
  const batches = chunkArray(TARGET_LANGUAGES, TRANSLATION_BATCH_SIZE);

  for (const [batchIndex, targetLanguages] of batches.entries()) {
    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a multilingual editorial translator. Preserve facts, preserve markdown, preserve URLs, and translate naturally for each target language without adding new claims.',
        },
        {
          role: 'user',
          content: buildTranslationPrompt(topic, englishArticle, targetLanguages),
        },
      ],
      max_completion_tokens: 9000,
      response_format: zodResponseFormat(
        translationPayloadSchema,
        `guide_trans_${index}_${batchIndex}`,
      ),
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error(`Translation generation returned empty content for ${topic.key} batch ${batchIndex}`);
    }

    const payload = translationPayloadSchema.parse(JSON.parse(content));
    const seen = new Set();

    payload.records.forEach((record) => {
      if (!targetLanguages.includes(record.language)) {
        throw new Error(`Unexpected translation language for ${topic.key}: ${record.language}`);
      }
      if (seen.has(record.language)) {
        throw new Error(`Duplicate translation language for ${topic.key}: ${record.language}`);
      }
      seen.add(record.language);
      normalizeArticle(record);
      assertArticleShape(topic, record);
      collected.push(record);
    });

    targetLanguages.forEach((language) => {
      if (!seen.has(language)) {
        throw new Error(`Missing translation for ${topic.key}: ${language}`);
      }
    });
  }

  return collected;
}

async function main() {
  ({ default: OpenAI } = require('openai'));
  ({ zodResponseFormat } = require('openai/helpers/zod'));
  const apiKey = readApiKey();
  const client = new OpenAI({ apiKey });
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  const topics = [];

  for (const [index, topic] of TOPICS.entries()) {
    console.log(`Generating English master for ${topic.key}...`);
    const englishArticle = await createEnglishArticle(client, topic, index);

    console.log(`Generating translations for ${topic.key}...`);
    const translations = await createTranslations(
      client,
      topic,
      englishArticle,
      index,
    );

    const records = [
      {
        language: 'en',
        slug: topic.slug,
        title: englishArticle.title,
        body: englishArticle.body,
      },
      ...translations.map((record) => ({
        language: record.language,
        slug: topic.slug,
        title: record.title,
        body: record.body,
      })),
    ].sort(
      (left, right) =>
        ALL_LANGUAGES.indexOf(left.language) - ALL_LANGUAGES.indexOf(right.language),
    );

    topics.push({
      key: topic.key,
      translationGroupId: topic.translationGroupId,
      category: topic.category,
      slug: topic.slug,
      publishedAt: topic.publishedAt,
      sources: topic.sources,
      facts: topic.facts,
      records,
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    batch: '2026-04-editorial-guides',
    topics,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${OUTPUT_PATH}`);
  console.log(
    JSON.stringify(
      {
        topicCount: payload.topics.length,
        recordCount: payload.topics.reduce(
          (sum, topic) => sum + topic.records.length,
          0,
        ),
        slugs: payload.topics.map((topic) => topic.slug),
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
