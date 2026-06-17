# Content Repair Workflow

Use this workflow when existing guide articles need readability or localization
repair after publication. The main risk is accidental metadata drift on already
indexed URLs.

Use `automation/shared/article-writing-standard.md` as the quality target.

## Scope

Repair work is grouped by `translationGroupId`.

Required order:

1. Export current production records through the admin articles API.
2. Run the admin API contract gate before planning edits.
3. Build a content-only patch.
4. Run the quality and contract gates against the full 9-language preview.
5. Apply the verified patch with `PATCH /v2/admin/articles/{articleId}`.
6. Export fresh production records and rerun the same gates.
7. Report changed languages, gate results, and remaining risks.

## Fields That Must Not Drift

Content repair must not change:

- `translationGroupId`
- `language`
- `slug`
- `category`
- `publishedAt`

The production API patch must write only `title` and `body`; `updatedAt` may
change as a server-side timestamp.

## Repair Classes

### Accent or Tone Mark Repair

Use when Spanish, Portuguese, French, or Vietnamese was ASCII-stripped.

Rules:

- translate naturally; do not only add accents mechanically
- preserve every heading level, image URL, caption meaning, hard fact, rule,
  route, price, date, and source link
- maintain Vietnamese tone marks throughout body, title, image alt, and caption
- keep localized source heading labels

### Depth Expansion

Use when a body is below the automated depth threshold.

Rules:

- expand the English master or affected locale from source-supported facts
- do not invent prices, hours, policies, route names, or official rules
- prefer practical planning paragraphs over filler
- keep all locales complete translations of the same fact set

### Structure Expansion

Use when a group has fewer than six substantive H2 sections.

Rules:

- add useful localized sections such as ticket choice, timing, route sequence,
  rules, common mistakes, and final checklist
- do not add a section only to satisfy the counter
- update every supported locale, not only English

### Localization Naturalness Repair

Use when a locale passes structure checks but still reads like a literal
translation, thin summary, or English template with localized words.

Rules:

- repair from the current production export, the improved English meaning, and
  the fact parity map
- preserve every hard fact, warning, route, rule, price, date, source link,
  image URL, alt-text meaning, and caption meaning
- rewrite the full affected `title` and `body` when needed; do not patch isolated
  sentences while leaving a stiff title, weak intro, or awkward H2 sequence
- localize image caption prefixes and source labels, except where the target
  language convention legitimately uses the same word
- read the repaired locale end to end without the English master before applying
  the patch

## Commands

Export one group:

```sh
node tools/admin/articles-api.js export-group <translationGroupId> --out /tmp/group.json
```

Apply a content-only patch:

```sh
node tools/admin/articles-api.js patch-group <translationGroupId> /tmp/group.patch.json --confirm-production --out /tmp/group.patch-result.json
```

Run the gates:

```sh
node tools/quality/article-quality-gate.js /tmp/group.json
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
