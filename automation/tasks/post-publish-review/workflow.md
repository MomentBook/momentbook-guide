# Post-Publish Review Workflow

Improves recently published production guides with content-only admin API
patches.

## Paths

- repo: `/Users/hansol/workspace/momentbook-guide`
- lock: `.automation/post-publish-review.lock`
- run directory: `.automation/review-runs/<run_id>/`
- durable output: `.automation/post-publish-review-state.json`

## Candidate Window

- look back 8 hours
- ignore groups published less than 10 minutes ago
- skip groups already recorded in `.automation/post-publish-review-state.json`

## Steps

1. Complete `automation/shared/run-contract.md` preflight.
2. Read the prompt, environment contract, admin articles API contract, shared
   Codex rules, repair workflow, run contract, article writing standard,
   authoring guide, and registry.
3. Stop if the publisher lock is active.
4. Acquire the review lock. Stop if another review is active.
5. Export recent unreviewed candidate groups from production with
   `GET /v2/admin/articles`.
6. Export current production records for each selected group with
   `GET /v2/admin/articles` and `GET /v2/admin/articles/{articleId}`, then run
   `node tools/quality/article-contract-gate.js --admin-api <export.json>`.
   Stop here if visible metadata already violates the publication contract;
   content-only review must not hide record-contract defects.
7. Write a short review plan with exact readability and localization
   naturalness fixes.
8. Create content-only patches by disjoint language ownership.
9. Merge patches and verify every update contains only `language`, `title`, and
   `body`.
10. Run both executable gates on the patched preview:
    - `node tools/quality/article-quality-gate.js <patched-preview.json>`
    - `node tools/quality/article-contract-gate.js --admin-api <patched-preview.json>`
11. Apply the patch to production with `PATCH /v2/admin/articles/{articleId}`,
    export the group through the admin API, and run both gates.
12. Update `.automation/post-publish-review-state.json` after production API
    verification passes.
13. Remove lock and runtime artifacts unless preserved for diagnosis.
14. Report the result with the run-contract final report fields. Do not stage,
    commit, or push.

## Parallelism

Allowed only when ownership is disjoint:

- different `translationGroupId`s
- language reviewers after the review plan is frozen
- QA after the merged patch is frozen

Never run git persistence in this task.

## Stop Conditions

Stop if the publisher lock is active, no candidate exists, a language is
missing, existing metadata violates the contract, metadata would drift, factual
parity cannot be preserved, either executable gate fails, production API
verification fails, or production scope is unsafe.
