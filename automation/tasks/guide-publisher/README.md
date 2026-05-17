# Guide Publisher Automation

Publishes exactly one new Momentbook guide from source research through dev and
production DB verification. It updates the local registry but does not commit or
push.

## Files

- `prompt.md`: standalone automation prompt used by the Codex app automation.
- `workflow.md`: phase contract and handoff schema for the scheduled run.
- `agents/`: role prompts for orchestrator, source research, writing,
  localization, QA, and publishing.
- `runbook.md`: operator notes for manual execution.

## Shared Inputs

- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `automation/shared/article-writing-standard.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Automation Prompt

The Codex app automation should point to the local file:

```text
/Users/hansol/Documents/New project/momentbook-guide/automation/tasks/guide-publisher/prompt.md
```

Git persistence is handled by `automation/tasks/repo-persistence/`.
