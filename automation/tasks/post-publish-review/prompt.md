# Automated Post-Publish Review Prompt

Run this automation from the canonical development environment. Do not work
from a local snapshot.

## Task

Review the Momentbook travel guides created by the most recent publisher
automation run, then improve readability and localization quality across all
supported languages.

This is a content repair run, not a new guide generation run. Preserve metadata
and URLs. Write only better `title` and `body` content.

Use a review -> focused repair -> validation loop. The goal is not to rewrite a
published guide from scratch; it is to make the existing verified guide easier
to read, more natural in every supported language, and still fact-identical.

## Required Environment

- Connect to development with `ssh momentbook-dev`.
- Work in `/home/ubuntu/app/momentbook-guide`.
- Use `/home/ubuntu/app/momentbook-guide/automation/shared/environment.yaml` as the
  environment contract.
- Read `/home/ubuntu/app/momentbook-guide/automation/shared/codex-operating-principles.md`
  and apply it to parallel review, patch ownership, validation, and final
  reporting.
- Read `/home/ubuntu/app/momentbook-guide/automation/tasks/post-publish-review/workflow.md`
  fully and follow it as the execution contract.
- Read `/home/ubuntu/app/momentbook-guide/automation/shared/content-repair-workflow.md`
  fully before creating any patch.
- Use the role prompts under
  `/home/ubuntu/app/momentbook-guide/automation/tasks/post-publish-review/agents/`.

## Concurrency Guard

This automation should run every 6 hours, offset from the publisher automation
by roughly one hour.

Before doing review work:

1. Inspect `/home/ubuntu/app/momentbook-guide/.automation/guide-publisher.lock`.
2. If the publisher lock PID is active, stop and report that the writer is still
   active.
3. If the publisher lock is stale, do not clear it from this review automation.
   Stop and report the stale lock evidence.
4. Acquire `/home/ubuntu/app/momentbook-guide/.automation/post-publish-review.lock`.
5. If another review is active, stop and report it.
6. Remove the review lock after success, failure, or controlled stop.

Do not create or leave any lock or helper file on production.

## Execution

1. Read `AGENTS.md`, `automation/shared/environment.yaml`,
   `automation/shared/codex-operating-principles.md`,
   `automation/tasks/post-publish-review/workflow.md`,
   `automation/shared/content-repair-workflow.md`, `playbooks/authoring-guide.md`, and
   `registry/editorial-guide-registry.md`.
2. Inspect the publisher lock and acquire the review lock.
3. Update the repo before work with `git fetch origin main` and
   `git pull --ff-only origin main`. Stop if the branch cannot fast-forward or
   the workspace has disallowed changes that would be committed.
4. Create `.automation/review-runs/<run_id>/`.
5. Export recent unreviewed candidate groups from dev:

   ```sh
   node tools/repair/export-recent-article-groups.js \
     --since-hours 8 \
     --min-age-minutes 10 \
     --state .automation/post-publish-review-state.json \
     --skip-reviewed \
     --out .automation/review-runs/<run_id>/01-candidate-groups.json
   ```

6. If there are no candidate groups, update only the final report, remove the
   review run directory and lock, and stop.
7. For each candidate group, export the current dev records and production
   records into `groups/<translationGroupId>/`.
8. Run review work with bounded parallel agents:
   - first run the review planner for each group
   - after each plan is frozen, run the English readability editor, CJK
     localization reviewer, Latin localization reviewer, and SEA localization
     reviewer in parallel
   - after patches are merged, run QA gates in parallel
9. Merge patches into `merged.content-patch.json`. The patch must include only
   `translationGroupId` and `updates[]` with `language`, `title`, and `body`.
10. Validate a patched preview locally with:

   ```sh
   node tools/quality/article-quality-gate.js <patched-preview.json>
   ```

11. Apply the content-only patch to dev only after every QA report and the
    automated quality gate pass.
12. Export the group from dev and run the same quality gate.
13. Apply the same content-only patch to production using DB-only execution.
14. Export the group from production and run the same quality gate.
15. Update `.automation/post-publish-review-state.json` for each verified
    `translationGroupId`.
16. Remove temporary scripts, generated payloads, backups, helper files, the run
    directory, and the review lock created during the task.
17. Commit and push the verified repository state: stage only
    `.automation/post-publish-review-state.json`, commit if the staged diff is
    non-empty, rebase on `origin/main` only if needed and conflict-free, then
    push to `origin main`. Never stage locks, review run directories, exports,
    payloads, backups, or helper files.

## Performance And Patch Rules

- Give every reviewer the frozen `before.dev.json`, production metadata
  comparison, review plan, and patch schema. Do not let reviewers infer context
  from memory.
- Reviewers may work in parallel only because each owns disjoint languages.
- Keep patch files small. Do not include unchanged languages unless a language
  needs a real readability or localization repair.
- If a reviewer produces a metadata-changing patch, discard it and rerun that
  role with the schema failure as feedback.
- Prefer natural local writing over literal translation, but preserve every
  hard fact and warning from the verified group.
- Run the same quality gate against dev and prod exports after applying.
- Do not use broad git staging. Only stage paths listed in
  `git_persistence.include_paths.post_publish_review`.

## Supported Languages

Every reviewed guide must remain complete in:

- `ko`
- `en`
- `ja`
- `zh`
- `es`
- `pt`
- `fr`
- `th`
- `vi`

## Stop Instead Of Publishing

Stop and report if any of these happen:

- The publisher lock is active or stale.
- No recent unreviewed group exists.
- The target group does not have all 9 supported languages.
- A patch would change `translationGroupId`, `slug`, `category`, `status`,
  `publishedAt`, or `createdAt`.
- A reviewer cannot preserve factual parity.
- Any supported language would be incomplete, summarized, or not naturally
  localized.
- Spanish, Portuguese, French, or Vietnamese is missing expected diacritics.
- Korean, Japanese, Chinese, or Thai is missing expected script.
- The automated article quality gate fails.
- Dev DB verification fails.
- Production replication cannot be scoped to the same verified
  `translationGroupId`.
- Production would require leaving files behind.
- The repository cannot be fast-forwarded from `origin/main` before work begins.
- The final git commit or push would include files outside the allowlist.

## Final Response

Always produce a visible final report. This automation must never end as
"nothing to report" because every run needs an audit trail, including skip and
no-candidate cases.

Report only the high-signal result:

- candidate window
- reviewed `translationGroupId`s
- language coverage
- QA gate verdicts
- automated article quality gate results
- dev DB verification result
- prod DB verification result
- state-file update
- git commit hash, or why no commit was needed
- git push status
- removed run directory and artifacts
- whether the run acquired or skipped the lock
- any residual risk
