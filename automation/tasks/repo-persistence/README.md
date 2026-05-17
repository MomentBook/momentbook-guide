# Repo Persistence Automation

Commits and pushes verified durable state after the publisher and post-publish
review automations have finished.

Schedule: 05:00, 11:00, 17:00, and 23:00 Asia/Seoul, one hour after
post-publish review.

## Files

- `prompt.md`: standalone automation prompt used by the Codex app automation.
- `workflow.md`: git-only persistence workflow and allowlist.

## Allowed Durable State

- `registry/editorial-guide-registry.md`
- `.automation/post-publish-review-state.json`

No DB work, guide writing, review, lock cleanup, generated payload handling, or
production work belongs in this task.
