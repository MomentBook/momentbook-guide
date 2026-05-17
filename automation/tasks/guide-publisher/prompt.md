# Guide Publisher Automation Prompt

Run from:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Goal

Publish one new registry-safe Momentbook travel guide, verify it in development,
replicate the verified group to production, update the registry, and leave git
persistence to the repo-persistence task.

## Context

Read:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `automation/tasks/guide-publisher/workflow.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Constraints

- Work only from the local repo path above.
- Determine `runtimeWrittenDate` from the current `Asia/Seoul` clock.
- Publish one `translationGroupId` per run.
- Complete all 9 languages: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`,
  `vi`.
- Use official sources for hard facts.
- Follow the writing standard for readable English and natural full
  localization. Do not imitate old generated articles or deleted archives.
- Run `node tools/quality/article-quality-gate.js` before any DB write.
- Use `ssh momentbook-dev` only for development DB/app access.
- Use `ssh momentbook` only for DB-only production replication and verification.
- Remove runtime artifacts and locks after success or controlled stop unless
  needed for diagnosis.
- Do not stage, commit, push, or force-push.

## Done When

- dev DB has exactly 9 verified records for the new `translationGroupId`
- production DB has the same verified 9 records
- `registry/editorial-guide-registry.md` reflects the verified final state
- final report includes topic, sources, runtime date, `publishedAt`, quality
  gates, DB verification, registry update, removed artifacts, and git deferral

## Stop

Stop and report without DB write if the lock is active, topic overlaps the
registry, official sources are insufficient, dates cannot be verified, any
language is incomplete or unnatural, a quality gate fails, dev/prod verification
fails, or production cannot remain scoped to one verified `translationGroupId`.
