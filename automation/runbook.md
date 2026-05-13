# Automation Runbook

## Goal

Run one complete guide publication job without relying on long user instructions.

The operator or scheduler only needs to provide:

```text
Use /home/ubuntu/app/momentbook-guide/automation/prompt-dev-to-prod.md and publish one new guide end to end.
```

Recommended schedule: every 6 hours.

## Invariants

- The canonical workspace is `/home/ubuntu/app/momentbook-guide` on `momentbook-dev`.
- The detailed contract lives in `prompts/guide-publisher.md`.
- Scheduled runs must use `automation/parallel-agent-workflow.md`.
- Role prompts live under `automation/agents/`.
- The registry is `registry/editorial-guide-registry.md`.
- The job publishes one guide only.
- Production scope is one verified `translationGroupId`.
- Production writes are DB-only.
- No temporary files should remain after verification.
- Overlapping runs are not allowed. Use the lock path in `automation/environment.yaml`.
- Stale locks older than the environment threshold may be replaced only when the recorded PID is not running.

## Preflight

1. Confirm development access:

```sh
ssh momentbook-dev
cd /home/ubuntu/app/momentbook-guide
```

2. Confirm the automation files exist:

```sh
test -f automation/environment.yaml
test -f automation/parallel-agent-workflow.md
test -f automation/prompt-dev-to-prod.md
test -f prompts/guide-publisher.md
test -f tools/quality/article-quality-gate.js
test -f registry/editorial-guide-registry.md
```

3. Confirm production access only when the job is ready to replicate:

```sh
ssh momentbook
```

## 6-Hour Automation Setup

Use a scheduled Codex automation with:

- Frequency: every 6 hours
- Workspace: the local Codex project that can run `ssh momentbook-dev`
- Prompt: `Use /home/ubuntu/app/momentbook-guide/automation/prompt-dev-to-prod.md and publish one new guide end to end using the parallel agent workflow.`
- Execution expectation: the job connects to `momentbook-dev`, reads the canonical remote files, uses bounded role agents with explicit run artifacts, and only then connects to `momentbook` for DB-only replication.

Do not schedule this as a thread heartbeat. It is a standalone recurring job with external SSH and DB verification.

## Safe Production Pattern

Prefer one-shot execution that leaves no script file behind. If a temporary production file is unavoidable:

- write it to a clearly temporary path
- use it once
- remove it before final verification
- include it in the final removed artifact list

## Completion Evidence

Every run must leave a visible final report. Do not allow the automation to finish as "nothing to report"; success, skip, and controlled stop outcomes all need an audit trail.

The final report must include:

- role outputs and QA verdicts
- automated article quality gate result
- dev DB verification for the 9 language records
- prod DB verification for the same 9 language records
- final registry status
- removed artifact list
