# Environments

## Local Guide Repository

The guide repository is local-only. The agent runs from the repository root.
Guide prompts, registry updates, validation, and git work should read files from
this local checkout. Do not treat `/home/ubuntu/app/momentbook-guide` on the
development server as canonical.

## Production Admin API

Normal guide publication and review use:

```text
https://api.momentbook.app/v2/admin/articles
```

Authenticate with `POST /v2/auth/email/login`. Use the local untracked
credential file or environment variables described in
`automation/shared/admin-articles-api.md`.

Do not use production SSH, direct MongoDB access, remote helper scripts, or a
development environment for routine guide publication or post-publish review.

## Development Hosts

Development SSH access may still be useful for unrelated app/API debugging, but
it is not part of the guide publication path.

Related application paths:

- `/home/ubuntu/app/momentbook-api`
- `/home/ubuntu/app/momentbook-web`

## Git Persistence

Git persistence is started by chat request, not by a recurring automation. Before
committing:

1. Inspect `git status --short` and the diff.
2. Stage only verified durable state such as the registry or an explicitly used
   review state file.
3. Commit only after production API verification has passed.
4. Push only to the intended branch and never force-push without an explicit
   request.

Runtime exports, payloads, backups, temporary helpers, and credential files stay
out of git.

## Secret Handling

Do not write credentials, database URLs, API keys, tokens, cookies, or private
production responses into this workspace.
