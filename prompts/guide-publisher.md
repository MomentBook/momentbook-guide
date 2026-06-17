# Guide Publisher Contract

Use this contract when a mobile/chat request asks for one Momentbook guide to be
written, published, reviewed, and optionally committed.

## Goal

Create exactly one source-backed guide group with complete production records for:

```text
ko, en, ja, zh, es, pt, fr, th, vi
```

The work is complete only when the production admin API state is verified, the
registry reflects the real state, and any requested git persistence has succeeded
or clearly reported why it stopped.

## Required Context

Read these first:

- `AGENTS.md`
- `prompts/mobile-chat.md`
- `playbooks/authoring-guide.md`
- `automation/shared/article-writing-standard.md`
- `automation/shared/admin-articles-api.md`
- `registry/editorial-guide-registry.md`

Do not search for old generated examples, dated plans, run logs, import payloads,
or legacy writer scripts.

## Execution Order

1. Inspect `git status --short` and note existing changes before editing.
2. Choose one registry-safe topic, or validate the user's requested topic against
   the registry.
3. Build a current source pack from official or highly authoritative sources.
4. Write a reader-decision brief, then a fact parity map.
5. Write and self-edit the English master until the title, intro, H2 flow,
   bullets, image, and sources read like a finished public article.
6. Complete all 9 localized records from the same fact map, then run a
   native-prose pass for each locale. The local
   pre-create payload must include gate evidence such as shared
   `sourceCheckedDate`, but production create requests must not send that field.
7. Run manual readability/localization review, then quality and contract gates
   before production writes.
8. Publish through the production admin articles API.
9. Export the production group, verify exactly 9 languages, and rerun gates.
10. Review the published group for readability and localization quality; patch
   only `title` and `body` when a verified improvement is needed.
11. Update the registry from verified production API state.
12. Commit and push only if the chat request included git persistence.

## Topic Rules

- Registry safety is content-level, not country-level. Build a coverage
  signature for each candidate from the named place or destination type, event
  or festival type, route, ticket, pass, permit, rule, traveler decision,
  category, and slug keywords.
- Do not reject a candidate only because the country, region, or city already
  appears in the registry. Country and city are metadata for lookup and
  diversity, not duplicate keys.
- Prefer a coverage signature not already represented. Same-country and
  same-region reuse is allowed when the specific place, event, route, product,
  rule, or traveler intent is materially different from existing rows.
- Avoid generic city introductions when a practical decision angle is available:
  ticket choice, transfer route, timed entry, permit, closure risk, rule, booking
  term, pass comparison, or similar.
- Treat near-duplicates as unsafe even across different countries when the guide
  would repeat the same broad angle without a distinct place or decision, such
  as another generic first-time city guide, arrival-card/ETA explainer, or broad
  annual festival overview.
- A Japan shrine guide, for example, may coexist with other Japan guides when it
  covers a different named shrine, island/neighborhood, access pattern, and visit
  decision. It is unsafe only when it repeats the same shrine, the same route or
  rule, or a generic shrine-etiquette article already covered.
- Stop or ask for a new direction when the coverage signature overlaps the
  registry and no clear content distinction exists.

## Source Rules

Use official sources for hard facts whenever possible:

- government, immigration, tourism board, airport, railway, public transport,
  national park, museum, cultural institution, event organizer
- UNESCO, public references, research institutions, or official reports when
  appropriate
- credible secondary sources only as context or cross-checks

Record the source pack with URL, publisher, page title, checked date, purpose,
volatility, and recheck item. Do not copy source prose.

## Quality-First Writing Workflow

Automated gates are the floor, not the publishing standard. Before creating the
production payload, complete these human checks:

- Reader-decision brief: name the traveler, the decision the article helps them
  make, the main constraint, the likely wrong assumption, and the volatile facts
  that must be rechecked.
- Section plan: for every H2, write the practical question it answers and the
  source-backed action the reader should take. Remove sections that only repeat
  background.
- English master edit: read the title, H1, first two paragraphs, and H2 sequence
  as one flow. Move mixed prices, routes, exceptions, and timing into bullets.
  Split dense paragraphs before localization.
