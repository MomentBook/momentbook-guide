const fs = require('fs');
const path = require('path');
const { assertArticleAiDisabled } = require('./article-ai-guard');

assertArticleAiDisabled(__filename);

const { z } = require('zod');
const { MongoClient } = require('mongodb');

let OpenAI;
let zodResponseFormat;

const CURRENT_DATE = '2026-04-14';
const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const PAYLOAD_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.json',
);
const PAYLOAD_BACKUP_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.translation-refresh-backup.json',
);

const ALL_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const TARGET_LANGUAGES = ALL_LANGUAGES.filter((language) => language !== 'en');

const translationRecordSchema = z.object({
  language: z.string().trim().min(1),
  title: z.string().trim().min(1).max(180),
  body: z.string().trim().min(1),
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

function readMongoConfig() {
  const envText = fs.readFileSync(ENV_PATH, 'utf8');
  const uri = process.env.MONGODB_URI || readEnvValue(envText, 'MONGODB_URI');
  const dbName =
    process.env.DB_NAME || readEnvValue(envText, 'DB_NAME') || 'momentbook';

  if (!uri) {
    throw new Error(`MONGODB_URI was not found in ${ENV_PATH}`);
  }

  return { uri, dbName };
}

function loadPayload() {
  if (!fs.existsSync(PAYLOAD_PATH)) {
    throw new Error(`Generated payload not found: ${PAYLOAD_PATH}`);
  }

  return JSON.parse(fs.readFileSync(PAYLOAD_PATH, 'utf8'));
}

function normalizeArticle(article) {
  article.body = article.body.trim();
  if (!article.body.startsWith('# ')) {
    article.body = `# ${article.title}\n\n${article.body}`;
  }

  const firstLine = article.body.split('\n')[0]?.trim();
  if (firstLine?.startsWith('# ')) {
    article.title = firstLine.slice(2).trim();
  }

  return article;
}

function assertTranslationShape(record) {
  if (!record.body.includes('## ')) {
    throw new Error(`Translated article for ${record.language} is missing section headings.`);
  }

  if (!record.body.includes('http')) {
    throw new Error(`Translated article for ${record.language} is missing source URLs.`);
  }

  if (!/!\[[^\]]+\]\((https?:\/\/[^\n]+)\)/.test(record.body)) {
    throw new Error(`Translated article for ${record.language} is missing a lead image.`);
  }
}

function buildTranslationPrompt(topic, englishArticle, targetLanguage) {
  return [
    `Current date: ${CURRENT_DATE}`,
    `Target language: ${targetLanguage}`,
    'Translate the following English festival guide into polished, native editorial prose for the target language.',
    'Translate all reader-facing text naturally: title, headings, paragraphs, bullets, image alt text, image caption, the sources heading, and the source bullet labels.',
    'Preserve all factual claims and preserve uncertainty exactly where the English article says a detail is not yet confirmed.',
    'Preserve markdown structure and preserve every URL exactly.',
    'Do not leave generic English headings such as "What to know first", "Sources", or "Image source" untranslated.',
    'Keep proper nouns, official site names, and standard event names when needed, but localize surrounding explanatory text naturally.',
    'Avoid awkward loanwords when a natural target-language rendering exists. For example, do not transliterate an English planning term if a native editorial equivalent is more natural.',
    'Return JSON only with this shape: {"language":"ko","title":"...","body":"..."}',
    `English source article:\n${englishArticle.body}`,
  ].join('\n\n');
}

async function createTranslation(client, topic, englishArticle, targetLanguage, index) {
  const completion = await client.chat.completions.create({
    model: 'gpt-5.4',
    messages: [
      {
        role: 'system',
        content:
          'You are a senior multilingual editor for a public travel publication. Your job is not literal translation but publication-quality localization that remains fully faithful to the source article.',
      },
      {
        role: 'user',
        content: buildTranslationPrompt(topic, englishArticle, targetLanguage),
      },
    ],
    max_completion_tokens: 9000,
    response_format: zodResponseFormat(
      translationRecordSchema,
      `festival_translation_refresh_${index}_${targetLanguage}`,
    ),
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error(
      `Translation refresh returned empty content for ${topic.slug} ${targetLanguage}`,
    );
  }

  const record = normalizeArticle(
    translationRecordSchema.parse(JSON.parse(content)),
  );

  if (record.language !== targetLanguage) {
    throw new Error(
      `Translation refresh returned unexpected language for ${topic.slug}: ${record.language}`,
    );
  }

  assertTranslationShape(record);
  return record;
}

async function main() {
  ({ default: OpenAI } = require('openai'));
  ({ zodResponseFormat } = require('openai/helpers/zod'));
  const payload = loadPayload();
  fs.mkdirSync(path.dirname(PAYLOAD_BACKUP_PATH), { recursive: true });

  if (!fs.existsSync(PAYLOAD_BACKUP_PATH)) {
    fs.copyFileSync(PAYLOAD_PATH, PAYLOAD_BACKUP_PATH);
  }

  const client = new OpenAI({ apiKey: readApiKey() });
  const refreshedTopics = [];

  for (const [index, topic] of payload.topics.entries()) {
    const englishArticle = topic.records.find((record) => record.language === 'en');
    if (!englishArticle) {
      throw new Error(`Missing English master for ${topic.slug}`);
    }

    const refreshedRecords = [englishArticle];

    for (const targetLanguage of TARGET_LANGUAGES) {
      console.log(`Refreshing translation for ${topic.slug} [${targetLanguage}]...`);
      const translated = await createTranslation(
        client,
        topic,
        englishArticle,
        targetLanguage,
        index,
      );

      refreshedRecords.push({
        language: translated.language,
        slug: topic.slug,
        title: translated.title,
        body: translated.body,
      });
    }

    topic.records = refreshedRecords.sort(
      (left, right) =>
        ALL_LANGUAGES.indexOf(left.language) - ALL_LANGUAGES.indexOf(right.language),
    );

    refreshedTopics.push({
      slug: topic.slug,
      refreshedLanguages: topic.records.filter((record) => record.language !== 'en').length,
    });
  }

  fs.writeFileSync(PAYLOAD_PATH, JSON.stringify(payload, null, 2));

  const { uri, dbName } = readMongoConfig();
  const mongo = new MongoClient(uri);
  await mongo.connect();

  try {
    const collection = mongo.db(dbName).collection('articles');
    const operations = [];
    const updatedAt = new Date();

    payload.topics.forEach((topic) => {
      topic.records
        .filter((record) => record.language !== 'en')
        .forEach((record) => {
          operations.push({
            updateOne: {
              filter: {
                language: record.language,
                slug: topic.slug,
              },
              update: {
                $set: {
                  title: record.title,
                  body: record.body,
                  updatedAt,
                },
              },
            },
          });
        });
    });

    const result = await collection.bulkWrite(operations, { ordered: true });

    console.log(
      JSON.stringify(
        {
          payloadPath: PAYLOAD_PATH,
          backupPath: PAYLOAD_BACKUP_PATH,
          topicCount: payload.topics.length,
          refreshedRecordCount: operations.length,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
          refreshedTopics,
        },
        null,
        2,
      ),
    );
  } finally {
    await mongo.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
