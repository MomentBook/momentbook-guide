# Guide Publisher Workflow

Publishes one new guide per run.

## Paths

- repo: `/Users/hansol/Documents/New project/momentbook-guide`
- lock: `.automation/guide-publisher.lock`
- run directory: `.automation/runs/<run_id>/`
- durable output: `registry/editorial-guide-registry.md`

## Steps

1. Confirm the working directory and runtime `Asia/Seoul` clock.
2. Create the run directory and write `00-run-state.json`.
3. Read the prompt, environment contract, shared Codex rules, authoring guide,
   article writing standard, and registry.
4. Acquire the publisher lock. Stop if another run is active.
5. Select one registry-safe topic.
6. Verify hard facts with official sources and write `02-source-pack.md`.
7. Write the English master under the article writing standard and
   `04-fact-parity-map.md`.
8. Localize all 9 supported languages after the master and parity map are
   frozen.
9. Assemble `payload/articles.json`.
10. Run role QA for writing quality, localization naturalness, parity, and
    `node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json`.
11. Upsert dev DB and verify exactly 9 records.
12. Replicate only the verified group to production with DB-only execution and
    verify exactly 9 records.
13. Update the registry from verified DB state.
14. Remove lock and runtime artifacts unless preserved for diagnosis.
15. Report the result. Do not stage, commit, or push.

## Parallelism

Allowed only after inputs are frozen:

- independent official source checks
- language-group localization after English master and fact parity map
- QA after all localized records exist

Never parallelize DB writes, production replication, registry update, or git
persistence.

## Stop Conditions

Stop if the lock is active, topic overlaps the registry, official sources fail,
dates fail, localization is incomplete, quality gate fails, DB verification
fails, production scope is unsafe, or cleanup cannot be completed safely.
