# Automation

Automation-ready entrypoints for local Momentbook guide publication,
post-publication review, and git persistence.

## Layout

- `shared/`: environment contract, shared repair policy, and Codex operating
  principles used by every automation task.
- `tasks/guide-publisher/`: six-hourly new-guide publication automation.
- `tasks/post-publish-review/`: six-hourly review automation that runs after
  publication and improves readability/localization without metadata drift.
- `tasks/repo-persistence/`: git-only commit and push automation.

Current Codex app schedule, interpreted in Asia/Seoul:

- guide publisher: 03:00, 09:00, 15:00, 21:00
- post-publish review: 04:00, 10:00, 16:00, 22:00
- repo persistence: 05:00, 11:00, 17:00, 23:00

Use these files when creating or updating scheduled automations:

- `shared/environment.yaml`: machine-readable environment and policy contract.
- `shared/codex-operating-principles.md`: current Codex research and operating
  rules for durable, bounded, validated automation.
- `tasks/guide-publisher/prompt.md`: compact new-guide automation prompt.
- `tasks/guide-publisher/workflow.md`: scheduled-run workflow that splits source
  research, master writing, localization, QA, and publishing across bounded
  agents.
- `tasks/post-publish-review/prompt.md`: compact post-publication review prompt.
- `tasks/post-publish-review/workflow.md`: scheduled review workflow that
  improves readability and supported-language localization after publication.
- `tasks/repo-persistence/prompt.md`: compact git-only persistence prompt.
- `tasks/repo-persistence/workflow.md`: commit/push allowlist and procedure.
- `shared/content-repair-workflow.md`: grouped dev-first repair workflow for
  already published articles.

The automation should run from the local repository:

```sh
cd "/Users/hansol/Documents/New project/momentbook-guide"
```

Use `ssh momentbook-dev` for development DB/app access and `ssh momentbook` for
scoped production DB verification.

Production writes must remain DB-only and must be scoped to the single `translationGroupId` verified in development.

Publication and review tasks do not commit or push. After review, the separate
repo persistence task commits and pushes only allowlisted durable state:

- guide publisher: `registry/editorial-guide-registry.md`
- post-publish review: `.automation/post-publish-review-state.json`

Locks, run directories, generated payloads, DB exports, backups, and temporary
helper scripts are runtime artifacts and must not be committed.

Repo persistence commits use `Codex <codex@openai.com>` as both author and
committer.
