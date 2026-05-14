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
- Guide publisher automation: `automation/tasks/guide-publisher/prompt.md`
- Post-publish review automation: `automation/tasks/post-publish-review/prompt.md`
- Shared Codex automation principles: `automation/shared/codex-operating-principles.md`
- Authoring rules: `playbooks/authoring-guide.md`
- Canonical registry: `registry/editorial-guide-registry.md`
- Structure rationale: `docs/architecture/ai-workspace-structure.md`
- Development server access: `ssh momentbook-dev`

## Project Layout

- `prompts/`: reusable agent prompts and specialist prompt templates.
- `automation/shared/`: shared environment, Codex operating principles, and repair policy.
- `automation/tasks/guide-publisher/`: new-guide publication automation prompt, workflow, role prompts, and runbook.
- `automation/tasks/post-publish-review/`: review-and-localization polish automation prompt, workflow, and role prompts.
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
5. For scheduled publishing, split source research, master writing, localization, QA, and publishing using `automation/tasks/guide-publisher/workflow.md`.
6. Run `node tools/quality/article-quality-gate.js` against the article payload before any DB write.
7. Upsert the 9 language records directly into the active DB.
8. If production completion is requested, replicate only the verified `translationGroupId` to production DB with no files left behind.
9. Remove temporary working files and update the registry with the real DB state.

Post-publish review uses `automation/tasks/post-publish-review/workflow.md`.
It only writes `title` and `body`, and it applies the same verified content
patch to dev and production.

## Migration Note

The files in this project are a preserved project snapshot. The original
source files were left in place so existing `momentbook-api` and deployment
references do not break while this workspace is being turned into a standalone
guide writing environment.
