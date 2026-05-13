'use strict';

const WINDOW_START = new Date('2025-11-12T08:00:00.000Z');
const WINDOW_END_CAP = new Date('2026-05-12T23:59:59.999Z');
const FUTURE_SAFETY_MS = 10 * 60 * 1000;
const REQUIRED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];

function requireFromApi(moduleName) {
  const apiModules = process.env.MOMENTBOOK_API_NODE_MODULES;
  if (apiModules) {
    return require(`${apiModules.replace(/\/$/, '')}/${moduleName}`);
  }
  return require(moduleName);
}

function parseArgs(argv) {
  return {
    apply: argv.includes('--apply'),
    json: argv.includes('--json'),
    planOut: valueAfter(argv, '--plan-out'),
    planIn: valueAfter(argv, '--plan-in'),
  };
}

function valueAfter(argv, flag) {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return null;
  }
  return argv[index + 1] || null;
}

function assignDates(groups) {
  const sorted = [...groups].sort((a, b) => {
    const dateDiff = new Date(a.currentPublishedAt) - new Date(b.currentPublishedAt);
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return String(a.slug).localeCompare(String(b.slug));
  });

  const start = WINDOW_START.getTime();
  const end = effectiveWindowEnd().getTime();
  const interval = sorted.length > 1 ? (end - start) / (sorted.length - 1) : 0;

  return sorted.map((group, index) => {
    const assigned = new Date(start + Math.round(interval * index));
    assigned.setUTCSeconds(0, 0);
    return {
      ...group,
      assignedPublishedAt: assigned.toISOString(),
      order: index + 1,
    };
  });
}

function effectiveWindowEnd() {
  const safeNow = Date.now() - FUTURE_SAFETY_MS;
  return new Date(Math.min(WINDOW_END_CAP.getTime(), safeNow));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mongoose = requireFromApi('mongoose');
  const fs = require('fs');

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  });

  const Article = mongoose.model(
    'Article',
    new mongoose.Schema({}, { strict: false, collection: 'articles' }),
  );

  const records = await Article.find(
    { status: 'PUBLISHED' },
    {
      _id: 1,
      translationGroupId: 1,
      language: 1,
      slug: 1,
      title: 1,
      publishedAt: 1,
    },
  ).lean();

  const byGroup = new Map();
  for (const record of records) {
    const group = record.translationGroupId;
    if (!byGroup.has(group)) {
      byGroup.set(group, []);
    }
    byGroup.get(group).push(record);
  }

  const groups = [...byGroup.entries()].map(([group, rows]) => {
    const en = rows.find((row) => row.language === 'en') || rows[0];
    return {
      group,
      slug: en.slug,
      title: en.title,
      currentPublishedAt: new Date(en.publishedAt).toISOString(),
      languages: rows.map((row) => row.language).sort(),
    };
  });

  for (const group of groups) {
    const expected = JSON.stringify([...REQUIRED_LANGUAGES].sort());
    if (JSON.stringify(group.languages) !== expected) {
      throw new Error(
        `Refusing date redistribution because ${group.group} has languages ${group.languages.join(',')}`,
      );
    }
  }

  const plan = args.planIn
    ? JSON.parse(fs.readFileSync(args.planIn, 'utf8')).plan
    : assignDates(groups);

  if (args.planOut) {
    fs.writeFileSync(
      args.planOut,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          groupCount: plan.length,
          windowStart: WINDOW_START.toISOString(),
          windowEnd: effectiveWindowEnd().toISOString(),
          plan,
        },
        null,
        2,
      )}\n`,
    );
  }

  if (args.apply) {
    const existingGroups = new Set(groups.map((group) => group.group));
    for (const item of plan) {
      if (!existingGroups.has(item.group)) {
        continue;
      }
      await Article.updateMany(
        { translationGroupId: item.group },
        { $set: { publishedAt: new Date(item.assignedPublishedAt) } },
      );
    }
  }

  const summary = {
    applied: args.apply,
    groupCount: groups.length,
    planGroupCount: plan.length,
    windowStart: WINDOW_START.toISOString(),
    windowEnd: effectiveWindowEnd().toISOString(),
    first: plan[0],
    last: plan[plan.length - 1],
    plan,
  };

  console.log(JSON.stringify(summary, null, args.json ? 2 : 0));
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