- Fact parity map: record names, numbers, dates, times, prices, route sequence,
  booking rules, exceptions, warnings, image meaning, and source labels that
  every locale must preserve.
- Localization rewrite: translate the meaning, not the English sentence order.
  Each locale may change sentence order and paragraph breaks when that makes
  the target language more natural, but it must not drop or add facts.
- Locale QA: reread each target body end to end after translation. Fix literal
  calques, English rhythm, thin summaries, unnatural headings, missing
  diacritics, weak title/H1 fit, and unlocalized alt text, caption, or source
  labels before running the create gates.

## Article Shape

Each localized `body` is publishable markdown:

```md
# Clear localized title

Two short intro paragraphs explaining who this is for, what decision it helps
with, and the most important constraint.

## What to know first

- 5-7 concrete bullets.

![Specific localized alt text](https://example.com/image.jpg)
Source: short localized caption.

## Choose the right ticket or route
## Plan the timing and route
## Rules and exceptions that change the visit
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
- no hype, filler, unsupported superlatives, copied source wording, or SEO padding
- meaningful link labels, image alt text, and source captions
- headings that answer reader decisions in the target language, not mechanical
  copies of the English template

## Localization Rules

- Translate fully; never summarize a locale.
- Preserve every hard fact, warning, exception, route, rule, price, time, date,
  source meaning, image URL, alt text meaning, caption meaning, and decision
  point.
- Rewrite naturally from the fact parity map and English meaning. Do not keep a
  single English sentence order across all languages when it creates stiff prose.
- Localize titles, headings, paragraphs, bullets, image alt text, captions, and
  source labels.
- Keep required scripts and diacritics:
  `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`.
- Non-English bodies must not keep English headings or placeholders except for
  official names that should remain unchanged.

## Validation And API Rules

Before production create:

```sh
node tools/quality/article-quality-gate.js --admin-create-payload <payload.json>
node tools/quality/article-contract-gate.js --admin-create-payload <payload.json>
```

Production API only:

- base URL: `https://api.momentbook.app`
- authenticate with `POST /v2/auth/email/login`
- use the returned access token as `Authorization: Bearer <token>`
- create one record per language with `POST /v2/admin/articles`
- send only create fields accepted by the API: required `language`, `category`,
  `title`, `body`; optional `translationGroupId`, `slug`
- keep `sourceCheckedDate` in the local gate payload and source pack, but let the
  helper strip it before POST
- do not send `publishedAt`, `sourceCheckedDate`, `status`, `createdAt`,
  `updatedAt`, summary, cover image, reading time, or author fields in the POST
  body
- reuse one shared `translationGroupId`; if the first create starts a new group,
  use the returned group id for the remaining languages
- verify with `GET /v2/admin/articles` and `GET /v2/admin/articles/{articleId}`

After production create or patch:

```sh
node tools/quality/article-quality-gate.js <admin-api-export.json>
node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>
```

Do not use SSH, direct MongoDB access, remote helper scripts, or a development
environment for publication or review.

## Review And Git

- Review the published group from current production admin API exports only.
- Treat a passing automated gate as necessary but insufficient; reread all 9
  exported bodies for title promise, opening decision, H2 flow, paragraph
  density, locale naturalness, and source-label localization.
- Patch only `title` and `body`; preserve language, slug, category,
  `translationGroupId`, and timestamps except expected server-side `updatedAt`.
- Update `registry/editorial-guide-registry.md` only from verified production API
  state.
- Commit and push only when requested in the chat and only after reviewing the
  staged diff.

## Stop Conditions

Stop before production writes when official sources are insufficient, dates or
metadata cannot be verified, the topic overlaps the registry, a language is
incomplete or unnatural, semantic parity fails, a gate fails, API scope is unsafe,
or credentials/API access are unavailable.

## Final Report

Report topic, registry-safe reason, category, `translationGroupId`, language
coverage, source pack summary, `sourceCheckedDate`, production API verification,
quality and contract gate results, review patches, registry update, commit/push
result when requested, and residual risks.
