# Repo Persistence Workflow

Git-only persistence for verified durable automation state.

## Scope

No guide writing, content review, DB access, production access, or runtime
cleanup.

## Allowlist

Only these paths may be staged and committed:

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`

## Steps

1. Complete `automation/shared/run-contract.md` preflight.
2. Run `git status --short --branch`.
3. Stop if any modified tracked file is outside the allowlist.
4. Fetch `origin main`.
5. Fast-forward local `main` from `origin/main` if possible. Stop on conflict or
   non-fast-forward state.
6. Stage only allowlisted files with a diff.
7. Stop as no-op if the staged diff is empty.
8. Commit with author and committer `Codex <codex@openai.com>`.
9. Push to `origin main`.
10. Report commit hash and push result with the run-contract final report
    fields.

## Commit Message

Use one of:

```text
Update guide registry
Record post-publish review state
Persist guide automation state
```
