'use strict';

const fs = require('fs');

const REQUIRED_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const FUTURE_SKEW_MS = 5 * 60 * 1000;

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

const MIN_DEPTH = {
  en: { words: 1100 },
  es: { words: 1050 },
  pt: { words: 1050 },
  fr: { words: 1050 },
  vi: { words: 1050 },
  ko: { chars: 4200 },
  ja: { chars: 3800 },
  zh: { chars: 3200 },
  th: { chars: 6200 },
};

const REQUIRED_SECTION_HINTS = {
  en: [/what to know first/i],
  ko: [/먼저|알아둘|알아야/u],
  ja: [/知って|最初|先に/u],
  zh: [/须知|先知道|先了解|行前/u],
  es: [/antes|primero|saber/i],
  pt: [/antes|saber|primeiro/i],
  fr: [/avant|savoir|d'abord/i],
  th: [/ควรรู้|รู้ก่อน|ก่อนเดินทาง/u],
  vi: [/cần biết|biết trước|trước khi/i],
};

const SOURCE_SECTION_HINTS = {
  en: [/^##\s+Sources\s*$/im],
  ko: [/^##\s+출처\s*$/im],
  ja: [/^##\s+出典|^##\s+情報源/im],
  zh: [/^##\s+来源|^##\s+資料來源|^##\s+资料来源|^##\s+信息来源/im],
  es: [/^##\s+Fuentes\s*$/im],
  pt: [/^##\s+Fontes\s*$/im],
  fr: [/^##\s+Sources\s*$/im],
  th: [/^##\s+แหล่งข้อมูล|^##\s+ที่มา/im],
  vi: [/^##\s+Nguồn|^##\s+Nguồn tham khảo/im],
};

const ENGLISH_HEADING_LEAKS = [
  /^#{1,3}\s+What to know first\s*$/im,
  /^#{1,3}\s+Common mistakes\s*$/im,
  /^#{1,3}\s+Who should choose/i,
  /^#{1,3}\s+What to check before you go\s*$/im,
  /^#{1,3}\s+Timing and route plan\s*$/im,
  /^#{1,3}\s+Rules that change/i,
];

const PROSE_CASE_LANGUAGES = new Set(['en', 'es', 'pt', 'fr', 'vi']);

const MAX_PARAGRAPH_CHARS = {
  en: 850,
  es: 900,
  pt: 900,
  fr: 900,
  vi: 900,
  ko: 520,
  ja: 520,
  zh: 460,
  th: 1100,
};

const PLACEHOLDER_HEADING_PATTERNS = [
  /^overview$/iu,
  /^details$/iu,
  /^more information$/iu,
  /^practical decision section$/iu,
  /^timing or route section$/iu,
  /^rules or exceptions section$/iu,
  /^access, ticket, reservation, or route decision$/iu,
];

const HYPE_PATTERNS = [
  /\bultimate guide\b/iu,
  /\bhidden gem\b/iu,
  /\bmust[- ]see\b/iu,
  /\bbucket list\b/iu,
];

function readInput() {
  const file = process.argv[2];
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

  throw new Error('Expected a JSON array, or an object with articles/records.');
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
  const text = collapseMarkdown(value);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function h1Count(body) {
  return (String(body || '').match(/^#\s+\S/gm) || []).length;
}

function h2Headings(body) {
  return String(body || '')
    .split('\n')
    .filter((line) => /^##\s+\S/.test(line))
    .map((line) => line.replace(/^##\s+/, '').trim());
}

function isProseLine(line) {
  const value = String(line || '').trim();
  return Boolean(value) &&
    !value.startsWith('#') &&
    !value.startsWith('![') &&
    !value.startsWith('*') &&
    !value.startsWith('- ') &&
    !value.startsWith('|') &&
    !value.startsWith('>') &&
    !/^source:/iu.test(value) &&
    !/^\d+[.)]\s/.test(value);
}

function proseParagraphs(body) {
  return String(body || '')
    .split(/\n\s*\n/)
    .map((block) => block
      .split('\n')
      .map((line) => line.trim())
      .filter(isProseLine)
      .join(' ')
      .trim())
    .filter(Boolean);
}

function introParagraphs(body) {
  const beforeFirstH2 = String(body || '').split(/^##\s+/m)[0] || '';
  return proseParagraphs(beforeFirstH2);
}

function sectionBodyByHints(language, body, hintMap) {
  const hints = hintMap[language] || [];
  const lines = String(body || '').split('\n');
  let start = -1;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^##\s+\S/.test(line) && hints.some((pattern) => pattern.test(line))) {
      start = index + 1;
      break;
    }
  }
  if (start === -1) {
    return '';
  }

  const section = [];
  for (let index = start; index < lines.length; index += 1) {
    if (/^##\s+\S/.test(lines[index])) {
      break;
    }
    section.push(lines[index]);
  }
  return section.join('\n');
}

function bulletCount(value) {
  return String(value || '')
    .split('\n')
    .filter((line) => /^\s*[-*]\s+\S/.test(line))
    .length;
}

function substantiveH2Count(body, language) {
  const sourceHints = SOURCE_SECTION_HINTS[language] || [];
  return h2Headings(body).filter((heading) => {
    const line = `## ${heading}`;
    return !sourceHints.some((pattern) => pattern.test(line));
  }).length;
}

function firstImage(body) {
  const match = String(body || '').match(/!\[([^\]]*)]\((https?:\/\/[^)\s]+)(?:\s+["'][^"']+["'])?\)/);
  return match ? { alt: match[1].trim(), url: match[2].trim() } : null;
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

function countMatches(pattern, value) {
  return (String(value || '').match(pattern) || []).length;
}

function countPatternHits(patterns, value) {
  return patterns.reduce((count, pattern) => count + (pattern.test(value) ? 1 : 0), 0);
}

function hasRequiredSection(language, body) {
  return (REQUIRED_SECTION_HINTS[language] || []).some((pattern) =>
    pattern.test(body),
  );
}

function hasSourceSection(language, body) {
  return (SOURCE_SECTION_HINTS[language] || []).some((pattern) =>
    pattern.test(body),
  );
}

function validateRecord(record, groupPublishedAt, now) {
  const failures = [];
  const language = record.language;
  const body = String(record.body || '');
  const title = String(record.title || '');
  const text = `${title}\n${body}`;

  if (!REQUIRED_LANGUAGES.includes(language)) {
    failures.push(`unsupported language: ${language}`);
    return failures;
  }

  for (const field of ['translationGroupId', 'slug', 'category', 'title', 'body', 'publishedAt']) {
    if (!record[field]) {
      failures.push(`missing ${field}`);
    }
  }

  if (record.publishedAt && groupPublishedAt && record.publishedAt !== groupPublishedAt) {
    failures.push('publishedAt differs inside translation group');
  }

  if (!process.env.ALLOW_FUTURE_PUBLISHED_AT && record.publishedAt) {
    const publishedAt = new Date(record.publishedAt).getTime();
    if (Number.isFinite(publishedAt) && publishedAt > now + FUTURE_SKEW_MS) {
      failures.push(`future publishedAt: ${record.publishedAt}`);
    }
  }

  if (h1Count(body) !== 1) {
    failures.push(`expected exactly one H1, found ${h1Count(body)}`);
  }

  const h2Count = substantiveH2Count(body, language);
  if (h2Count < 6) {
    failures.push(`expected at least 6 substantive H2 sections, found ${h2Count}`);
  }

  const placeholderHeadings = h2Headings(body).filter((heading) =>
    PLACEHOLDER_HEADING_PATTERNS.some((pattern) => pattern.test(heading)),
  );
  if (placeholderHeadings.length > 0) {
    failures.push(`placeholder or generic H2 heading: ${placeholderHeadings.join(', ')}`);
  }

  if (!hasRequiredSection(language, body)) {
    failures.push('missing localized what-to-know-first section');
  } else {
    const count = bulletCount(sectionBodyByHints(language, body, REQUIRED_SECTION_HINTS));
    if (count < 5 || count > 7) {
      failures.push(`what-to-know-first section should have 5-7 bullets, found ${count}`);
    }
  }

  if (!hasSourceSection(language, body)) {
    failures.push('missing localized sources section');
  }

  const image = firstImage(body);
  if (!image) {
    failures.push('missing first markdown image with absolute http(s) URL');
  } else if (image.alt.length < 18 || /^(image|photo|picture|img)$/i.test(image.alt)) {
    failures.push('first image alt text is too weak');
  }

  if (PROSE_CASE_LANGUAGES.has(language) && startsWithLowercaseLetter(firstProseParagraph(body))) {
    failures.push('first prose paragraph starts with a lowercase letter');
  }

  const intros = introParagraphs(body);
  if (intros.length < 2) {
    failures.push(`expected at least 2 intro prose paragraphs before first H2, found ${intros.length}`);
  }

  const maxParagraph = MAX_PARAGRAPH_CHARS[language];
  if (maxParagraph) {
    const longParagraph = proseParagraphs(body).find((paragraph) => paragraph.length > maxParagraph);
    if (longParagraph) {
      failures.push(`paragraph is too long for scan-first reading: ${longParagraph.length} chars, maximum ${maxParagraph}`);
    }
  }

  if (language === 'en') {
    const hypeHits = HYPE_PATTERNS.filter((pattern) => pattern.test(text)).length;
    if (hypeHits > 0) {
      failures.push(`hype or generic travel phrase detected: ${hypeHits}`);
    }
  }

  const depth = MIN_DEPTH[language];
  if (depth?.words) {
    const words = wordCount(body);
    if (words < depth.words) {
      failures.push(`body is too short: ${words} words, minimum ${depth.words}`);
    }
  }
  if (depth?.chars && body.length < depth.chars) {
    failures.push(`body is too short: ${body.length} chars, minimum ${depth.chars}`);
  }

  const scriptPattern = SCRIPT_PATTERNS[language];
  if (scriptPattern && !scriptPattern.test(text)) {
    failures.push(`missing expected script for ${language}`);
  }

  const diacriticPattern = DIACRITIC_PATTERNS[language];
  if (diacriticPattern) {
    const count = countMatches(diacriticPattern, text);
    const min = MIN_DIACRITICS[language];
    if (count < min) {
      failures.push(`too few required diacritics for ${language}: ${count}, minimum ${min}`);
    }
  }

  if (language === 'vi') {
    const strippedTermHits = countPatternHits(VI_ASCII_STRIPPED_TERMS, text);
    if (strippedTermHits >= 5) {
      failures.push(`probable romanized or mechanically accentized Vietnamese: ${strippedTermHits} suspicious terms`);
    }
  }

  if (language !== 'en') {
    for (const leak of ENGLISH_HEADING_LEAKS) {
      if (leak.test(body)) {
        failures.push(`unlocalized English heading: ${leak}`);
      }
    }
  }

  return failures;
}

function validate(records) {
  const failures = [];
  const byGroup = new Map();
  const now = Date.now();

  for (const record of records) {
    const group = record.translationGroupId || '<missing-group>';
    if (!byGroup.has(group)) {
      byGroup.set(group, []);
    }
    byGroup.get(group).push(record);
  }

  for (const [group, groupRecords] of byGroup) {
    const languages = groupRecords.map((record) => record.language).sort();
    const expected = [...REQUIRED_LANGUAGES].sort();
    if (JSON.stringify(languages) !== JSON.stringify(expected)) {
      failures.push({
        group,
        language: '*',
        failures: [`language set mismatch: ${languages.join(', ')}`],
      });
    }

    const categories = new Set(groupRecords.map((record) => record.category));
    if (categories.size > 1) {
      failures.push({
        group,
        language: '*',
        failures: [`category differs inside group: ${[...categories].join(', ')}`],
      });
    }

    const groupPublishedAt = groupRecords[0]?.publishedAt;
    for (const record of groupRecords) {
      const recordFailures = validateRecord(record, groupPublishedAt, now);
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
  const records = readInput();
  const failures = validate(records);
  const summary = {
    ok: failures.length === 0,
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
