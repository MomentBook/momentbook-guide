# Momentbook Guide

Local workspace for Momentbook guide publication, post-publish review, and
automation state persistence.

Canonical path:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## What This Repo Does

1. Publishes one source-backed travel guide at a time.
2. Reviews recently published guides for readability and localization quality.
3. Commits only verified durable state after DB verification is complete.

The active automation contracts are:

- `automation/tasks/guide-publisher/prompt.md`
- `automation/tasks/post-publish-review/prompt.md`
- `automation/tasks/repo-persistence/prompt.md`

## Source Of Truth

- Project instructions: `AGENTS.md`
- Environment and schedules: `automation/shared/environment.yaml`
- Codex automation rules: `automation/shared/codex-operating-principles.md`
- Writing and localization standard: `automation/shared/article-writing-standard.md`
- Authoring and localization policy: `playbooks/authoring-guide.md`
- Topic and publication state: `registry/editorial-guide-registry.md`

Old generated articles, logs, import payloads, and dated batch plans were
removed from active context. Use the registry and live DB verification for
state, not old examples.

## Current Schedule

Asia/Seoul:

- guide publisher: 03:00, 09:00, 15:00, 21:00
- post-publish review: 04:00, 10:00, 16:00, 22:00
- repo persistence: 05:00, 11:00, 17:00, 23:00

## Operating Model

- New guide publication writes verified guide records to dev and, when required,
  production. It updates the local registry but does not commit.
- Post-publish review applies content-only `title` and `body` patches to dev
  and production. It updates only the review state file and does not commit.
- Repo persistence is git-only. It stages only the allowlisted durable files,
  commits as `Codex <codex@openai.com>`, and pushes to `origin main`.

Development access uses `ssh momentbook-dev`. Production access uses
`ssh momentbook` and must remain DB-only for one verified `translationGroupId`.
