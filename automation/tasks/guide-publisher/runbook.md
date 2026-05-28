# Guide Publisher Runbook

This is the manual fallback for the Codex app automation.

## Schedule

- guide publisher: 00:00, 06:00, 12:00, 18:00 Asia/Seoul
- post-publish review: 01:00, 07:00, 13:00, 19:00 Asia/Seoul
- repo persistence: 02:00, 08:00, 14:00, 20:00 Asia/Seoul

## Local Repo

```sh
cd "/Users/hansol/workspace/momentbook-guide"
```

Use this prompt file:

```text
automation/tasks/guide-publisher/prompt.md
```

## Access

- production API: `https://api.momentbook.app`
- auth: `POST /v2/auth/email/login`
- articles: `/v2/admin/articles`

Do not use SSH or direct MongoDB access. Credentials are local-only in
`.codex/automation/admin-api.env` or environment variables.

## Invariants

- Publish one guide per run.
- Verify all 9 supported languages before production API writes.
- Create only the verified `translationGroupId` in production.
- Production writes must use the admin articles API.
- Update `registry/editorial-guide-registry.md` only after verification.
- Do not commit or push from this task.
- Let `automation/tasks/repo-persistence/` handle git one hour after review.

## Preflight

```sh
test -f automation/shared/environment.yaml
test -f automation/shared/run-contract.md
test -f automation/shared/admin-articles-api.md
test -f automation/tasks/guide-publisher/workflow.md
test -f automation/tasks/guide-publisher/prompt.md
test -f prompts/guide-publisher.md
test -f tools/quality/article-quality-gate.js
test -f registry/editorial-guide-registry.md
```

## Completion Evidence

Every run must produce a final report with the topic, `translationGroupId`,
language coverage, quality gate result, production API verification, registry
update, removed artifacts, and residual risk.
