# Environments

## Local Guide Repository

The guide repository is local-only after migration:

```sh
cd "/Users/hansol/workspace/momentbook-guide"
```

All guide automation prompts, workflows, registry updates, and git persistence
must read files from this local checkout. Do not treat
`/home/ubuntu/app/momentbook-guide` on the development server as canonical.

## Development

```sh
ssh momentbook-dev
```

Development access is still used for app/API environment and DB verification.
Related application paths:

- `/home/ubuntu/app/momentbook-api`
- `/home/ubuntu/app/momentbook-web`

The development server does not need a `momentbook-guide` checkout for current
automation.

## Production

```sh
ssh momentbook
```

Production work for guide publication should be DB-only unless the user
explicitly asks for files to be created. Do not leave import scripts, payload
JSON, backups, or temp helpers in production after verification.

Production guide replication must be scoped to the single `translationGroupId`
verified in development for the current task. Do not copy "everything added this
session" by time range unless the user explicitly provides and confirms that
range.

## Git Persistence

Guide publication and post-publish review tasks do not commit or push. The
separate repo persistence automation commits and pushes verified durable state
one hour after review.

Allowed git persistence paths:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`

Runtime locks, run directories, exports, payloads, backups, and temporary helper
scripts stay out of git. Automation commits use `Codex <codex@openai.com>` as
both author and committer.

## Secret Handling

Do not write credentials, database URLs, API keys, or environment-specific
secret values into this workspace. Read environment config from the active
application environment when needed.

## Automation Files

Local files:

- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/tasks/guide-publisher/prompt.md`
- `automation/tasks/guide-publisher/runbook.md`
- `automation/tasks/post-publish-review/prompt.md`
- `automation/tasks/repo-persistence/prompt.md`

These files contain no secrets. They describe hosts, paths, policies, quality
gates, and final reporting requirements for guide publication and
post-publication review.
