# Momentbook Guide

Local workspace for Momentbook guide publication, post-publish review, and
automation state persistence.

Canonical path:

```text
/Users/hansol/workspace/momentbook-guide
```

## What This Repo Does

1. Publishes one source-backed travel guide at a time.
2. Reviews recently published guides for readability and localization quality.
3. Verifies article content and record metadata with executable gates.
4. Commits only verified durable state after production API verification is
   complete.

The active automation contracts are:

- `automation/tasks/guide-publisher/prompt.md`
- `automation/tasks/post-publish-review/prompt.md`
- `automation/tasks/repo-persistence/prompt.md`

## Source Of Truth

- Project instructions: `AGENTS.md`
- Environment and schedules: `automation/shared/environment.yaml`
- Run preflight, locks, cleanup, and final reports:
  `automation/shared/run-contract.md`
- Codex automation rules: `automation/shared/codex-operating-principles.md`
- Writing and localization standard: `automation/shared/article-writing-standard.md`
- Authoring and localization policy: `playbooks/authoring-guide.md`
- Topic and publication state: `registry/editorial-guide-registry.md`

Old generated articles, logs, import payloads, and dated batch plans were
removed from active context. Use the registry and live production API verification for
state, not old examples.

## Quality Gates

- `node tools/quality/article-quality-gate.js <json>` checks readable structure,
  localized headings, source sections, image basics, depth, scripts, and
  diacritics.
- `node tools/quality/article-contract-gate.js --admin-create-payload <json>`
  checks publication invariants before API writes: 9 languages, shared
  slug/category, shared `sourceCheckedDate`, and no future source/slug dates.
- `node tools/quality/article-contract-gate.js --db <json>` adds DB record
  checks for `status`, `createdAt`, and `updatedAt`.
- `node tools/quality/article-contract-gate.js --admin-api <json>` checks
  production admin API exports, which do not expose `sourceCheckedDate`,
  `status`, or `createdAt`.

The prompts should not compensate for missing metadata with prose. If a gate
fails, stop the run and report the exact failing group and fields.

## Current Schedule

Asia/Seoul:

- guide publisher: 00:00, 06:00, 12:00, 18:00
- post-publish review: 01:00, 07:00, 13:00, 19:00
- repo persistence: 02:00, 08:00, 14:00, 20:00

## Operating Model

- New guide publication writes verified guide records directly to production
  through `https://api.momentbook.app/v2/admin/articles`. It updates the local
  registry but does not commit.
- Post-publish review applies content-only `title` and `body` patches to
  production through `PATCH /v2/admin/articles/{articleId}`. It updates only the
  review state file and does not commit.
- Repo persistence is git-only. It stages only the allowlisted durable files,
  commits as `Codex <codex@openai.com>`, and pushes to `origin main`.

Scheduled article automation must not use `ssh momentbook-dev`, `ssh
momentbook`, or direct MongoDB access.
