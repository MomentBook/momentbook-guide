# 2026-04-19 UX/UI agent prompt refactor

What changed
- added a reusable UX/UI agent prompt template guide
- shortened the durable wrapper and moved task-specific requirements into a request-body contract
- kept Stitch-first design as the source-of-truth workflow
- added explicit documentation guidance for `docs/ai`-style task logs and canonical guides

Why
- official prompting guidance favors direct, structured prompts with explicit success criteria
- coding-oriented agent guidance warns that over-prompting can reduce quality
- external-artifact verification is more reliable than self-reported correctness
- UX/UI tasks benefit from explicit screen-contract fields and high-fidelity implementation rules

Files deleted/added
- added `docs/momentbook-api/guides/UX_UI_AGENT_PROMPT_TEMPLATE.md`
- added `docs/momentbook-api/ai/2026-04-19_ux-ui-agent-prompt-refactor.md`

Risks/TODO
- validate this on a small recurring task set across design-only and design-plus-implementation tasks
- if your runtime model already has strong built-in progress behavior, resist adding longer communication scaffolding back into the suffix
