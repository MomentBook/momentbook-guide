# Post-Publish Review Automation Prompt

Run from:

```text
/Users/hansol/workspace/momentbook-guide
```

## Goal

Review recent unreviewed production guide groups, improve readability and
localization, apply only verified `title` and `body` patches through the
production admin articles API, update review state, and leave git persistence
to the repo-persistence task.

## Context

Read:

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/shared/run-contract.md`
- `automation/shared/admin-articles-api.md`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `automation/shared/content-repair-workflow.md`
- `automation/tasks/post-publish-review/workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Constraints

- Stop if the guide publisher lock is active.
- Follow `automation/shared/run-contract.md` for preflight, lock handling,
  controlled stops, cleanup, and final reporting.
- Do not use SSH, direct MongoDB access, remote helper scripts, or a development
  environment.
- Review only recent unreviewed production groups from the configured window.
- Build the review from current production admin API exports only. Do not use old generated
  bodies, dated plans, or removed archives as examples.
- Patch only `title` and `body`.
- Preserve `translationGroupId`, `language`, `slug`, `category`, `publishedAt`,
  and `updatedAt` except for the expected server-side update timestamp change.
- Keep all 9 supported languages complete.
- Before planning content edits, run
  `node tools/quality/article-contract-gate.js --admin-api <export.json>` on
  current production admin API exports. Stop if visible metadata already
  violates the publication contract because this task may patch only `title`
  and `body`.
- Improve readability and translation naturalness under
  `automation/shared/article-writing-standard.md`; structural pass alone is not
  enough.
- Run the article quality gate and article contract gate on patched previews and
  on production admin API exports.
- Apply verified content patches with `PATCH /v2/admin/articles/{articleId}`.
- Update `.automation/post-publish-review-state.json` only after production API
  verification passes.
- Remove runtime artifacts and locks after success or controlled stop unless
  needed for diagnosis.
- Do not stage, commit, push, or force-push.

## Done When

- each reviewed group passes preview and production admin API quality and
  contract gates
- production contains the verified content-only patch
- `.automation/post-publish-review-state.json` records the reviewed groups
- final report includes the run-contract fields plus candidate window, reviewed
  groups, language coverage, QA results, production API verification, state
  update, and git deferral

## Stop

Stop and report if no candidate exists, any group is missing a language,
existing metadata violates the contract, a patch would change preserved
metadata, factual parity cannot be preserved, any executable gate or production
API verification fails, or production cannot remain scoped to the verified
`translationGroupId`.
