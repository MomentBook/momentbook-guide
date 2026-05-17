# Guide Publisher Automation Prompt

Run from the local repository, not from the remote guide checkout.

Local repo:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

Development access: `ssh momentbook-dev`
Production access: `ssh momentbook`

## Task

Publish exactly one new Momentbook travel guide, verify it in development, then
replicate only the verified guide group to production.

This task updates durable state only in the local repository. It does not commit
or push. The separate `repo-persistence` automation handles git one hour after
post-publish review.

## Read First

- `AGENTS.md`
- `automation/shared/environment.yaml`
- `automation/tasks/guide-publisher/workflow.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Rules

- Work in the local repo path above.
- Use `ssh momentbook-dev` only when development DB or app environment access is
  needed.
- Use `ssh momentbook` only for scoped production DB replication and
  verification.
- Publish one `translationGroupId` per run.
- Keep all 9 supported languages complete: `ko`, `en`, `ja`, `zh`, `es`, `pt`,
  `fr`, `th`, `vi`.
- Run `node tools/quality/article-quality-gate.js` before any DB write.
- Update `registry/editorial-guide-registry.md` only after real DB verification.
- Remove local run artifacts and locks after success, failure, or controlled
  stop unless they are needed for diagnosis.
- Do not commit, push, force-push, or stage files in this task.

## Stop And Report

Stop if a lock is active, the topic overlaps the registry, official sources do
not verify hard facts, any language is incomplete or unnatural, the quality gate
fails, dev/prod verification fails, or production work cannot stay scoped to one
verified `translationGroupId`.

## Final Report

Always report the topic, `translationGroupId`, language coverage, quality gate
result, dev verification, prod verification, registry update, removed artifacts,
and the fact that git persistence is deferred to `repo-persistence`.
