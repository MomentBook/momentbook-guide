# AI Workspace Structure

This repository keeps only the files needed for current Codex guide
automation. Old generated bodies, run logs, dated plans, import payloads, and
legacy writer scripts were removed so new runs do not imitate stale examples.

## Active Layout

```text
momentbook-guide/
  AGENTS.md
  README.md
  automation/
    shared/
    tasks/
  playbooks/
  prompts/
  registry/
  tools/
    quality/
    repair/
  ops/
  docs/architecture/
```

## Responsibilities

- `AGENTS.md`: repository-level behavior rules.
- `automation/shared/environment.yaml`: paths, schedules, language set, and
  persistence policy.
- `automation/shared/codex-operating-principles.md`: Codex automation rules.
- `automation/shared/article-writing-standard.md`: readability and
  localization standard used by both writing and review tasks.
- `automation/tasks/`: task prompts, workflows, and bounded role prompts.
- `prompts/guide-publisher.md`: reusable new-guide publication contract.
- `playbooks/authoring-guide.md`: durable article schema and quality policy.
- `registry/editorial-guide-registry.md`: topic coverage and verified DB state.
- `tools/quality/`: automated article gates.
- `tools/repair/`: content-only post-publish repair helpers.

## Design Rule

Keep examples and historical memory out of active context. A run should start
from current official sources, current DB exports, the registry, and the active
contracts above.
