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

## Topic Coverage Policy

Use the registry to avoid duplicate content, not duplicate countries.

- Build a coverage signature before choosing or accepting a topic: named place
  or destination type, event or festival type, route, ticket, pass, permit, rule,
  traveler decision, category, and slug keywords.
- Country, region, and city are lookup metadata and diversity signals. They do
  not block a topic by themselves.
- Same-country and same-city guides are acceptable when the specific content is
  different. For example, two Japan shrine guides can coexist when they cover
  different named shrines, neighborhoods or islands, access patterns, and visit
  decisions.
- Reject or re-scope candidates that repeat the same named place, event, route,
  ticket/pass/permit, operational rule, or generic angle already represented.
- When a same-country topic might look close to an existing row, record the
  content distinction in the registry rather than treating country reuse as an
  exception.

## Hard Gates

Do not create or update published guide records unless all are true:

- hard facts are backed by official or otherwise trustworthy sources
- time-sensitive facts were checked on the work date
- `sourceCheckedDate` uses the actual local date in `Asia/Seoul`
- `publishedAt` is the real production API write timestamp and is not future
- a reader-decision brief and fact parity map exist before localization starts
- the English master has been edited for title promise, opening decision, H2
  flow, paragraph density, and scan-first bullets before it is localized
- the article has one H1, at least six substantive H2 sections, a useful first
  image, meaningful alt text, source caption, and Sources section
- the opening explains the reader, the decision, and the main constraint
- all 9 languages preserve the same facts, warnings, routes, rules, dates,
  prices, exceptions, source meaning, image meaning, and decision points
- every non-English body has had a separate natural-prose review after
  translation, not only a structural gate check
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

The local pre-create payload keeps `sourceCheckedDate` so gates can verify
source freshness. The create request itself sends only fields accepted by the
admin API: required `language`, `category`, `title`, `body`, plus optional
`translationGroupId` and `slug`. The server sets `publishedAt` and derived
values such as summary, cover image, reading time, and author name.

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

## Naturalness And Flow Review

Use this review before production create and again after production export. The
automated gates catch structure, but they cannot prove that the article is good.

- Title promise: the localized title and H1 must tell the same practical story
  as the body. Avoid vague attraction names when the article is really about a
  ticket, route, permit, closure, or rule.
- Opening flow: the first two paragraphs must name who the guide is for, what
  decision it helps with, and the constraint that changes the plan.
- H2 flow: headings should read like a route through the decision, not like a
  copied template. Each section needs one clear job.
- Paragraph rhythm: move mixed prices, routes, times, exceptions, and warnings
  into bullets. Break wall-like paragraphs before translating them.
- Locale naturalness: translate the idea and action, not the English word order.
  Adjust sentence order, punctuation, and paragraph breaks when the target
  language needs it.
- Full parity: after polishing, compare every locale back to the fact parity map
  for numbers, dates, prices, route sequence, booking terms, warnings, image
  meaning, captions, and source labels.

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
