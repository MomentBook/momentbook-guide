# Repo Persistence Workflow

This task exists so publication and review can finish DB verification before git
persistence happens in a separate scheduled run.

## Scope

Git only. No DB writes, guide generation, review, production replication, or
runtime cleanup.

## Local Repository

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Schedule

Run every six hours at 05:00, 11:00, 17:00, and 23:00 Asia/Seoul. This is one
hour after post-publish review and two hours after guide publication.

## Allowlist

Only these files may be staged and committed:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`

## Steps

1. Confirm the working directory is the local repo.
2. Run `git status --short --branch`.
3. Stop if any modified tracked file is outside the allowlist.
4. Fetch `origin main`.
5. Fast-forward local `main` from `origin/main` if possible. Stop on conflict or
   non-fast-forward state.
6. Stage only allowlisted files that have a diff.
7. If the staged diff is empty, report a no-op and stop.
8. Commit with author and committer `Codex <codex@openai.com>`.
9. Push to `origin main`.
10. Report the commit hash and push result.

## Suggested Commit Message

```text
Persist guide automation state
```

If only one file changed, mention the file purpose, for example:

```text
Update guide registry
Record post-publish review state
```
