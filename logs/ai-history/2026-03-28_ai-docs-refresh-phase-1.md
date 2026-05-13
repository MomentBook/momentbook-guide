# 2026-03-28 AI Docs Refresh Phase 1

## What changed

- Synced AI-facing canonical docs with current codebase facts.
- Updated package version from `2.1.12` to `2.1.14` in `AGENTS.md` and `docs/PRODUCT.md`.
- Corrected `README.md` route inventory total from `60` to `47`.
- Added current runtime notes for publish localization dependency and clarified that the recap diagnostics audit TTL config key exists but is not actively consumed yet.
- Clarified that `docs/ai/*` is historical task-log material, not a binding source of truth.

## Why

- Recent codebase changes had drifted from the AI operating docs.
- The current repo uses the accepted ADR model where `AGENTS.md`, `docs/PRODUCT.md`, and `README.md` must stay aligned with code.

## Files deleted/added

- Added: `docs/ai/2026-03-28_ai-docs-refresh-phase-1.md`

## Risks/TODO

- Continue phase-by-phase verification of controller-specific notes against implementation details.
- No ADR text changes were needed in this phase because contracts/policies were clarified, not changed.
