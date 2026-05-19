# Editorial Article Authoring Guide

This is the durable content policy for Momentbook editorial guide records.

## Canonical Inputs

- Topic and state ledger: `registry/editorial-guide-registry.md`
- Publication execution contract: `prompts/guide-publisher.md`
- Automation environment: `automation/shared/environment.yaml`
- Writing and localization standard:
  `automation/shared/article-writing-standard.md`

## Completion Standard

A guide is complete only when the active DB has verified records for all
supported languages:

```text
ko, en, ja, zh, es, pt, fr, th, vi
```

Generated JSON, scripts, drafts, and exported payloads are not completion
evidence by themselves.

## Hard Gates

Do not insert or update published guide records unless all are true:

- hard facts are backed by official or otherwise trustworthy sources
- time-sensitive facts were checked on the run date
- `publishedAt` is the real DB write timestamp and is not in the future
- source checked dates and slug dates, when used, match the actual local run
  date in `Asia/Seoul`
- the article has one H1, at least six substantive H2 sections, a useful first
  image, meaningful alt text, and a source section
- the article satisfies the readable guide standard: practical opening,
  decision-oriented headings, short paragraphs, and useful checklists
- all 9 languages carry the same facts, warnings, routes, rules, dates, prices,
  exceptions, source meaning, image meaning, and decision points
- Spanish, Portuguese, French, Thai, and Vietnamese preserve their required
  scripts or diacritics
- `node tools/quality/article-quality-gate.js <payload-json>` exits 0
- `node tools/quality/article-contract-gate.js <payload-json>` exits 0 before
  DB write, and `node tools/quality/article-contract-gate.js --db <export-json>`
  exits 0 after DB export

Stop instead of publishing when language quality or source support is uncertain.

## Record Schema

Each article record must include:

| Field | Rule |
| --- | --- |
| `translationGroupId` | Same value for all 9 localized records in one guide. |
| `language` | One of `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`. |
| `slug` | Unique within the language and stable for the public URL. |
| `category` | One of `festival`, `travel-guide`, `destination-guide`, `wellbeing-guide`. |
| `title` | Natural localized title that matches the body. |
| `body` | Markdown source for the public page. |
| `publishedAt` | Actual DB write timestamp, shared across the group, never future. |
| `sourceCheckedDate` | Actual source-check date in `YYYY-MM-DD`, shared across the group, never future. |
| `status` | `PUBLISHED` for published-only guide records. |

Choose `category` by the main user intent:

- `travel-guide`: movement, booking, entry, preparation, pass, cost, rule, or
  route decisions
- `destination-guide`: place visit planning and route judgment
- `festival`: seasonal event or organizer-led program
- `wellbeing-guide`: rest, sleep, recovery, rhythm, or wellness travel

## Markdown Body

Use this shape unless the topic needs a small adaptation:

```md
# Localized title

Two short intro paragraphs.

## What to know first

- 5-7 practical bullets.

![Specific localized alt text](https://example.com/image.jpg)
Source: localized source caption.

## Access, ticket, reservation, or route decision

## Timing and route plan

## Rules that change the day

## Common mistakes

## Who should choose which option

## What to check before you go

## Sources

- Official source links.
```

Writing rules:

- Put the reader's decision and the main constraint in the first two
  paragraphs.
- Keep paragraphs short and scannable.
- Use lists for prices, hours, route choices, booking rules, exceptions, and
  other volatile facts.
- Avoid hype, filler, generic city prose, unsupported superlatives, and keyword
  stuffing.
- Use absolute `http` or `https` image URLs.
- Alt text must describe the actual scene, not say only `image`, `photo`, or
  `picture`.
- Source links need human-readable labels.

## Source Policy

Use official sources for hard facts whenever possible:

1. government, immigration, tourism board, airport, railway, public transport,
   national park, museum, cultural institution, event organizer
2. UNESCO, public references, research institutions, or official reports
3. credible secondary sources only for context or cross-checking

Do not publish prices, hours, route names, booking terms, closures, visa rules,
health claims, or safety rules without source support.

When sources conflict, do not hide the conflict. Either stop or move the point
to a "check before you go" item with clear uncertainty.

## Localization Policy

Write or review the English master first, then maintain a fact parity map for
all localizations.

Every localization must preserve:

- hard facts
- numbers, prices, times, and dates
- booking and entry conditions
- exceptions, closure risks, and warnings
- routes and transfer points
- image URL, alt text meaning, and caption meaning
- source labels and source meaning

Language requirements:

- `ko`: natural Korean and Hangul
- `ja`: natural Japanese with kana, kanji, and Japanese punctuation
- `zh`: one consistent Chinese variant in the group
- `es`, `pt`, `fr`: standard spelling with diacritics
- `th`: Thai script, not romanized Thai
- `vi`: Vietnamese tone marks throughout

Non-English bodies must not keep English headings, placeholders, or source
labels except for official names that should remain untranslated.

## Date Policy

- `runtimeWrittenDate`: current `Asia/Seoul` calendar date at run start.
- `sourceCheckedDate`: date the source was actually checked.
- slug date, when present: same as the run date.
- `publishedAt`: actual DB write timestamp.

Do not use event dates, travel seasons, old markdown dates, source publication
dates, or artificial batch spacing as `publishedAt`.

## Review Checklist

Before DB write, verify:

- 9 supported languages exist
- one H1 and at least six substantive H2 sections exist
- first image, alt text, caption, and Sources section exist
- hard facts trace to sources
- `sourceCheckedDate`, slug date, `publishedAt`, and DB timestamps are not
  future
- all localizations preserve semantic parity
- required scripts and diacritics are present
- localized prose is natural, not literal translated English
- automated quality gate passed
- automated contract gate passed

Final rule: the body is the public contract. Summary and cover behavior are
derived from it, so do not treat them as separate decoration.
