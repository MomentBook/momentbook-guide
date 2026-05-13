# 2026-04-14 guide sync dev -> prod

- source export created on dev:
  - `/home/ubuntu/app/momentbook-api/scripts/generated/guide-sync-dev-export-2026-04-14.json`
- local backup copy:
  - `/Users/hansol/workspace/ai/guide-sync-dev-export-2026-04-14.json`
- prod backup created before import:
  - `/home/ubuntu/app/momentbook-api/scripts/generated/guide-sync-prod-backup-2026-04-14.json`

Guide scope copied
- editorial topics: 4
- festival topics: 9
- total guide slugs: 13
- total records exported from dev: 117

Prod import result
- matched existing records: 36
- modified existing records: 36
- upserted missing records: 81
- deleted stale records within target slugs: 0

Verification
- prod DB now has 117 article records across the 13 guide slugs
- every target slug has 9 languages
- sampled prod API responses on `127.0.0.1:3001` returned the synced guide articles for `ja`, `pt`, `th`, `ko`, and `vi`
- prod total article count after sync: 162
