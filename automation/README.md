# Automation

Scheduled Momentbook guide tasks run from the local repository:

```sh
cd "/Users/hansol/workspace/momentbook-guide"
```

## Tasks

- `tasks/guide-publisher/`: publish one new guide through the production admin
  articles API, verify API state, update the registry, and defer git.
- `tasks/post-publish-review/`: patch recent guides with content-only
  readability/localization fixes through the production admin articles API,
  update review state, and defer git.
- `tasks/repo-persistence/`: git-only persistence of verified durable state.

Shared contracts:

- `shared/environment.yaml`
- `shared/run-contract.md`
- `shared/admin-articles-api.md`
- `shared/codex-operating-principles.md`
- `shared/article-writing-standard.md`
- `shared/content-repair-workflow.md`

## Schedule

Asia/Seoul:

- guide publisher: 00:00, 06:00, 12:00, 18:00
- post-publish review: 01:00, 07:00, 13:00, 19:00
- repo persistence: 02:00, 08:00, 14:00, 20:00

## Boundaries

- Publisher and post-review tasks never stage, commit, or push.
- Repo persistence never writes guides, patches content, accesses DBs, or
  touches production.
- Production work uses `https://api.momentbook.app/v2/admin/articles`, never
  SSH or direct MongoDB access, and is scoped to one verified
  `translationGroupId`.
- Article records must pass both `tools/quality/article-quality-gate.js` and
  `tools/quality/article-contract-gate.js`; admin API exports use the contract
  gate's `--admin-api` mode.
- Runtime locks, run directories, payloads, exports, backups, and helper files
  are not git state.

Repo persistence may stage only:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`
