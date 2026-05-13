const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
}

async function main() {
  const [, , envPathArg, inputPathArg, backupPathArg] = process.argv;

  if (!envPathArg || !inputPathArg || !backupPathArg) {
    throw new Error(
      'Usage: node import-editorial-guides-generic-production.js <envPath> <inputJsonPath> <backupJsonPath>',
    );
  }

  const envPath = path.resolve(envPathArg);
  const inputPath = path.resolve(inputPathArg);
  const backupPath = path.resolve(backupPathArg);

  const envText = fs.readFileSync(envPath, 'utf8');
  const uri = process.env.MONGODB_URI || readEnvValue(envText, 'MONGODB_URI');
  const dbName =
    process.env.DB_NAME || readEnvValue(envText, 'DB_NAME') || 'momentbook';
  const payload = loadJson(inputPath);

  if (!uri) {
    throw new Error(`MONGODB_URI was not found in ${envPath}`);
  }

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const collection = client.db(dbName).collection('articles');
    const targetSlugs = payload.topics.map((topic) => topic.slug);

    const existing = await collection
      .find(
        { slug: { $in: targetSlugs } },
        {
          projection: {
            _id: 0,
            translationGroupId: 1,
            language: 1,
            slug: 1,
            category: 1,
            status: 1,
            title: 1,
            body: 1,
            createdAt: 1,
            publishedAt: 1,
            updatedAt: 1,
          },
        },
      )
      .sort({ slug: 1, language: 1 })
      .toArray();

    fs.writeFileSync(
      backupPath,
      JSON.stringify(
        {
          backedUpAt: new Date().toISOString(),
          slugCount: targetSlugs.length,
          recordCount: existing.length,
          records: existing,
        },
        null,
        2,
      ),
    );

    const operations = [];

    payload.topics.forEach((topic) => {
      const publishedAt = new Date(topic.publishedAt);

      topic.records.forEach((record) => {
        operations.push({
          updateOne: {
            filter: {
              language: record.language,
              slug: topic.slug,
            },
            update: {
              $set: {
                translationGroupId: topic.translationGroupId,
                language: record.language,
                slug: topic.slug,
                category: topic.category,
                status: 'PUBLISHED',
                title: record.title,
                body: record.body,
                publishedAt,
                updatedAt: publishedAt,
              },
              $setOnInsert: {
                createdAt: publishedAt,
              },
            },
            upsert: true,
          },
        });
      });
    });

    const result = await collection.bulkWrite(operations, { ordered: true });

    const verification = [];
    for (const topic of payload.topics) {
      const docs = await collection
        .find(
          { translationGroupId: topic.translationGroupId },
          {
            projection: {
              _id: 0,
              translationGroupId: 1,
              language: 1,
              slug: 1,
              category: 1,
              title: 1,
              publishedAt: 1,
            },
          },
        )
        .sort({ language: 1 })
        .toArray();

      verification.push({
        translationGroupId: topic.translationGroupId,
        slug: topic.slug,
        category: topic.category,
        recordCount: docs.length,
        languages: docs.map((doc) => doc.language),
      });
    }

    console.log(
      JSON.stringify(
        {
          inputPath,
          backupPath,
          backedUpRecordCount: existing.length,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
          upsertedCount: result.upsertedCount,
          topicCount: payload.topics.length,
          verification,
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
