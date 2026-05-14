# Parallel Agent Workflow

This is the execution contract for automated guide publication. It replaces the
old single-agent end-to-end workflow for scheduled runs.

## Why This Exists

One unattended agent should not research, write, translate 9 languages, review,
publish, and update the registry inside one growing context. The scheduled run
must use small, bounded agents with explicit handoff artifacts so each agent
works with only the context it needs.

The workflow is still one guide per run. Parallelism is only used where tasks
are independent or where review can run against frozen artifacts.

The shared design basis is `automation/shared/codex-operating-principles.md`.
This workflow applies those rules to new guide publication.

## Run Directory

Every run creates a development-only working directory:

```text
/home/ubuntu/app/momentbook-guide/.automation/runs/<run_id>/
```

Required files:

- `00-run-state.json`
- `01-registry-audit.md`
- `02-source-pack.md`
- `03-master-article.md`
- `04-fact-parity-map.md`
- `localizations/<language>.md`
- `qa/<gate-name>.md`
- `payload/articles.json`
- `publish-report.md`

The run directory is temporary. Remove it after dev/prod verification unless a
controlled stop needs evidence for diagnosis.

Run directories, locks, generated payloads, backups, and helper scripts are not
repository state. They must not be staged for the final git commit.

## Lock Policy

- Acquire `/home/ubuntu/app/momentbook-guide/.automation/guide-publisher.lock`
  before creating a run directory.
- If the lock PID is still running, stop and report an active run.
- If the PID is not running and the lock is older than the configured stale
  threshold, replace it and record the stale lock contents in `00-run-state.json`.
- Always remove the lock on success, failure, or controlled stop.

## Agent Roles

### Orchestrator

Owns the run state and final decision. It does not write final article prose by
itself.

Responsibilities:

- read `AGENTS.md`, `automation/shared/environment.yaml`, this file,
  `automation/shared/codex-operating-principles.md`,
  `prompts/guide-publisher.md`, `playbooks/authoring-guide.md`, and
  `registry/editorial-guide-registry.md`
- acquire or validate the lock
- update the repo with `git fetch origin main` and `git pull --ff-only origin
  main` before creating durable changes
- create the run directory
- launch independent agents in parallel when their inputs are frozen
- keep subagent fan-out to one level and assign disjoint file ownership
- reject outputs that do not match the handoff contract
- run the automated quality gate before DB write
- produce the final audit report
- commit and push allowlisted repository changes after successful verification

### Registry Auditor

Input:

- current registry
- dev DB article title/slug snapshot
- generated artifact names, if present

Output:

- `01-registry-audit.md`
- explicit collision verdict
- allowed topic families and disallowed overlaps

This agent never writes article prose.

### Source Researcher

Input:

- registry audit
- candidate topic constraints

Output:

- `02-source-pack.md`
- official source list with checked date, publisher, source purpose,
  volatility, and recheck item
- hard facts and facts to exclude
- image candidate with license/source note

This agent must stop if official sources cannot support the article.

The source researcher returns a compact source pack. It must not paste long
source excerpts or ask later roles to infer facts from raw pages.

### Master Writer

Input:

- frozen source pack
- authoring guide

Output:

- `03-master-article.md`
- English master article ready for publication
- `04-fact-parity-map.md`

This agent writes only the English master and parity map. It does not translate.

The master article must be useful to a traveler scanning the page: strong lead,
meaningful H2s, practical bullets, concrete alt text, and no unsupported
promotional claims.

### Localization Agents

Run after the master and fact parity map are frozen.

Parallel groups:

- `localization-cjk-agent`: `ko`, `ja`, `zh`
- `localization-latin-agent`: `es`, `pt`, `fr`
- `localization-sea-agent`: `th`, `vi`

Each localization agent writes only its assigned files under
`localizations/<language>.md`.

Non-negotiable output rules:

- preserve every hard fact, route, warning, price, time, source meaning, image
  URL, alt text, and caption from the parity map
- localize H1, H2, paragraph, bullet, image alt, caption, and source labels
- keep Vietnamese tone marks and all Spanish, Portuguese, and French diacritics
- do not produce ASCII-only transliteration for any supported language
- do not shorten the article into a summary

### QA Agents

Run after localization files are present.

Parallel gates:

- `qa-structure`: markdown shape, H1/H2, image, source section, depth
- `qa-localization`: script, diacritics, untranslated English, naturalness
- `qa-parity`: facts, warnings, links, image/caption parity
- `qa-date`: source checked date, slug date, `publishedAt`

Each QA agent writes a pass/fail report under `qa/`. Any failure blocks DB write.

QA reports must be concise and actionable. They should identify the exact
language, section, and repair direction instead of dumping full article text.

### Publisher

Runs only after all QA reports pass and the automated quality gate exits with
status 0.

Responsibilities:

- assemble `payload/articles.json`
- run `node tools/quality/article-quality-gate.js payload/articles.json`
- upsert into dev DB
- verify exactly 9 records by `translationGroupId`
- replicate only that verified `translationGroupId` to production DB
- verify production parity
- update the registry based on actual DB state
- remove temporary files and the lock
- stage only `registry/editorial-guide-registry.md`
- commit the registry update with a message that includes the topic or
  `translationGroupId`
- push the commit to `origin main`

## Parallel Execution Boundaries

Allowed in parallel:

- registry audit and broad source candidate exploration
- source page verification for independent official sources
- localization groups after English master freeze
- QA gates after localization outputs are present

Not allowed in parallel:

- two writers modifying the same `translationGroupId`
- localization before source pack and English master are frozen
- DB write before all QA gates pass
- production replication before dev DB verification
- git commit before dev/prod DB verification and registry update
- broad staging such as `git add .`

## Required Final Report

The final report must include:

- whether the lock was acquired, skipped, or replaced as stale
- topic and registry-safe reason
- `translationGroupId`
- language slugs
- checked date and `publishedAt`
- quality gate result, including script/diacritic checks
- dev DB verification
- prod DB verification
- registry status
- git commit hash or no-op reason
- git push status
- removed run directory and temporary artifacts
- residual risks
