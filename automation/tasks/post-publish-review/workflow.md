# Post-Publish Review Workflow

This workflow improves recently published guides after the publisher automation
has finished. It is content-only: patch `title` and `body`, preserve all
metadata and URLs.

## Local Paths

- repo: `/Users/hansol/Documents/New project/momentbook-guide`
- lock: `.automation/post-publish-review.lock`
- run directory: `.automation/review-runs/<run_id>/`
- durable output: `.automation/post-publish-review-state.json`

## Candidate Window

- look back 8 hours
- ignore groups published less than 10 minutes ago
- skip groups already recorded in `.automation/post-publish-review-state.json`

## Steps

1. Confirm the working directory is the local repo.
2. Read the prompt, environment contract, repair workflow, authoring guide, and
   registry.
3. If the publisher lock is active, stop and report.
4. Acquire the local review lock. If another review is active, stop and report.
5. Export recent unreviewed candidate groups from development.
6. For each selected `translationGroupId`, export current dev and production
   records.
7. Build a short review plan that lists the exact readability or localization
   fixes needed.
8. Create content-only patches for English, CJK, Latin, and SEA language groups.
9. Merge patches and verify they contain only `translationGroupId`, `language`,
   `title`, and `body`.
10. Run the quality gate on the patched preview.
11. Apply the patch to development, export the group, and run the quality gate.
12. Apply the same patch to production, export the group, and run the quality
    gate.
13. Update `.automation/post-publish-review-state.json` only after dev and prod
    verification pass.
14. Remove the lock and temporary review artifacts unless preserving them is
    needed to diagnose a controlled stop.
15. Report the result. Do not stage, commit, or push.

## Parallel Work

Parallel agents are allowed when ownership is disjoint:

- different `translationGroupId`s
- language reviewers after the review plan is frozen
- QA gates after the merged patch is frozen

Do not run production repair before development repair passes. Do not run git
persistence in this task.

## Stop Conditions

Stop if the publisher lock is active, no candidate exists, a group is missing a
supported language, a patch changes metadata, factual parity cannot be
preserved, a quality gate fails, dev/prod verification fails, or production work
cannot stay scoped to the verified `translationGroupId`.

## Final Report

Include the candidate window, reviewed groups, language coverage, QA results,
dev verification, prod verification, state-file update, removed artifacts, and
any residual risk.
