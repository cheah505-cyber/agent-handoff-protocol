---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-26T09:01:21+08:00"
work_unit_id: "AHP-CONTENT-002"
phase: "awaiting-channel-review"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "2026-11-26T09:00:00+08:00"
lease_until: "none"
touched_paths: "docs/agent-memory-attack-surface.md;docs/agent-memory-attack-surface.en.md;docs/self-assessment.md;docs/publish-plan.md;docs/limits.md;docs/war-story.md;docs/war-story.en.md;docs/memory-security-checklist.md;docs/memory-security-checklist.en.md;docs/reviews/2026-11-25-deepseek-flash.md;docs/reviews/2026-11-25-deepseek-flash-recheck.md;publish/agent-memory-attack-surface.md;publish/agent-memory-attack-surface.en.md;publish/agent-memory-attack-surface.meta.md;publish/agent-memory-attack-surface.cover.svg;publish/agent-memory-attack-surface.cover.png;publish/hns-pitch.md;publish/hns-outline.md;publish/war-story.zhihu.md;publish/war-story.zhihu.flat.md;publish/war-story.zhihu.html;publish/war-story.zhihu.flat.html;lib/gates.mjs;lib/config.mjs;tests/gates.test.mjs;templates/AGENTS.md;templates/ahp.config.json;SPEC.md;README.md;README.zh-CN.md;CHANGELOG.md;INDEX.md;PROJECT.md;HANDOFF.md"
current_file: "none"
next_action_file: "docs/publish-plan.md"
next_action_anchor: "### 7.2.4 Help Net Security"
next_action: "On the user's report that 先知 or 安全客 passed: if it was 先知, correct its live text first (the CANNOT VERIFY sentence and the two appendix citations in §5); then publish CSDN as 转载 with a first-published line (docs/publish-plan.md §7.4) and record both URLs in §6. Otherwise the work is the manual daily sweep (§4 item 0), the Help Net Security follow-up on 2026-12-10, and answering PR insodimension/awesome-agent-protocols#36. 知乎 is the user's."
acceptance: "The security article is published in at least one Chinese security channel and its URL is recorded in §6 (not yet met: 先知 and 安全客 are both 待审核); `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "user: report the 先知 / 安全客 review outcome and the 知乎 publication; upstream: Help Net Security reply (follow up 2026-12-10), awesome-list PR insodimension/awesome-agent-protocols#36"
last_verified_at: "2026-11-26T09:01:21+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---
# HANDOFF — Agent Handoff Protocol
> Current-state source of truth. Long-term decisions belong to `PROJECT.md`.
## 0. Takeover status
- Status: `PAUSED`
- Work unit: `AHP-CONTENT-002`
- Phase: `awaiting-channel-review`
- External responsibilities: 先知 and 安全客 reviews (user reports); 知乎 publication (user); Help Net Security reply (follow up 2026-12-10); awesome-list PR #36 (maintainer decides)
## 1. Last completed
- 2026-11-26 · **Help Net Security pitch sent** to `press@helpnetsecurity.com` (subject: "Pitch: agent memory is an attack surface — a defensive write-up"). Name 威尔@Will, independent maintainer, gmail contact. An outline is pre-written in `publish/hns-outline.md` in case the editor asks. **Follow up on 2026-12-10** if there is no reply; silence is the norm, and Dark Reading is the same pitch with two lines changed.
- 2026-11-26 · Roadmap work, four items: (a) **PR opened** to `insodimension/awesome-agent-protocols` — https://github.com/insodimension/awesome-agent-protocols/pull/36 — one entry under *Formats and conventions*, `format/convention`, `awesome-lint` clean on the added line (the 8 reported errors are pre-existing on `main`). (b) **Help Net Security pitch** drafted in `publish/hns-pitch.md` (~190 words, exclusivity, length, and an explicit line that an AI assistant drafted and a human revised every claim); it needs the user's name, role and email. (d) **Squash-merge question resolved by measurement**: authored 2026-11-24 + merged 2026-11-26 fails `GIT_STATE` with the day mismatch, and re-stamping to the merge day with an amend passes; the gate stays strict, the remedy is one amend (`docs/limits.md` §5). (e) **GitHub Discussions enabled**; homepage left empty on purpose (no site exists, and pointing it at an article would misrepresent it).
- 2026-11-26 · **Self-assessment** `docs/self-assessment.md`: ran the 13-item checklist against this repository. Nine PASS, one PARTIAL (only `AGENTS.md` is auto-injected and its review rule is a convention), one FAIL accepted (prose cannot separate facts from instructions), two N/A (no roles, no target list). Evidence is real: three fault injections with exit codes, a read-only proof, a clean-room `init`, and a direct grep of the two roots `SECRETS` does not scan. The audit found one real bug and it is fixed: the deferred commit-day message claimed `updated_at=not-a-date matches today` in the same run where `HANDOFF_SCHEMA` rejected the date. `docs/limits.md` §2 gained the two blind spots the audit confirmed (fact-vs-instruction, authorization validity).
- 2026-11-26 · Repository surface: published the **v0.1.0 GitHub Release** (https://github.com/cheah505-cyber/agent-handoff-protocol/releases/tag/v0.1.0 — the tag existed with no release) and added the CI badge to both READMEs. The release notes state the v0.1.0 snapshot (22 tests / 15 fixtures) and point at `CHANGELOG.md` for the current 27 / 19 rather than blurring the two.
- 2026-11-26 · English reach, third venue: **r/LLMDevs** published https://old.reddit.com/r/LLMDevs/comments/1y5ncu9/agent_memory_as_an_attack_surface_poisoned_facts/ with flair `Resource`, plus an author-disclosure comment that states the two limits (a green gate over a contradictory handoff is not evidence; quote truth has no fixture). r/netsec was ruled out on its rule 9 (`No AI-generated posts`); Hacker News returns `Sorry, account creation disabled`.
- 2026-11-26 · **LinkedIn** post published from the user's account (text in `docs/publish-plan.md` §7.3; verified on the profile's recent-activity page — LinkedIn does not expose a stable post URL in the DOM). **安全客** submission sent: 待审核 at 2026-11-26 08:12:48, with the corrected body (6010 chars), tags `AI安全,Agent,代码审计`, category 安全知识, cover uploaded, phone and contact supplied by the user. **先知** is still 待审核 and still carries the pre-fix text.
- 2026-11-26 · English review (`deepseek/deepseek-flash`, read-only) returned `fix-first` with one **major**: the article claimed the checklist gives "no independent evidence" its own `CANNOT VERIFY` state "different from no permission", while the checklist defines that state as missing permission or environment and has no provenance item at all — a doc-vs-doc contradiction on a page whose thesis is not overclaiming. Fixed at the source rather than by deleting the sentence: the checklist definition now also covers "no independent witness" (both languages), and both articles say the reason is recorded as "no independent evidence". Also applied: restored the threat-model anchor, made the quote-truth row conditional ("absent a recording or second witness"), corrected the 8/3/5 citation to `war-story.en.md` §2 plus its preface, cited case 5 for the "10 changes" number, added appendix rows for 2–5 days and the eighteen lines, twelve English style fixes, and moved the CTA to the end so the checklist is offered once. The live dev.to body was replaced (14491 → 14773 chars) and re-verified: 3 tables, 8 h2, all five corrected sentences present. The 安全客 draft was refilled with the corrected body (6010 chars) and saved again; it still lacks the phone number and a contact.
- 2026-11-26 · Wrote the **English** version `docs/agent-memory-attack-surface.en.md` (2251 words, same numbers and qualifiers as the Chinese source; review pending) and published it on dev.to: https://dev.to/willcheah/your-agents-memory-is-an-attack-surface-1fi7 (id `5119922`, tags security/ai/agents/devtools, canonical → the repo file; page verified at 3 tables / 8 h2 / 7 h3 / 2279 words). LinkedIn is not logged in in this browser, so the post copy is prepared in `docs/publish-plan.md` §7.3 for the user to paste.
- 2026-11-26 · Replied to two new dev.to comments on the war story: `3mdhe` (parlup — denylists rot, so `last_verified_command` must point at a command that can fail; compute EXPIRED rather than store it, or you have made a second source for the same fact; the cold read should cross harnesses, not just contexts) and `3mdp8` (heinrichneb — a duplicated fact is a second owner; derive it or delete it, and a comparison check that cannot turn red is a third copy).
- 2026-11-26 · `AHP-GATE-003`: diagnosed workflow run `45713848434` — a **true positive** on the superseded commit `4cbd18f` (handoff body claimed 2026-11-26 work while `updated_at` still said 2026-11-25; the commit landed after local midnight). Master `0b3b05d` is green and the failed run stays as honest history. The local check was not blind: the pre-commit run was already `FAIL GIT_STATE PAUSED requires a clean tree`, and the post-commit run named the mismatch — the run reached GitHub because the push came before the post-commit check. An independent review (`deepseek/deepseek-flash`) rejected the first fix (a hard FAIL for every status) as contradicting the dirty-tree policy and punishing selective commits, long `ACTIVE`/`BLOCKED` states and `git apply`. Final fix: `GIT_STATE`'s deferred message names a stale stamp, gate statuses unchanged, and the pause contract in `AGENTS.md` / `templates/AGENTS.md` now says commit → re-run `ahp check` on the clean tree → push. No fixture or count change, so the published numbers stay accurate.
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
- Nothing is half-written. The Chinese security article, its English version, the checklist, the self-assessment, and every publish package are final; the tree is clean and CI is green.
- **Two Chinese channels are submitted and pending review** — 先知 (`待审核`; its body is one revision behind, see §5) and 安全客 (`待审核`, corrected body). Whichever publishes first owns 首发; 安全客's rules require it there, so a 先知-first outcome makes the 安全客 copy a 转载 with a first-published line.
- **CSDN is prepared and deliberately unpublished**: it publishes instantly and would steal 首发 from both. After either channel goes live, publish `publish/agent-memory-attack-surface.md` there as 转载 with a first-published line (`docs/publish-plan.md` §7.4; the importer uses the filename as the title).
- **English is live in three places**: dev.to (war story + security article), LinkedIn, r/LLMDevs (`Resource` flair, author comment). r/netsec is out on rule 9 (`No AI-generated posts`); Hacker News has registration closed.
- **Two external threads are open and waiting on other people**: the Help Net Security pitch (sent 2026-11-26, follow up 2026-12-10; outline ready in `publish/hns-outline.md`) and awesome-list PR `insodimension/awesome-agent-protocols#36`.
- 知乎 is the user's: publish from `publish/war-story.zhihu.md` (`.flat.md` if tables break), then delete the broken draft `2108969541657163196`.
- Suite 27 / 19 negative fixtures; `check` is 12 PASS / 0 FAIL; comment checking is manual and is item 0 in §4.

