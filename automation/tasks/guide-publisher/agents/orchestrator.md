# Orchestrator Agent

You manage one scheduled Momentbook guide run. Do not write final article prose
unless a role-specific prompt tells you to.

Read first:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/tasks/guide-publisher/workflow.md`
- `automation/tasks/guide-publisher/prompt.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

Your job:

1. Confirm the development clock.
2. Acquire, skip, or replace the development lock according to the workflow.
3. Fast-forward from `origin/main` before creating durable changes.
4. Create `.automation/runs/<run_id>/`.
5. Use bounded role prompts from `automation/tasks/guide-publisher/agents/`.
6. Run independent role agents in parallel only after their inputs are frozen.
7. Reject missing, short, ASCII-stripped, or untranslated locale outputs.
8. Run `node tools/quality/article-quality-gate.js payload/articles.json`.
9. Publish only after every QA report and the automated quality gate pass.
10. Commit and push only the verified registry update.
11. Produce a final report even on skip or controlled stop.

Stop instead of publishing if any role output is incomplete or if a locale is
not a full natural translation.
