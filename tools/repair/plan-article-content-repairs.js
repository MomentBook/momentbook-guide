'use strict';

const fs = require('fs');

function valueAfter(argv, flag) {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return null;
  }
  return argv[index + 1] || null;
}

function parseArgs(argv) {
  return {
    audit: valueAfter(argv, '--audit'),
    out: valueAfter(argv, '--out'),
    batchSize: Number(valueAfter(argv, '--batch-size') || 8),
  };
}

function priorityFor(flags) {
  if (flags.some((flag) => flag.includes('low-diacritics'))) {
    return 1;
  }
  if (flags.some((flag) => flag.includes('low-h2'))) {
    return 2;
  }
  if (flags.some((flag) => flag.includes(':short'))) {
    return 3;
  }
  return 4;
}

function classify(flags) {
  const classes = [];
  if (flags.some((flag) => flag.includes('low-diacritics'))) {
    classes.push('accent-or-tone-mark-repair');
  }
  if (flags.some((flag) => flag.includes('low-h2'))) {
    classes.push('structure-expansion');
  }
  if (flags.some((flag) => flag.includes(':short'))) {
    classes.push('depth-expansion');
  }
  return classes.length ? classes : ['manual-review'];
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.audit) {
    throw new Error('Usage: node tools/repair/plan-article-content-repairs.js --audit audit.json [--out plan.json]');
  }

  const audit = JSON.parse(fs.readFileSync(args.audit, 'utf8'));
  const items = audit.rows
    .filter((row) => row.flags && row.flags.length > 0)
    .map((row) => ({
      group: row.group,
      slug: row.slug,
      title: row.title,
      publishedAt: row.publishedAt,
      priority: priorityFor(row.flags),
      repairClasses: classify(row.flags),
      flags: row.flags,
    }))
    .sort((a, b) => a.priority - b.priority || new Date(b.publishedAt) - new Date(a.publishedAt));

  const batches = chunk(items, args.batchSize).map((groups, index) => ({
    batch: index + 1,
    groupCount: groups.length,
    groups,
  }));

  const plan = {
    generatedAt: new Date().toISOString(),
    sourceAudit: args.audit,
    groupCount: items.length,
    batchSize: args.batchSize,
    batches,
  };

  const output = `${JSON.stringify(plan, null, 2)}\n`;
  if (args.out) {
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

main();
