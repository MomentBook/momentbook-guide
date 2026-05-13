'use strict';

const fs = require('fs');

function requireFromApi(moduleName) {
  const apiModules = process.env.MOMENTBOOK_API_NODE_MODULES;
  if (apiModules) {
    return require(`${apiModules.replace(/\/$/, '')}/${moduleName}`);
  }
  return require(moduleName);
}

function valueAfter(argv, flag) {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return null;
  }
  return argv[index + 1] || null;
}

function parseArgs(argv) {
  return {
    group: valueAfter(argv, '--group'),
    out: valueAfter(argv, '--out'),
    includeDrafts: argv.includes('--include-drafts'),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.group) {
    throw new Error('Usage: node tools/repair/export-article-group.js --group <translationGroupId> [--out file]');
  }

  const mongoose = requireFromApi('mongoose');
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  });

  const Article = mongoose.model(
    'Article',
    new mongoose.Schema({}, { strict: false, collection: 'articles' }),
  );

  const query = { translationGroupId: args.group };
  if (!args.includeDrafts) {
    query.status = 'PUBLISHED';
  }

  const records = await Article.find(
    query,
    {
      _id: 1,
      translationGroupId: 1,
      language: 1,
      slug: 1,
      category: 1,
      status: 1,
      title: 1,
      body: 1,
      publishedAt: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  )
    .sort({ language: 1 })
    .lean();

  const payload = {
    exportedAt: new Date().toISOString(),
    translationGroupId: args.group,
    recordCount: records.length,
    records,
  };
  const output = `${JSON.stringify(payload, null, 2)}\n`;

  if (args.out) {
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
