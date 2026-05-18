# Repo Persistence Automation Prompt

Run from:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Goal

Commit and push only verified durable state left by the publisher and
post-publish review tasks.

## Context

Read:

- `automation/shared/environment.yaml`
- `automation/shared/run-contract.md`
- `automation/tasks/repo-persistence/workflow.md`
- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`, if it exists

## Constraints

- Git only. Do not write guides, patch content, access DBs, touch production,
  or clean runtime artifacts.
- Follow `automation/shared/run-contract.md` for preflight, controlled stops,
  and final reporting. This task has no runtime lock.
- Stage only:
  - `registry/editorial-guide-registry.md`
  - `.automation/post-publish-review-state.json`
- Stop if any modified tracked file is outside the allowlist.
- Stop if local `main` cannot fast-forward from `origin/main`.
- Commit only when the allowlisted staged diff is non-empty.
- Use `Codex <codex@openai.com>` as author and committer.
- Push only to `origin main`.
- Never force-push.

## Done When

Report branch, allowlisted files changed, commit hash or no-op reason, push
status, and any blocked non-allowlisted changes.
