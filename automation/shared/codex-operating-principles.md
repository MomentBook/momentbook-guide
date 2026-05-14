# Codex Operating Principles For Momentbook Automation

This file is the shared operating layer for scheduled Momentbook guide
automation. Each task-specific prompt should read this file before it delegates
work to role agents.

## Research Basis

- Codex automations are intended for recurring background work. OpenAI's
  automation docs emphasize independent project automations, reviewable outputs,
  explicit schedules, and durable prompts:
  https://developers.openai.com/codex/app/automations
- OpenAI's general automation guide says recurring tasks should be specific,
  repeatable, and easy to review:
  https://openai.com/academy/codex-automations/
- Codex best practices recommend prompts that state goal, context,
  constraints, and "done when" criteria:
  https://developers.openai.com/codex/learn/best-practices
- Codex reads `AGENTS.md` as persistent project guidance, with narrower files
  overriding broader guidance:
  https://developers.openai.com/codex/guides/agents-md
- Subagents are useful for moving noisy work out of the main thread, running
  specialized work in parallel, and returning distilled results; OpenAI warns
  that write-heavy parallel work needs stricter coordination:
  https://developers.openai.com/codex/concepts/subagents
- Custom agents should be narrow and opinionated, with clear tool surfaces and
  instructions that stop them from drifting:
  https://developers.openai.com/codex/subagents
- For long-horizon work, OpenAI recommends externalized state in durable files:
  prompt/spec, plan, implementation runbook, validation commands, and status
  log:
  https://developers.openai.com/blog/run-long-horizon-tasks-with-codex
- The Codex agent loop works best when the agent can plan, act with tools,
  observe results, and repair based on feedback:
  https://openai.com/index/unrolling-the-codex-agent-loop/
- OpenAI's iterative repair-loop cookbook frames reliable automation as
  review, repair, and validate phases with structured handoffs:
  https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex
- OpenAI's model docs currently recommend `gpt-5.5` for complex reasoning and
  coding, and smaller variants such as `gpt-5.4-mini` for lower-latency,
  lower-cost supporting work:
  https://developers.openai.com/api/docs/models
- Research on agentic coding-tool configuration finds that repository-level
  context files are the dominant configuration mechanism and that `AGENTS.md`
  is emerging as an interoperable standard:
  https://arxiv.org/abs/2602.14690
- CI/CD reliability research on agentic PRs reports high but imperfect
  workflow success for Codex, which supports keeping explicit validation gates
  rather than trusting agent output alone:
  https://arxiv.org/abs/2604.18334
- Community reports about Codex subagents repeatedly point to the same practical
  risk: subagents help exploration, but under-scoped context can make them
  drift. For this repository, every subagent must receive frozen inputs,
  ownership boundaries, and an output schema.

## Shared Rules

1. Keep task contracts file-based.
   Each automation has a task directory with its own prompt, workflow, agents,
   and runbook. Cross-task policy belongs in `automation/shared/`.

2. Start with a bounded run state.
   Every scheduled run creates a run directory, writes a state file first, and
   records decisions, locks, candidate IDs, and validation outputs there.

3. Use the main agent as orchestrator.
   The main agent owns requirements, locks, phase ordering, conflict handling,
   and the final report. Role agents own narrow work products.

4. Parallelize only after inputs are frozen.
   Source verification can run in parallel by source. Localization can run in
   parallel only after the English master and fact parity map are frozen.
   Review patches can run in parallel only when each agent owns disjoint
   languages or disjoint `translationGroupId`s.

5. Avoid nested fan-out.
   Use one orchestration level. A delegated role agent should not spawn its own
   subagents unless the workflow explicitly says so.

6. Prefer stronger models for judgment.
   Use the automation-level `gpt-5.5` with high or xhigh reasoning for
   orchestration, source-supported writing, factual parity, localization
   judgment, and final QA. Use faster/lower-cost workers only for read-only
   scans or mechanical summaries.

7. Treat official sources as hard constraints.
   Do not invent prices, hours, route names, rules, or dates. If official
   sources conflict or are unavailable, stop or express the uncertainty as a
   recheck item.

8. Preserve semantic parity.
   Translation is not summarization. Every supported language must carry the
   same hard facts, warnings, source meaning, image meaning, and decision
   points.

9. Make output machine-checkable.
   Handoffs must use named files and stable schemas where possible. DB writes
   happen only after automated gates and role QA pass.

10. Repair by loop, not by hope.
    For generated or reviewed content, run review -> focused patch -> preview
    validation -> DB write -> export -> validation. Failed validation feeds the
    next repair input or stops the run.

11. Keep production clean.
    Production writes are DB-only and scoped to a verified
    `translationGroupId`. Do not leave scripts, payloads, backups, or helper
    files on production.

12. Final reports are audit artifacts.
    Every run, including no-op and skip cases, reports lock state, target
    groups, phase outputs, gate results, DB verification, state updates, removed
    artifacts, and residual risks.

13. Persist only intentional repository state.
    After successful verification, stage only the allowlisted paths in
    `automation/shared/environment.yaml`, commit as
    `Codex <codex@openai.com>` with a message that names the task and
    `translationGroupId`, then push to `origin main`. Never use `git add .`,
    never commit locks or run directories, and never force-push.
