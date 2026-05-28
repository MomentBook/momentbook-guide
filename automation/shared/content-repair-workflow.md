# Content Repair Workflow

Use this workflow when existing guide articles must be repaired after
publication. It is separate from new guide generation because the primary risk
is accidental metadata drift on already indexed URLs.

Use `automation/shared/article-writing-standard.md` as the quality target for
readability and localization naturalness.

## Scope

Repair work is always grouped by `translationGroupId`.

Required order:

1. Audit production inventory through the admin articles API.
2. Export current records before writes.
3. Build a content-only patch.
4. Run the quality and contract gates against the full 9-language preview.
5. Apply the approved content patch to production with
   `PATCH /v2/admin/articles/{articleId}`.
6. Re-run the same gates against a fresh production API export.
7. Record remaining failures.

## Fields That Must Not Drift

Content repair agents must not change:

- `translationGroupId`
- `language`
- `slug`
- `category`
- `publishedAt`

The production API patch must write only `title` and `body`; `updatedAt` may
change as a server-side timestamp.

## Role Split

For large repair batches, run bounded workers in parallel with disjoint
`translationGroupId` sets.

- `inventory-planner`: reads the production API audit JSON and creates repair
  batches.
- `content-repair-worker`: exports one group, writes a content-only patch, and
  runs the preview gates.
- `api-publisher-worker`: applies a verified patch to production and runs the
  gates against the fresh API export.
- `qa-summary-worker`: re-runs the inventory audit and reports remaining groups.

Never let two workers update the same `translationGroupId`.

## Repair Classes

### Accent or Tone Mark Repair

Use when Spanish, Portuguese, French, or Vietnamese was ASCII-stripped.

Rules:

- translate naturally; do not only add accents mechanically
- preserve every heading level, image URL, caption meaning, hard fact, rule,
  route, price, date, and source link
- maintain Vietnamese tone marks throughout body, title, image alt, and caption
- keep locale-specific source heading labels

### Depth Expansion

Use when a body is below the automated depth threshold.

Rules:

- expand the English master or the affected locale from source-supported facts
- do not invent prices, hours, policies, route names, or official rules
- prefer practical planning paragraphs over filler
- keep all locales complete translations of the same fact set

### Structure Expansion

Use when a group has fewer than six substantive H2 sections.

Rules:

- add useful localized sections such as ticket choice, timing, route sequence,
  rules, common mistakes, and final checklist
- do not add a section just to satisfy the counter
- update every supported locale, not only English

## Commands

Export one group:

```sh
node tools/admin/articles-api.js export-group <translationGroupId> --out /tmp/group.json
```

Apply a content-only patch:

```sh
node tools/admin/articles-api.js patch-group <translationGroupId> /tmp/group.patch.json --confirm-production
```

Plan batches from an audit:

```sh
node tools/repair/plan-article-content-repairs.js --audit audit.json --out repair-plan.json --batch-size 8
```

Run the quality gate:

```sh
node tools/quality/article-quality-gate.js /tmp/group.json
```

Run the contract gate on admin API exports:

```sh
node tools/quality/article-contract-gate.js --admin-api /tmp/group.json
```

## Patch Shape

```json
{
  "translationGroupId": "artgrp_example",
  "updates": [
    {
      "language": "es",
      "title": "Localized title",
      "body": "# Localized title\n\n..."
    }
  ]
}
```

Patch files must not include `slug`, `category`, `publishedAt`, `updatedAt`, or
`translationGroupId` inside individual updates.
