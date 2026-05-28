# Guide Publisher Automation Prompt

Run from:

```text
/Users/hansol/workspace/momentbook-guide
```

## Goal

Publish one new registry-safe Momentbook travel guide to production through the
admin articles API, verify the published group through the same API, update the
registry, and leave git persistence to the repo-persistence task.

## Context

Read:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/run-contract.md`
- `automation/shared/admin-articles-api.md`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `automation/tasks/guide-publisher/workflow.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Constraints

- Work only from the local repo path above.
- Follow `automation/shared/run-contract.md` for preflight, lock handling,
  controlled stops, cleanup, and final reporting.
- Determine `runtimeWrittenDate` from the current `Asia/Seoul` clock.
- Publish one `translationGroupId` per run.
- Complete all 9 languages: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`,
  `vi`.
- Use official sources for hard facts.
- Follow the writing standard for readable English and natural full
  localization. Do not imitate old generated articles or deleted archives.
- Do not use SSH, direct MongoDB access, remote helper scripts, or a development
  environment.
- Use production only: `https://api.momentbook.app`.
- Use `POST /v2/auth/email/login` for admin authentication and
  `/v2/admin/articles` for list/create/detail/update operations.
- Run `node tools/quality/article-quality-gate.js` before any API write.
- Run `node tools/quality/article-contract-gate.js --admin-create-payload`
  before any API write so language coverage, `sourceCheckedDate`, slug dates,
  and shared group metadata are verified by code.
- Create exactly one production article record per supported language with
  `POST /v2/admin/articles`; reuse one shared `translationGroupId`.
- Verify the production result with `GET /v2/admin/articles` and
  `GET /v2/admin/articles/{articleId}`, then run
  `node tools/quality/article-quality-gate.js <admin-api-export.json>` and
  `node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>`.
- Remove runtime artifacts and locks after success or controlled stop unless
  needed for diagnosis.
- Do not stage, commit, push, or force-push.

## Done When

- production admin API has exactly 9 verified records for the new
  `translationGroupId`
- payload and production admin API export pass the article quality gate and
  article contract gate; admin API exports use `article-contract-gate.js --admin-api`
- `registry/editorial-guide-registry.md` reflects the verified final state
- final report includes the run-contract fields plus topic, sources,
  `sourceCheckedDate`, `publishedAt`, quality gates, production API
  verification, registry update, and git deferral

## Stop

Stop and report without production API write if the lock is active, topic overlaps the
registry, official sources are insufficient, dates or metadata cannot be
verified, any language is incomplete or unnatural, either executable gate fails,
production admin API verification fails, or production cannot remain scoped to
one verified `translationGroupId`.
