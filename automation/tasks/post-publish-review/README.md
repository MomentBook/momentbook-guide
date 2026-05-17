# Post-Publish Review Automation

Reviews recently published Momentbook guides and improves readability,
translation naturalness, and localization parity without changing metadata.

Codex app schedule: 04:00, 10:00, 16:00, and 22:00 Asia/Seoul, one hour after
the guide publisher schedule.

This task updates local review state but does not commit or push. Git
persistence runs one hour later.

## Files

- `prompt.md`: standalone automation prompt used by the Codex app automation.
- `workflow.md`: review, repair, validation, and DB replication contract.
- `agents/`: role prompts for planning, English editing, localization review,
  QA, and publishing.

## Shared Inputs

- `automation/shared/environment.yaml`
- `automation/shared/content-repair-workflow.md`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Automation Prompt

The Codex app automation should point to the local file:

```text
/Users/hansol/Documents/New project/momentbook-guide/automation/tasks/post-publish-review/prompt.md
```
