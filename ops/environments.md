# Environments

## Development

```sh
ssh momentbook-dev
cd /home/ubuntu/app/momentbook-guide
```

Related application paths:

- `/home/ubuntu/app/momentbook-api`
- `/home/ubuntu/app/momentbook-web`

## Production

```sh
ssh momentbook
```

Production work for guide publication should be DB-only unless the user explicitly asks for files to be created. Do not leave import scripts, payload JSON, backups, or temp helpers in production after verification.

Production guide replication must be scoped to the single `translationGroupId` verified in development for the current task. Do not copy "everything added this session" by time range unless the user explicitly provides and confirms that range.

## Secret Handling

Do not write credentials, database URLs, API keys, or environment-specific secret values into this workspace. Read environment config from the active application environment when needed.

## Automation Files

- Environment contract: `/home/ubuntu/app/momentbook-guide/automation/shared/environment.yaml`
- Shared Codex automation principles: `/home/ubuntu/app/momentbook-guide/automation/shared/codex-operating-principles.md`
- Guide publisher prompt: `/home/ubuntu/app/momentbook-guide/automation/tasks/guide-publisher/prompt.md`
- Guide publisher runbook: `/home/ubuntu/app/momentbook-guide/automation/tasks/guide-publisher/runbook.md`
- Post-publish review prompt: `/home/ubuntu/app/momentbook-guide/automation/tasks/post-publish-review/prompt.md`

These files contain no secrets. They describe hosts, paths, policies, quality gates, and final reporting requirements for guide publication and post-publication review.
