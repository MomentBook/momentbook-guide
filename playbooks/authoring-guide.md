# Editorial Article Authoring Guide

This is the durable content policy for Momentbook editorial guide records.

## Canonical Inputs

- Topic and state ledger: `registry/editorial-guide-registry.md`
- Mobile request templates: `prompts/mobile-chat.md`
- Publication contract: `prompts/guide-publisher.md`
- Writing and localization standard:
  `automation/shared/article-writing-standard.md`

## Completion Standard

A guide is complete only when the production admin API returns verified records
for all supported languages:

```text
ko, en, ja, zh, es, pt, fr, th, vi
```

Draft JSON, scripts, payloads, and local exports are evidence only after they
match the production API result and pass the gates.

## Hard Gates

Do not create or update published guide records unless all are true:

- hard facts are backed by official or otherwise trustworthy sources
- time-sensitive facts were checked on the work date
- `sourceCheckedDate` uses the actual local date in `Asia/Seoul`
- `publishedAt` is the real production API write timestamp and is not future
- the article has one H1, at least six substantive H2 sections, a useful first
  image, meaningful alt text, source caption, and Sources section
- the opening explains the reader, the decision, and the main constraint
- all 9 languages preserve the same facts, warnings, routes, rules, dates,
  prices, exceptions, source meaning, image meaning, and decision points
- required scripts and diacritics are present for every locale
- article quality and contract gates pass before and after production API writes

Stop instead of publishing when language quality, source support, or production
API scope is uncertain.

## Record Schema

Each local pre-write article record must include:

| Field | Rule |
| --- | --- |
| `translationGroupId` | Same value for all 9 localized records in one guide. |
| `language` | One of `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`. |
| `slug` | Unique within the language and stable for the public URL. |
| `category` | One of `festival`, `travel-guide`, `destination-guide`, `wellbeing-guide`. |
| `title` | Natural localized title that matches the body. |
| `body` | Markdown source for the public page. |
| `sourceCheckedDate` | Actual source-check date in `YYYY-MM-DD`, shared across the group, never future. |

The create request sends only fields accepted by the admin API. The server sets
publication timestamps and derived values such as summary, cover image, and
reading time.

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

## Choose the right ticket or route
## Plan the timing and route
## Rules and exceptions that change the visit
## Common mistakes
## Who should choose which option
## What to check before you go
## Sources

- Official source links.
```

Writing rules:

- Put the reader's decision and the main constraint in the first two paragraphs.
- Use short paragraphs and bullets for prices, hours, booking rules, route
  choices, exceptions, and day-of-visit checks.
- Avoid hype, filler, generic city prose, unsupported superlatives, keyword
  stuffing, and copied source phrasing.
- Use absolute `http` or `https` image URLs.
- Alt text must describe the actual scene, not only say `image`, `photo`, or
  `picture`.
- Source links need human-readable labels.

## Source Policy

Use official sources for hard facts whenever possible:

1. government, immigration, tourism board, airport, railway, public transport,
   national park, museum, cultural institution, event organizer
2. UNESCO, public references, research institutions, or official reports
3. credible secondary sources only for context or cross-checking

Do not publish prices, hours, route names, booking terms, closures, visa rules,
health claims, or safety rules without source support. When sources conflict,
stop or describe the uncertainty in a check-before-you-go item.

## Localization Policy

Write or review the English master first, then maintain a fact parity map.
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

Non-English bodies must not keep English headings, placeholders, or source labels
except for official names that should remain untranslated.

## Review Checklist

Before and after production API writes, verify:

- 9 supported languages exist
- one H1 and at least six substantive H2 sections exist
- first image, alt text, caption, and Sources section exist
- hard facts trace to sources
- `sourceCheckedDate`, slug date, `publishedAt`, and API timestamps are not future
- all localizations preserve semantic parity
- required scripts and diacritics are present
- localized prose is natural, not literal translated English
- automated quality and contract gates passed

Final rule: the body is the public contract. Summary and cover behavior are
derived from it, so do not treat them as separate decoration.
