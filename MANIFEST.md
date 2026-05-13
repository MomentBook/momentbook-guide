# Momentbook Guide Manifest

Created from `/Users/hansol/workspace/ai` on 2026-05-12.

Canonical development location: `/home/ubuntu/app/momentbook-guide`.

## Included

- 1 main guide publication prompt in `prompts/`
- 2 specialist agent prompt templates in `prompts/agent-templates/`
- 8 scheduled automation role prompts in `automation/agents/`
- 1 canonical topic registry in `registry/`
- 6 authoring, workflow, and planning playbook files in `playbooks/`
- 23 archived Momentbook API guide scripts in `tools/`
- 15 generated editorial guide JSON snapshots in `artifacts/generated-guides/`
- 3 DB/export payload snapshots in `artifacts/exports/`
- 34 historical AI, sync, and session log files in `logs/`

Total files after restructuring: 95.

## Primary Workflow Files

- `AGENTS.md`
- `CLAUDE.md`
- `prompts/guide-publisher.md`
- `automation/parallel-agent-workflow.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`
- `playbooks/parallel-workflow.md`
- `tools/quality/article-ai-guard.js`

## Source Paths

- `/Users/hansol/workspace/ai/docs/momentbook-api/guides`
- `/Users/hansol/workspace/ai/docs/momentbook-api/ai`
- `/Users/hansol/workspace/ai/staging/momentbook-api/scripts`
- `/Users/hansol/workspace/ai/staging/momentbook-api/scripts/generated`
- `/Users/hansol/workspace/ai/.tmp`

## Remote Reference

The development environment is reachable with:

```sh
ssh momentbook-dev
```

During setup, the remote host exposed guide-related files under:

- `/home/ubuntu/app/docs/momentbook-api/guides`
- `/home/ubuntu/app/docs/momentbook-api/ai`
- `/home/ubuntu/app/momentbook-api/docs/adr`
- `/home/ubuntu/app/momentbook-web/docs/adr`

## Current Layout

```text
momentbook-guide/
  AGENTS.md
  CLAUDE.md
  README.md
  MANIFEST.md
  prompts/
  registry/
  playbooks/
  tools/
  artifacts/
  logs/
  ops/
  docs/architecture/
```
