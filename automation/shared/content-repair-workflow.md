# Content Repair Workflow

Use this workflow when existing guide articles must be repaired after
publication. It is separate from new guide generation because the primary risk
is accidental metadata drift on already indexed URLs.

## Scope

Repair work is always grouped by `translationGroupId`.

Required order:

1. Audit dev and prod inventories.
2. Back up current records before writes.
3. Repair dev first.
4. Run the quality gate against the full 9-language group.
5. Apply the same approved content patch to prod.
6. Re-run the same quality gate against prod.
7. Re-run the full inventory audit and record remaining failures.

## Fields That Must Not Drift

Content repair agents must not change:

- `translationGroupId`
- `slug`
- `category`
- `status`
- `publishedAt`
- `createdAt`

The default apply tool only writes `title`, `body`, and `updatedAt`.

## Role Split

For large repair batches, run bounded workers in parallel with disjoint
`translationGroupId` sets.

- `inventory-planner`: reads the audit JSON and creates repair batches.
- `dev-repair-worker`: exports one group, writes a content-only patch, applies
  it to dev, and runs the gate.
- `prod-replication-worker`: applies a dev-passed patch to prod and runs the
  gate against prod.
- `qa-summary-worker`: re-runs the full inventory audit and reports remaining
  groups.

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
node tools/repair/export-article-group.js --group <translationGroupId> --out /tmp/group.json
```

Apply a content-only patch:

```sh
node tools/repair/apply-article-content-patch.js --file /tmp/group.patch.json --apply
```

Plan batches from an audit:

```sh
node tools/repair/plan-article-content-repairs.js --audit audit.json --out repair-plan.json --batch-size 8
```

Run the quality gate:

```sh
node tools/quality/article-quality-gate.js /tmp/group.json
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

Patch files must not include `slug`, `category`, `publishedAt`, `status`, or
`translationGroupId` inside individual updates.
