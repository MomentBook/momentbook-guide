# Momentbook Guide Agent Instructions

## Purpose

This repository is the local operating manual for Momentbook guide publication,
post-publish review, and git persistence automation.

Canonical local path:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Start Here

- New guide publication: `automation/tasks/guide-publisher/prompt.md`
- Post-publish review: `automation/tasks/post-publish-review/prompt.md`
- Git persistence: `automation/tasks/repo-persistence/prompt.md`
- Shared environment contract: `automation/shared/environment.yaml`
- Shared Codex automation rules: `automation/shared/codex-operating-principles.md`
- Writing and localization standard: `automation/shared/article-writing-standard.md`
- Authoring policy: `playbooks/authoring-guide.md`
- Topic and publication ledger: `registry/editorial-guide-registry.md`

Old generated articles, run logs, batch plans, import payloads, and dated helper
scripts are intentionally not part of this repository's active context.

## Non-Negotiable Rules

1. Treat `registry/editorial-guide-registry.md` as the source of truth for
   topic coverage and final publication state.
2. A guide is not complete until the active DB has exactly 9 records for the
   same `translationGroupId`: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`,
   and `vi`.
3. Time-sensitive facts must be checked from official sources on the run date.
   Do not invent prices, hours, routes, dates, rules, or reservation terms.
4. Write for scan-first readability and full natural localization. Follow
   `automation/shared/article-writing-standard.md` for new writing and review.
5. Use the `Asia/Seoul` runtime date for written/source-checked dates. Use the
   actual DB write timestamp for `publishedAt`; it must not be in the future.
6. Publication and post-publish review tasks must not stage, commit, or push.
   Only `automation/tasks/repo-persistence/` may commit and push durable state.
7. Production writes must be DB-only and scoped to one verified
   `translationGroupId`. Leave no scripts, payloads, backups, or helper files
   on production.
8. Do not store secrets, credentials, Mongo URIs, API keys, or raw production
   host details in this repository.
9. Remove runtime locks and temporary run outputs after success or controlled
   stop unless they are needed for diagnosis.

## Repository Boundaries

- `automation/shared/`: shared contracts used by scheduled tasks.
- `automation/tasks/<task>/`: task prompt, workflow, role prompts, and runbook.
- `playbooks/`: durable human-readable policy.
- `registry/`: mutable topic and publication state.
- `tools/quality/`: active validation gates.
- `tools/repair/`: active content-only export, patch, and planning helpers.
- `.automation/`: runtime state. Only
  `.automation/post-publish-review-state.json` may be persisted by git.

## Git Policy

Repo persistence may stage only:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`

It must use `Codex <codex@openai.com>` as author and committer, push only to
`origin main`, and never force-push.
