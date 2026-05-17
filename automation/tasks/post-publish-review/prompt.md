# Post-Publish Review Automation Prompt

Run from the local repository, not from the remote guide checkout.

Local repo:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

Development access: `ssh momentbook-dev`
Production access: `ssh momentbook`

## Task

Review recently published Momentbook guide groups and improve readability and
localization quality. Preserve metadata and URLs. Patch only `title` and `body`.

This task updates durable review state only in the local repository. It does not
commit or push. The separate `repo-persistence` automation handles git one hour
later.

## Read First

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/tasks/post-publish-review/workflow.md`
- `automation/shared/content-repair-workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Rules

- Work in the local repo path above.
- Use `ssh momentbook-dev` for development DB export, patch, and verification.
- Use `ssh momentbook` only for the same scoped content patch in production.
- Review recent unreviewed groups from the configured candidate window.
- Patch only `title` and `body`; never change `translationGroupId`, `slug`,
  `category`, `status`, `publishedAt`, or `createdAt`.
- Keep all 9 supported languages complete: `ko`, `en`, `ja`, `zh`, `es`, `pt`,
  `fr`, `th`, `vi`.
- Run the article quality gate on patched previews and on dev/prod exports.
- Update `.automation/post-publish-review-state.json` only after dev and prod
  verification pass.
- Remove local review artifacts and locks after success, failure, or controlled
  stop unless they are needed for diagnosis.
- Do not commit, push, force-push, or stage files in this task.

## Stop And Report

Stop if the publisher lock is active, no candidate exists, a group is missing a
language, a patch changes metadata, factual parity cannot be preserved, any
quality gate fails, dev/prod verification fails, or production work cannot stay
scoped to the verified `translationGroupId`.

## Final Report

Always report the candidate window, reviewed `translationGroupId`s, language
coverage, QA verdicts, dev/prod verification, state-file update, removed
artifacts, and the fact that git persistence is deferred to `repo-persistence`.
