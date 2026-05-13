# 2026-04-14 AI docs migration

What changed
- created an external AI doc root outside the repo
- migrated the existing `momentbook-api/docs/ai` files from the dev server into this directory
- synced those docs into the shared remote path `/home/ubuntu/app/docs/momentbook-api/ai`
- future festival-guide research and batch notes should be written there instead of inside the repo

Why
- AI working logs inside `momentbook-api/docs/ai` can get mixed into normal repo commits
- the shared external docs tree is intended to hold long-running planning, source research, and batch history

Migrated source
- dev server: `/home/ubuntu/app/momentbook-api/docs/ai`
- shared target: `/home/ubuntu/app/docs/momentbook-api/ai`
- staging copy: `/Users/hansol/workspace/ai/docs/momentbook-api/ai`
- synced on 2026-04-14 via `rsync`

Rules going forward
- add new AI task logs only in `/home/ubuntu/app/docs/momentbook-api/ai`
- keep logs short but sufficient to resume work after context compression
- use dated filenames: `YYYY-MM-DD_<topic>.md`
- keep canonical product and code decisions in the repo, but keep AI run logs here
