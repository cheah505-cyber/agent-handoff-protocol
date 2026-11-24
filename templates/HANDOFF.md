---
handoff_version: "1"
status: "PAUSED"
updated_at: "{{NOW}}"
work_unit_id: "DEMO-001"
phase: "bootstrap"
owner: "none"
session_id: "none"
active_branch: "main"
started_at: "none"
lease_until: "none"
touched_paths: "none"
current_file: "none"
next_action_file: "PROJECT.md"
next_action_anchor: "## Next"
next_action: "Customize AGENTS.md and PROJECT.md, then run `ahp check`."
acceptance: "`ahp check` passes with 0 FAIL."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "{{NOW}}"
last_verified_command: "ahp check"
---

# HANDOFF — {{PROJECT_NAME}}

> Current-state source of truth. Long-term decisions belong in `PROJECT.md`.

## 0. Takeover status

- Status: `PAUSED`
- Work unit: `DEMO-001`
- External responsibilities: none

## 1. Last completed

- {{DATE}} · Initialized the project with AHP.

## 2. Exact pause point

- Paused at bootstrap; no file is being edited.

## 3. Current working set

- Current file: none.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. Read `AGENTS.md`, `INDEX.md`, and `PROJECT.md`.
2. Customize the files for this project.
3. Run `ahp check`.

**Acceptance:** `ahp check` passes with 0 FAIL.

## 5. Open risks

- The gates check structure, not truth. Run a cold read before trusting the handoff.

## 6. Last verification

- {{DATE}} · Command: `ahp check` (not run yet).

## 7. Recovery commands

```bash
ahp check
ahp resume
git status -sb
```
