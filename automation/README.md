# Automation

Automation-ready entrypoints for publishing one Momentbook guide from dev authoring through optional production DB replication.

Use these files when creating a scheduled or manual automation:

- `environment.yaml`: machine-readable environment and policy contract.
- `prompt-dev-to-prod.md`: short automation prompt that delegates the detailed work to `prompts/guide-publisher.md`.
- `parallel-agent-workflow.md`: scheduled-run workflow that splits source research, master writing, localization, QA, and publishing across bounded agents.
- `content-repair-workflow.md`: grouped dev-first repair workflow for already published articles.
- `agents/`: role-specific prompts used by the parallel workflow.
- `runbook.md`: operator notes for safe execution and verification.

The automation should run from the canonical development environment:

```sh
ssh momentbook-dev
cd /home/ubuntu/app/momentbook-guide
```

Production writes must remain DB-only and must be scoped to the single `translationGroupId` verified in development.
