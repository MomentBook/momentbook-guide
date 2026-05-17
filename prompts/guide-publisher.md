# Guide Publisher Contract

Use this contract to publish one Momentbook guide from official-source research
through DB verification and registry update.

## Goal

Publish exactly one registry-safe travel guide with complete records for:

```text
ko, en, ja, zh, es, pt, fr, th, vi
```

The run is complete only when the DB state is verified and
`registry/editorial-guide-registry.md` reflects the real state.

## Required Context

Read these before work starts:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `automation/tasks/guide-publisher/workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

Do not look for old generated examples. This repository intentionally excludes
old bodies, run logs, dated batch plans, import payloads, and legacy writer
scripts from active context.

## Topic Rules

- Choose one topic not already covered or queued in the registry.
- Prefer a country, city, scope, or information angle not already represented.
- Avoid generic city introductions. Choose a practical traveler decision:
  airport transfer, ticket or pass choice, timed entry, transport route,
  permit, seasonal closure risk, official rule, or similar.
- Use a topic only when official sources can verify the hard facts.
- If same-country reuse is unavoidable, record the reuse reason in the registry.

## Source Rules

Use official sources for hard facts:

- government, immigration, tourism board, airport, railway, public transport,
  national park, museum, cultural institution, event organizer
- UNESCO or public reference sources when appropriate
- secondary sources only as support, never as the only basis for hard facts

Create a source pack with:

- URL, publisher, page or document title
- checked date from the actual `Asia/Seoul` run date
- source purpose
- volatility: `low`, `medium`, or `high`
- recheck item for prices, hours, routes, rules, booking terms, closures, or
  other facts likely to change

Do not copy source prose. Convert verified facts into traveler decision language.

## Date Rules

- At run start, record the local runtime clock and `Asia/Seoul`
  `runtimeWrittenDate`.
- Use `runtimeWrittenDate` for visible written/updated dates,
  `sourceCheckedDate`, and slug dates if a slug includes a date.
- Use the actual DB write timestamp for `publishedAt`.
- `publishedAt` is not an event date, source date, travel season date, or batch
  ordering tool.
- All 9 records in the translation group must share the same `publishedAt`.
- Stop if any written/source/slug/published date would be in the future.

## Article Record Contract

Each language record must include:

- `translationGroupId`
- `language`
- `slug`
- `category`: `festival`, `travel-guide`, `destination-guide`, or
  `wellbeing-guide`
- `title`
- `body`
- `publishedAt`
- `status`: `PUBLISHED` for published-only records

Choose category by user intent, not title wording.

## Body Shape

Each localized `body` is publishable markdown:

```md
# Clear localized title

Two short intro paragraphs explaining who this is for, what decision it helps
with, and the most important constraint.

## What to know first

- 5-7 concrete bullets.

![Specific localized alt text](https://example.com/image.jpg)
Source: short localized caption.

## Practical decision section

## Timing or route section

## Rules or exceptions section

## Common mistakes

## Who should choose which option

## What to check before you go

## Sources

- Official source links with human-readable labels.
```

Requirements:

- one H1
- at least six substantive H2 sections excluding Sources
- short scan-friendly paragraphs
- no hype, filler, unsupported superlatives, or marketing prose
- meaningful link labels, image alt text, and source captions
- comply with `automation/shared/article-writing-standard.md`

## Localization Rules

- Write the English master first, then freeze a fact parity map.
- Translate fully; do not summarize.
- Preserve every hard fact, warning, exception, route, rule, price, time, date,
  source meaning, image URL, alt text meaning, and caption meaning.
- Localize title, H1, H2, paragraphs, bullets, image alt text, captions, and
  source labels.
- Do not leave English headings or placeholders in non-English bodies.
- Do not use external translation APIs or batch machine translation.
- Translate meaning and decisions naturally, not word-by-word. Rewrite sentence
  order when needed for the target language while preserving the fact map.

Script and diacritic requirements:

- `ko`: natural Korean and Hangul
- `ja`: natural Japanese with kana, kanji, and Japanese punctuation
- `zh`: one consistent Chinese variant inside the group
- `es`, `pt`, `fr`: natural spelling with diacritics
- `th`: Thai script
- `vi`: Vietnamese tone marks throughout

ASCII-stripped Spanish, Portuguese, French, Thai romanization, or Vietnamese
without tone marks is a hard failure.

## Quality Gates

Do not write to any DB unless all gates pass:

- official source gate
- runtime date and `publishedAt` gate
- readability and accessibility gate
- article writing standard gate
- localization script and diacritic gate
- semantic parity gate against the fact map
- automated quality gate:

```sh
node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json
```

## DB And Registry Rules

Development:

- Upsert exactly 9 records for one `translationGroupId`.
- Verify languages, slugs, category, titles, body structure, first image,
  source section, script/diacritics, `publishedAt`, and quality gate result.

Production, when required:

- Replicate only the verified `translationGroupId`.
- Use DB-only execution.
- Leave no files behind.
- Verify the same 9 records and parity with development.

Registry:

- Set status from verified DB state only:
  - before DB write: `queued`
  - verified dev only: `dev`
  - verified dev and production: `prod+dev`
- Record topic, scope, information angle, category, `translationGroupId`,
  slugs, languages, source checked date, `publishedAt`, verification summary,
  and reuse reason when applicable.

## Artifact And Git Rules

- Temporary scripts, payloads, exports, backups, helper files, locks, and run
  directories are runtime artifacts.
- Remove runtime artifacts after success or controlled stop unless needed for
  diagnosis.
- This task never stages, commits, pushes, or force-pushes. Git persistence is
  handled by `automation/tasks/repo-persistence/`.

## Stop Conditions

Stop without DB write if:

- a lock is active
- the topic overlaps the registry
- official sources cannot verify hard facts
- runtime date or `publishedAt` cannot be verified
- any language is incomplete, unnatural, ASCII-stripped, or semantically weaker
- the fact parity map or automated quality gate fails
- dev verification fails
- production replication cannot be scoped to one verified
  `translationGroupId`

## Final Report

Report topic, registry-safe reason, category, `translationGroupId`, language
coverage, slugs, source pack summary, runtime date, `publishedAt`, all quality
gate results, dev/prod verification, registry status, removed artifacts, git
deferral, and residual risks.
