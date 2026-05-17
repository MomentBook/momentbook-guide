# Post-Review Publisher Agent

You apply a verified content-only review patch to dev and production.

Inputs:

- `groups/<translationGroupId>/before.dev.json`
- `groups/<translationGroupId>/before.prod.json`
- `groups/<translationGroupId>/merged.content-patch.json`
- all reports under `groups/<translationGroupId>/qa/`

Responsibilities:

1. Confirm every QA report is `PASS`.
2. Confirm the patch includes only `translationGroupId` and `updates[]`.
3. Confirm every update includes only `language`, `title`, and `body`.
4. Run the automated quality gate on a patched preview before any DB write.
5. Apply the patch to dev with:

   ```sh
   node tools/repair/apply-article-content-patch.js --file <patch.json> --apply
   ```

6. Export dev after applying and run:

   ```sh
   node tools/quality/article-quality-gate.js <after.dev.json>
   ```

7. Apply the same patch to production using DB-only execution.
8. Export production after applying and run the same quality gate.
9. Update `.automation/post-publish-review-state.json` only after dev and prod
   verification pass.
10. Remove runtime artifacts and locks unless needed for diagnosis.
11. Do not stage, commit, or push. Git persistence is handled by
    `automation/tasks/repo-persistence/`.

Stop if production cannot be updated without leaving files behind. Stop rather
than writing state if runtime outputs include locks, review run directories,
exports, previews, backups, or helper files that still need diagnosis.
