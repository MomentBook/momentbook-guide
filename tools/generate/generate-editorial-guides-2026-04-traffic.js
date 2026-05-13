const fs = require('fs');
const path = require('path');
const { assertArticleAiDisabled } = require('./article-ai-guard');

assertArticleAiDisabled(__filename);

const { z } = require('zod');

let OpenAI;
let zodResponseFormat;

const CURRENT_DATE = '2026-04-15';
const OUTPUT_PATH = path.resolve(
  __dirname,
  'generated',
  'editorial-guides-2026-04-traffic.json',
);
const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const ALL_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const TARGET_LANGUAGES = ALL_LANGUAGES.filter((language) => language !== 'en');
const TRANSLATION_BATCH_SIZE = 1;

const TOPICS = [
  {
    key: 'uk-eta-2026',
    translationGroupId: 'artgrp_U6kD1mP4xR9q',
    category: 'travel-guide',
    slug: 'uk-eta-2026-guide-fee-validity-who-needs-it-2026-04-15',
    publishedAt: '2026-04-15T06:18:00.000Z',
    titleEn:
      'UK ETA in 2026: Who Needs It, What It Costs, and How Long It Lasts',
    searchIntent:
      'Travellers need one current guide that explains who needs a UK ETA in 2026, who does not, what it allows, what it does not allow, the April 2026 fee increase, and how early to apply.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Heathrow%20Terminal%205%20ePassport%20gates.jpg',
      altEn: 'ePassport gates at Heathrow Airport Terminal 5',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'GOV.UK says an ETA allows travel to the UK, Jersey, Guernsey, and the Isle of Man for visits of up to 6 months.',
      'GOV.UK says whether you can apply depends on your nationality as shown on your passport.',
      'The official eligibility list updated on 9 April 2026 includes many visa-free nationalities such as EU countries except Ireland, as well as the United States, Canada, Australia, Japan, and South Korea.',
      'The official apply page says the ETA costs GBP 16 now and will cost GBP 20 from 8 April 2026.',
      'The official apply page says decisions usually arrive within a day and travellers should allow up to 3 working days.',
      'The official apply page says an ETA lasts for 2 years or until the passport expires, whichever is sooner, and allows repeated trips while valid.',
      'The official guidance says an ETA does not guarantee entry to the UK.',
      'The official guidance says an ETA can be used for tourism, visiting family and friends, short-term study, business trips, certain permitted paid engagements, and transit through border control.',
      'The official guidance says an ETA cannot be used to stay longer than 6 months, do regular work, claim public funds, or marry or register a civil partnership.',
      'The official apply page says travellers need the passport they will travel with, an email address, and a payment method, and must provide a face photo.',
      'The official exceptions page says British and Irish citizens, UK visa holders, people with permission to live, work, or study in the UK, and some Ireland-linked travellers do not need an ETA.',
      'The official overview page warns travellers to avoid websites that imitate government services.',
    ],
    sources: [
      {
        label: 'GOV.UK - Check if you can get an electronic travel authorisation (ETA)',
        url: 'https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta',
      },
      {
        label: 'GOV.UK - What you can and cannot do with an ETA',
        url: 'https://www.gov.uk/eta/what-you-can-cannot-do',
      },
      {
        label: 'GOV.UK - Apply for an ETA',
        url: 'https://www.gov.uk/eta/apply',
      },
      {
        label: 'GOV.UK - When you do not need an ETA',
        url: 'https://www.gov.uk/get-eta/when-not-need-eta',
      },
      {
        label: 'GOV.UK - Overview',
        url: 'https://www.gov.uk/eta',
      },
    ],
  },
  {
    key: 'thailand-tdac-2026',
    translationGroupId: 'artgrp_V8nQ2sL5dK3m',
    category: 'travel-guide',
    slug: 'thailand-digital-arrival-card-tdac-2026-guide-2026-04-17',
    publishedAt: '2026-04-17T07:12:00.000Z',
    titleEn:
      'Thailand Digital Arrival Card in 2026: When to Submit TDAC and What to Prepare',
    searchIntent:
      'Travellers need one accurate guide on who must submit TDAC, the 72-hour submission window, what details are required, when transit is exempt, and what can still be updated before travel.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Suvarnabhumi%20Airport%2C%20Arrival%20Hall.JPG',
      altEn: 'arrival hall at Suvarnabhumi Airport in Bangkok',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The TDAC official user guide says the Thailand Digital Arrival Card replaces the traditional paper-based arrival card.',
      'The official guide says all non-Thai nationals entering Thailand by land, air, or sea are required to complete TDAC online prior to entry.',
      'The official guide says travellers can access the system at https://tdac.immigration.go.th.',
      'The official FAQ says the card should be submitted within 3 days before arriving in Thailand, including the date of arrival, and that the form can be submitted up to 72 hours before entry.',
      'The official guide says the required information includes passport details, personal information, travel information, accommodation information in Thailand, health declaration information, and an email address.',
      'The official FAQ says TDAC is not required for technical landings or transit flights that do not pass through immigration.',
      'The official FAQ says TDAC is valid for one entry only and travellers must submit a new TDAC every time they enter Thailand.',
      'The official FAQ says infants and children also need a TDAC.',
      'The official guide and FAQ say group submission supports up to 10 travellers per submission.',
      'The official guide says travellers can update submitted information anytime before travel.',
      'The official FAQ says if a core identity field is wrong, the safest fix is to submit a new form because the latest valid submission will be used.',
      'The official guide says TDAC is not a visa.',
      'The official FAQ says kiosks and Wi-Fi support are available on arrival and lists five airports with kiosk installation points: Suvarnabhumi, Don Mueang, Phuket, Chiang Mai, and Hat Yai.',
      'An official immigration office notice warns travellers to use the official TDAC website and says the TDAC service itself has no fee.',
    ],
    sources: [
      {
        label: 'Thailand Digital Arrival Card - User Guide',
        url: 'https://tdac.immigration.go.th/manual/en/',
      },
      {
        label: 'Thailand Digital Arrival Card - FAQ',
        url: 'https://tdac.immigration.go.th/manual/en/faq.html',
      },
      {
        label: 'Thailand Digital Arrival Card - Official Site',
        url: 'https://tdac.immigration.go.th',
      },
      {
        label: 'Tak Immigration - official TDAC notice',
        url: 'https://tak.immigration.go.th/tdac-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%B5%E0%B9%88/',
      },
    ],
  },
  {
    key: 'tokyo-first-time-2026',
    translationGroupId: 'artgrp_W4rM8tC2pN7x',
    category: 'destination-guide',
    slug: 'tokyo-first-time-travel-guide-2026-04-20',
    publishedAt: '2026-04-20T08:06:00.000Z',
    titleEn:
      'Tokyo First-Time Travel Guide 2026: Areas, Airport Access, and Transit-First Planning',
    searchIntent:
      'First-time Tokyo visitors want a calm practical guide that explains which areas fit different trip styles, how airport access shapes where to stay, and what etiquette matters on trains and in public places.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo%20Skyline%202026.png',
      altEn: 'Tokyo skyline seen from Azabudai Hills in early 2026',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'GO TOKYO says Tokyo has a peerless public transportation network and increasing multilingual signage, making movement around the city relatively stress-free.',
      'GO TOKYO says central Tokyo is relatively small and renting a car is unlikely to be necessary if you are staying central throughout your trip.',
      'GO TOKYO says Haneda and Narita both connect well to the city, and Haneda is the more centrally located airport.',
      'GO TOKYO says the Tokyo Metro and Toei subway networks are comprehensive and buses can be a useful alternative outside the immediate city center.',
      'GO TOKYO organizes Tokyo by broad travel areas such as central, eastern, western, southern, northern, and Tama, which supports area-based trip planning instead of one universal best neighborhood.',
      'The official Shinjuku guide says Shinjuku Station connects multiple JR, private railway, and subway lines and is a strong transit hub for first-time visitors.',
      'The official Shibuya guide says many lines converge at Shibuya Station, that it is easy to get lost, and that many Narita Express services stop there.',
      'The official Asakusa guide says Asakusa offers strong traditional atmosphere around Sensoji and direct train access from both Haneda and Narita.',
      'GO TOKYO etiquette guidance says visitors should carry trash if no bins are nearby, ask before photographing people, stay quiet on public transport, and queue properly.',
      'GO TOKYO offers a free 24/7 online tourist guide service for travel information, routes, transport access, and events.',
      'The article should guide readers toward choosing a stay based on movement pattern and atmosphere rather than hotel rankings.',
    ],
    sources: [
      {
        label: 'GO TOKYO - Transportation in Tokyo',
        url: 'https://www.gotokyo.org/en/plan/getting-around/',
      },
      {
        label: 'GO TOKYO - Getting to Tokyo',
        url: 'https://www.gotokyo.org/en/plan/getting-to-tokyo/index.html',
      },
      {
        label: 'GO TOKYO - Tips for Tokyo sightseeing',
        url: 'https://www.gotokyo.org/en/plan/tips-for-tokyo-sightseeing/index.html',
      },
      {
        label: 'GO TOKYO - A guide to Shinjuku',
        url: 'https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html',
      },
      {
        label: 'GO TOKYO - Explore Shibuya',
        url: 'https://www.gotokyo.org/en/story/walks-and-tours/shibuya/index.html',
      },
      {
        label: 'GO TOKYO - A guide to Asakusa',
        url: 'https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/',
      },
      {
        label: 'GO TOKYO - Online Tourist Guide: Tokyo Navigation AI',
        url: 'https://www.gotokyo.org/en/plan/online-tourist-guide/index.html',
      },
    ],
  },
  {
    key: 'cannes-2026',
    translationGroupId: 'artgrp_X9cT3vL6qB1k',
    category: 'festival',
    slug: 'cannes-film-festival-2026-travel-guide-2026-04-22',
    publishedAt: '2026-04-22T09:24:00.000Z',
    titleEn:
      'Cannes Film Festival 2026: Dates, Access Rules, and a Realistic Visitor Plan',
    searchIntent:
      'Film fans and travellers want to know the confirmed dates for Cannes 2026, what is actually open to the public, what requires accreditation or a badge, and how to plan a short trip without assuming full red-carpet access.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Holy%20Spider%20Red%20Carpet%20-%20The%2075th%20Cannes%20Film%20Festival%2004.png',
      altEn: 'red carpet scene at the Cannes Film Festival',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official Festival de Cannes selection page says the 79th edition runs from 12 to 23 May 2026.',
      'The official 2026 selection press release says the films of the Official Selection were unveiled on 9 April 2026.',
      'The official organise-your-time page says the Festival zone is restricted to festival-goers who must show their badge in order to enter from 12 to 23 May 2026.',
      'The official organise-your-time page says badge pickup is at Gare Maritime or automatic dispensers at La Pantiero and that the My Cannes space becomes important from the beginning of May for tickets, schedules, maps, and documentation.',
      'The official admission page says badge access and screening access depend on accreditation category.',
      'The official admission page says last-minute queues can allow badge holders into screenings if seats remain and that more than 18000 spectators accessed screenings this way in 2025.',
      'The official admission page says Cinéma de la Plage offers open-air screenings every evening from 9:30 pm and is open to all depending on available seats.',
      'The official accreditations page says 3 Days in Cannes is for film buffs aged 18 to 28 and has three sessions in 2026.',
      'The official admission page says the Festival Pass QR code is valid across the Palm Bus network from 12 to 23 May 2026 for festival-goers travelling to the Cineum.',
      'The official Park Chan-wook press release says Park Chan-wook will preside over the Feature Film Jury in 2026, a first for Korean cinema.',
      'The article should clearly separate public-access moments from badge-only access and should not imply guaranteed red carpet access.',
    ],
    sources: [
      {
        label: 'Festival de Cannes - Official Selection 2026 overview',
        url: 'https://www.festival-cannes.com/en/the-selection/',
      },
      {
        label: 'Festival de Cannes - The films of the Official Selection 2026',
        url: 'https://www.festival-cannes.com/en/press/press-releases/the-films-of-the-official-selection-2026/',
      },
      {
        label: 'Festival de Cannes - Organise your time',
        url: 'https://www.festival-cannes.com/en/take-part/your-festival-experience/organise-your-time/',
      },
      {
        label: 'Festival de Cannes - Admission to screenings',
        url: 'https://www.festival-cannes.com/en/take-part/your-festival-experience/admission-to-screenings/',
      },
      {
        label: 'Festival de Cannes - Accreditations',
        url: 'https://www.festival-cannes.com/en/take-part/accreditations/',
      },
      {
        label: 'Festival de Cannes - Park Chan-wook, President of the Jury of the 79th Festival de Cannes',
        url: 'https://www.festival-cannes.com/en/press/press-releases/park-chan-wook-president-of-the-jury-of-the-79th-festival-de-cannes/',
      },
    ],
  },
];

const englishArticleSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1),
});

const translationRecordSchema = z.object({
  language: z.string().trim().min(1),
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1),
});

const translationPayloadSchema = z.object({
  records: z.array(translationRecordSchema).min(1),
});

function readEnvValue(envText, key) {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

function readApiKey() {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }

  const envText = fs.readFileSync(ENV_PATH, 'utf8');
  const apiKey = readEnvValue(envText, 'OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error(`OPENAI_API_KEY was not found in ${ENV_PATH}`);
  }
  return apiKey;
}

function chunkArray(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

function buildSourcesSection(topic) {
  return `## Sources\n\n${topic.sources
    .map((source) => `- [${source.label}](${source.url})`)
    .join('\n')}`;
}

function buildEnglishPrompt(topic) {
  return [
    `Current date: ${CURRENT_DATE}`,
    'Write a source-backed editorial guide in English only.',
    'Use only the supplied facts and source pack. If a detail is not supported, omit it.',
    'Do not invent fees, queue outcomes, entry guarantees, route times, hotel picks, restaurant lists, or speculative forecasts.',
    'Tone: calm, specific, practical, search-friendly, and non-hyped.',
    'Length: 900 to 1400 words.',
    'Markdown only. No tables. No HTML.',
    `The H1 title must be exactly: ${topic.titleEn}`,
    `The first image markdown must be exactly: ![${topic.image.altEn}](${topic.image.url})`,
    `The next line after the image must be exactly: ${topic.image.captionEn}`,
    'Required structure:\n1. H1 title\n2. Two short intro paragraphs\n3. ## What to know first with 4 to 6 bullet points\n4. First image + caption\n5. 4 to 6 H2 sections with short paragraphs and bullet lists where helpful\n6. One realistic expectations / what to double-check section\n7. End with the exact sources section provided below',
    `Primary search intent: ${topic.searchIntent}`,
    `Facts you may rely on:\n- ${topic.facts.join('\n- ')}`,
    `Exact sources section to append verbatim at the end:\n${buildSourcesSection(topic)}`,
  ].join('\n\n');
}

function buildTranslationPrompt(topic, englishArticle, targetLanguages) {
  return [
    `Current date: ${CURRENT_DATE}`,
    'Translate the English editorial guide below into the requested target languages only.',
    'Preserve all facts. Do not add or remove claims.',
    'Preserve markdown structure, image URLs, and link URLs.',
    'Translate the title, headings, paragraphs, bullet points, image alt text, and caption line naturally for each target language.',
    'Keep source bullet labels exactly as they appear in the English article so the references stay stable across languages.',
    'Do not introduce local examples, extra rules, or extra travel advice that is not in the English article.',
    'Return JSON with this shape only: {"records":[{"language":"ko","title":"...","body":"..."}, ...]}.',
    `Target languages: ${targetLanguages.join(', ')}`,
    `English article:\n${englishArticle.body}`,
  ].join('\n\n');
}

function extractH1Title(body) {
  const firstLine = body.split('\n')[0]?.trim();
  if (firstLine && firstLine.startsWith('# ')) {
    return firstLine.slice(2).trim();
  }
  return null;
}

function normalizeArticle(article) {
  article.body = article.body.trim();
  if (!article.body.startsWith('# ')) {
    article.body = `# ${article.title}\n\n${article.body}`;
  }
  const h1Title = extractH1Title(article.body);
  if (h1Title) {
    article.title = h1Title;
  }
  return article;
}

function assertArticleShape(topic, article) {
  const imageMatch = article.body.match(/!\[([^\]]+)\]\(([^)]+)\)/);
  if (!imageMatch) {
    throw new Error(`Article for ${topic.key} does not contain an embedded image.`);
  }

  if (!imageMatch[1] || !imageMatch[1].trim()) {
    throw new Error(`Article for ${topic.key} has an empty image alt text.`);
  }

  if (imageMatch[2] !== topic.image.url) {
    throw new Error(`Article for ${topic.key} does not preserve the expected image URL.`);
  }

  topic.sources.forEach((source) => {
    if (!article.body.includes(source.url)) {
      throw new Error(`Article for ${topic.key} is missing source URL: ${source.url}`);
    }
  });
}

