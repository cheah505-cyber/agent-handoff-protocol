---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T18:49:59+08:00"
work_unit_id: "AHP-CONTENT-002"
phase: "security-article-reviewed"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "2026-11-25T18:20:00+08:00"
lease_until: "none"
touched_paths: "docs/agent-memory-attack-surface.md;docs/reviews/2026-11-25-deepseek-flash.md;docs/publish-plan.md;docs/limits.md;docs/war-story.md;docs/war-story.en.md;lib/config.mjs;lib/gates.mjs;tests/gates.test.mjs;templates/ahp.config.json;SPEC.md;README.md;README.zh-CN.md;CHANGELOG.md;INDEX.md;PROJECT.md;HANDOFF.md"
current_file: "none"
next_action_file: "docs/agent-memory-attack-surface.md"
next_action_anchor: "# 七、从这里开始"
next_action: "Publish `docs/agent-memory-attack-surface.md` in one security channel (先知 / FreeBuf / 安全客) after the user picks the order; decide whether to also write the English version for LinkedIn; then start the 90-day roadmap (awesome lists, one free assessment)."
acceptance: "The security article is published in at least one security channel and its URL is recorded in §6; `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T18:49:59+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---
# HANDOFF — Agent Handoff Protocol
> Current-state source of truth. Long-term decisions belong to `PROJECT.md`.
## 0. Takeover status
- Status: `PAUSED`
- Work unit: `AHP-CONTENT-002`
- Phase: `security-article-reviewed`
- External responsibilities: none
## 1. Last completed
- 2026-11-25 · v0.1.0 released: CLI, 12 gates, templates, 22 tests, docs set, cold reads v1/v2/v3.
- 2026-11-25 · `AHP-CONTENT-001`: war story + memory-security checklist (Chinese + English), reviewed by DeepSeek; published to 掘金 and dev.to, plus CSDN (under review). V2EX, 博客园 and SegmentFault were dropped for account-eligibility reasons.
- 2026-11-25 · Replied to both dev.to comments as `willcheah` (`3md5g` cold-read cadence, `3md5h` provenance-vs-check).
- 2026-11-25 · `AHP-GATE-002`: `SECRETS` now scans `docs/**/*.md` recursively (case-insensitive, dotfiles included); `publish/` and `tasks/` are documented as **not** scanned.
- 2026-11-25 · `AHP-CONTENT-002`: wrote `docs/agent-memory-attack-surface.md` (3209 Chinese characters, seven sections) for the security audience. Reviewed by `deepseek/deepseek-flash`; verdict `fix-first`, ten findings, all fixed or explicitly accepted; note in `docs/reviews/2026-11-25-deepseek-flash.md`.
- 2026-11-25 · Review triage closed two regressions and two false claims: the `docs`-is-a-file crash in `buildContext`, and the "三类真实发生过的失败" claim that cited files without that class. The war story's 22/15 numbers are now labelled a v0.1.0 snapshot (the published copies stay as they were).
## 2. Exact pause point
- The security article is written, reviewed, fixed, and ready to publish. Nothing is half-written.
- The test suite is 27 (19 negative fixtures); `check` is 12 PASS / 0 FAIL on a clean tree.
- Two publication facts settled this session: 掘金 allows exactly **one** tag per article (the second tag was never achievable), and 知乎's draft plus session were both lost to its anti-automation check, so 知乎 is handed back to the human.
- The tree is clean; no owner, session, or lease.
## 3. Current working set
- Current file: none.
- Running processes: none.
- Blocked by: none.
## 4. Next action & acceptance
1. Publish `docs/agent-memory-attack-surface.md` in one security channel: 先知 / FreeBuf / 安全客 (the user picks the order). Keep the defensive framing; no exploit steps.
2. Decide whether to write the English version for LinkedIn — the article's §4 (integrity is testable, truth of an unrecorded quote is not) is the most portable part.
3. 知乎: the user handles it from `publish/war-story.zhihu.md`; do not automate past its security check.
4. Then start the 90-day roadmap (`docs/open-source-report.md` §11): submit to one or two awesome lists / newsletters, and line up one free or low-price assessment for a testimonial.
**Acceptance:** the security article is published in at least one security channel and its URL is recorded in §6; `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`.
## 5. Open risks
- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The repository is public. `SECRETS` covers the core files, `memory/` and `docs/`; it does **not** cover `publish/` or `tasks/`, and it does not follow symlinked directories under `docs/`.
- A security article is the most likely place to overclaim. The review's `fix-first` verdict exists because one claim cited files that did not contain it; re-check every "真实发生过" / "已验证" before publishing.
- Numbers in prose are not gated. The war story and the security article now carry different test counts (22 snapshot vs 27 current) on purpose; do not "align" them by editing the published text.
- Publishing is external and unverified by any gate. A platform can log a session out silently (知乎 did).
## 6. Last verification
- 2026-11-25 · `npm test` → 27/27 (19 negative fixtures); `node bin/ahp.mjs check` → 12 PASS / 0 FAIL on a clean tree; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · `SECRETS` on the real repo: PASS. Negative fixtures added for: a token under `docs/`, in a dotfile, in an uppercase `.MD`, and a modern `sk-proj-` key; plus a guard for `docs` being a regular file.
- 2026-11-25 · `docs/agent-memory-attack-surface.md` → 3209 Chinese characters (target 3000–4200); links resolve; every number traced in the appendix.
- 2026-11-25 · Reviewer baseline (`deepseek-flash`, read-only): `npm test` 23/23 at review time, `check` 1 FAIL (GIT_STATE, dirty tree), `sync --check` in sync; it replayed the pre-change commit in a temp copy to confirm the new test really turns red.
- 2026-11-25 · Published articles still verified: 掘金 (one tag, `AI编程`), CSDN 7678 chars / 4 tables / 2 code blocks, dev.to 16.8 KB / 4 tables / 2 code blocks.
## 7. Recovery commands
```bash
cd /path/to/agent-handoff-protocol
npm test
node bin/ahp.mjs check
node bin/ahp.mjs sync --check
node bin/ahp.mjs resume
git rev-parse --show-toplevel
git status -sb
git log -1 --oneline
git tag --points-at HEAD
git remote -v
```
