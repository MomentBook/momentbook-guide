# Automation Run Contract

This contract applies to every scheduled task in this repository.

## Preflight

1. Run from `/Users/hansol/workspace/momentbook-guide`.
2. Confirm the current `Asia/Seoul` date and time.
3. Read `automation/shared/environment.yaml` and the task prompt before doing
   task-specific work.
4. Run `git status --short --branch`.
5. Stop before changing anything if tracked files outside the task's declared
   durable output paths are already modified.

## Runtime State

- Use one run directory under the task's configured `.automation/` path.
- Write a short `00-run-state.json` before acquiring the task lock.
- A lock is active only when its PID/process evidence is still valid for the
  current host or environment. A missing process is stale and may be replaced.
- Remove the task lock on success or controlled stop.
- Remove run artifacts after success. Keep them only when they are needed to
  diagnose a failed or blocked run.

## Stop Behavior

Controlled stops are successful automation outcomes. When a prerequisite is
missing or unsafe, stop early, avoid partial writes, clean the lock if owned by
this run, and report the blocker.

## Final Report

Every run must end with a visible final report containing:

- result: `success`, `no-op`, or `blocked`
- task name and run id
- current clock time used by the run
- durable files changed, or `none`
- locks and artifacts removed or preserved
- verification performed
- next owner: `none`, `post-publish-review`, or `repo-persistence`
- residual blocker, if any
