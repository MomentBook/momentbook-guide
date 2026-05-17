# Guide Publisher Workflow

This workflow publishes one new guide per run. It runs from the local repository
and uses SSH only for development or production environment access.

## Local Paths

- repo: `/Users/hansol/Documents/New project/momentbook-guide`
- lock: `.automation/guide-publisher.lock`
- run directory: `.automation/runs/<run_id>/`
- durable output: `registry/editorial-guide-registry.md`

## Steps

1. Confirm the working directory is the local repo.
2. Determine the runtime date in `Asia/Seoul` and record it in
   `.automation/runs/<run_id>/00-run-state.json`.
3. Read the prompt, authoring guide, registry, and environment contract.
4. Acquire the local publisher lock. If another run is active, stop and report.
5. Select one registry-safe topic and verify hard facts with official sources.
6. Write the English master article and a fact parity map.
7. Produce all supported localizations: `ko`, `en`, `ja`, `zh`, `es`, `pt`,
   `fr`, `th`, `vi`.
8. Run review checks for structure, localization, parity, dates, and source
   quality.
9. Run `node tools/quality/article-quality-gate.js` on the assembled payload.
10. Upsert the verified guide group in development, then verify exactly 9 records
   for the `translationGroupId`.
11. Replicate only that verified group to production with DB-only execution, then
    verify production.
12. Update `registry/editorial-guide-registry.md` with the real final state.
13. Remove the lock and temporary run artifacts unless preserving them is needed
    to diagnose a controlled stop.
14. Report the result. Do not stage, commit, or push.

## Date Policy

The written date is not a static value inside generated markdown. It is a
runtime value from this automation contract.

- Use the current `Asia/Seoul` calendar date at run start as the written date.
- Use that date for visible written/updated dates, `sourceCheckedDate`, and slug
  dates when the slug includes a date.
- Use the actual DB write timestamp for `publishedAt`.
- Stop if these dates cannot be verified or would point to the future.

## Parallel Work

Parallel agents are allowed only after their inputs are frozen:

- source checks for independent official sources
- localization groups after the English master and parity map are done
- QA gates after all localized records exist

Do not run DB writes, production replication, registry updates, or git
persistence in parallel.

## Stop Conditions

Stop if the lock is active, the topic overlaps the registry, sources cannot
verify hard facts, a language is incomplete or unnatural, a quality gate fails,
dev/prod verification fails, or production replication cannot stay scoped to one
verified `translationGroupId`.

## Final Report

Include the lock result, topic, `translationGroupId`, language coverage, quality
gate result, runtime written date, dev verification, prod verification, registry
update, removed artifacts, and any residual risk.
