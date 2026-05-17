# Repo Persistence Automation Prompt

Run from the local repository:

```text
/Users/hansol/Documents/New project/momentbook-guide
```

## Task

Commit and push verified durable state left by the guide publisher and
post-publish review automations.

This is a git-only task. Do not write guides, patch content, access production,
or run DB mutations.

## Read First

- `automation/shared/environment.yaml`
- `automation/tasks/repo-persistence/workflow.md`
- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`, if it exists

## Rules

- Stage only these allowlisted files:
  - `registry/editorial-guide-registry.md`
  - `.automation/post-publish-review-state.json`
- Ignore runtime artifacts under `.automation/`, run directories, payloads,
  exports, logs, backups, and helper scripts.
- Stop if there are modified tracked files outside the allowlist.
- Stop if the branch cannot fast-forward from `origin/main` without conflicts.
- Commit only when the allowlisted staged diff is non-empty.
- Use `Codex <codex@openai.com>` as author and committer.
- Push only to `origin main`.
- Never force-push.

## Final Report

Report the branch, allowlisted files changed, commit hash or no-op reason, push
status, and any blocked non-allowlisted changes.
