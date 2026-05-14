# Guide Publisher Automation

Publishes exactly one new Momentbook guide from source research through dev and
production DB verification.

## Files

- `prompt.md`: standalone automation prompt used by the Codex app automation.
- `workflow.md`: phase contract and handoff schema for the scheduled run.
- `agents/`: role prompts for orchestrator, source research, writing,
  localization, QA, and publishing.
- `runbook.md`: operator notes for manual or launchd-style execution.
- `local-runner.sh` and `launchd/`: legacy local runner assets.

## Shared Inputs

- `automation/shared/environment.yaml`
- `automation/shared/codex-operating-principles.md`
- `prompts/guide-publisher.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`

## Automation Prompt

The Codex app automation should point to:

```text
/home/ubuntu/app/momentbook-guide/automation/tasks/guide-publisher/prompt.md
```
