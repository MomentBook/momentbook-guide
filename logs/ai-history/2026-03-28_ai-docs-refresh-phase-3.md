# 2026-03-28 AI Docs Refresh Phase 3

## What changed

- Re-checked `auth`, `notifications`, `apps/version`, and `health` against README contract notes.
- Added missing README notes for consent-bearing auth success payloads, guest login payload shape, logout-all invalidation count, notification settings response shape, and app version check query requirements.

## Why

- These areas are contract-sensitive and frequently touched during backend work.
- The implementation already guaranteed these behaviors, but the AI-facing route contract summary was missing them.

## Files deleted/added

- Added: `docs/ai/2026-03-28_ai-docs-refresh-phase-3.md`

## Risks/TODO

- `/v2/auth/**` remains a locked contract area, so any future cleanup there should start from DTO/controller responses before touching docs.
