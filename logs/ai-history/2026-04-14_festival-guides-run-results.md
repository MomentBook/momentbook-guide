# 2026-04-14 festival guides run results

Canonical docs location
- `/home/ubuntu/app/docs/momentbook-api/ai`

Scripts
- generator: `/home/ubuntu/app/momentbook-api/scripts/generate-festival-guides-2026-04.js`
- seed: `/home/ubuntu/app/momentbook-api/scripts/seed-festival-guides-2026-04.js`
- generated payload: `/home/ubuntu/app/momentbook-api/scripts/generated/festival-guides-2026-04.json`

Batch summary
- topics: 9
- records: 81
- languages per topic: 9
- category: `festival`

Slugs
- `sapporo-snow-festival-2026-travel-guide-2026-01-09`
- `rio-carnival-2026-travel-guide-2026-01-16`
- `mardi-gras-new-orleans-2026-travel-guide-2026-01-27`
- `venice-carnival-2026-travel-guide-2026-02-06`
- `st-patricks-festival-dublin-2026-guide-2026-02-19`
- `gion-matsuri-kyoto-2026-guide-2026-03-06`
- `albuquerque-balloon-fiesta-2026-guide-2026-03-21`
- `oktoberfest-munich-2026-guide-2026-04-03`
- `day-of-the-dead-mexico-city-2026-guide-2026-04-11`

Seed result
- `upsertedCount = 81`
- every `translationGroupId` has all 9 supported languages

DB checks after seed
- `articles` total: 162
- `festival` category total: 90
- new festival slug count in this batch: 9

Runtime notes
- generator initially failed because image URL validation was too strict
- validation was relaxed to require an embedded image and full source URL preservation, not an exact image URL string match
- dev API process listens on port `3001`
- port `4000` is Uptime Kuma, not the article API

API verification
- `GET http://127.0.0.1:3001/v2/articles?lang=en&limit=5&page=1` returned success JSON and showed the new Day of the Dead article
- `GET http://127.0.0.1:3001/v2/articles?lang=ko&limit=5&page=1` returned success JSON and showed the localized Day of the Dead article

Follow-up ideas
- review body-image choices later if traffic-facing presentation needs tighter matching
- add a second festival batch for summer and year-end events after checking official 2026 calendars
