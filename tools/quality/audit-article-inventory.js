'use strict';

const fs = require('fs');

const REQUIRED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const DEFAULT_WINDOW_DAYS = 180;

function valueAfter(argv, name) {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : undefined;
}

function parseDate(value, fallback) {
  if (!value) {
    return fallback;
  }
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    throw new Error(`Invalid date for audit window: ${value}`);
  }
  return date;
}

const windowEndFallback = new Date();
const windowStartFallback = new Date(windowEndFallback.getTime() - DEFAULT_WINDOW_DAYS * 24 * 60 * 60 * 1000);
const WINDOW_END = parseDate(
  process.env.AUDIT_WINDOW_END || valueAfter(process.argv, '--window-end'),
  windowEndFallback,
);
const WINDOW_START = parseDate(
  process.env.AUDIT_WINDOW_START || valueAfter(process.argv, '--window-start'),
  windowStartFallback,
);

const SCRIPT_PATTERNS = {
  ko: /[\uac00-\ud7a3]/u,
  ja: /[\u3040-\u30ff\u3400-\u9fff]/u,
  zh: /[\u3400-\u9fff]/u,
  th: /[\u0e00-\u0e7f]/u,
};

const DIACRITIC_PATTERNS = {
  es: /[áéíóúñüÁÉÍÓÚÑÜ¿¡]/gu,
  pt: /[áàâãçéêíóôõúÁÀÂÃÇÉÊÍÓÔÕÚ]/gu,
  fr: /[àâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ]/gu,
  vi: /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵĂÂĐÊÔƠƯÁÀẢÃẠẤẦẨẪẬẮẰẲẴẶÉÈẺẼẸẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰÝỲỶỸỴ]/gu,
};

const MIN_DIACRITICS = {
  es: 8,
  pt: 8,
  fr: 8,
  vi: 35,
};

const PROSE_CASE_LANGUAGES = new Set(['en', 'es', 'pt', 'fr', 'vi']);

const VI_ASCII_STRIPPED_TERMS = [
  /\bkhong\b/iu,
  /\bduong\b/iu,
  /\bnoi\b/iu,
  /\bdia\b/iu,
  /\bmang\b/iu,
  /\bluoi\b/iu,
  /\bquoc\b/iu,
  /\bthong\b/iu,
  /\btuong\b/iu,
  /\bdau\b/iu,
  /\bquyet\b/iu,
  /\bdinh\b/iu,
  /\bdung\b/iu,
  /\bkhach\b/iu,
  /\bkiem\b/iu,
  /\bthuong\b/iu,
  /\bkhoang\b/iu,
  /\bphut\b/iu,
  /\btruot\b/iu,
  /\btuyet\b/iu,
  /\bchinh thuc\b/iu,
  /\bthuc te\b/iu,
  /\bgio\b/iu,
  /\bmo cua\b/iu,
  /\bcua hang\b/iu,
  /\ble hoi\b/iu,
];

function requireFromApi(moduleName) {
  const apiModules = process.env.MOMENTBOOK_API_NODE_MODULES;
  if (apiModules) {
    return require(`${apiModules.replace(/\/$/, '')}/${moduleName}`);
  }
  return require(moduleName);
}

