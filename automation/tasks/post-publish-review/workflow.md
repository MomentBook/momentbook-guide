# Post-Publish Review Workflow

This is the execution contract for the scheduled review that runs after guide
publication. It improves readability and localization quality for guides that
were just written by the publisher automation.

## Design Basis

This workflow follows the Codex guidance that recurring automations should be
specific, repeatable, and easy to review, and that project automations can run
as independent background tasks. See:

- https://developers.openai.com/codex/app/automations
- https://openai.com/academy/codex-automations/

It also follows the subagent guidance to move noisy review work off the main
thread, split independent checks into bounded agents, and be careful with
parallel write-heavy work. See:

- https://developers.openai.com/codex/concepts/subagents
- https://developers.openai.com/codex/subagents

For long-running unattended work, the workflow externalizes state in files,
uses a runbook and acceptance checks, and records an audit trail. See:

- https://developers.openai.com/blog/run-long-horizon-tasks-with-codex
- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex

The shared local summary for these sources is
`automation/shared/codex-operating-principles.md`.

## Scope

Review only recently published guide groups.

Default target window:

- look back 8 hours
- ignore groups published less than 10 minutes ago
- skip groups already recorded as successfully reviewed in
  `.automation/post-publish-review-state.json`

The window is intentionally wider than one hour so a slow publisher run can be
picked up by the next review without duplicate writes.

## Run Directory

Every review run creates a development-only working directory:

```text
/home/ubuntu/app/momentbook-guide/.automation/review-runs/<run_id>/
```

Required files:

- `00-run-state.json`
- `01-candidate-groups.json`
- `groups/<translationGroupId>/before.dev.json`
- `groups/<translationGroupId>/before.prod.json`
- `groups/<translationGroupId>/review-plan.md`
- `groups/<translationGroupId>/english-readability.patch.json`
- `groups/<translationGroupId>/localization-cjk.patch.json`
- `groups/<translationGroupId>/localization-latin.patch.json`
- `groups/<translationGroupId>/localization-sea.patch.json`
- `groups/<translationGroupId>/merged.content-patch.json`
- `groups/<translationGroupId>/qa/<gate-name>.md`
- `groups/<translationGroupId>/after.dev.json`
- `groups/<translationGroupId>/after.prod.json`
- `publish-report.md`

The run directory is temporary. Remove it after dev/prod verification unless a
controlled stop needs evidence for diagnosis.

Review run directories, locks, exported records, generated previews, backups,
and helper scripts are not repository state. The only durable review state
intended for git is `.automation/post-publish-review-state.json`.

## Lock Policy

Acquire this review lock before doing any DB work:

```text
/home/ubuntu/app/momentbook-guide/.automation/post-publish-review.lock
```

Also inspect the publisher lock:

```text
/home/ubuntu/app/momentbook-guide/.automation/guide-publisher.lock
```

If the publisher lock PID is still running, stop and report that the writer is
active. If the publisher lock is stale under the publisher workflow, do not
clear it from the review run. Report it and stop.

For the review lock:

- if the lock PID is still running, stop and report an active review
- if the PID is not running and the lock is older than the configured stale
  threshold, replace it and record the stale lock contents in `00-run-state.json`
- always remove the review lock on success, failure, or controlled stop

## Agent Roles

### Post-Review Orchestrator

Owns the run state and final decision. It does not rewrite guide prose by
itself.

Responsibilities:

- read `AGENTS.md`, `automation/shared/environment.yaml`,
  `automation/shared/codex-operating-principles.md`,
  `automation/tasks/post-publish-review/workflow.md`,
  `automation/tasks/post-publish-review/prompt.md`,
  `automation/shared/content-repair-workflow.md`, `playbooks/authoring-guide.md`, and
  `registry/editorial-guide-registry.md`
- inspect the publisher lock and acquire the review lock
- update the repo with `git fetch origin main` and `git pull --ff-only origin
  main` before creating durable changes
- export recent candidate groups from dev
- skip groups already marked as reviewed
- run group review workers in parallel only with disjoint
  `translationGroupId` sets
- run language reviewers in parallel only after a frozen review plan gives each
  reviewer full context and disjoint language ownership
- merge content-only patches
- run dev and prod quality gates
- update `.automation/post-publish-review-state.json` only after verification
- commit and push the allowlisted review state after successful verification
- produce the final audit report

### Review Planner

Input:

- `before.dev.json`
- `before.prod.json`, when production is reachable
- `playbooks/authoring-guide.md`
- `automation/shared/content-repair-workflow.md`

Output:

- `review-plan.md`
- exact repair classes by language
- source-of-truth language for each fact
- metadata drift risks
- worker assignment by language group

This agent never writes article prose.

### English Readability Editor

Input:

- `before.dev.json`
- `review-plan.md`

Output:

- `english-readability.patch.json`

