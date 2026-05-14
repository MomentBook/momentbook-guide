# Momentbook Guide Agent Instructions

## Project Purpose

- This workspace exists to operate Momentbook editorial guide writing, validation, registry maintenance, and DB publication.
- Canonical development location: `/home/ubuntu/app/momentbook-guide`.
- Active application code and DB helpers may still live in `/home/ubuntu/app/momentbook-api` and `/home/ubuntu/app/momentbook-web`.

## Start Points

- Main publication prompt: `prompts/guide-publisher.md`
- Automation prompt: `automation/tasks/guide-publisher/prompt.md`
- Automation environment contract: `automation/shared/environment.yaml`
- Shared Codex automation principles: `automation/shared/codex-operating-principles.md`
- Scheduled automation workflow: `automation/tasks/guide-publisher/workflow.md`
- Post-publish review prompt: `automation/tasks/post-publish-review/prompt.md`
- Authoring policy: `playbooks/authoring-guide.md`
- Topic registry: `registry/editorial-guide-registry.md`
- Structure rationale: `docs/architecture/ai-workspace-structure.md`

## Operating Rules

- Treat `registry/editorial-guide-registry.md` as the canonical topic and status ledger.
- Do not consider a guide complete until the active environment DB has all 9 language records.
- If the user asks for production completion, do not stop at dev DB. Replicate only the verified `translationGroupId` to production DB and verify 9 records there too.
- Keep temporary scripts and generated payloads out of the final workflow unless the user explicitly asks to preserve them.
- If temporary files are needed to perform a DB write, remove them after verification and report what was removed.
- Scheduled automation must commit and push only verified durable state after
  dev/prod verification. Stage explicit allowlisted paths only; never use
  broad staging.
- Scheduled automation commits must use `Codex <codex@openai.com>` as author
  and committer.
- Do not commit `.automation` locks, run directories, exported DB snapshots,
  generated payloads, backups, or helper scripts.
- Do not store secrets, credentials, Mongo URIs, API keys, or production host details beyond approved SSH command labels in this repository.
- Historical logs under `logs/` are references, not current instructions.
- Archived scripts under `tools/` may contain old paths; inspect and update them before reuse.

## Guide Publication Checklist

- Read `prompts/guide-publisher.md`, `playbooks/authoring-guide.md`, and `registry/editorial-guide-registry.md`.
- Select a topic not already covered or queued in the registry.
- Verify time-sensitive facts from official sources on the working date.
- Complete the source-language master before writing translations.
- Produce `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, and `vi` records.
- Run date, localization, and semantic parity gates before DB upsert.
- Upsert into the active DB, verify 9 records by `translationGroupId`, then update the registry status.
- If production is requested, connect with `ssh momentbook`, perform DB-only insert/upsert for the verified `translationGroupId`, verify 9 production records, then set registry status to `prod+dev`.
- Commit and push the verified registry update after temporary artifacts and
  locks are removed.
- For scheduled automation, use the bounded role prompts under `automation/tasks/guide-publisher/agents/` and run `node tools/quality/article-quality-gate.js` before any DB write.
- For post-publish review automation, use only content-only patches under the contract in `automation/tasks/post-publish-review/` and preserve `translationGroupId`, `slug`, `category`, `status`, `publishedAt`, and `createdAt`.

## Path Conventions

- Prompts belong in `prompts/`.
- Durable authoring procedures belong in `playbooks/`.
- Mutable topic state belongs in `registry/`.
- Durable review state may use `.automation/post-publish-review-state.json`.
  Other `.automation` files are runtime-only.
- Reusable or archived scripts belong in `tools/<stage>/`.
- Generated JSON and DB exports belong in `artifacts/`.
- Historical notes belong in `logs/`.
- Automation contracts belong under `automation/tasks/<task-id>/`.
- Shared automation policy belongs under `automation/shared/`.
