# 2026-04-19 coding agent prompt refactor

What changed
- added a reusable coding-agent prompt template guide
- reduced prompt redundancy and kept only high-signal workflow instructions
- added an explicit rule for leaving short AI task logs in existing `docs/ai`-style directories for non-trivial work

Why
- official guidance for coding agents favors shorter, more structural prompts over over-prompting
- research-backed agent patterns still support explicit inspection, tool-grounded verification, and incremental state tracking
- the previous prompt had strong content, but too much of it repeated the same constraints in multiple sections

Files deleted/added
- added `docs/momentbook-api/guides/CODING_AGENT_PROMPT_TEMPLATE.md`
- added `docs/momentbook-api/ai/2026-04-19_coding-agent-prompt-refactor.md`

Risks/TODO
- not benchmarked yet against your actual task set; validate on a small recurring eval set
- if your primary runtime model is strongly coding-optimized, prefer the lean base template and add overlays only when needed
