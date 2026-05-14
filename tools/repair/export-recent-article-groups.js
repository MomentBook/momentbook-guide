'use strict';

const fs = require('fs');

const REQUIRED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];

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

function numberAfter(argv, flag, fallback) {
  const raw = valueAfter(argv, flag);
  if (raw === null) {
    return fallback;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${flag} must be a number.`);
  }
  return parsed;
}

function parseDate(value, label) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    throw new Error(`${label} must be a valid date.`);
  }
  return date;
}

function parseArgs(argv) {
  const minAgeMinutes = numberAfter(argv, '--min-age-minutes', 10);
  const until = valueAfter(argv, '--until')
    ? parseDate(valueAfter(argv, '--until'), '--until')
    : new Date(Date.now() - minAgeMinutes * 60 * 1000);
  const since = valueAfter(argv, '--since')
    ? parseDate(valueAfter(argv, '--since'), '--since')
    : new Date(until.getTime() - numberAfter(argv, '--since-hours', 8) * 60 * 60 * 1000);

  return {
    since,
    until,
    minAgeMinutes,
    out: valueAfter(argv, '--out'),
    state: valueAfter(argv, '--state'),
    skipReviewed: argv.includes('--skip-reviewed'),
    includeDrafts: argv.includes('--include-drafts'),
    limitGroups: numberAfter(argv, '--limit-groups', 12),
  };
}

function readReviewedGroups(stateFile) {
  if (!stateFile || !fs.existsSync(stateFile)) {
    return new Set();
  }

  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  const reviewedGroups = state.reviewedGroups || {};
  return new Set(
    Object.entries(reviewedGroups)
      .filter(([, value]) => ['pass', 'applied', 'verified'].includes(value.status))
      .map(([group]) => group),
  );
}

function groupRecords(records) {
  const groups = new Map();
  for (const record of records) {
    const group = record.translationGroupId || '<missing>';
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group).push(record);
  }

  return [...groups.entries()].map(([translationGroupId, rows]) => {
    const languages = rows.map((row) => row.language).sort();
    const publishedAtValues = [...new Set(rows.map((row) => new Date(row.publishedAt).toISOString()))]
      .sort();
    const newestPublishedAt = publishedAtValues[publishedAtValues.length - 1] || null;
    const en = rows.find((row) => row.language === 'en') || rows[0] || {};

    return {
      translationGroupId,
      slug: en.slug,
      title: en.title,
      category: en.category,
      newestPublishedAt,
      publishedAtValues,
      recordCount: rows.length,
      languages,
      hasRequiredLanguageSet:
        JSON.stringify(languages) === JSON.stringify([...REQUIRED_LANGUAGES].sort()),
      records: rows.sort((a, b) => String(a.language).localeCompare(String(b.language))),
    };
  }).sort((a, b) => new Date(b.newestPublishedAt) - new Date(a.newestPublishedAt));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const reviewedGroups = args.skipReviewed ? readReviewedGroups(args.state) : new Set();

  const mongoose = requireFromApi('mongoose');
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  });

  const Article = mongoose.model(
    'Article',
    new mongoose.Schema({}, { strict: false, collection: 'articles' }),
  );

  const matchQuery = {
    publishedAt: {
      $gte: args.since,
      $lte: args.until,
    },
  };
  if (!args.includeDrafts) {
    matchQuery.status = 'PUBLISHED';
  }

  const matchingRows = await Article.find(
    matchQuery,
    {
      translationGroupId: 1,
      publishedAt: 1,
    },
  ).lean();

  const groupNewestPublishedAt = new Map();
  for (const row of matchingRows) {
    if (!row.translationGroupId) {
      continue;
    }
    const publishedAt = new Date(row.publishedAt).getTime();
    const current = groupNewestPublishedAt.get(row.translationGroupId) || 0;
    groupNewestPublishedAt.set(row.translationGroupId, Math.max(current, publishedAt));
  }

  const groupIds = [...groupNewestPublishedAt.entries()]
    .filter(([group]) => !reviewedGroups.has(group))
    .sort((a, b) => b[1] - a[1])
    .slice(0, args.limitGroups)
    .map(([group]) => group);

  const fullQuery = {
    translationGroupId: { $in: groupIds },
  };
  if (!args.includeDrafts) {
    fullQuery.status = 'PUBLISHED';
  }

  const records = groupIds.length === 0
    ? []
    : await Article.find(
      fullQuery,
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
    ).lean();

  const groups = groupRecords(records);
  const payload = {
    exportedAt: new Date().toISOString(),
    window: {
      since: args.since.toISOString(),
      until: args.until.toISOString(),
      minAgeMinutes: args.minAgeMinutes,
    },
    includeDrafts: args.includeDrafts,
    skippedReviewedGroups: args.skipReviewed,
    reviewedStateFile: args.state || null,
    candidateGroupCount: groups.length,
    groups,
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
