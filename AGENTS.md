# Momentbook Guide Agent Instructions

## Purpose

This repository is the local operating manual for mobile/chat-driven Momentbook
guide work: writing one source-backed guide, publishing it through the production
admin API, reviewing the published result, and committing only verified durable
state when requested.

## Start Here

- Mobile request templates: `prompts/mobile-chat.md`
- New guide execution contract: `prompts/guide-publisher.md`
- Authoring and localization policy: `playbooks/authoring-guide.md`
- Writing standard: `automation/shared/article-writing-standard.md`
- Admin API contract: `automation/shared/admin-articles-api.md`
- Content repair workflow: `automation/shared/content-repair-workflow.md`
- Topic and publication ledger: `registry/editorial-guide-registry.md`

Old generated articles, run logs, dated batch plans, import payloads, and helper
scripts are intentionally not active context.

## Rules

1. Treat `registry/editorial-guide-registry.md` as the source of truth for
   content-level topic coverage and final publication state. Registry safety is
   judged by the specific place, event or festival type, route, pass, permit,
   rule, and traveler decision covered by the guide; country or city alone is
   metadata, not a duplicate key.
2. Work on one `translationGroupId` at a time unless the user explicitly asks for
   a batch.
3. A guide is complete only when the production admin API has exactly 9 verified
   records: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, and `vi`.
4. Check time-sensitive facts from current official sources on the work date. Do
   not invent prices, hours, routes, dates, rules, or reservation terms.
5. Write for scan-first readability and natural full localization. Every language
   must preserve the same facts, warnings, source meaning, image meaning, and
   decision points.
6. Use the `Asia/Seoul` runtime date for written/source-checked dates. Use the
   actual production API write timestamp for `publishedAt`; it must not be in the
   future.
7. Production writes must use the admin articles API only. Do not use SSH, direct
   MongoDB access, remote helper scripts, or a development environment for guide
   publication or review.
8. Run the quality and contract gates before production creates and after
   production exports.
9. Do not stage, commit, or push until production API state and durable file
   changes are verified. Commit and push only when the user asks for it in the
   chat.
10. Do not store secrets, credentials, Mongo URIs, API keys, tokens, cookies, or
    private production responses in this repository.

## Repository Boundaries

- `prompts/`: mobile request templates and the compact guide execution contract.
- `playbooks/`: durable human-readable policy.
- `automation/shared/`: legacy path for shared API, writing, and repair contracts;
  it no longer defines active scheduled tasks.
- `registry/`: mutable topic and publication state.
- `tools/quality/`: active validation gates.
- `tools/admin/`: production admin articles API helper.
- `tools/repair/`: content-only export, patch, and planning helpers.

## Git Policy

Git persistence is manual/chat-driven. Before committing, inspect the diff and
stage only verified durable state such as:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`, if a manual review state file is
  intentionally used

Use `Codex <codex@openai.com>` only when the user asks for a Codex-authored
commit, push only to the intended branch, and never force-push without an
explicit user request.
