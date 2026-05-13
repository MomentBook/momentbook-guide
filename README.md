# Momentbook Guide

Momentbook editorial guide writing workspace.

Canonical development location: `/home/ubuntu/app/momentbook-guide`

This project gathers the reusable guide prompt, authoring rules, registry,
previous writing logs, generation scripts, and exported payloads that were
previously spread across `/Users/hansol/workspace/ai`.

## Start Here

- Agent instructions: `AGENTS.md`
- Claude Code bridge: `CLAUDE.md`
- Main reusable prompt: `prompts/guide-publisher.md`
- Automation entrypoint: `automation/prompt-dev-to-prod.md`
- Parallel automation workflow: `automation/parallel-agent-workflow.md`
- Authoring rules: `playbooks/authoring-guide.md`
- Canonical registry: `registry/editorial-guide-registry.md`
- Structure rationale: `docs/architecture/ai-workspace-structure.md`
- Development server access: `ssh momentbook-dev`

## Project Layout

- `prompts/`: reusable agent prompts and specialist prompt templates.
- `automation/`: automation environment contract, compact prompt, and runbook.
- `automation/agents/`: role prompts for scheduled parallel runs.
- `registry/`: mutable source of truth for guide topics and publication state.
- `playbooks/`: human-readable procedures, authoring policy, and planning notes.
- `tools/`: archived scripts grouped by lifecycle stage: generate, write, seed, import, refresh, repair, quality.
- `artifacts/`: archived generated payloads and DB export snapshots.
- `logs/`: historical AI work logs, guide sync notes, and old temporary session helpers.
- `ops/`: environment notes and operational command references without secrets.
- `docs/architecture/`: design rationale for this workspace.

## Common Workflow

1. Read `prompts/guide-publisher.md`.
2. Read `playbooks/authoring-guide.md`.
3. Check `registry/editorial-guide-registry.md`.
4. Write and validate the guide against the prompt quality gates.
5. For scheduled runs, split source research, master writing, localization, QA, and publishing using `automation/parallel-agent-workflow.md`.
6. Run `node tools/quality/article-quality-gate.js` against the article payload before any DB write.
7. Upsert the 9 language records directly into the active DB.
8. If production completion is requested, replicate only the verified `translationGroupId` to production DB with no files left behind.
9. Remove temporary working files and update the registry with the real DB state.

## Migration Note

The files in this project are a preserved project snapshot. The original
source files were left in place so existing `momentbook-api` and deployment
references do not break while this workspace is being turned into a standalone
guide writing environment.
