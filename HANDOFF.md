---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T17:14:45+08:00"
work_unit_id: "AHP-CONTENT-001"
phase: "content-v0.1-shipped"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "2026-11-25T14:00:30+08:00"
lease_until: "none"
touched_paths: "docs/war-story.md;docs/war-story.en.md;docs/memory-security-checklist.md;docs/memory-security-checklist.en.md;docs/reviews/2026-11-25-deepseek.md;docs/multi-model-review.md;docs/publish-plan.md;README.md;README.zh-CN.md;INDEX.md;HANDOFF.md;PROJECT.md;package.json"
current_file: "none"
next_action_file: "docs/war-story.md"
next_action_anchor: "# 六、如果你想自己查一遍"
next_action: "In the prepared 知乎 editor (https://zhuanlan.zhihu.com/write?edit=2108971189200855862) click 发布 and pass the security check, then delete the broken draft https://zhuanlan.zhihu.com/p/2108969541657163196; add the `Agent` and `GitHub` tags to the 掘金 article; then open `AHP-CONTENT-002` (reviewer: `deepseek/deepseek-flash`)."
acceptance: "The 知乎 article is live (the prepared draft at https://zhuanlan.zhihu.com/write?edit=2108971189200855862 published, broken draft 2108969541657163196 deleted) and the 掘金 article https://juejin.cn/post/7711934164547141659 carries the `Agent` and `GitHub` tags; the English article stays live on https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0; `tasks/AHP-CONTENT-002.md` exists and names `deepseek/deepseek-flash` as the reviewer; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T17:14:45+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---
# HANDOFF — Agent Handoff Protocol
> Current-state source of truth. Long-term decisions belong to `PROJECT.md`.
## 0. Takeover status
- Status: `PAUSED`
- Work unit: `AHP-CONTENT-001`
- Phase: `content-v0.1-shipped`
- External responsibilities: none
## 1. Last completed
- 2026-11-25 · Implemented the CLI, 12 gates, templates, and 22 tests.
- 2026-11-25 · Wrote the design, limits, security, production-lesson, case-study, and open-source report docs.
- 2026-11-25 · Cold read v1 found eight documentation issues; v2 found three sequencing/ambiguity issues; v3 found five more. All fixed. The final cold read is the release gate.
- 2026-11-25 · Release validation: `npm test` 22/22; `node bin/ahp.mjs check` 12 PASS; `node bin/ahp.mjs sync --check` pass; tag `v0.1.0`.
- 2026-11-25 · Added `docs/multi-model-review.md` + `docs/reviews/` template: one writer, one independent reviewer; linked from README/INDEX/AGENTS.
- 2026-11-25 · Prepared `tasks/AHP-CONTENT-001.md` for the next session: war-story article + memory-security checklist; role assignment Primary=MiniMax, Reviewer=DeepSeek.
- 2026-11-25 · Took the `AHP-CONTENT-001` lease as Primary (MiniMax); reviewer was DeepSeek (`deepseek/deepseek-v4-pro`), read-only.
- 2026-11-25 · Wrote `docs/war-story.md` (3676 Chinese characters) and `docs/memory-security-checklist.md` (13 items); linked both from `README.md`, `README.en.md`, and `INDEX.md`.
- 2026-11-25 · DeepSeek review returned `fix-first`: two medium findings (a stale `ahp check` output block, a wrong item count) and six low/info findings. All fixed; two scope items explicitly accepted with reasons. Review note: `docs/reviews/2026-11-25-deepseek.md`.
- 2026-11-25 · Switched the independent reviewer model to `deepseek/deepseek-flash` for every future review (`docs/multi-model-review.md` §1, `PROJECT.md`). The `AHP-CONTENT-001` note keeps the model it actually used.
- 2026-11-25 · Created the public GitHub repo `cheah505-cyber/agent-handoff-protocol`, added it as `origin`, and pushed `master` plus the `v0.1.0` tag.
- 2026-11-25 · Wrote `docs/publish-plan.md`: per-platform metadata (掘金 / V2EX / dev.to) for the war story; one body, no duplicated copy.
- 2026-11-25 · Published the Chinese war story to 掘金: https://juejin.cn/post/7711934164547141659 (category 人工智能, tag AI编程, 原创, 所有人可见, audit status normal).
- 2026-11-25 · Wrote the English track for the international audience: `docs/war-story.en.md`, `docs/memory-security-checklist.en.md`; swapped `README.md` to English and moved the Chinese quickstart to `README.zh-CN.md`.
- 2026-11-25 · Prepared the 知乎 article in the editor (7853 chars, 13 headings, 4 tables, 4 code blocks, 创作声明 = 包含 AI 辅助创作) but 知乎's publish endpoint answered `code 2015 网络环境或行为异常，请进行安全验证`. Publishing it needs a human click plus a security check. 知乎's Draft.js loses content when written via `execCommand("insertHTML")` — the `paste` event with `clipboardData` is the only reliable path, and it is recorded in `docs/publish-plan.md` §6.
- 2026-11-25 · Published the English war story to dev.to: https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0 (tags devtools/ai/llm/agents, canonical = the repo, description set). The account had no username, so dev.to had used the account id in the URL; set it to `willcheah` and the article URL became a normal one.
- 2026-11-25 · Diagnosed the V2EX blocker: the whole site sits behind a Cloudflare challenge in the OpenCode desktop app (Electron), while the same egress IP gets HTTP 200 from `curl`. V2EX therefore needs a normal browser.
## 2. Exact pause point
- The two deliverables are written, reviewed, and fixed; the review note and its dispositions are in `docs/reviews/2026-11-25-deepseek.md`.
- The repository is **public and pushed**: `origin/master` = `99ff9b5`, `v0.1.0` on the remote still points at the v0.1 release commit `2847eb5`. GitHub push protection did not object to the synthetic `ghp_…` fixture in the `SECRETS` negative test.
- Everything repo-side in the task card is done, and the article is live in two places: 掘金 (Chinese) and dev.to (English). What is **not** done: the 知乎 publish click (blocked by 知乎's anti-automation check), V2EX (no invite code), the other Chinese platforms (login), the two missing 掘金 tags, and the next unit.
- Publication is **prepared but not executed**. The in-app browser has no session on 掘金 / dev.to / V2EX, so a human has to log in on the open tabs before anything can be posted. The three tabs are left open.
- The tree is clean; no owner, session, or lease.
## 3. Current working set
- Current file: none.
- Running processes: none.
- Blocked by: none.
## 4. Next action & acceptance
1. Open the prepared 知乎 editor (`https://zhuanlan.zhihu.com/write?edit=2108971189200855862`), click 发布 and pass the security check if it appears; then delete the broken draft `https://zhuanlan.zhihu.com/p/2108969541657163196`.
2. Add the `Agent` and `GitHub` tags to the 掘金 article in 创作者中心 (30 seconds; the publish panel's tag select only accepted one tag programmatically).
   The 知乎 draft is gone and the 知乎 session was logged out, so the article must be re-created by hand: `publish/war-story.zhihu.md` (import) or `publish/war-story.zhihu.html` (Ctrl+A/Ctrl+C) plus the metadata in `docs/publish-plan.md` §3.
3. Post to SegmentFault / 博客园 / 即刻 only after logging in there; V2EX needs an invite code first. All four are manual by nature — see `docs/publish-plan.md` §4–§5.
4. Open `AHP-CONTENT-002` with a task card: the security-circle article (`docs/open-source-report.md` §7.1 文章 2: 《Agent 的记忆是攻击面》), channels 先知 / FreeBuf / 安全客 / LinkedIn. The independent reviewer for that unit is `deepseek/deepseek-flash`.
3. In that task card, also carry the open item from the review: should the `SECRETS` gate scan `docs/` as well as the core files and `memory/`? It currently does not, so published documents sit outside the backstop.
4. Record the first external signal (star, issue, comment, or a question about the checklist) in `PROJECT.md`.
**Acceptance:** the article is published in at least one AI-engineering channel with the checklist as its CTA; `tasks/AHP-CONTENT-002.md` exists and names `deepseek/deepseek-flash` as the reviewer; `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`.
## 5. Open risks
- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The repository is now **public and pushed**: `https://github.com/cheah505-cyber/agent-handoff-protocol`. Everything in it is public — the protocol, the docs, the war story, the checklist. Keep customer facts, production details, and secrets out of it: the `SECRETS` gate only covers the core files and `memory/*.md`, not `docs/`.
- The 11 existing commits are authored by `AHP <ahp@example.invalid>`, so GitHub shows them as an unlinked author. History was deliberately **not** rewritten (the protocol forbids rewriting history to make a check pass).
- Numbers in prose are not gated. The review found the article saying "12 项" when the checklist has 13 — no gate can see that. Re-check document numbers against the artifacts before publishing.
- The `SECRETS` gate does not scan `docs/`. Both new documents were manually checked for secrets and customer facts; the gap is recorded, not closed.
- Publishing is external and unverified by any gate. A published URL is evidence only after it is actually checked.
- 知乎 rejects automated publishing (`code 2015`), V2EX requires an invite code, and V2EX answers the Electron browser with a Cloudflare loop. None of these is bypassed: they are access controls, and the work stops at the human.
- Language is split by audience, not by preference: `README.md` is English, `README.zh-CN.md` is Chinese; dev.to gets `docs/war-story.en.md`, 掘金 and V2EX get `docs/war-story.md`. Keep the two tracks from drifting apart.
## 6. Last verification
- 2026-11-25 · 知乎: the prepared draft holds 7853 chars / 13 headings / 4 tables / 4 code blocks, 创作声明 = 包含 AI 辅助创作, 文章话题 = 人工智能 / AI / 程序员 (the 3-topic cap); the publish call returned `{"code":2015,"message":"你的网络环境或行为异常，请进行安全验证"}`. The earlier 知乎 article (2108969541657163196) is live but its body kept only the final paragraph — it must be deleted.
- 2026-11-25 · dev.to publication verified in the browser: https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0 — title, 16.8 KB body, 4 tables, 2 code blocks, tags devtools/ai/llm/agents, canonical = the repo, description set, username `willcheah`.
- 2026-11-25 · 掘金 publication verified in the browser: title, body with 4 tables and code blocks, 摘要 (83 chars), category 人工智能, tag AI编程, absolute CTA links through the juejin link redirector, no review banner.
- 2026-11-25 · Publish prep: `docs/publish-plan.md` written and linked from `INDEX.md`; `npm test` → 22/22; `ahp check` → 0 FAIL on a clean tree; three publisher tabs opened in the browser, all showing a logged-out state.
- 2026-11-25 · After the push, on a clean tree: `npm test` → 22/22; `node bin/ahp.mjs check` → 0 FAIL / 12 PASS / 0 WARN; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · Remote verified with `git ls-remote`: `refs/heads/master` = `99ff9b5` (= local HEAD at push time), `refs/tags/v0.1.0^{}` = `2847eb5` (the v0.1 release commit).
- 2026-11-25 · Reviewer baseline (DeepSeek, read-only): `npm test` 22/22; `ahp check` 0 FAIL / 1 WARN (WARN only because the tree was dirty mid-work); `sync --check` in sync.
- 2026-11-25 · Self-check script: checklist structure complete (13 items, each with what/why/evidence/criterion), all relative links in the new documents resolve, 3676 Chinese characters in the article, no secrets/URLs/customer names in either document.
- 2026-11-25 · Pre-publication scan over all 46 tracked files and the full history: no real credentials, no personal email addresses, no absolute local paths outside `HANDOFF.md` §7 (now genericized). The only hit is the synthetic `ghp_…` fixture in `tests/gates.test.mjs`, which exists so the `SECRETS` gate has a negative test.
- 2026-11-25 · v0.1.0 released on the release commit; `docs/war-story.md` and `docs/memory-security-checklist.md` are written, reviewed, and committed.
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
