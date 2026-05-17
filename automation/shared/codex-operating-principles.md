# Codex Operating Principles

Shared rules for scheduled Momentbook guide automation.

## Basis

This contract follows these sources:

- OpenAI Codex automations: recurring tasks should be durable, reviewable, and
  tested before scheduling.
  <https://developers.openai.com/codex/app/automations>
- OpenAI Codex best practices: strong prompts state goal, context, constraints,
  and done criteria.
  <https://developers.openai.com/codex/learn/best-practices>
- OpenAI `AGENTS.md` guidance: repository instructions are persistent project
  context and closer files override broader files.
  <https://developers.openai.com/codex/guides/agents-md>
- OpenAI subagent guidance: parallel agents help with read-heavy or bounded
  work, but write-heavy parallelism needs ownership boundaries.
  <https://developers.openai.com/codex/concepts/subagents>
- OpenAI long-horizon guidance: reliable long runs use durable spec, plan,
  runbook, validation, and status files.
  <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex>
- OpenAI repair-loop guidance: trustworthy automation separates review, repair,
  and validation with structured records.
  <https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex>
- Agent configuration research: repository context files such as `AGENTS.md`
  are the dominant agent configuration mechanism, while advanced mechanisms
  still need clear scope.
  <https://arxiv.org/abs/2602.14690>
- CI/CD agent reliability research: agentic changes can succeed at high rates
  but still need validation gates and reviewable evidence.
  <https://arxiv.org/abs/2604.18334>

## Rules

1. Keep each task independent.
   A scheduled run must be able to start from its prompt, workflow, environment
   contract, and durable state files without relying on chat history.

2. Use one source of truth per concern.
   `AGENTS.md` defines repo behavior, `environment.yaml` defines machine
   contract and schedules, task prompts define goals, workflows define steps,
   `automation/shared/article-writing-standard.md` defines readability and
   localization quality, and `playbooks/authoring-guide.md` defines article
   schema and source policy.

3. Start every run with state.
   Record runtime clock, lock state, target IDs, candidate IDs, and validation
   output under that task's `.automation/` run directory.

4. Orchestrate before delegating.
   The main agent owns locks, phase order, stop decisions, and the final report.
   Role agents receive frozen inputs, narrow ownership, and expected output
   paths.

5. Parallelize only bounded work.
   Source checks may run in parallel by source. Localization may run in parallel
   after the English master and fact parity map are frozen. Review patches may
   run in parallel only by disjoint language sets or disjoint
   `translationGroupId`s.

6. Do not nest fan-out.
   A delegated role agent should not spawn more agents unless the workflow
   explicitly requires it.

7. Treat official sources as hard constraints.
   Do not invent or smooth over prices, hours, rules, routes, booking terms,
   closure risks, or dates. Stop when sources are unavailable or conflicting.

8. Keep old memory out of active work.
   Do not search for old generated articles, old run logs, old batch plans, or
   dated helper scripts as examples. Use current sources and current DB exports.

9. Preserve semantic parity.
   Each supported language must keep the same facts, warnings, source meaning,
   image meaning, and decision points.

10. Validate before writing.
   DB writes require passing automated quality gates and role QA. Failed gates
   feed a repair loop or stop the run.

11. Keep production clean.
    Production work is DB-only, scoped to one verified `translationGroupId`,
    and leaves no files behind.

12. Separate DB work from git work.
    Guide publication and post-publish review do not stage, commit, or push.
    Repo persistence is the only task that commits durable state.

13. Make the final report an audit record.
    Report target IDs, gate results, DB verification, durable files changed,
    removed artifacts, git deferral or commit status, and residual risks.
