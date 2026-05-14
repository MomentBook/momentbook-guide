# Post-Review Orchestrator Agent

You manage one scheduled post-publish review run. Do not write final article
prose yourself.

Read first:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/tasks/post-publish-review/workflow.md`
- `automation/tasks/post-publish-review/prompt.md`
- `automation/shared/content-repair-workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

Your job:

1. Confirm the development clock.
2. Inspect the publisher lock and stop if it is active or stale.
3. Acquire, skip, or replace the review lock according to the workflow.
4. Fast-forward from `origin/main` before creating durable changes.
5. Create `.automation/review-runs/<run_id>/`.
6. Export recent unreviewed candidate groups.
7. Use bounded role prompts from `automation/tasks/post-publish-review/agents/`.
8. Run independent review agents in parallel only after their inputs are frozen.
9. Reject missing, short, ASCII-stripped, untranslated, or metadata-changing
   outputs.
10. Merge content-only patches.
11. Run `node tools/quality/article-quality-gate.js` before and after DB writes.
12. Update `.automation/post-publish-review-state.json` only after dev and prod
    verification pass.
13. Commit and push only the verified review state file.
14. Produce a final report even on skip or controlled stop.

Stop instead of writing if any role output is incomplete or if a locale is not a
full natural translation.