async function createEnglishArticle(client, topic, index) {
  const completion = await client.chat.completions.create({
    model: 'gpt-5.4',
    messages: [
      {
        role: 'system',
        content:
          'You write first-party editorial guides for a multilingual travel website. You must stay within the supplied facts, avoid hype, and produce clean markdown.',
      },
      {
        role: 'user',
        content: buildEnglishPrompt(topic),
      },
    ],
    max_completion_tokens: 7000,
    response_format: zodResponseFormat(
      englishArticleSchema,
      `traffic_guide_en_${index}`,
    ),
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error(`English generation returned empty content for ${topic.key}`);
  }

  const article = normalizeArticle(
    englishArticleSchema.parse(JSON.parse(content)),
  );
  assertArticleShape(topic, article);
  return article;
}

async function createTranslations(client, topic, englishArticle, index) {
  const collected = [];
  const batches = chunkArray(TARGET_LANGUAGES, TRANSLATION_BATCH_SIZE);

  for (const [batchIndex, targetLanguages] of batches.entries()) {
    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a multilingual editorial translator. Preserve facts, preserve markdown, preserve URLs, and translate naturally for each target language without adding new claims.',
        },
        {
          role: 'user',
          content: buildTranslationPrompt(
            topic,
            englishArticle,
            targetLanguages,
          ),
        },
      ],
      max_completion_tokens: 9000,
      response_format: zodResponseFormat(
        translationPayloadSchema,
        `traffic_guide_trans_${index}_${batchIndex}`,
      ),
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error(
        `Translation generation returned empty content for ${topic.key} batch ${batchIndex}`,
      );
    }

    const payload = translationPayloadSchema.parse(JSON.parse(content));
    const seen = new Set();

    payload.records.forEach((record) => {
      if (!targetLanguages.includes(record.language)) {
        throw new Error(
          `Unexpected translation language for ${topic.key}: ${record.language}`,
        );
      }
      if (seen.has(record.language)) {
        throw new Error(
          `Duplicate translation language for ${topic.key}: ${record.language}`,
        );
      }
      seen.add(record.language);
      normalizeArticle(record);
      assertArticleShape(topic, record);
      collected.push(record);
    });

    targetLanguages.forEach((language) => {
      if (!seen.has(language)) {
        throw new Error(`Missing translation for ${topic.key}: ${language}`);
      }
    });
  }

  return collected;
}

