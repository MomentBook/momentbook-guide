# 2026-03-28 AI Docs Refresh Phase 2

## What changed

- Re-verified controller-level behavior for `users`, `public users`, `journeys/public`, `journeys/location`, and `journeys/recap`.
- Added missing high-signal behavior notes to `README.md` for guest profile handling, consent payloads, public user sorting, and public journey list query support.

## Why

- The route inventory alone was not enough for agent work.
- Several implementation-important behaviors existed only in controllers/services and were easy to miss during future edits.

## Files deleted/added

- Added: `docs/ai/2026-03-28_ai-docs-refresh-phase-2.md`

## Risks/TODO

- More endpoint-by-endpoint Swagger-to-README comparison is still possible, especially in `auth` and `notifications`.