## 3. Current working set
- Current file: lib/gates.mjs.
- Running processes: none.
- Blocked by: none.
## 4. Next action & acceptance
0. **Daily, before other work**: the manual sweep in `docs/publish-plan.md` → 留言维护 (dev.to counts, Reddit, 掘金, CSDN, LinkedIn, and both pending reviews). Reply by hand; no automation.
1. **When 先知 passes** (the user will report it): correct its live copy first — the `CANNOT VERIFY` sentence and the two appendix citations listed in §5 — then publish CSDN as 转载 with `本文首发于先知社区 <链接>`. Record both URLs in §6.
2. **When 安全客 passes**: it is already the corrected body; publish CSDN as 转载 with `本文首发于安全客 <链接>`. If 先知 later rejects the duplicate, accept it — do not resubmit the same text twice.
3. **2026-12-10**: if Help Net Security has not replied, send one short nudge, then move the same pitch to Dark Reading. Silence is the norm, not a verdict.
4. **PR #36**: answer the maintainer's review if any; do not re-open or re-push if it is closed.
5. **Then** the rest of the 90-day roadmap (`docs/open-source-report.md` §11): one newsletter or list beyond #36, and one free or low-price assessment for a testimonial.
**Acceptance:** the security article is published in at least one Chinese security channel and its URL is recorded in §6 (not yet met); `npm test` 27/27; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`.

## 5. Open risks
- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The repository is public. `SECRETS` covers the core files, `memory/` and `docs/`; it does **not** cover `publish/` or `tasks/`, and it does not follow symlinked directories under `docs/`.
- A security article is the most likely place to overclaim. The review's `fix-first` verdict exists because one claim cited files that did not contain it; re-check every "真实发生过" / "已验证" before publishing.
- Numbers in prose are not gated. The war story and the security article carry different test counts (22 snapshot vs 27 current) on purpose; do not "align" them by editing the published text. The 知乎 publish copies are regenerated from `docs/war-story.md` — regenerate them after any edit to that file, or the copies drift (this happened once: the copies carried 20 negative fixtures while the source said 19).
- The 先知 submission (待审核) was made from the **pre-fix** Chinese body: it still says "在清单里给它一个独立状态…不同于缺权限" and cites §1 / §3.4 in the appendix. If it passes review, correct those before or right after it goes live.
- Publishing is external and unverified by any gate. A platform can log a session out silently (知乎 did).
- **A publish action can silently create a second article.** CSDN did exactly that when an edit went through the markdown importer. After every publish, check the article id and the article count in the management list, not just the success banner.
- Two pending channels hold the same article. If both accept, the second one must carry a first-published line; decide the order before publishing anything else, and do not send the piece to a third Chinese platform in the meantime.
- Tags are not applied by clicking a list item in some editors (dev.to, CSDN): the click must land on an autocomplete suggestion. Otherwise the platform silently picks its own tag — CSDN chose `arcgis` for an article about agent memory.
## 6. Last verification
- 2026-11-26 · Help Net Security pitch emailed by the user; the send address was verified on the outlet's contact page, not guessed. Outline ready at `publish/hns-outline.md` (7 sections, 1,200–1,800 words, exclusivity offered, AI-assistance disclosed).
- 2026-11-26 · Squash simulation in a detached worktree: FAIL `updated_at=2026-11-24 does not match its commit day=2026-11-26`, then PASS after the re-stamp + amend. `awesome-lint` on the fork: 8 errors, none on the added line (130). Discussions: `has_discussions: true`.
- 2026-11-26 · Self-assessment evidence: baseline `check` 12 PASS exit 0; dirty tree, bad date, missing file each exit 1 with the expected gate IDs; `git status --porcelain` byte-identical before and after `check`, `check --json` and `sync --check`; `init` in a temp dir produced exactly 7 files; `publish/` and `tasks/` grepped clean for token patterns.
- 2026-11-26 · Comment state: dev.to war story 5 comments (all answered), dev.to security 0, r/LLMDevs 1 (our author comment, no replies), 掘金 0, CSDN 289 reads / 0 comments, LinkedIn 0 notifications. `docs/publish-plan.md` now carries the consolidated published list and a comment-watch section; comment checking is manual and listed as item 0 in §4.
- 2026-11-26 · r/LLMDevs post `1y5ncu9` is live, not removed, flaired `Resource`, 1 point, author comment present. dev.to `5119922` still live; LinkedIn post on the profile's activity page.
- 2026-11-26 · LinkedIn: the composer took 1072 characters and the post is on the profile's recent activity. 安全客: `POST /data/v1/contribute` fired and `/contribute/manager` lists the article as 待审核 at 2026-11-26 08:12:48. 先知: still 待审核.
- 2026-11-26 · dev.to `5119922` edited in place after the review: body 14773 chars, page re-read shows 3 tables / 8 h2 and the corrected sentences (`no independent evidence rather than no permission`, `absent a recording or second witness`, `8, 3 and 5 problems respectively`, `Authorization boundary (must be written)`, CTA at the end). 安全客 draft re-saved with the corrected body (6010 chars, preview renders 3 tables / 8 h2).
- 2026-11-26 · dev.to article `5119922` live; page renders 3 tables / 8 h2 / 7 h3, GitHub links resolve, canonical points at `docs/agent-memory-attack-surface.en.md`. `npm test` 27/27; `check` 12 PASS / 0 FAIL; CI green on `2850824`.
- 2026-11-26 · `npm test` → 27/27 (19 negative fixtures); `node bin/ahp.mjs check` → 12 PASS / 0 FAIL on a clean tree; `node bin/ahp.mjs sync --check` → in sync; CI `check` green on the pushed commit. Independent review of the first fix (`deepseek-flash`, read-only) returned `fix-first`: the hard FAIL contradicted the documented dirty-tree policy and hit legitimate workflows (selective commit of one file, long `ACTIVE`/`BLOCKED` sessions, `git apply`), it missed `docs/war-story.en.md`, and `docs/limits.md` overclaimed what the gate predicts. All adopted; the fix is now the deferred-check message plus the commit → check → push contract.
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