async function main() {
  ({ default: OpenAI } = require('openai'));
  ({ zodResponseFormat } = require('openai/helpers/zod'));
  const apiKey = readApiKey();
  const client = new OpenAI({ apiKey });
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  const topics = [];

  for (const [index, topic] of TOPICS.entries()) {
    console.log(`Generating English master for ${topic.key}...`);
    const englishArticle = await createEnglishArticle(client, topic, index);

    console.log(`Generating translations for ${topic.key}...`);
    const translations = await createTranslations(
      client,
      topic,
      englishArticle,
      index,
    );

    const records = [
      {
        language: 'en',
        slug: topic.slug,
        title: englishArticle.title,
        body: englishArticle.body,
      },
      ...translations.map((record) => ({
        language: record.language,
        slug: topic.slug,
        title: record.title,
        body: record.body,
      })),
    ].sort(
      (left, right) =>
        ALL_LANGUAGES.indexOf(left.language) -
        ALL_LANGUAGES.indexOf(right.language),
    );

    topics.push({
      key: topic.key,
      translationGroupId: topic.translationGroupId,
      category: topic.category,
      slug: topic.slug,
      publishedAt: topic.publishedAt,
      sources: topic.sources,
      facts: topic.facts,
      records,
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    batch: '2026-04-editorial-guides-traffic',
    topics,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${OUTPUT_PATH}`);
  console.log(
    JSON.stringify(
      {
        topicCount: payload.topics.length,
        recordCount: payload.topics.reduce(
          (sum, topic) => sum + topic.records.length,
          0,
        ),
        slugs: payload.topics.map((topic) => topic.slug),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
