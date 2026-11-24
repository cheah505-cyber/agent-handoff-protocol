---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T05:46:42+08:00"
work_unit_id: "AHP-OPEN-SOURCE-001"
phase: "v0.1-released"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "none"
lease_until: "none"
touched_paths: "none"
current_file: "none"
next_action_file: "HANDOFF.md"
next_action_anchor: "## 4. Next action & acceptance"
next_action: "Open AHP-CONTENT-001: write the war-story article and memory-security checklist."
acceptance: "Local tag `v0.1.0` points at this release; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; cold read v3 finds no contradictions."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T05:46:42+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---

# HANDOFF — Agent Handoff Protocol

> Current-state source of truth. Long-term decisions belong to `PROJECT.md`.

## 0. Takeover status

- Status: `PAUSED`
- Work unit: `AHP-OPEN-SOURCE-001`
- Phase: `v0.1-released`
- External responsibilities: none

## 1. Last completed

- 2026-11-25 · Implemented the CLI, 12 gates, templates, and 22 tests.
- 2026-11-25 · Wrote the design, limits, security, production-lesson, case-study, and open-source report docs.
- 2026-11-25 · Cold read v1 found eight documentation issues; v2 found three sequencing/ambiguity issues; v3 found five more. All fixed. The final cold read is the release gate.
- 2026-11-25 · Release validation: `npm test` 22/22; `node bin/ahp.mjs check` 12 PASS; `node bin/ahp.mjs sync --check` pass; tag `v0.1.0`.

## 2. Exact pause point

- v0.1.0 is released. The release tag points at this commit; the tree is clean; no owner, session, or lease.
- The next unit is content, not code.

## 3. Current working set

- Current file: none.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. If the tag is missing, create it: `git tag -a v0.1.0 -m "AHP v0.1.0"`; confirm `git tag --points-at HEAD` contains `v0.1.0`.
2. Rerun `npm test`, `node bin/ahp.mjs check`, and `node bin/ahp.mjs sync --check`; record the results.
3. Open `AHP-CONTENT-001` as a new work unit in the next session.
4. Write the war-story article (AI engineering audience).
5. Write the memory-security checklist (security audience).

**Acceptance:** local tag `v0.1.0` points at the release; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; the final cold read finds no contradictions.

## 5. Open risks

- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The protocol can overclaim. Keep `docs/limits.md` visible: structure is not truth.
- The article can drift into marketing. Keep the real failures, numbers, and tests.

## 6. Last verification

- 2026-11-25 · `npm test` → 22/22; `node bin/ahp.mjs check` → 12 PASS, 0 FAIL; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · Cold read v1 → 8 issues; v2 → 3 issues; v3 quick → 5 issues; all fixed.
- 2026-11-25 · v1/v2/v3 findings fixed; final four-file self-check found no contradictions. Local tag `v0.1.0` on the release commit.

## 7. Recovery commands

```bash
cd /home/will/Projects/开源项目
npm test
node bin/ahp.mjs check
node bin/ahp.mjs sync --check
node bin/ahp.mjs resume
git rev-parse --show-toplevel
git status -sb
git log -1 --oneline
git tag --points-at HEAD
```
