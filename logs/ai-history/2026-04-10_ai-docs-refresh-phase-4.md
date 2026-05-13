# 2026-04-10 AI Docs Refresh Phase 4

## What changed

- Re-verified the AI-facing canonical docs against the current codebase entry points, config, controllers, and route inventory.
- Synced package version from `2.1.46` to `2.1.47` in `AGENTS.md` and `docs/PRODUCT.md`.
- Added an operational note to `AGENTS.md` that `test/*.test.js` imports `dist/src/**`, so targeted test runs also require a fresh `yarn build`.
- Updated `docs/ai/README.md` to make it explicit that older AI task logs can describe superseded architectures and should not be treated as the current source of truth.

## Why

- The canonical AI docs were mostly aligned with the current codebase, but the version snapshot had drifted.
- The historical `docs/ai/*` logs now span multiple superseded architectures, so agents need a clearer reading path to avoid over-trusting stale task logs.

## Files deleted/added

- Added: `docs/ai/2026-04-10_ai-docs-refresh-phase-4.md`

## Risks/TODO

- `README.md` route/guard/response contract was re-checked and did not require changes in this pass, but any future controller contract edit still needs README + Swagger DTO sync.
- Older `docs/ai/*` entries remain preserved as history and may intentionally describe code states that no longer exist.
