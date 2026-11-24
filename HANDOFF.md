---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T05:43:40+08:00"
work_unit_id: "AHP-OPEN-SOURCE-001"
phase: "v0.1-publish"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "none"
lease_until: "none"
touched_paths: "none"
current_file: "none"
next_action_file: "PROJECT.md"
next_action_anchor: "## Status"
next_action: "Complete the v0.1 release sequence in §4: commit, validate on the clean commit, cold read, then create the local tag v0.1.0."
acceptance: "`npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; cold read finds no contradictions; local tag `v0.1.0` exists."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T05:43:40+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---

# HANDOFF — Agent Handoff Protocol

> Current-state source of truth. Long-term decisions belong in `PROJECT.md`.

## 0. Takeover status

- Status: `PAUSED`
- Work unit: `AHP-OPEN-SOURCE-001`
- Phase: `v0.1-publish`
- External responsibilities: none

## 1. Last completed

- 2026-11-25 · Implemented the CLI, 12 gates, templates, and 22 tests.
- 2026-11-25 · Wrote the design, limits, security, production-lesson, case-study, and open-source report docs.
- 2026-11-25 · Cold read v1 found eight documentation issues; cold read v2 found two sequencing/ambiguity issues. Both sets are fixed in this unit.

## 2. Exact pause point

- v0.1 is code- and docs-complete. The release sequence is pending: final commit, clean-tree validation, cold read v3, local tag.
- The tree is clean at this pause; no owner, session, or lease.

## 3. Current working set

- Current file: none.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. Run `npm test` and `node bin/ahp.mjs check`; record any `GIT_STATE` result that reflects the current tree.
2. Commit the final v0.1 state.
3. Run `npm test`, `node bin/ahp.mjs check`, and `node bin/ahp.mjs sync --check` on the clean commit; record the results.
4. Run a fresh cold read of the four core files; record that it finds no contradictions.
5. Create a local tag `v0.1.0` in this repository (there is no remote configured).
6. In the next session, open `AHP-CONTENT-001` as a new work unit for the war-story article and memory-security checklist; do not fold it into this release.

**Acceptance:** `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; cold read finds no contradictions; local tag `v0.1.0` exists.

## 5. Open risks

- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The protocol can overclaim. Keep `docs/limits.md` visible: structure is not truth.
- The article can drift into marketing. Keep the real failures, numbers, and tests.

## 6. Last verification

- 2026-11-25 · `npm test` → 22/22; `node bin/ahp.mjs check` → 12 PASS, 0 FAIL; `node bin/ahp.mjs sync --check` → in sync (run on the pre-release commit).
- 2026-11-25 · Cold read v1 → 8 issues; cold read v2 → 2 sequencing/ambiguity issues; both fixed. Cold read v3 is the release gate.

## 7. Recovery commands

```bash
cd /home/will/Projects/开源项目
npm test
node bin/ahp.mjs check
node bin/ahp.mjs sync --check
node bin/ahp.mjs resume
git status -sb
git log -1 --oneline
```
