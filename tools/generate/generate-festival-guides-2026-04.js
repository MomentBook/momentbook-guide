const fs = require('fs');
const path = require('path');
const { assertArticleAiDisabled } = require('./article-ai-guard');

assertArticleAiDisabled(__filename);

const { z } = require('zod');

let OpenAI;
let zodResponseFormat;

const CURRENT_DATE = '2026-04-14';
const OUTPUT_PATH = path.resolve(
  __dirname,
  'generated',
  'festival-guides-2026-04.json',
);
const ENV_PATH = path.resolve(__dirname, '..', '.env.development');
const ALL_LANGUAGES = ['en', 'ko', 'ja', 'zh', 'es', 'pt', 'fr', 'th', 'vi'];
const TARGET_LANGUAGES = ALL_LANGUAGES.filter((language) => language !== 'en');
const TRANSLATION_BATCH_SIZE = 1;

const TOPICS = [
  {
    key: 'sapporo-snow-festival-2026',
    translationGroupId: 'artgrp_F9cS2kL4qR7m',
    category: 'festival',
    slug: 'sapporo-snow-festival-2026-travel-guide-2026-01-09',
    publishedAt: '2026-01-09T07:18:00.000Z',
    titleEn:
      'Sapporo Snow Festival 2026: Dates, Three Sites, Hotels, and What to Wear',
    searchIntent:
      'People want one practical guide that explains the confirmed 2026 dates, how the three main sites differ, and how to plan a winter trip without underestimating the cold.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sapporo_Snow_festival.JPG',
      altEn: 'snow structures at the Sapporo Snow Festival in winter',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official Sapporo event page lists the 2026 Sapporo Snow Festival dates as February 4 to 11, 2026.',
      'The official event page says the festival takes place at Odori Park, Community Dome Tsudome, and the main street in Susukino.',
      'The official event page says the Odori Park area spans roughly 1.5 kilometers from 1 to 12 chome.',
      'The official event page says sculptures at the Odori site are lit from sundown until 10:00 p.m.',
      'Visit Sapporo says the festival now draws some 2 million visitors from around the world.',
      'Visit Sapporo says the Odori site is known for huge snow sculptures, the Tsudome site for active family attractions, and Susukino for illuminated ice sculptures.',
      'Visit Sapporo says the event is held exclusively in early February.',
      'Do not invent hotel prices, snow conditions, queue times, or flight advice not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Welcome to Sapporo - Sapporo Snow Festival official event page',
        url: 'https://www.sapporo.travel/en/event/event-list/sapporo_snow_festival/',
      },
      {
        label: 'Visit Sapporo - Sapporo Snow Festival',
        url: 'https://visit.sapporo.travel/discover/snow/sapporo-snow-festival/',
      },
      {
        label: 'Sapporo Snow Festival official website',
        url: 'http://www.snowfes.com/',
      },
    ],
    instructions: [
      'Make the article useful for first-time winter visitors, not only festival fans.',
      'Explain how to split time across the three sites and why an evening revisit can be worthwhile because of illumination hours.',
    ],
  },
  {
    key: 'rio-carnival-2026',
    translationGroupId: 'artgrp_H3mQ8vT1kL6p',
    category: 'festival',
    slug: 'rio-carnival-2026-travel-guide-2026-01-16',
    publishedAt: '2026-01-16T09:44:00.000Z',
    titleEn:
      'Rio Carnival 2026: Street Blocos, Sambadrome Nights, and First-Timer Planning',
    searchIntent:
      'Travellers want one guide that explains the confirmed 2026 Carnival window, how street blocos and Sambadrome parade nights fit together, and how to plan transport and energy for a first trip.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Carnival_in_Sambadrome_(2014).jpg',
      altEn: 'samba school parade at the Sambadrome in Rio de Janeiro',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'Rio City Hall said Carnival 2026 is expected to move around R$ 5.9 billion in the city economy and involve approximately 8 million revelers.',
      'Rio City Hall said the period analyzed for Carnival 2026 runs from pre-Carnival beginning on January 17 until the official closing on February 22, the Sunday after the Champions Parade.',
      'Rio City Hall said seven days of parades are planned at the Sambadrome, involving the Gold Series, the Special Group, and the children\'s samba schools.',
      'Rio City Hall said the Special Group parades are scheduled for February 15, 16, and 17, 2026, with the Champions Parade on February 21.',
      'Rio City Hall traffic operations note says 106 accredited street blocos were scheduled for the weekend of February 7 and 8, in addition to mega-blocos on the Preta Gil Circuit downtown.',
      'City Hall coverage says Monobloco closed Rio\'s street carnival on February 22, 2026.',
      'RioCarnaval says the Serie Ouro parades happen on February 13 and 14, 2026 at the Sambadrome.',
      'Do not invent ticket prices, unofficial bloco schedules, security claims, or neighborhood rankings not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Rio City Hall - Carnival 2026 is expected to generate R$ 5.9 billion for the Rio de Janeiro economy',
        url: 'https://en.prefeitura.rio/desenvolvimento-economico/carnaval-2026-deve-movimentar-r-59-bilhoes-na-economia-carioca/',
      },
      {
        label: 'Rio City Hall - Carnival 2026 will feature a mega integrated operation by the City Hall',
        url: 'https://en.prefeitura.rio/assistencia-social-direitos-humanos/carnaval-2026-megaoperacao-preve-8-milhoes-de-pessoas/',
      },
      {
        label: 'Rio City Hall - CET-Rio conducts traffic operations for more than 100 street parties in the city',
        url: 'https://en.prefeitura.rio/cet-rio/cet-rio-realiza-operacoes-de-transito-para-mais-de-100-blocos-de-rua-no-rio/',
      },
      {
        label: 'Rio City Hall - Monobloco closes Rio street carnival on February 22, 2026',
        url: 'https://en.prefeitura.rio/noticias/com-homenagens-a-arlindo-cruz-preta-gil-e-jorge-aragao-monobloco-encerra-o-carnaval-de-rua-do-rio-com-energia-contagiante/',
      },
      {
        label: 'RioCarnaval - Serie Ouro 2026 at the Sambadrome',
        url: 'https://www.riocarnaval.org/samba-parade/access-group',
      },
    ],
    instructions: [
      'Treat this as a planning guide for combining street carnival and parade nights, not as a ticket-selling article.',
      'Make it clear that Rio Carnival is a season, not just one night, and help the reader choose how many days to stay.',
    ],
  },
  {
    key: 'mardi-gras-new-orleans-2026',
    translationGroupId: 'artgrp_J6pN4xC2rV8s',
    category: 'festival',
    slug: 'mardi-gras-new-orleans-2026-travel-guide-2026-01-27',
    publishedAt: '2026-01-27T05:57:00.000Z',
    titleEn:
      'Mardi Gras 2026 in New Orleans: Fat Tuesday Dates, Best Areas, and First-Timer Strategy',
    searchIntent:
      'People need one practical guide that explains when Mardi Gras 2026 actually happens, how the season builds over time, and where first-time visitors should base themselves depending on their travel style.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Zulu_Parade_-_New_Orleans_Mardi_Gras_2025.jpg',
      altEn: 'Mardi Gras parade float during the Zulu parade in New Orleans',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'Mardi Gras New Orleans says Carnival season starts on January 6 and builds through midnight on Fat Tuesday.',
      'Mardi Gras New Orleans says Fat Tuesday in 2026 falls on February 17.',
      'The New Orleans Official Guide says Mardi Gras is more than a day or a weekend and that parades begin in the weeks leading up to Mardi Gras Day.',
      'The New Orleans Official Guide says Mardi Gras 2026 coincides with Presidents\' Day weekend.',
      'The New Orleans Official Guide says public transportation is often the best way to move around during Carnival because streets close for parades.',
      'The New Orleans Official Guide says families should generally stay away from the French Quarter or Canal Street for family-style parade viewing and consider the Uptown parade route instead.',
      'The New Orleans Official Guide says many balls are invitation-only while parades are public-facing parts of Carnival culture.',
      'Do not invent unofficial route changes, exact street closures, police rules, or hotel picks not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Mardi Gras New Orleans - Future Mardi Gras dates',
        url: 'https://www.mardigrasneworleans.com/when-is-mardi-gras/future-mardi-gras-dates',
      },
      {
        label: 'New Orleans Official Guide - Mardi Gras 2026 Parade Schedule',
        url: 'https://www.neworleans.com/events/holidays-seasonal/mardi-gras/mardi-gras-parade-schedule/',
      },
      {
        label: 'New Orleans Official Guide - How to Get Around During Mardi Gras',
        url: 'https://www.neworleans.com/events/holidays-seasonal/mardi-gras/mardi-gras-transportation/',
      },
      {
        label: 'New Orleans Official Guide - Mardi Gras for Families',
        url: 'https://www.neworleans.com/events/holidays-seasonal/mardi-gras/mardi-gras-for-families/',
      },
      {
        label: 'New Orleans Official Guide - Mardi Gras History and Traditions',
        url: 'https://www.neworleans.com/events/holidays-seasonal/mardi-gras/history-and-traditions/',
      },
    ],
    instructions: [
      'Help the reader decide between a family-friendly parade trip, a culture-focused trip, and a late-night party trip without using stereotypes.',
      'Keep the guide grounded in logistics, timing, and tradition rather than sensational nightlife language.',
    ],
  },
  {
    key: 'venice-carnival-2026',
    translationGroupId: 'artgrp_K2rF7mQ5vL9x',
    category: 'festival',
    slug: 'venice-carnival-2026-travel-guide-2026-02-06',
    publishedAt: '2026-02-06T10:12:00.000Z',
    titleEn:
      'Venice Carnival 2026: Dates, Water Parades, Masks, and Where to Stay',
    searchIntent:
      'Travellers want a clear guide to the confirmed 2026 Venice Carnival dates, the opening weekend highlights, and how to plan transport and lodging in a city where movement takes time.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Venice_-_Carnival_masks_-_4024.jpg',
      altEn: 'traditional carnival masks in Venice',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official Venice Carnival 2026 announcement says the festival runs from January 31 to February 17, 2026.',
      'The official announcement says the 2026 theme is "Olympus - the origins of the game."',
      'The official announcement says the programme begins on January 31 in St Mark\'s Square with the Grand Carnival Ball and Bridgerton.',
      'The official announcement says the Festa Veneziana water parade along the Grand Canal takes place on February 1 and officially opens the historical and traditional programme.',
      'The official announcement says the stage in St Mark\'s Square is the beating heart of the event, alongside widespread performances across Venice and Mestre.',
      'The official announcement says Venezia Unica is the official platform for city passes, museums, and transport.',
      'The official announcement says the Carnival is designed as an accessible, widespread, and sustainable event across the city.',
      'Do not invent mask-ball ticket access rules, hotel recommendations, or exact queue times not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Carnevale di Venezia 2026 - Official announcement',
        url: 'https://carnevale.venezia.it/en/news/2026/carnevale-di-venezia-2026-dal-mito-allo-sport-venezia-celebra-milano-cortina/',
      },
      {
        label: 'Carnevale di Venezia 2026 - Official site',
        url: 'https://carnevale.venezia.it/en/',
      },
      {
        label: 'Venezia Unica - official city pass and transport platform',
        url: 'https://www.veneziaunica.it/en',
      },
    ],
    instructions: [
      'Explain why staying overnight in Venice proper changes the experience compared with day-tripping, but do not recommend named hotels.',
      'Use the opening weekend events to anchor a realistic short itinerary.',
    ],
  },
  {
    key: 'st-patricks-dublin-2026',
    translationGroupId: 'artgrp_L8tC3pH6qN4v',
    category: 'festival',
    slug: 'st-patricks-festival-dublin-2026-guide-2026-02-19',
    publishedAt: '2026-02-19T06:31:00.000Z',
    titleEn:
      "St. Patrick's Festival Dublin 2026: Parade Route, Best Viewing Areas, and Four-Day Plan",
    searchIntent:
      'People want a practical Dublin guide that covers the confirmed 2026 festival dates, parade route, ticketed versus free viewing, and how to build a full four-day city break around the festival.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/ST._PATRICK%27S_DAY_PARADE_2007_-_DUBLIN.jpg',
      altEn: 'St. Patricks Day parade in Dublin',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official St. Patrick\'s Festival site says the 2026 festival runs from March 14 to 17, 2026.',
      'The official parade page says the National St. Patrick\'s Day Parade begins at 12pm on March 17 in Dublin city centre.',
      'The official parade page says the route runs from Parnell Square down O\'Connell Street, over O\'Connell Bridge, and ends at the Cuffe Street and Kevin Street junction.',
      'The official parade page says there will be 12 large-scale floats and more than 3,000 participants in 2026.',
      'The official parade page says no ticket is required to attend along the route, while a limited number of grandstand seats are sold separately.',
      'The official programme page says the festival includes four days of events, not only the parade itself.',
      'The official programme page lists family-oriented and citywide events across March 14 to 17.',
      'Do not invent pub crawls, weather expectations, or guaranteed low-crowd vantage points not supported by the source pack.',
    ],
    sources: [
      {
        label: 'St. Patrick\'s Festival Dublin - St. Patrick\'s Day Parade',
        url: 'https://stpatricksfestival.ie/st-patricks-day-parade/',
      },
      {
        label: 'St. Patrick\'s Festival Dublin - home page',
        url: 'https://stpatricksfestival.ie/',
      },
    ],
    instructions: [
      'Show the difference between free curbside viewing and paid grandstand viewing without pushing either option too hard.',
      'Make the guide useful for someone who wants more than parade day and is deciding whether four days in Dublin is worth it.',
    ],
  },
  {
    key: 'gion-matsuri-kyoto-2026',
    translationGroupId: 'artgrp_M5vR1kT8qC3n',
    category: 'festival',
    slug: 'gion-matsuri-kyoto-2026-guide-2026-03-06',
    publishedAt: '2026-03-06T08:06:00.000Z',
    titleEn:
      'Gion Matsuri Kyoto 2026: What to Know About Julys Biggest Festival',
    searchIntent:
      'Travellers need a practical guide to Kyoto\'s month-long Gion Matsuri that explains which dates are annual fixtures, when the biggest processions happen, and how to plan without assuming an unpublished 2026 programme.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gion-Matsuri-parade-001.jpg',
      altEn: 'Gion Matsuri parade procession in Kyoto',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'Kyoto Travel says Gion Matsuri is held annually from July 1 to 31 as the midsummer celebration of Yasaka Jinja Shrine.',
      'Kyoto Travel says the major highlights take place on July 17 and July 24, when the float processions move through the main streets of Kyoto.',
      'Kyoto Travel says the early-festival Yoiyama nights run on July 14 to 16.',
      'Kyoto Travel says the latter-festival Yoiyama period runs on July 21 to 23.',
      'Kyoto Travel says the July 17 procession starts from 9 a.m. and the July 24 procession starts from 9:30 a.m.',
      'Kyoto Travel says digital maps are distributed for Saki Matsuri and Ato Matsuri.',
      'Kyoto Travel and the Kyoto tourist information FAQ both position the month-long festival as one of Kyoto\'s biggest annual events.',
      'Do not present unpublished 2026 route changes, ticketed seat products, or hotel supply claims as confirmed facts.',
    ],
    sources: [
      {
        label: 'Kyoto Travel - Gion Matsuri Festival',
        url: 'https://kyoto.travel/en/travel-inspiration/gion-matsuri-festival/',
      },
      {
        label: 'Kyoto Online Tourist Information Center - Where should I go to see the Gion Matsuri Festival?',
        url: 'https://global.kyoto.travel/en/faq/detail.php?faq_id=10119',
      },
    ],
    instructions: [
      'Be explicit that the article relies on the official annual pattern where the full 2026 program is not yet separately published.',
      'Help readers understand the difference between the month-long frame, the Yoiyama nights, and the two big procession dates.',
    ],
  },
  {
    key: 'albuquerque-balloon-fiesta-2026',
    translationGroupId: 'artgrp_N1qL6vM4tK8p',
    category: 'festival',
    slug: 'albuquerque-balloon-fiesta-2026-guide-2026-03-21',
    publishedAt: '2026-03-21T07:42:00.000Z',
    titleEn:
      'Albuquerque Balloon Fiesta 2026: Dates, Best Sessions, Park-and-Ride, and Stay Strategy',
    searchIntent:
      'People want a practical guide to the confirmed 2026 Balloon Fiesta dates, which sessions are most worth the effort, and how to avoid traffic and parking mistakes.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Albuquerque_Balloon_Fiesta.jpg',
      altEn: 'hot air balloons at the Albuquerque International Balloon Fiesta',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official Balloon Fiesta schedule page lists Day 1 as Saturday, October 3, 2026 and Day 9 as Sunday, October 11, 2026.',
      'The official schedule page says the full 2026 schedule PDF is still coming soon, even though the daily framework is already posted.',
      'The official site highlights recurring event anchors such as Dawn Patrol, Mass Ascension, Balloon Glows, and Special Shape Rodeo in the experience menu.',
      'The official maps and directions page says transportation services to the park include Park and Ride shuttle schedules.',
      'The official Park and Ride page says the service is intended to help visitors avoid congested traffic and parking conditions around Balloon Fiesta Park.',
      'The official site frames October as the key season for the event in Albuquerque.',
      'The guide should treat early-morning sessions as the signature experience while warning that the final PDF schedule is still pending.',
      'Do not invent exact launch decisions, weather windows, or hotel availability claims not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Albuquerque International Balloon Fiesta - Event Schedule',
        url: 'https://www.balloonfiesta.com/plan-your-visit/event-schedule/',
      },
      {
        label: 'Albuquerque International Balloon Fiesta - Maps and Directions',
        url: 'https://www.balloonfiesta.com/maps-directions/',
      },
      {
        label: 'Albuquerque International Balloon Fiesta - Park and Ride',
        url: 'https://www.balloonfiesta.com/plan-your-visit/get-involved/park-ride/',
      },
    ],
    instructions: [
      'Explain why sunrise sessions are usually the headline experience without pretending the final 2026 PDF is already out.',
      'Make traffic avoidance one of the central planning sections because this is a major practical search intent.',
    ],
  },
  {
    key: 'oktoberfest-munich-2026',
    translationGroupId: 'artgrp_P4mK9rC1vT6q',
    category: 'festival',
    slug: 'oktoberfest-munich-2026-guide-2026-04-03',
    publishedAt: '2026-04-03T09:03:00.000Z',
    titleEn:
      'Oktoberfest Munich 2026: Dates, Tent Strategy, Reservations, and Opening Weekend',
    searchIntent:
      'Travellers need one practical guide that explains the confirmed 2026 Oktoberfest dates, what the opening weekend looks like, and how reservations and overcrowding actually affect first-time visitors.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Munich_-_Oktoberfest.jpg',
      altEn: 'inside a beer tent during Oktoberfest in Munich',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'The official Oktoberfest site says the 2026 festival runs from September 19 to October 4 on the Theresienwiese.',
      'The official opening page says the mayor opens the festival at 12 o\'clock sharp on September 19, 2026 at the Schottenhamel tent.',
      'The official event page says the landlords and breweries parade begins at 10:35 a.m. on September 19, 2026.',
      'The official beer tent opening times page says the tents open at 9 a.m. on the first Saturday, with non-alcoholic drinks from 10 a.m. and beer after the tapping at noon.',
      'The official reservations page says some tables remain unreserved for spontaneous visitors, but evenings and large groups often face closures due to overcrowding.',
      'The official beer tent opening times page says evenings and weekends get especially crowded.',
      'The official visitor information page says there is no general admission fee for the main Oktoberfest grounds.',
      'Do not invent beer prices, bag rules, or named tent recommendations not supported by the source pack.',
    ],
    sources: [
      {
        label: 'Oktoberfest.de - official site',
        url: 'https://www.oktoberfest.de/en/',
      },
      {
        label: 'Oktoberfest.de - Opening and tapping of the Oktoberfest 2026',
        url: 'https://www.oktoberfest.de/en/information/events/oktoberfest-tapping-and-opening-ceremony',
      },
      {
        label: 'Oktoberfest.de - Parade of the Oktoberfest landlords and breweries',
        url: 'https://www.oktoberfest.de/en/information/events/parade-of-the-tent-patrons',
      },
      {
        label: 'Oktoberfest.de - Beer tent opening times',
        url: 'https://www.oktoberfest.de/en/beer-tents/beer-tent-opening-times',
      },
      {
        label: 'Oktoberfest.de - Booking at the Oktoberfest: Book a table in 2026',
        url: 'https://www.oktoberfest.de/en/tents/reservations-oktoberfest/booking-oktoberfest-book-table-oktoberfest',
      },
      {
        label: 'Oktoberfest.de - Do you need tickets to visit the Oktoberfest or is there free entry?',
        url: 'https://www.oktoberfest.de/en/information/service-for-visitors/does-it-cost-money-to-go-into-oktoberfest',
      },
    ],
    instructions: [
      'Make this useful for a normal first-time traveler, not a deep tent-by-tent enthusiast guide.',
      'Explain clearly what reservations solve and what they do not solve.',
    ],
  },
  {
    key: 'day-of-the-dead-mexico-city-2026',
    translationGroupId: 'artgrp_Q7vN2mL5kR1p',
    category: 'festival',
    slug: 'day-of-the-dead-mexico-city-2026-guide-2026-04-11',
    publishedAt: '2026-04-11T04:28:00.000Z',
    titleEn:
      'Day of the Dead in Mexico City 2026: Ofrendas, Timing, and Respectful Trip Planning',
    searchIntent:
      'Travellers want a respectful guide that explains when Day of the Dead happens, what ofrendas mean, and how to plan a Mexico City trip without reducing the tradition to costume tourism.',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Day_of_the_Dead_traditional_altar.jpg',
      altEn: 'traditional Day of the Dead altar in Mexico City',
      captionEn: '*Image source: Wikimedia Commons*',
    },
    facts: [
      'UNESCO says the Indigenous Festivity dedicated to the Dead takes place each year at the end of October to the beginning of November.',
      'Mexico City\'s official tourism page says the placement of an ofrenda is one of the most important ceremonies of the Day of the Dead rite.',
      'Mexico City\'s official tourism page says preparations begin several days in advance and that family and friends gather while the ofrenda is assembled.',
      'The Mexico City page lists core altar elements such as water, bread, salt, candles, cempasuchil flowers, toys, and incense, each with symbolic meaning.',
      'UNESCO explains that the tradition centers on the return of deceased relatives and loved ones and remains highly significant in Mexican community life.',
      'The guide should center on cultural meaning, city planning, and respectful observation rather than claiming an unpublished 2026 event calendar.',
      'Do not invent parade dates, road closures, or a finalized 2026 city program if the official sources do not yet publish them.',
    ],
    sources: [
      {
        label: 'UNESCO Intangible Cultural Heritage - Indigenous festivity dedicated to the dead',
        url: 'https://ich.unesco.org/en/RL/indigenous-festivity-dedicated-to-the-dead-00054',
      },
      {
        label: 'Mexico City official tourism guide - Day of the Dead Ofrendas',
        url: 'https://mexicocity.cdmx.gob.mx/day-of-the-dead-ofrendas/?lang=en',
      },
      {
        label: 'Gobierno de Mexico - Dia de Muertos, la fiesta mas emotiva de Mexico',
        url: 'https://www.gob.mx/agricultura/articulos/dia-de-muertos-la-fiesta-mas-emotiva-de-mexico',
      },
    ],
    instructions: [
      'Make the tone respectful and explanatory rather than spooky or costume-driven.',
      'Use Mexico City planning language because that is the practical travel angle, but keep the cultural frame broader than a single parade.',
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
    'Write a source-backed festival travel guide in English only.',
    'Use only the source pack facts. If something is not supported, omit it.',
    'Do not invent unpublished schedules, ticket prices, hotel names, bag rules, safety rules, route maps, queue times, or statistics.',
    'Tone: practical, specific, search-friendly, and useful for planning a real trip.',
    'Length: 1100 to 1700 words.',
    'Markdown only. No tables. No HTML.',
    `The H1 title must be exactly: ${topic.titleEn}`,
    `The first image markdown must be exactly: ![${topic.image.altEn}](${topic.image.url})`,
    `The next line after the image must be exactly: ${topic.image.captionEn}`,
    `Primary search intent: ${topic.searchIntent}`,
    `Topic-specific instructions:\n- ${topic.instructions.join('\n- ')}`,
    `Facts you may rely on:\n- ${topic.facts.join('\n- ')}`,
    [
      'Required structure:',
      '1. H1 title',
      '2. Two short intro paragraphs',
      '3. ## What to know first with 4 to 6 bullet points',
      '4. First image plus caption',
      '5. ## Dates and what is confirmed',
      '6. ## Why people go and the signature experience',
      '7. ## Best areas or site strategy',
      '8. ## A realistic 3-day or 4-day trip plan',
      '9. ## What to book first',
      '10. ## Transport and crowd strategy',
      '11. ## Etiquette and practical cautions',
      '12. ## What to double-check before you go',
      '13. End with the exact sources section provided below',
    ].join('\n'),
    `Exact sources section to append verbatim at the end:\n${buildSourcesSection(topic)}`,
  ].join('\n\n');
}

