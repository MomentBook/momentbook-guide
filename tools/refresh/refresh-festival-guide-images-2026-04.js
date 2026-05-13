const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const PAYLOAD_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.json',
);
const PAYLOAD_BACKUP_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guide-image-refresh-backup-2026-04.json',
);

const IMAGE_UPDATES = {
  'sapporo-snow-festival-2026-travel-guide-2026-01-09': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/SAPPORO_SNOW_FESTIVAL_2010_-_panoramio_-_t-konno.jpg',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:SAPPORO_SNOW_FESTIVAL_2010_-_panoramio_-_t-konno.jpg',
  },
  'rio-carnival-2026-travel-guide-2026-01-16': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Carnival_in_R%C3%ADo_de_Janeiro_at_Sambadrome_%2854730163556%29.jpg',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:Carnival_in_R%C3%ADo_de_Janeiro_at_Sambadrome_%2854730163556%29.jpg',
  },
  'venice-carnival-2026-travel-guide-2026-02-06': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Venice_carnival_mask_%282993907860%29.jpg',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:Venice_carnival_mask_%282993907860%29.jpg',
  },
  'st-patricks-festival-dublin-2026-guide-2026-02-19': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:St._Patrick%27s_Day_Parade_In_Dublin_-_March_2011_%285534408947%29.jpg',
  },
  'albuquerque-balloon-fiesta-2026-guide-2026-03-21': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Albuquerque_balloon_fiesta.JPG',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:Albuquerque_balloon_fiesta.JPG',
  },
  'oktoberfest-munich-2026-guide-2026-04-03': {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Oktoberfest_Munich_1978_Beer_Tent.jpg',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:Oktoberfest_Munich_1978_Beer_Tent.jpg',
  },
};

const FIRST_IMAGE_PATTERN =
  /!\[([^\]]*)\]\((https?:\/\/[^\n]+?\.(?:jpg|jpeg|png|webp|gif)(?:\?[^\n)]*)?)\)/i;

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
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

function replaceFirstImageUrl(body, nextUrl) {
  if (!FIRST_IMAGE_PATTERN.test(body)) {
    throw new Error('Article body does not contain a replaceable lead image.');
  }

  return body.replace(
    FIRST_IMAGE_PATTERN,
    (_match, alt) => `![${alt}](${nextUrl})`,
  );
}

async function main() {
  const payload = loadPayload();
  fs.mkdirSync(path.dirname(PAYLOAD_BACKUP_PATH), { recursive: true });

  if (!fs.existsSync(PAYLOAD_BACKUP_PATH)) {
    fs.copyFileSync(PAYLOAD_PATH, PAYLOAD_BACKUP_PATH);
  }

  const updateSummary = [];

  payload.topics.forEach((topic) => {
    const imageUpdate = IMAGE_UPDATES[topic.slug];
    if (!imageUpdate) {
      return;
    }

    topic.records = topic.records.map((record) => ({
      ...record,
      body: replaceFirstImageUrl(record.body, imageUpdate.url),
    }));

    updateSummary.push({
      slug: topic.slug,
      url: imageUpdate.url,
      sourcePage: imageUpdate.sourcePage,
      languageCount: topic.records.length,
    });
  });

  fs.writeFileSync(PAYLOAD_PATH, JSON.stringify(payload, null, 2));

  const { uri, dbName } = readMongoConfig();
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const collection = client.db(dbName).collection('articles');
    const now = new Date();
    const operations = [];

    payload.topics.forEach((topic) => {
      const imageUpdate = IMAGE_UPDATES[topic.slug];
      if (!imageUpdate) {
        return;
      }

      topic.records.forEach((record) => {
        operations.push({
          updateOne: {
            filter: {
              language: record.language,
              slug: topic.slug,
            },
            update: {
              $set: {
                body: record.body,
                updatedAt: now,
              },
            },
          },
        });
      });
    });

    const result = operations.length
      ? await collection.bulkWrite(operations, { ordered: true })
      : {
          matchedCount: 0,
          modifiedCount: 0,
          upsertedCount: 0,
        };

    console.log(
      JSON.stringify(
        {
          backupPath: PAYLOAD_BACKUP_PATH,
          payloadPath: PAYLOAD_PATH,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
          updatedTopicCount: updateSummary.length,
          updatedRecordCount: operations.length,
          updates: updateSummary,
        },
        null,
        2,
      ),
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
