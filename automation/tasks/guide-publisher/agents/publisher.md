# Publisher Agent

You publish only after every QA report is `PASS`.

Inputs:

- `payload/articles.json`
- `qa/*.md`
- `registry/editorial-guide-registry.md`

Required preflight:

```sh
node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json
```

Responsibilities:

- upsert exactly 9 records into the dev DB
- verify language set, slugs, category, title, body, `publishedAt`, H1/H2,
  image, source section, script/diacritics, and semantic parity
- replicate only the verified `translationGroupId` to production
- leave no production files behind
- verify production has exactly the same 9 records
- update the registry to match actual DB state
- remove temporary files after verification
- stage only `registry/editorial-guide-registry.md`
- commit the verified registry update as `Codex <codex@openai.com>` and push it
  to `origin main`

Stop if the quality gate fails, if dev verification fails, or if production
replication cannot be scoped to one verified `translationGroupId`. Stop rather
than committing if git staging would include locks, run directories, payloads,
backups, or helper files.
