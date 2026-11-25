---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-26T06:31:00+08:00"
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
next_action: "Publish the security article by hand — `publish/agent-memory-attack-surface.meta.md` has the title, summaries, tags and per-site steps; order 先知 → FreeBuf → 安全客 (安全客 requires first publication, so last). The article is review-ready; the publish package is prepared. Optionally write the English version for LinkedIn. Then the 90-day roadmap: one awesome list / newsletter, and one free or low-price assessment for a testimonial."
acceptance: "The security article is published in at least one security channel and its URL is recorded in §6; `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-26T06:31:00+08:00"
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
- 2026-11-25 · Third dev.to comment (`3dae`, salparvez: "a punch list where every box is checked and the door still doesn't close"; their team wants the cold-read test for ML Systems handoff notes) — replied `3mdf0` with the two extra questions and the "a guessed step is a failed handoff" criterion.
- 2026-11-25 · Errata applied to the published copies: dev.to (`edited_at` 10:56:52Z), 掘金 (same article `7711934164547141659`, five edits, one tag only), CSDN — the CSDN edit created a **second** article (`171375400` → `171375930`) and the old one was deleted.
- 2026-11-26 · Security article publish package prepared: `publish/agent-memory-attack-surface.md` + `.html` + `.meta.md` (title, summaries, category/tag suggestions, per-site steps, publish order 先知 → FreeBuf → 安全客 — 安全客 requires first publication, so it goes last). All three channels need the user's own logged-in browser: 先知 307s to 阿里云 login, FreeBuf returns 405 to this environment's WAF, 安全客 is not logged in.
- 2026-11-25 · `AHP-CONTENT-002`: wrote `docs/agent-memory-attack-surface.md` (3315 Chinese characters, seven sections) for the security audience. First review by `deepseek/deepseek-flash`: verdict `fix-first`, ten findings. A diff-scoped re-review then found two of them still partial (a false assumption count in the sentence F8 was meant to fix, and a 19-vs-20 split left half-done — the stale 20 had already reached the 知乎 publish copies). Both are fixed; notes in `docs/reviews/2026-11-25-deepseek-flash.md` and `docs/reviews/2026-11-25-deepseek-flash-recheck.md`.
- 2026-11-25 · Review triage closed two regressions and two false claims: the `docs`-is-a-file crash in `buildContext`, and the "三类真实发生过的失败" claim that cited files without that class. The war story's 22/15 numbers are now labelled a v0.1.0 snapshot (the published copies stay as they were).
## 2. Exact pause point
- The security article is written, reviewed, fixed, and ready to publish. Nothing is half-written.
- All three published copies now carry the v0.1.0 snapshot wording for the test count. CSDN's copy is the only one with a different article id than before (the edit created a new article; the old one is gone).
- The test suite is 27 (19 negative fixtures); `check` is 12 PASS / 0 FAIL on a clean tree.
- Two publication facts settled this session: 掘金 allows exactly **one** tag per article (the second tag was never achievable), and 知乎's draft plus session were both lost to its anti-automation check, so 知乎 is handed back to the human.
- The tree is clean; no owner, session, or lease.
## 3. Current working set
- Current file: none.
- Running processes: none.
- Blocked by: none.
## 4. Next action & acceptance
1. Publish the security article **by hand** using `publish/agent-memory-attack-surface.meta.md` (one file: metadata, per-site steps, publish order). The article itself is review-ready (two review rounds triaged) and the publish package is prepared; only the login + submit is left, and it needs the user's own browser. Order: 先知 → FreeBuf → 安全客 (安全客 requires first publication).
2. Decide whether to write the English version for LinkedIn — the article's §4 (integrity is testable, truth of an unrecorded quote is not) is the most portable part.
3. 知乎: the user handles it from `publish/war-story.zhihu.md`; do not automate past its security check.
4. Then start the 90-day roadmap (`docs/open-source-report.md` §11): submit to one or two awesome lists / newsletters, and line up one free or low-price assessment for a testimonial.
**Acceptance:** the security article is published in at least one security channel and its URL is recorded in §6; `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`.
## 5. Open risks
- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The repository is public. `SECRETS` covers the core files, `memory/` and `docs/`; it does **not** cover `publish/` or `tasks/`, and it does not follow symlinked directories under `docs/`.
- A security article is the most likely place to overclaim. The review's `fix-first` verdict exists because one claim cited files that did not contain it; re-check every "真实发生过" / "已验证" before publishing.
- Numbers in prose are not gated. The war story and the security article carry different test counts (22 snapshot vs 27 current) on purpose; do not "align" them by editing the published text. The 知乎 publish copies are regenerated from `docs/war-story.md` — regenerate them after any edit to that file, or the copies drift (this happened once: the copies carried 20 negative fixtures while the source said 19).
- Publishing is external and unverified by any gate. A platform can log a session out silently (知乎 did).
- **A publish action can silently create a second article.** CSDN did exactly that when an edit went through the markdown importer. After every publish, check the article id and the article count in the management list, not just the success banner.
- Tags are not applied by clicking a list item in some editors (dev.to, CSDN): the click must land on an autocomplete suggestion. Otherwise the platform silently picks its own tag — CSDN chose `arcgis` for an article about agent memory.
## 6. Last verification
- 2026-11-25 · `npm test` → 27/27 (19 negative fixtures); `node bin/ahp.mjs check` → 12 PASS / 0 FAIL on a clean tree; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · `SECRETS` on the real repo: PASS. Negative fixtures added for: a token under `docs/`, in a dotfile, in an uppercase `.MD`, and a modern `sk-proj-` key; plus a guard for `docs` being a regular file.
- 2026-11-25 · Published copies verified after the errata: dev.to body carries "At v0.1.0 the suite was 22 tests … It is 27 tests (19 negative fixtures) now"; 掘金 page shows all five edits and still one tag (`AI编程`), same article id; CSDN `171375930` shows all five edits with tags `开源/人工智能/软件工程`, `已发布(1)`, `回收站(0)`.
- 2026-11-26 · Publish package: `publish/agent-memory-attack-surface.md` (3306 Chinese characters, 8 headings, 3 tables, all links absolute) + `.html` (no leftover Markdown syntax) + `.meta.md`.
- 2026-11-25 · `docs/agent-memory-attack-surface.md` → 3315 Chinese characters (target 3000–4200); links resolve; the appendix has one checkable source per row (13 rows), including the cold-read rounds and the test count.
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
