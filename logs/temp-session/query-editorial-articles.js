const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

async function main() {
  const [, , envPathArg, slugsPathArg] = process.argv;

  if (!envPathArg || !slugsPathArg) {
    throw new Error(
      'Usage: node query-editorial-articles.js <envPath> <slugsJsonPath>',
    );
  }

  const envPath = path.resolve(envPathArg);
  const slugsPath = path.resolve(slugsPathArg);

  const envText = fs.readFileSync(envPath, 'utf8');
  const uri = process.env.MONGODB_URI || readEnvValue(envText, 'MONGODB_URI');
  const dbName =
    process.env.DB_NAME || readEnvValue(envText, 'DB_NAME') || 'momentbook';
  const slugs = JSON.parse(fs.readFileSync(slugsPath, 'utf8'));

  if (!uri) {
    throw new Error(`MONGODB_URI was not found in ${envPath}`);
  }

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const collection = client.db(dbName).collection('articles');
    const docs = await collection
      .find(
        { slug: { $in: slugs } },
        {
          projection: {
            _id: 0,
            translationGroupId: 1,
            language: 1,
            slug: 1,
            category: 1,
            status: 1,
            title: 1,
            createdAt: 1,
            publishedAt: 1,
            updatedAt: 1,
          },
        },
      )
      .sort({ slug: 1, language: 1 })
      .toArray();

    const summary = slugs.map((slug) => {
      const matches = docs.filter((doc) => doc.slug === slug);
      return {
        slug,
        recordCount: matches.length,
        languages: matches.map((doc) => doc.language),
        translationGroupIds: [...new Set(matches.map((doc) => doc.translationGroupId))],
      };
    });

    console.log(
      JSON.stringify(
        {
          envPath,
          dbName,
          slugCount: slugs.length,
          foundRecordCount: docs.length,
          summary,
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
