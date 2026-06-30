const fs = require('fs');
const path = require('path');

const dir = '.work/masaya';
const langs = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];

const langNames = {
  ko: 'ko', en: 'en', ja: 'ja', zh: 'zh',
  es: 'es', pt: 'pt', fr: 'fr', th: 'th', vi: 'vi'
};

const translationGroupId = 'artgrp_masaya_volcano_night_lava_20260624';

const categories = {
  ko: 'travel-guide', en: 'travel-guide', ja: 'travel-guide', zh: 'travel-guide',
  es: 'travel-guide', pt: 'travel-guide', fr: 'travel-guide', th: 'travel-guide', vi: 'travel-guide'
};

const slugs = {
  ko: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  en: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  ja: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  zh: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  es: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  pt: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  fr: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  th: 'masaya-volcano-night-lava-crater-guide-2026-06-24',
  vi: 'masaya-volcano-night-lava-crater-guide-2026-06-24'
};

const titles = {};
const bodies = {};

for (const lang of langs) {
  const bodyPath = path.join(dir, `${lang}_body.md`);
  const raw = fs.readFileSync(bodyPath, 'utf8');
  const lines = raw.split('\n');
  // Extract title from H1
  let title = '';
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('# ') && title === '') {
      title = line.slice(2).trim();
      bodyStart = i;
      break;
    }
  }
  titles[lang] = title;
  bodies[lang] = lines.slice(bodyStart).join('\n').trim();
}

const articles = langs.map(lang => ({
  translationGroupId,
  language: lang,
  slug: slugs[lang],
  category: categories[lang],
  title: titles[lang],
  body: bodies[lang],
  sourceCheckedDate: '2026-06-24'
}));

fs.writeFileSync(path.join(dir, 'payload.json'), JSON.stringify(articles, null, 2));
console.log('Payload written to', path.join(dir, 'payload.json'));
console.log('Languages:', langs.join(', '));
