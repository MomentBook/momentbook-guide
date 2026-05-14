# Automated Guide Publisher Prompt

Run this automation from the canonical development environment. Do not work from a local snapshot.

## Task

Publish one new Momentbook travel guide from dev authoring through production DB verification using the parallel agent workflow.

This is a long-horizon, source-grounded writing workflow. Treat the task
directory as the durable spec and use shared Codex operating principles to keep
the run bounded, auditable, and repairable.

## Required Environment

- Connect to development with `ssh momentbook-dev`.
- Work in `/home/ubuntu/app/momentbook-guide`.
- Use `/home/ubuntu/app/momentbook-guide/automation/shared/environment.yaml` as the environment contract.
- Read `/home/ubuntu/app/momentbook-guide/automation/shared/codex-operating-principles.md` and apply it to delegation, validation, and final reporting.
- Read `/home/ubuntu/app/momentbook-guide/prompts/guide-publisher.md` fully and follow it as the primary execution contract.
- Read `/home/ubuntu/app/momentbook-guide/automation/tasks/guide-publisher/workflow.md` fully and follow it as the scheduled-run execution contract.
- Use the role prompts under `/home/ubuntu/app/momentbook-guide/automation/tasks/guide-publisher/agents/`.

## Concurrency Guard

This automation should run every 6 hours. Before doing any guide work, acquire the development lock declared in `automation/shared/environment.yaml`.

- If the lock already exists, do not start another guide. Report that a previous run appears active and stop.
- If the lock exists but the PID is not running and the lock is older than the stale threshold in `automation/shared/environment.yaml`, replace it and report the stale lock contents.
- If you acquire the lock, remove it after success, failure, or a controlled stop.
- Do not create or leave any lock or helper file on production.

## Execution

1. Read `AGENTS.md`, `automation/shared/environment.yaml`, `automation/shared/codex-operating-principles.md`, `automation/tasks/guide-publisher/workflow.md`, `prompts/guide-publisher.md`, `playbooks/authoring-guide.md`, and `registry/editorial-guide-registry.md`.
2. Acquire the development lock, or stop if a previous run is active.
3. Create the run directory declared by the parallel workflow.
4. Write `00-run-state.json` before role work begins, including clock, lock, model, and phase status.
5. Run registry audit and source research roles with bounded outputs. Prefer official sources and stop if hard facts cannot be verified.
6. Freeze the source pack before writing the English master.
7. Freeze the English master and fact parity map before localization.
8. Run localization agents in parallel by language group: `ko/ja/zh`, `es/pt/fr`, and `th/vi`. Give every localization agent the same frozen fact parity map and output schema.
9. Run QA gates in parallel after all localizations exist. QA agents return distilled pass/fail reports, not raw exploration logs.
10. Assemble `payload/articles.json`.
11. Run `node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json`.
12. Upsert the guide into the dev DB only if every QA report and the automated quality gate pass.
13. Verify dev DB has exactly the expected 9 language records for the new `translationGroupId`.
14. Replicate only that verified `translationGroupId` to production DB using `ssh momentbook`.
15. Leave no files in production. Use DB-only or one-shot execution patterns.
16. Verify production DB has the same 9 language records.
17. Update the registry to the real final state, normally `prod+dev`.
18. Remove temporary scripts, generated payloads, backups, helper files, the run directory, and the development lock created during the task.

## Performance And Quality Rules

- Use the automation model and reasoning setting for orchestration and final judgment.
- Use lighter workers only for narrow read-only scans when the workflow allows it; do not trade away source accuracy, readability, or translation quality.
- Keep every role input small and frozen. Do not dump logs or full database exports into subagent prompts when a summarized handoff file is enough.
- If a role output fails schema, depth, localization, or parity checks, repair the artifact and rerun the gate before moving forward.
- Do not keep retrying without new evidence. Each retry must use a specific gate failure or source conflict as feedback.

## Stop Instead Of Publishing

Stop and report if any of these happen:

- The topic overlaps with the registry.
- Official sources cannot verify the hard facts.
- Today's date, `sourceCheckedDate`, slug date, or `publishedAt` cannot be handled correctly.
- Any supported language would be incomplete, summarized, or not naturally localized.
- Any supported language is ASCII-stripped where natural writing requires script, accents, or tone marks.
- The fact parity map fails.
- The automated article quality gate fails.
- Dev DB verification fails.
- Production replication cannot be scoped to one verified `translationGroupId`.
- Production would require leaving files behind.
- Another active run is already active.

## Final Response

Always produce a visible final report. This automation must never end as "nothing to report" because every run needs an audit trail, even when it skips due to an existing lock or stops at a gate.

Report only the high-signal result:

- topic and why it is registry-safe
- `translationGroupId`
- category
- language slugs
- checked date and `publishedAt`
- parallel role outputs and QA gate verdicts
- automated article quality gate result
- dev DB verification result
- prod DB verification result
- registry status
- removed run directory and artifacts
- whether the run acquired or skipped the lock
- any residual risk
