# Tools

Active helper scripts for guide validation and content-only repair.

## Stages

- `quality/`: article quality gates and inventory guards.
- `repair/`: content-only export, patch, and repair planning helpers used by
  post-publish review.

## Active Gates

- `quality/article-quality-gate.js`: body/title readability, localization, and
  source-section checks.
- `quality/article-contract-gate.js`: language coverage, shared group metadata,
  source-checked date, slug date, and DB timestamp checks. Use `--db` for
  exported database records.

Dated generation, seed, import, refresh, and write scripts were removed from
active context so new runs do not imitate stale payloads or dates.