function collapseMarkdown(value) {
  return String(value || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(value) {
  const collapsed = collapseMarkdown(value);
  return collapsed ? collapsed.split(/\s+/).filter(Boolean).length : 0;
}

function h2Count(value) {
  return (String(value || '').match(/^##\s+\S/gm) || []).length;
}

function countMatches(pattern, value) {
  return (String(value || '').match(pattern) || []).length;
}

function firstProseParagraph(body) {
  const lines = String(body || '').split('\n');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (
      !line ||
      line.startsWith('#') ||
      line.startsWith('![') ||
      line.startsWith('*') ||
      line.startsWith('- ') ||
      line.startsWith('>') ||
      /^\d+[.)]\s/.test(line)
    ) {
      continue;
    }
    return line;
  }
  return '';
}

function startsWithLowercaseLetter(value) {
  const first = String(value || '').match(/\p{L}/u)?.[0];
  return Boolean(first && first === first.toLocaleLowerCase() && first !== first.toLocaleUpperCase());
}

function countPatternHits(patterns, value) {
  return patterns.reduce((count, pattern) => count + (pattern.test(value) ? 1 : 0), 0);
}

function recordFlags(record) {
  const flags = [];
  const body = String(record.body || '');
  const text = `${record.title || ''}\n${body}`;
  const words = wordCount(body);

  if (record.language !== 'en') {
    const scriptPattern = SCRIPT_PATTERNS[record.language];
    if (scriptPattern && !scriptPattern.test(text)) {
      flags.push('missing-script');
    }

    const diacriticPattern = DIACRITIC_PATTERNS[record.language];
    if (diacriticPattern) {
      const count = countMatches(diacriticPattern, text);
      if (count < MIN_DIACRITICS[record.language]) {
        flags.push(`low-diacritics:${count}`);
      }
    }

    if (record.language === 'vi') {
      const strippedTermHits = countPatternHits(VI_ASCII_STRIPPED_TERMS, text);
      if (strippedTermHits >= 5) {
        flags.push(`romanized-or-mechanical-vi:${strippedTermHits}`);
      }
    }
  }

  if (['en', 'es', 'pt', 'fr', 'vi'].includes(record.language) && words < 900) {
    flags.push(`short:${words}`);
  }

  if (h2Count(body) < 6) {
    flags.push(`low-h2:${h2Count(body)}`);
  }

  if (PROSE_CASE_LANGUAGES.has(record.language) && startsWithLowercaseLetter(firstProseParagraph(body))) {
    flags.push('lowercase-first-prose');
  }

  return flags;
}

function groupRows(records) {
  const groups = new Map();
  for (const record of records) {
    const group = record.translationGroupId || '<missing>';
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group).push(record);
  }

  return [...groups.entries()].map(([group, rows]) => {
    const languages = rows.map((row) => row.language).sort();
    const publishedAtValues = [...new Set(rows.map((row) => new Date(row.publishedAt).toISOString()))];
    const publishedAt = new Date(publishedAtValues[0]);
    const en = rows.find((row) => row.language === 'en') || rows[0];
    const flags = [];

    if (JSON.stringify(languages) !== JSON.stringify([...REQUIRED_LANGUAGES].sort())) {
      flags.push(`language-set:${languages.join(',')}`);
    }

    if (publishedAtValues.length !== 1) {
      flags.push(`mixed-publishedAt:${publishedAtValues.length}`);
    }

    if (publishedAt < WINDOW_START || publishedAt > WINDOW_END) {
      flags.push(`date-out-of-window:${publishedAt.toISOString()}`);
    }

    for (const row of rows) {
      const rowFlags = recordFlags(row);
      for (const flag of rowFlags) {
        flags.push(`${row.language}:${flag}`);
      }
    }

    return {
      group,
      slug: en?.slug,
      title: en?.title,
      category: en?.category,
      publishedAt: publishedAt.toISOString(),
      languages,
      flags: [...new Set(flags)],
    };
  });
}

async function main() {
  const mongoose = requireFromApi('mongoose');
  const env = process.env.AUDIT_ENV || process.env.NODE_ENV || 'unknown';
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
      category: 1,
      title: 1,
      body: 1,
      publishedAt: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  ).lean();

  const rows = groupRows(records).sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );

  const summary = {
    env,
    auditedAt: new Date().toISOString(),
    recordCount: records.length,
    groupCount: rows.length,
    groupsWithFlags: rows.filter((row) => row.flags.length > 0).length,
    windowStart: WINDOW_START.toISOString(),
    windowEnd: WINDOW_END.toISOString(),
    flagCounts: rows.reduce((acc, row) => {
      for (const flag of row.flags) {
        const key = flag.replace(/:[^:]+$/u, '');
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {}),
    rows,
  };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(
      JSON.stringify(
        {
          env: summary.env,
          recordCount: summary.recordCount,
          groupCount: summary.groupCount,
          groupsWithFlags: summary.groupsWithFlags,
          flagCounts: summary.flagCounts,
        },
        null,
        2,
      ),
    );
  }

  const outputPath = process.env.AUDIT_OUTPUT;
  if (outputPath) {
    fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
