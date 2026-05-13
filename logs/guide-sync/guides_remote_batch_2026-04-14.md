# Remote Guides Batch Summary

Date: 2026-04-14
Remote repo: `/home/ubuntu/app/momentbook-api`

Created remote docs:
- `docs/guides/AUTHORING_GUIDE.md`
- `docs/guides/PARALLEL_WORKFLOW.md`
- `docs/guides/2026-04_EDITORIAL_PLAN.md`

Created remote scripts:
- `scripts/generate-editorial-guides-2026-04.js`
- `scripts/seed-editorial-guides-2026-04.js`
- `scripts/generated/editorial-guides-2026-04.json`

Seeded topic groups:
1. `europe-entry-rules-2026-ees-etias-guide-2026-03-18`
2. `kyoto-first-time-travel-guide-2026-03-31`
3. `songkran-2026-bangkok-guide-2026-04-07`
4. `jet-lag-recovery-guide-for-long-haul-trips-2026-04-12`

Verification:
- 4 topic groups
- 36 inserted article records
- 9 languages per group: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`
- `destination-guide` category now present in the dataset
- Public API check succeeded on `GET /v2/articles?lang=en` and `GET /v2/articles?lang=ko`

Cleanup:
- Backed up 5 junk/test article records to `/home/ubuntu/app/momentbook-api/scripts/generated/article-cleanup-backup-2026-04-14.json`
- Deleted slugs: `test`, `testtest`, `article-2ec82f9268`, `aazffefe`, `ᄆᄌᄃᄅᄌᄃᄅ`
- Remaining article count after cleanup: `81`
- Remaining singleton translation groups after cleanup: `0`
- Public API recheck on `GET /v2/articles?lang=en&limit=3&page=1` and `GET /v2/articles?lang=ko&limit=3&page=1` returned only editorial guide slugs

Image refresh:
- Created remote script `/home/ubuntu/app/momentbook-api/scripts/refresh-editorial-guide-images-2026-04.js`
- Backed up pre-refresh content to `/home/ubuntu/app/momentbook-api/scripts/generated/editorial-guide-image-refresh-backup-2026-04-14.json`
- Updated 4 recent editorial guide groups across 36 localized article records
- Refreshed slugs: `europe-entry-rules-2026-ees-etias-guide-2026-03-18`, `kyoto-first-time-travel-guide-2026-03-31`, `songkran-2026-bangkok-guide-2026-04-07`, `jet-lag-recovery-guide-for-long-haul-trips-2026-04-12`
- Synced the same image changes into `/home/ubuntu/app/momentbook-api/scripts/generated/editorial-guides-2026-04.json`
- Public API verification confirmed updated `coverImage.url` and localized `coverImage.alt` for `lang=en` and `lang=ko`

Production transfer:
- Confirmed `ssh momentbook` is the production environment and `/home/ubuntu/app/momentbook-api/.env.production` points to the production `momentbook` database
- Exported 36 guide article documents from development DB to `/home/ubuntu/app/momentbook-api/scripts/generated/editorial-guides-2026-04.prod-db-export.json`
- Uploaded the export to production and backed up pre-import matches to `/home/ubuntu/app/momentbook-api/scripts/generated/editorial-guides-2026-04.prod-preimport-backup.json`
- Upserted 36 production `articles` records for the 4 guide slugs and all 9 supported languages
- Detected a production import issue where JSON transport had converted `createdAt`, `publishedAt`, and `updatedAt` into strings
- Backed up the string-date state to `/home/ubuntu/app/momentbook-api/scripts/generated/editorial-guides-2026-04.prod-string-date-backup.json`
- Rewrote the 36 imported production records with real MongoDB `Date` values and reverified API success on `GET /v2/articles?lang=en&limit=20&page=1` and `GET /v2/articles?lang=ko&limit=20&page=1`
- Final production counts: total `articles` = `81`, imported guide records = `36`