This agent may update only the English `title` and `body`.

Primary goals:

- improve structure, transitions, plain-language readability, and scannability
- preserve every hard fact, source link, image URL, alt meaning, warning,
  price, route, date, and policy
- keep at least six substantive H2 sections
- do not add unsupported facts

### Localization Reviewers

Run after the review plan is frozen. These agents work in parallel on disjoint
languages:

- `localization-cjk-reviewer`: `ko`, `ja`, `zh`
- `localization-latin-reviewer`: `es`, `pt`, `fr`
- `localization-sea-reviewer`: `th`, `vi`

Each localization reviewer outputs one content-only patch for its assigned
languages.

Non-negotiable output rules:

- preserve every hard fact, route, warning, price, time, source meaning, image
  URL, alt text, and caption from the English record and review plan
- localize H1, H2, paragraph, bullet, image alt, caption, and source labels
- keep Vietnamese tone marks and all Spanish, Portuguese, and French
  diacritics
- do not produce ASCII-only transliteration for any supported language
- do not summarize a locale
- do not change slugs, categories, statuses, createdAt, or publishedAt

### Post-Review QA

Runs after all patches are merged into `merged.content-patch.json`.

Parallel gates:

- `qa-structure`: H1/H2 shape, image, source section, depth, scannability
- `qa-localization`: script, diacritics, untranslated English, naturalness
- `qa-parity`: facts, warnings, links, image/caption parity
- `qa-metadata`: no slug/category/status/publishedAt drift

Each QA agent writes a pass/fail report under `qa/`. Any failure blocks DB
write.

### Post-Review Publisher

Runs only after all QA reports pass and the automated quality gate exits with
status 0 on a patched preview.

Responsibilities:

- apply `merged.content-patch.json` to dev with
  `node tools/repair/apply-article-content-patch.js --file <patch> --apply`
- export the group from dev
- run `node tools/quality/article-quality-gate.js <after.dev.json>`
- apply the same content-only patch to production using DB-only execution
- export the group from production
- run the same quality gate against production
- update `.automation/post-publish-review-state.json`
- remove temporary files and the review lock
- stage only `.automation/post-publish-review-state.json`
- commit the review state update as `Codex <codex@openai.com>` with a message
  that includes the reviewed `translationGroupId`
- push the commit to `origin main`

## Parallel Execution Boundaries

Allowed in parallel:

- candidate group review when groups have disjoint `translationGroupId`s
- English readability, CJK localization, Latin localization, and SEA
  localization after the review plan is frozen
- QA gates after the merged content patch is frozen

Not allowed in parallel:

- two workers updating the same `translationGroupId`
- production repair before dev repair and dev quality gate pass
- metadata changes by any worker
- review while the publisher lock is active
- git commit before dev/prod verification and state-file update
- broad staging such as `git add .`

## Commands

Export recent groups:

```sh
node tools/repair/export-recent-article-groups.js \
  --since-hours 8 \
  --min-age-minutes 10 \
  --state .automation/post-publish-review-state.json \
  --skip-reviewed \
  --out .automation/review-runs/<run_id>/01-candidate-groups.json
```

Export one group:

```sh
node tools/repair/export-article-group.js --group <translationGroupId> --out <before.dev.json>
```

Apply a content-only patch:

```sh
node tools/repair/apply-article-content-patch.js --file <patch.json> --apply
```

Run the quality gate:

```sh
node tools/quality/article-quality-gate.js <group.json>
```

Persist verified review state:

```sh
git add .automation/post-publish-review-state.json
git -c user.name=Codex -c user.email=codex@openai.com commit \
  --author="Codex <codex@openai.com>" \
  -m "Record guide review: <translationGroupId>"
git push origin main
```

## Stop Instead Of Writing

Stop and report if any of these happen:

- the publisher lock is active or stale
- no recent unreviewed group exists
- a target group has fewer than 9 supported-language records
- dev and prod records do not match on metadata before repair
- the review plan cannot preserve facts
- any locale is incomplete, summarized, ASCII-stripped, or unnatural
- any patch includes forbidden metadata fields
- any QA report fails
- the automated article quality gate fails on a patched preview
- dev DB verification fails
- production replication cannot be scoped to the same verified
  `translationGroupId`
- production would require leaving files behind
- the repository cannot be fast-forwarded from `origin/main` before work begins
- the final git commit or push would include files outside the allowlist

## Required Final Report

The final report must include:

- whether the publisher lock was clear, active, or stale
- whether the review lock was acquired, skipped, or replaced as stale
- candidate window and candidate group count
- reviewed `translationGroupId`s
- language patch coverage
- QA gate verdicts
- automated quality gate result for dev and prod
- dev DB verification result
- prod DB verification result
- state-file update summary
- git commit hash or no-op reason
- git push status
- removed run directory and temporary artifacts
- residual risks
