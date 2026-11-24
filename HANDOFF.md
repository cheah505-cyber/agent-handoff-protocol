---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T05:35:05+08:00"
work_unit_id: "AHP-OPEN-SOURCE-001"
phase: "v0.1-build"
owner: "none"
session_id: "none"
active_branch: "main"
started_at: "none"
lease_until: "none"
touched_paths: "none"
current_file: "none"
next_action_file: "PROJECT.md"
next_action_anchor: "## Status"
next_action: "Publish v0.1: finish docs, run tests, commit, then write the war-story article."
acceptance: "`npm test` passes (22+); `node bin/ahp.mjs check` reports 0 FAIL."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T05:35:05+08:00"
last_verified_command: "node bin/ahp.mjs check"
---

# HANDOFF — Agent Handoff Protocol

> Current-state source of truth. Long-term decisions belong in `PROJECT.md`.

## 0. Takeover status

- Status: `PAUSED`
- Work unit: `AHP-OPEN-SOURCE-001`
- Phase: `v0.1-build`
- External responsibilities: none

## 1. Last completed

- 2026-11-25 · Implemented the CLI, 12 gates, templates, 22 tests, and the open-source report.
- 2026-11-25 · Distilled the epl-pro and 网安 governance lessons into `docs/lessons-from-production.md` and `docs/case-studies.md`.

## 2. Exact pause point

- v0.1 is code-complete; docs and the report are drafted. No file is being edited.
- The next unit is publication: README polish, a fresh cold read, git commit/tag, then the article.

## 3. Current working set

- Current file: none.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. Run `npm test` and `node bin/ahp.mjs check` on a clean tree.
2. Run a fresh cold read using only `AGENTS.md`, `INDEX.md`, `PROJECT.md`, `HANDOFF.md`.
3. Commit and tag `v0.1.0`.
4. Write the war-story article and the memory-security checklist.

**Acceptance:** `npm test` passes (22+); `node bin/ahp.mjs check` reports 0 FAIL; the cold read recovers the next action without chat history.

## 5. Open risks

- The repository is inside a larger workspace git repo. AHP must be initialized as its own git repo before `GIT_STATE` is meaningful.
- The first public version can overclaim. Keep `docs/limits.md` visible: structure is not truth.
- The article can drift into marketing. Keep the real failures, numbers, and tests.

## 6. Last verification

- 2026-11-25 · `node --test` → 22/22 pass; `node bin/ahp.mjs check` → 12 gates, 0 FAIL after the initial commit (the pre-commit run reports `GIT_STATE` dirty by design).

## 7. Recovery commands

```bash
cd /home/will/Projects/开源项目
npm test
node bin/ahp.mjs check
node bin/ahp.mjs resume
git status -sb
```
