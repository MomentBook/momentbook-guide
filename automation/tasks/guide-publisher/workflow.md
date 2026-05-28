# Guide Publisher Workflow

Publishes one new production guide per run through the admin articles API.

## Paths

- repo: `/Users/hansol/workspace/momentbook-guide`
- lock: `.automation/guide-publisher.lock`
- run directory: `.automation/runs/<run_id>/`
- durable output: `registry/editorial-guide-registry.md`

## Steps

1. Complete `automation/shared/run-contract.md` preflight.
2. Create the run directory and write `00-run-state.json`.
3. Read the prompt, environment contract, run contract, admin articles API
   contract, shared Codex rules, authoring guide, article writing standard, and
   registry.
4. Acquire the publisher lock. Stop if another run is active.
5. Select one registry-safe topic.
6. Verify hard facts with official sources and write `02-source-pack.md`.
7. Write the English master under the article writing standard and
   `04-fact-parity-map.md`.
8. Localize all 9 supported languages after the master and parity map are
   frozen.
9. Assemble `payload/articles.json`.
10. Run role QA for writing quality, localization naturalness, and parity.
11. Run both executable gates before any production API write:
    - `node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json`
    - `node tools/quality/article-contract-gate.js --admin-create-payload .automation/runs/<run_id>/payload/articles.json`
12. Authenticate with `POST /v2/auth/email/login`, then create exactly one
    production record per supported language with `POST /v2/admin/articles`.
    Reuse one shared `translationGroupId`; if the first create starts a new
    group, use the returned group id for the remaining languages.
13. Export the written group with `GET /v2/admin/articles` and
    `GET /v2/admin/articles/{articleId}`, then verify exactly 9 production
    records with:
    - `node tools/quality/article-quality-gate.js <admin-api-export.json>`
    - `node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>`
14. Update the registry from verified production admin API state.
15. Remove lock and runtime artifacts unless preserved for diagnosis.
16. Report the result with the run-contract final report fields. Do not stage,
    commit, or push.

## Parallelism

Allowed only after inputs are frozen:

- independent official source checks
- language-group localization after English master and fact parity map
- QA after all localized records exist

Never parallelize production API writes, registry update, or git persistence.

## Stop Conditions

Stop if the lock is active, topic overlaps the registry, official sources fail,
dates or record metadata fail, localization is incomplete, either executable
gate fails, production admin API verification fails, production scope is unsafe,
or cleanup cannot be completed safely.
