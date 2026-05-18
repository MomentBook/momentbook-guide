# Guide Publisher Runbook

This is the manual fallback for the Codex app automation.

## Schedule

- guide publisher: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 Asia/Seoul
- post-publish review: 01:00, 04:00, 07:00, 10:00, 13:00, 16:00, 19:00, 22:00 Asia/Seoul
- repo persistence: 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00 Asia/Seoul

## Local Repo

```sh
cd "/Users/hansol/Documents/New project/momentbook-guide"
```

Use this prompt file:

```text
automation/tasks/guide-publisher/prompt.md
```

## Access

- development: `ssh momentbook-dev`
- production: `ssh momentbook`

Use SSH only when the task needs environment access. The guide repo, registry,
and automation contracts are local.

## Invariants

- Publish one guide per run.
- Verify all 9 supported languages in development before production.
- Replicate only the verified `translationGroupId` to production.
- Production writes must be DB-only and must leave no files behind.
- Update `registry/editorial-guide-registry.md` only after verification.
- Do not commit or push from this task.
- Let `automation/tasks/repo-persistence/` handle git one hour after review.

## Preflight

```sh
test -f automation/shared/environment.yaml
test -f automation/shared/run-contract.md
test -f automation/tasks/guide-publisher/workflow.md
test -f automation/tasks/guide-publisher/prompt.md
test -f prompts/guide-publisher.md
test -f tools/quality/article-quality-gate.js
test -f registry/editorial-guide-registry.md
```

## Completion Evidence

Every run must produce a final report with the topic, `translationGroupId`,
language coverage, quality gate result, dev/prod verification, registry update,
removed artifacts, and residual risk.
