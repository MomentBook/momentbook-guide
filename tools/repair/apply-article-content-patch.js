'use strict';

const fs = require('fs');

const REQUIRED_PATCH_FIELDS = ['translationGroupId', 'updates'];
const UPDATE_FIELDS = ['title', 'body'];

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
    file: valueAfter(argv, '--file'),
    apply: argv.includes('--apply'),
  };
}

function readPatch(file) {
  const raw = file ? fs.readFileSync(file, 'utf8') : fs.readFileSync(0, 'utf8');
  const patch = JSON.parse(raw);
  for (const field of REQUIRED_PATCH_FIELDS) {
    if (!patch[field]) {
      throw new Error(`Patch is missing ${field}`);
    }
  }
  if (!Array.isArray(patch.updates) || patch.updates.length === 0) {
    throw new Error('Patch updates must be a non-empty array.');
  }
  return patch;
}

function validateUpdate(update) {
  if (!update.language) {
    throw new Error('Every update must include language.');
  }
  for (const field of UPDATE_FIELDS) {
    if (typeof update[field] !== 'string' || update[field].trim().length === 0) {
      throw new Error(`Update ${update.language} is missing ${field}.`);
    }
  }
  for (const forbidden of ['slug', 'category', 'publishedAt', 'status', 'translationGroupId']) {
    if (Object.prototype.hasOwnProperty.call(update, forbidden)) {
      throw new Error(`Update ${update.language} must not include ${forbidden}.`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const patch = readPatch(args.file);
  patch.updates.forEach(validateUpdate);

  const mongoose = requireFromApi('mongoose');
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  });

  const Article = mongoose.model(
    'Article',
    new mongoose.Schema({}, { strict: false, collection: 'articles' }),
  );

  const existing = await Article.find(
    { translationGroupId: patch.translationGroupId },
    { _id: 1, language: 1, slug: 1, category: 1, publishedAt: 1, status: 1 },
  ).lean();
  const existingLanguages = new Set(existing.map((record) => record.language));

  for (const update of patch.updates) {
    if (!existingLanguages.has(update.language)) {
      throw new Error(`Patch language ${update.language} does not exist in ${patch.translationGroupId}.`);
    }
  }

  const results = [];
  if (args.apply) {
    for (const update of patch.updates) {
      const result = await Article.updateOne(
        {
          translationGroupId: patch.translationGroupId,
          language: update.language,
        },
        {
          $set: {
            title: update.title,
            body: update.body,
            updatedAt: new Date(),
          },
        },
      );
      results.push({
        language: update.language,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    }
  }

  console.log(
    JSON.stringify(
      {
        applied: args.apply,
        translationGroupId: patch.translationGroupId,
        updateLanguages: patch.updates.map((update) => update.language).sort(),
        existingRecordCount: existing.length,
        results,
      },
      null,
      2,
    ),
  );

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
