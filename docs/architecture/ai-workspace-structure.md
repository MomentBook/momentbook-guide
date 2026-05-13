# AI Workspace Structure

This structure is designed for AI-assisted guide operations: short persistent instructions, explicit prompts, separated mutable state, archived artifacts, and clear quality gates.

## Source Basis

- Anthropic Claude Code recommends project-level `CLAUDE.md` instructions, concise markdown sections, and `AGENTS.md` bridging when other coding agents already use that file.
- OpenAI prompt guidance emphasizes clear instructions, early task framing, concrete output requirements, and examples.
- Anthropic prompt engineering guidance starts with success criteria and empirical evaluation before prompt iteration.
- OpenAI Agents SDK separates instructions, tools, handoffs, guardrails, and tracing as distinct operating concepts.
- OpenAI Structured Outputs reinforces schema-backed outputs when machine-readable data must be reliable.
- The Twelve-Factor App keeps deploy-varying config such as credentials and resource handles outside code.

## Resulting Design

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

## Directory Roles

- `AGENTS.md`: persistent agent instructions that should be loaded at the start of every session.
- `CLAUDE.md`: small Claude Code bridge that imports `AGENTS.md`.
- `prompts/`: executable prompts and agent templates. These are the entry points for AI behavior.
- `registry/`: mutable project state. The editorial registry lives here because it must be easy to find and update.
- `playbooks/`: procedures and policy documents. These explain how to do the work, not just what to ask.
- `tools/`: scripts grouped by lifecycle stage. Grouping by verb keeps old generation, import, refresh, and QA helpers discoverable.
- `artifacts/`: generated JSON and DB exports. These are data snapshots, not instructions.
- `logs/`: historical context and previous sessions. These should inform research, but should not override current prompts.
- `ops/`: environment notes and safe operational commands.
- `docs/architecture/`: rationale for maintainers.

## Maintenance Rules

- Keep root files limited to onboarding and agent memory.
- Add new guide-writing prompts to `prompts/`.
- Add reusable procedures to `playbooks/`.
- Update `registry/editorial-guide-registry.md` immediately after a guide changes DB state.
- Keep files created only to perform one DB write out of the repository after verification.
- Never add secrets or deploy-specific credentials to this workspace.

## References

- Anthropic Claude Code memory: https://code.claude.com/docs/en/memory
- Anthropic prompt engineering overview: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- OpenAI prompt engineering best practices: https://help.openai.com/en/articles/6654000-how-to-improve-your-prompts
- OpenAI Agents SDK guardrails: https://openai.github.io/openai-agents-js/guides/guardrails/
- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-js/guides/tracing/
- OpenAI Agents SDK handoffs: https://openai.github.io/openai-agents-js/guides/handoffs/
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Twelve-Factor config: https://www.12factor.net/config
