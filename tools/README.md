# Tools

Active helper scripts for guide validation, production admin API publication, and
content-only repair.

## Stages

- `quality/`: article quality gates and inventory guards.
- `admin/`: production `api.momentbook.app` admin article API client.
- `repair/`: content-only export, patch, and repair planning helpers used during
  manual review.

## Active Gates

- `quality/article-quality-gate.js`: body/title readability, localization, and
  source-section checks. Use `--admin-create-payload` before create requests so
  payloads are not rejected for server-set `publishedAt`.
- `quality/article-contract-gate.js`: language coverage, shared group metadata,
  source-checked date, slug date, and timestamp checks. Use
  `--admin-create-payload` before API writes, `--db` only for explicit database
  exports, and `--admin-api` for `/v2/admin/articles` exports.
- `admin/articles-api.js`: lists, reads, creates, verifies, and patches
  production editorial articles through the admin API. Write commands require
  `--confirm-production` and read credentials from environment variables or the
  untracked `.codex/automation/admin-api.env` file.

Dated generation, seed, import, refresh, and write scripts were removed from
active context so new work does not imitate stale payloads or dates.
