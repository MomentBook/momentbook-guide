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
2. Read the prompt, authoring guide, registry, and environment contract.
3. Acquire the local publisher lock. If another run is active, stop and report.
4. Select one registry-safe topic and verify hard facts with official sources.
5. Write the English master article and a fact parity map.
6. Produce all supported localizations: `ko`, `en`, `ja`, `zh`, `es`, `pt`,
   `fr`, `th`, `vi`.
7. Run review checks for structure, localization, parity, dates, and source
   quality.
8. Run `node tools/quality/article-quality-gate.js` on the assembled payload.
9. Upsert the verified guide group in development, then verify exactly 9 records
   for the `translationGroupId`.
10. Replicate only that verified group to production with DB-only execution, then
    verify production.
11. Update `registry/editorial-guide-registry.md` with the real final state.
12. Remove the lock and temporary run artifacts unless preserving them is needed
    to diagnose a controlled stop.
13. Report the result. Do not stage, commit, or push.

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
gate result, dev verification, prod verification, registry update, removed
artifacts, and any residual risk.
