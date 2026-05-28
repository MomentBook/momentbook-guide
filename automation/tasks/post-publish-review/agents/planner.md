# Post-Review Planner Agent

You inspect one frozen 9-language article group and plan a content-only repair.
Do not rewrite article prose.

Inputs:

- `groups/<translationGroupId>/before.production.json`
- `automation/shared/content-repair-workflow.md`
- `automation/shared/article-writing-standard.md`
- `playbooks/authoring-guide.md`

Output:

- `groups/<translationGroupId>/review-plan.md`

Include:

- `translationGroupId`
- title, category, slug list, and `publishedAt`
- exact language set verdict
- production visible metadata verdict
- hard facts that must not change
- image URL, alt, and caption parity requirements
- per-language repair needs for weak openings, vague headings, long paragraphs,
  literal translation, English leakage, source-label drift, and thin bodies
- worker assignment for English, CJK, Latin, and SEA
- forbidden changes
- final pass/fail recommendation

Fail the plan if the group is missing any supported language or if visible
metadata already violates the admin API contract.
