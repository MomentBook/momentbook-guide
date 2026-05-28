# AI Workspace Structure

This repository keeps only the files needed for current mobile/chat-driven guide
work. Old generated bodies, run logs, dated plans, import payloads, role-agent
prompts, and scheduled task docs were removed so new work starts from current
sources, the registry, and production API verification.

## Active Layout

```text
momentbook-guide/
  AGENTS.md
  README.md
  prompts/
  playbooks/
  registry/
  automation/
    shared/
  tools/
    admin/
    quality/
    repair/
  ops/
  docs/architecture/
```

## Responsibilities

- `AGENTS.md`: repository-level behavior rules.
- `prompts/mobile-chat.md`: copy-ready mobile requests.
- `prompts/guide-publisher.md`: compact one-guide execution contract.
- `playbooks/authoring-guide.md`: article schema, source policy, localization,
  and review checklist.
- `automation/shared/admin-articles-api.md`: production admin API contract.
- `automation/shared/article-writing-standard.md`: readability and localization
  standard.
- `automation/shared/content-repair-workflow.md`: content-only review and repair
  policy.
- `registry/editorial-guide-registry.md`: topic coverage and verified production
  state.
- `tools/admin/`: admin API helper.
- `tools/quality/`: automated article gates.
- `tools/repair/`: content-only repair helpers.

## Design Rule

Keep examples and historical memory out of active context. A guide run should
start from current official sources, current production API exports, the registry,
and the active contracts above.
