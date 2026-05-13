# 2026-04-14 festival guides translation refresh

Goal
- review the April 2026 festival batch for partial English carryover and awkward localization
- refresh non-English records with stronger publication-quality translation rules

Why this pass was needed
- quick QA found untranslated English section headings in some non-English articles
- a few articles still had English image captions or alt text
- some language variants used awkward loanwords or less natural phrasing

Observed QA examples before refresh
- `st-patricks-festival-dublin-2026-guide-2026-02-19`
  - `zh` retained multiple English section headings
  - `ko` and `fr` retained English image caption text
- `oktoberfest-munich-2026-guide-2026-04-03`
  - `vi` retained multiple English section headings
  - `es` retained English image caption text
- `albuquerque-balloon-fiesta-2026-guide-2026-03-21`
  - `es` retained an English section heading
- `mardi-gras-new-orleans-2026-travel-guide-2026-01-27`
  - manual spot-check showed some less natural term choices in Korean and mixed English naming in several languages

Refresh strategy
- keep the English master records unchanged
- retranslate every non-English festival article from the English master, not only a narrow subset
- translate all reader-facing text, including:
  - title
  - headings
  - paragraphs and bullets
  - image alt text
  - image caption
  - sources heading and source labels
- preserve all URLs and factual claims exactly

Canonical execution target
- script path: `/home/ubuntu/app/momentbook-api/scripts/refresh-festival-guide-translations-2026-04.js`

Expected outcome
- 9 topics x 8 non-English languages = 72 refreshed translation records
- payload and dev DB should stay aligned after the refresh

Execution note
- the full retranslation pass hit an OpenAI quota error before payload or DB writes were committed
- because the refresh script writes only at the end, that failed pass did not alter the generated payload or dev DB
- the fallback for this batch is a selective repair pass focused on records with confirmed English carryover or clearly awkward localization

Selective repair scope
- `st-patricks-festival-dublin-2026-guide-2026-02-19`
  - replace full bodies for `ko`, `zh`, `fr`, `vi`
- `oktoberfest-munich-2026-guide-2026-04-03`
  - replace full body for `vi`
  - replace remaining English image caption in `es`
- `albuquerque-balloon-fiesta-2026-guide-2026-03-21`
  - replace remaining English section heading in `es`
- `mardi-gras-new-orleans-2026-travel-guide-2026-01-27`
  - normalize awkward Korean wording around `Fat Tuesday`

Selective repair execution target
- script path: `/home/ubuntu/app/momentbook-api/scripts/repair-festival-guide-translation-issues-2026-04.js`

Expanded normalization pass
- after the first manual repair, an additional heading-level QA pass found leftover English structural labels in several records
- normalized recurring carryover patterns such as:
  - `## Sources` in non-French records
  - `### Option 1` and `### Option 2` labels
  - `**Day 1**` style itinerary lines
  - English subheadings like `Best-fit 4-day plan`, `If your priority is...`, and `Why Park and Ride should be central to your plan`
- corrected one visibly corrupted Korean line in the Albuquerque article where a non-Korean token had been inserted into the itinerary heading

Verification after repair
- regex scan over the generated payload no longer finds English `Day`, `Option`, `Best-fit`, `Shorter`, `If your priority`, `Why Park and Ride`, `A practical transport approach`, or `Common planning mistake to avoid` headings in non-English records
- the only remaining `## Sources` hits are French records, where `Sources` is the intended localized heading
- direct MongoDB spot-checks confirmed updated titles and heading lines for:
  - `st-patricks-festival-dublin-2026-guide-2026-02-19::pt`
  - `albuquerque-balloon-fiesta-2026-guide-2026-03-21::ja`
  - `albuquerque-balloon-fiesta-2026-guide-2026-03-21::th`
  - `rio-carnival-2026-travel-guide-2026-01-16::ko`
  - `gion-matsuri-kyoto-2026-guide-2026-03-06::vi`
- dev API article lists on port `3001` still expose the repaired festival slugs for sampled languages `ja`, `pt`, `th`, `ko`, and `vi`
