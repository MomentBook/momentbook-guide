# Post-Publish Review Automation

Reviews recently published Momentbook guides and improves readability,
translation naturalness, and localization parity without changing metadata.

Codex app schedule: 01:00, 07:00, 13:00, and 19:00 Asia/Seoul, one hour after
each guide publisher slot.

This task updates local review state but does not commit or push. Git
persistence runs one hour later.

## Files

- `prompt.md`: standalone automation prompt used by the Codex app automation.
- `workflow.md`: review, repair, validation, and production API patch contract.
- `agents/`: role prompts for planning, English editing, localization review,
  QA, and publishing.

## Shared Inputs

- `automation/shared/environment.yaml`
- `automation/shared/admin-articles-api.md`
- `automation/shared/content-repair-workflow.md`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Automation Prompt

The Codex app automation should point to the local file:

```text
/Users/hansol/workspace/momentbook-guide/automation/tasks/post-publish-review/prompt.md
```
