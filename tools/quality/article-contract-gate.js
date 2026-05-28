'use strict';

const fs = require('fs');

const REQUIRED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const FUTURE_SKEW_MS = 5 * 60 * 1000;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_DATE_PATTERN = /(?:^|-)(\d{4}-\d{2}-\d{2})(?:$|-)/g;

function parseArgs(argv) {
  const args = {
    file: null,
    dbMode: false,
    adminApiMode: false,
    adminCreateMode: false,
    today: currentDateInAsiaSeoul(),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--db') {
      args.dbMode = true;
    } else if (value === '--admin-api') {
      args.adminApiMode = true;
    } else if (value === '--admin-create-payload') {
      args.adminCreateMode = true;
    } else if (value === '--today') {
      args.today = argv[index + 1];
      index += 1;
    } else if (!args.file) {
      args.file = value;
    } else {
      throw new Error(`Unexpected argument: ${value}`);
    }
  }

  if (!ISO_DATE_PATTERN.test(args.today)) {
    throw new Error('--today must use YYYY-MM-DD.');
  }

  const modeCount = [args.dbMode, args.adminApiMode, args.adminCreateMode].filter(Boolean).length;
  if (modeCount > 1) {
    throw new Error('--db, --admin-api, and --admin-create-payload are mutually exclusive.');
  }

  return args;
}

function currentDateInAsiaSeoul() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function readInput(file) {
  const raw = file ? fs.readFileSync(file, 'utf8') : fs.readFileSync(0, 'utf8');
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (Array.isArray(parsed.articles)) {
    return parsed.articles;
  }

  if (Array.isArray(parsed.records)) {
    return parsed.records;
  }

  if (Array.isArray(parsed.groups)) {
    return parsed.groups.flatMap((group) => group.records || []);
  }

  throw new Error('Expected a JSON array, or an object with articles/records/groups.');
}

function hasValue(record, field) {
  return record[field] !== undefined && record[field] !== null && record[field] !== '';
}

function timestamp(value) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

function pushMissingFields(failures, record, fields) {
  for (const field of fields) {
    if (!hasValue(record, field)) {
      failures.push(`missing ${field}`);
    }
  }
}

function validateNotFutureTimestamp(failures, record, field, now) {
  if (!hasValue(record, field)) {
    return;
  }

  const value = timestamp(record[field]);
  if (value === null) {
    failures.push(`invalid ${field}: ${record[field]}`);
  } else if (value > now + FUTURE_SKEW_MS) {
    failures.push(`future ${field}: ${record[field]}`);
  }
}

function validateNotFutureDate(failures, record, field, today) {
  if (!hasValue(record, field)) {
    return;
  }

  const value = String(record[field]).slice(0, 10);
  if (!ISO_DATE_PATTERN.test(value)) {
    failures.push(`invalid ${field}: ${record[field]}`);
  } else if (value > today) {
    failures.push(`future ${field}: ${record[field]}`);
  }
}

function slugDates(slug) {
  const dates = [];
  let match;
  while ((match = SLUG_DATE_PATTERN.exec(String(slug || ''))) !== null) {
    dates.push(match[1]);
  }
  return dates;
}

function validateSlugDates(failures, record, today) {
  for (const date of slugDates(record.slug)) {
    if (date > today) {
      failures.push(`future slug date: ${date}`);
    }
  }
}

function validateRecord(record, options) {
  const failures = [];
  const adminApiFields = [
    'translationGroupId',
    'language',
    'slug',
    'category',
    'title',
    'body',
    'publishedAt',
  ];
  const baseFields = [
    ...adminApiFields,
    'sourceCheckedDate',
  ];
  const adminCreateFields = [
    'translationGroupId',
    'language',
    'slug',
    'category',
    'title',
    'body',
    'sourceCheckedDate',
  ];
  const dbFields = ['status', 'createdAt', 'updatedAt'];
  const requiredFields = options.adminApiMode
    ? adminApiFields
    : options.adminCreateMode
      ? adminCreateFields
      : options.dbMode
        ? [...baseFields, ...dbFields]
        : baseFields;

  pushMissingFields(failures, record, requiredFields);

  if (hasValue(record, 'language') && !REQUIRED_LANGUAGES.includes(record.language)) {
    failures.push(`unsupported language: ${record.language}`);
  }

  if (!options.adminCreateMode) {
    validateNotFutureTimestamp(failures, record, 'publishedAt', options.now);
  }
  if (options.dbMode) {
    validateNotFutureTimestamp(failures, record, 'createdAt', options.now);
    validateNotFutureTimestamp(failures, record, 'updatedAt', options.now);
  } else if (options.adminApiMode) {
    validateNotFutureTimestamp(failures, record, 'updatedAt', options.now);
  }
  if (!options.adminApiMode) {
    validateNotFutureDate(failures, record, 'sourceCheckedDate', options.today);
  }
  validateSlugDates(failures, record, options.today);

  return failures;
}

function sameValueFailures(records, field) {
  const values = [...new Set(records.map((record) => record[field]).filter(Boolean))];
  return values.length > 1 ? [`${field} differs inside translation group: ${values.join(', ')}`] : [];
}

function validate(records, args) {
  const failures = [];
  const byGroup = new Map();
  const options = {
    dbMode: args.dbMode,
    adminApiMode: args.adminApiMode,
    adminCreateMode: args.adminCreateMode,
    now: Date.now(),
    today: args.today,
  };

  for (const record of records) {
    const group = record.translationGroupId || '<missing-group>';
    if (!byGroup.has(group)) {
      byGroup.set(group, []);
    }
    byGroup.get(group).push(record);
  }

  if (byGroup.size === 0) {
    failures.push({
      group: '<none>',
      language: '*',
      failures: ['no records found'],
    });
  }

  for (const [group, groupRecords] of byGroup) {
    const languages = groupRecords.map((record) => record.language).sort();
    const expected = REQUIRED_LANGUAGES.slice().sort();
    if (JSON.stringify(languages) !== JSON.stringify(expected)) {
      failures.push({
        group,
        language: '*',
        failures: [`language set mismatch: ${languages.join(', ')}`],
      });
    }

    const groupFailures = [
      ...sameValueFailures(groupRecords, 'slug'),
      ...sameValueFailures(groupRecords, 'category'),
    ];
    if (!args.adminApiMode && !args.adminCreateMode) {
      groupFailures.push(...sameValueFailures(groupRecords, 'publishedAt'));
    }
    if (!args.adminApiMode) {
      groupFailures.push(...sameValueFailures(groupRecords, 'sourceCheckedDate'));
    }
    if (args.dbMode) {
      groupFailures.push(...sameValueFailures(groupRecords, 'status'));
    }
    if (groupFailures.length > 0) {
      failures.push({
        group,
        language: '*',
        failures: groupFailures,
      });
    }

    for (const record of groupRecords) {
      const recordFailures = validateRecord(record, options);
      if (recordFailures.length > 0) {
        failures.push({
          group,
          language: record.language || '<missing-language>',
          slug: record.slug,
          failures: recordFailures,
        });
      }
    }
  }

  return failures;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const records = readInput(args.file);
  const failures = validate(records, args);
  const summary = {
    ok: failures.length === 0,
    mode: args.adminApiMode
      ? 'admin-api'
      : args.adminCreateMode
        ? 'admin-create-payload'
        : args.dbMode
          ? 'db'
          : 'payload',
    today: args.today,
    recordCount: records.length,
    groups: [...new Set(records.map((record) => record.translationGroupId))].length,
    failures,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (failures.length > 0) {
    process.exit(1);
  }
}

main();
