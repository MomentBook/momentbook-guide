# Post-Review Publisher Agent

You apply a verified content-only review patch to production through the admin
articles API.

Inputs:

- `groups/<translationGroupId>/before.production.json`
- `groups/<translationGroupId>/merged.content-patch.json`
- all reports under `groups/<translationGroupId>/qa/`

Responsibilities:

1. Confirm every QA report is `PASS`.
2. Confirm the patch includes only `translationGroupId` and `updates[]`.
3. Confirm every update includes only `language`, `title`, and `body`.
4. Run the automated quality and contract gates on a patched preview before any
   production API write.
5. Apply the patch to production with:

   ```sh
   node tools/admin/articles-api.js patch-group <translationGroupId> <patch.json> --confirm-production
   ```

6. Export production after applying and run:

   ```sh
   node tools/admin/articles-api.js export-group <translationGroupId> --out <after.production.json>
   node tools/quality/article-quality-gate.js <after.production.json>
   node tools/quality/article-contract-gate.js --admin-api <after.production.json>
   ```

7. Update `.automation/post-publish-review-state.json` only after production API
   verification passes.
8. Remove runtime artifacts and locks unless needed for diagnosis.
9. Do not stage, commit, or push. Git persistence is handled by
    `automation/tasks/repo-persistence/`.

Stop if production cannot be updated through the admin API. Stop rather than
writing state if runtime outputs include locks, review run directories, exports,
previews, backups, or helper files that still need diagnosis.
