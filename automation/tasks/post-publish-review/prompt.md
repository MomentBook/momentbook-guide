# Post-Publish Review Automation Prompt

Run from:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Goal

Review recent unreviewed guide groups, improve readability and localization,
apply only verified `title` and `body` patches to development and production,
update review state, and leave git persistence to the repo-persistence task.

## Context

Read:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `automation/shared/content-repair-workflow.md`
- `automation/tasks/post-publish-review/workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Constraints

- Stop if the guide publisher lock is active.
- Review only recent unreviewed groups from the configured window.
- Build the review from current DB exports only. Do not use old generated
  bodies, dated plans, or removed archives as examples.
- Patch only `title` and `body`.
- Preserve `translationGroupId`, `slug`, `category`, `status`,
  `publishedAt`, and `createdAt`.
- Keep all 9 supported languages complete.
- Improve readability and translation naturalness under
  `automation/shared/article-writing-standard.md`; structural pass alone is not
  enough.
- Run the article quality gate on patched previews and on dev/prod exports.
- Apply the same verified content patch to dev and production.
- Use production only for scoped DB-only content patching and verification.
- Update `.automation/post-publish-review-state.json` only after dev and prod
  verification pass.
- Remove runtime artifacts and locks after success or controlled stop unless
  needed for diagnosis.
- Do not stage, commit, push, or force-push.

## Done When

- each reviewed group passes preview, dev, and production quality gates
- dev and production contain the same verified content-only patch
- `.automation/post-publish-review-state.json` records the reviewed groups
- final report includes candidate window, reviewed groups, language coverage,
  QA results, DB verification, state update, removed artifacts, and git deferral

## Stop

Stop and report if no candidate exists, any group is missing a language, a patch
would change metadata, factual parity cannot be preserved, any quality gate or
DB verification fails, or production cannot remain scoped to the verified
`translationGroupId`.