function buildTranslationPrompt(topic, englishArticle, targetLanguages) {
  return [
    `Current date: ${CURRENT_DATE}`,
    'Translate the English festival guide below into the requested target languages only.',
    'Preserve every factual claim and preserve uncertainty where the English version says something is not yet confirmed.',
    'Preserve markdown structure, image URLs, and link URLs.',
    'Translate the title, headings, paragraphs, bullet points, image alt text, and caption line naturally for each target language.',
    'Keep source bullet labels exactly as they appear in the English article so the references stay stable across languages.',
    'Do not add local examples, ticket advice, or safety claims that do not exist in the English article.',
    'Return JSON only with this shape: {"records":[{"language":"ko","title":"...","body":"..."}, ...]}.',
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

  if (!imageMatch[2] || !imageMatch[2].trim()) {
    throw new Error(`Article for ${topic.key} has an empty image URL.`);
  }

  topic.sources.forEach((source) => {
    if (!article.body.includes(source.url)) {
      throw new Error(
        `Article for ${topic.key} is missing source URL: ${source.url}`,
      );
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
          'You write first-party multilingual festival travel guides. Stay tightly inside the supplied facts, keep the copy useful and calm, and produce clean markdown.',
      },
      {
        role: 'user',
        content: buildEnglishPrompt(topic),
      },
    ],
    max_completion_tokens: 9000,
    response_format: zodResponseFormat(
      englishArticleSchema,
      `festival_guide_en_${index}`,
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
            'You are a multilingual editorial translator. Preserve facts, preserve markdown, preserve URLs, and translate naturally without adding new claims.',
        },
        {
          role: 'user',
          content: buildTranslationPrompt(topic, englishArticle, targetLanguages),
        },
      ],
      max_completion_tokens: 9000,
      response_format: zodResponseFormat(
        translationPayloadSchema,
        `festival_guide_trans_${index}_${batchIndex}`,
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
    batch: '2026-04-festival-guides',
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
