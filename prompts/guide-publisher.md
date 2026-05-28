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
4. Write the English master and a fact parity map.
5. Complete all 9 localized records from the same fact map. The local
   pre-create payload must include gate evidence such as shared
   `sourceCheckedDate`, but production create requests must not send that field.
6. Run quality and contract gates before production writes.
7. Publish through the production admin articles API.
8. Export the production group, verify exactly 9 languages, and rerun gates.
9. Review the published group for readability and localization quality; patch
   only `title` and `body` when a verified improvement is needed.
10. Update the registry from verified production API state.
11. Commit and push only if the chat request included git persistence.

## Topic Rules

- Prefer a country, city, scope, or information angle not already represented.
- Avoid generic city introductions when a practical decision angle is available:
  ticket choice, transfer route, timed entry, permit, closure risk, rule, booking
  term, pass comparison, or similar.
- Same-country reuse needs a clear reason: explicit user request, stronger
  official source quality, or a materially different geography and traveler
  intent.
- Stop or ask for a new direction when the topic overlaps the registry and no
  defensible reuse reason exists.

## Source Rules

Use official sources for hard facts whenever possible:

- government, immigration, tourism board, airport, railway, public transport,
  national park, museum, cultural institution, event organizer
- UNESCO, public references, research institutions, or official reports when
  appropriate
- credible secondary sources only as context or cross-checks

Record the source pack with URL, publisher, page title, checked date, purpose,
volatility, and recheck item. Do not copy source prose.

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

## Localization Rules

- Translate fully; never summarize a locale.
- Preserve every hard fact, warning, exception, route, rule, price, time, date,
  source meaning, image URL, alt text meaning, caption meaning, and decision
  point.
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
