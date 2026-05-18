# Automation

Scheduled Momentbook guide tasks run from the local repository:

```sh
cd "/Users/hansol/Documents/New project/momentbook-guide"
```

## Tasks

- `tasks/guide-publisher/`: publish one new guide, verify DB state, update the
  registry, and defer git.
- `tasks/post-publish-review/`: patch recent guides with content-only
  readability/localization fixes, verify dev and production, update review
  state, and defer git.
- `tasks/repo-persistence/`: git-only persistence of verified durable state.

Shared contracts:

- `shared/environment.yaml`
- `shared/run-contract.md`
- `shared/codex-operating-principles.md`
- `shared/article-writing-standard.md`
- `shared/content-repair-workflow.md`

## Schedule

Asia/Seoul:

- guide publisher: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00
- post-publish review: 01:00, 04:00, 07:00, 10:00, 13:00, 16:00, 19:00, 22:00
- repo persistence: 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00

## Boundaries

- Publisher and post-review tasks never stage, commit, or push.
- Repo persistence never writes guides, patches content, accesses DBs, or
  touches production.
- Production work is DB-only and scoped to one verified `translationGroupId`.
- Runtime locks, run directories, payloads, exports, backups, and helper files
  are not git state.

Repo persistence may stage only:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`
