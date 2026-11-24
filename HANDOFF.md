---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T06:19:58+08:00"
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
next_action: "Open AHP-CONTENT-001 with `tasks/AHP-CONTENT-001.md`: write the war-story article and memory-security checklist."
acceptance: "`tasks/AHP-CONTENT-001.md` exists; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; the article/checklist are linked and fact-checked; local tag `v0.1.0` points at the v0.1 release commit."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T06:19:58+08:00"
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
- 2026-11-25 · Added `docs/multi-model-review.md` + `docs/reviews/` template: one writer, one independent reviewer; linked from README/INDEX/AGENTS.
- 2026-11-25 · Prepared `tasks/AHP-CONTENT-001.md` for the next session: war-story article + memory-security checklist.

## 2. Exact pause point

- v0.1.0 is released on its release commit; this docs-only commit does not move the tag. The tree is clean; no owner, session, or lease.
- The next unit is `AHP-CONTENT-001`; its task card is ready at `tasks/AHP-CONTENT-001.md`.

## 3. Current working set

- Current file: none.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. Read `tasks/AHP-CONTENT-001.md`; take the work unit in `HANDOFF.md` (`AHP-CONTENT-001`, owner/session/lease).
2. Rerun `npm test`, `node bin/ahp.mjs check`, and `node bin/ahp.mjs sync --check`; record the results.
3. Draft `docs/war-story.md` from the real failures and numbers; mark every claim with its source.
4. Draft `docs/memory-security-checklist.md` as an authorized-assessment checklist.
5. Fact-check, link both docs from `README.md`/`INDEX.md`, update `HANDOFF`/`PROJECT`, run the gates, commit.
6. Publish the article; use the checklist as the CTA.

**Acceptance:** `tasks/AHP-CONTENT-001.md` exists; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; both docs are linked and fact-checked; local tag `v0.1.0` points at the v0.1 release commit.

## 5. Open risks

- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The protocol can overclaim. Keep `docs/limits.md` visible: structure is not truth.
- The article can drift into marketing. Keep the real failures, numbers, and tests.

## 6. Last verification

- 2026-11-25 · `npm test` → 22/22; `node bin/ahp.mjs check` → 12 PASS, 0 FAIL; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · Cold read v1 → 8 issues; v2 → 3 issues; v3 quick → 5 issues; all fixed.
- 2026-11-25 · v1/v2/v3 findings fixed; final four-file self-check found no contradictions. Local tag `v0.1.0` on the release commit.
- 2026-11-25 · Added multi-model review protocol (`docs/multi-model-review.md` + `docs/reviews/`); `npm test` 22/22, `ahp check` 12 PASS, `sync --check` pass.
- 2026-11-25 · Prepared `tasks/AHP-CONTENT-001.md`; next session can start content work.

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
