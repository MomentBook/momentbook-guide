#!/bin/zsh
set -eu

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

RUNNER_HOME="${HOME}/.codex/momentbook-guide-automation"
BASE_DIR="/Users/hansol/Documents/New project/momentbook-guide"
LOG_DIR="${RUNNER_HOME}/logs"
LOCK_DIR="${RUNNER_HOME}/lock"
RUN_ID="$(date -u '+%Y%m%dT%H%M%SZ')"
RUN_LOG="${LOG_DIR}/guide-publisher-${RUN_ID}.log"
FINAL_REPORT="${LOG_DIR}/guide-publisher-${RUN_ID}.final.md"

mkdir -p "${LOG_DIR}"

if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
  echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ') skipped: local automation lock exists at ${LOCK_DIR}" >> "${LOG_DIR}/guide-publisher-skips.log"
  exit 0
fi

cleanup() {
  rmdir "${LOCK_DIR}" 2>/dev/null || true
}
trap cleanup EXIT

PROMPT="You are running as the unattended six-hourly Momentbook guide publisher.

Use the local guide automation contract at /Users/hansol/Documents/New project/momentbook-guide/automation/tasks/guide-publisher/prompt.md.

Important:
- Work in /Users/hansol/Documents/New project/momentbook-guide.
- Read the local automation contract fully before doing any guide work.
- Read and apply automation/shared/codex-operating-principles.md.
- Read and follow automation/tasks/guide-publisher/workflow.md.
- Acquire, skip, or replace the local lock according to that contract before starting.
- Publish exactly one new registry-safe travel guide through dev DB verification and scoped production DB replication.
- Use ssh momentbook-dev only for development environment access.
- Use ssh momentbook only for scoped production DB replication and verification.
- Use bounded parallel role agents for source research, localization, and QA where the workflow allows it.
- Run the automated article quality gate before any DB write.
- Leave no production files behind.
- Do not stage, commit, push, or force-push. Git persistence is handled by the repo-persistence automation.
- Always produce a visible final report for audit, including skip/stop cases.
- Do not ask for interactive confirmation. If a required action cannot be completed non-interactively, stop and report the blocker."

{
  echo "started_at=$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  echo "base_dir=${BASE_DIR}"
  echo "final_report=${FINAL_REPORT}"
  echo
  /opt/homebrew/bin/codex exec \
    --cd "${BASE_DIR}" \
    --skip-git-repo-check \
    --model gpt-5.5 \
    --dangerously-bypass-approvals-and-sandbox \
    --output-last-message "${FINAL_REPORT}" \
    "${PROMPT}"
  echo
  echo "finished_at=$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
} >> "${RUN_LOG}" 2>&1
