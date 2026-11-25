---
handoff_version: "1"
status: "PAUSED"
updated_at: "2026-11-25T18:41:20+08:00"
work_unit_id: "AHP-GATE-002"
phase: "gate-hardening-shipped"
owner: "none"
session_id: "none"
active_branch: "master"
started_at: "2026-11-25T18:30:00+08:00"
lease_until: "none"
touched_paths: "lib/config.mjs;lib/gates.mjs;tests/gates.test.mjs;templates/ahp.config.json;SPEC.md;docs/limits.md;README.md;README.zh-CN.md;CHANGELOG.md;PROJECT.md;HANDOFF.md"
current_file: "none"
next_action_file: "tasks/AHP-CONTENT-002.md"
next_action_anchor: "## Deliverables"
next_action: "Open `AHP-CONTENT-002`: the security-circle article 《Agent 的记忆是攻击面》 (先知 / FreeBuf / 安全客 / LinkedIn), reviewer `deepseek/deepseek-flash`. Fold the provenance question from the dev.to thread into it as a section."
acceptance: "The 知乎 article is live (re-created from `publish/war-story.zhihu.md`; broken article 2108969541657163196 deleted) and the 掘金 article https://juejin.cn/post/7711934164547141659 carries the `Agent` and `GitHub` tags; `tasks/AHP-CONTENT-002.md` exists and names `deepseek/deepseek-flash` as the reviewer; `npm test` 23/23; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`."
blocked_by: "none"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "2026-11-25T18:41:20+08:00"
last_verified_command: "npm test && node bin/ahp.mjs check && node bin/ahp.mjs sync --check"
---
# HANDOFF — Agent Handoff Protocol
> Current-state source of truth. Long-term decisions belong to `PROJECT.md`.
## 0. Takeover status
- Status: `PAUSED`
- Work unit: `AHP-GATE-002`
- Phase: `gate-hardening-shipped`
- External responsibilities: none
## 1. Last completed
- 2026-11-25 · v0.1.0 released: CLI, 12 gates, templates, 22 tests, docs set, cold reads v1/v2/v3.
- 2026-11-25 · `AHP-CONTENT-001`: wrote the war story and the memory-security checklist (Chinese + English), reviewed by DeepSeek, triaged in `docs/reviews/2026-11-25-deepseek.md`.
- 2026-11-25 · Made the public surface English-first: `README.md` is English, the Chinese quickstart moved to `README.zh-CN.md`.
- 2026-11-25 · Published the article: 掘金 (Chinese) and dev.to (English); CSDN (Chinese) is live and under review. V2EX, 博客园 and SegmentFault were dropped for account-eligibility reasons (invite code, blog application, reputation gate) — recorded in `docs/publish-plan.md`.
- 2026-11-25 · Replied to both dev.to comments as `willcheah` (`3md5g` cold-read cadence, `3md5h` provenance-vs-check).
- 2026-11-25 · `AHP-GATE-002`: the `SECRETS` gate now scans `docs/**/*.md` recursively, not just the core files and `memory/`. New negative test (`SECRETS rejects a token in docs`); `SPEC.md`, `docs/limits.md`, both READMEs and `CHANGELOG.md` updated. 23 tests.
## 2. Exact pause point
- The `SECRETS` scope change is implemented, tested, and documented; nothing is half-written.
- The repository is public and pushed; the article is live on 掘金, CSDN (review), and dev.to.
- Two manual steps remain and need the human: recreate/publish 知乎 (draft and session were lost), and add the `Agent` / `GitHub` tags to the 掘金 article.
- The tree is clean; no owner, session, or lease.
## 3. Current working set
- Current file: none.
- Running processes: none.
- Blocked by: none.
## 4. Next action & acceptance
1. Open `AHP-CONTENT-002` with `tasks/AHP-CONTENT-002.md`: the security-circle article 《Agent 的记忆是攻击面》 for 先知 / FreeBuf / 安全客 / LinkedIn. Reviewer is `deepseek/deepseek-flash`. Seed material: `docs/security.md` (threat model), `docs/memory-security-checklist.md`, and the provenance question from the dev.to thread (integrity of a record is testable; truth of an unrecorded quote is not).
2. Re-create the 知乎 article from `publish/war-story.zhihu.md`: 写文章 → 导入, 创作声明 = 包含 AI 辅助创作, 话题 = 人工智能 / AI / 程序员, then 发布 and pass the security check. Delete the broken article `https://zhuanlan.zhihu.com/p/2108969541657163196`.
3. Add the `Agent` and `GitHub` tags to the 掘金 article in 创作者中心.
4. Keep the `SECRETS` change honest: if a token ever shows up under `docs/`, the gate names the file and line, and the fix is to remove the token, never to widen the ignore list.
**Acceptance:** the 知乎 article is live (broken article deleted) and the 掘金 article carries the two tags; `tasks/AHP-CONTENT-002.md` exists and names `deepseek/deepseek-flash` as the reviewer; `npm test` 23/23; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` passes; `master` and `v0.1.0` stay on `origin`.
## 5. Open risks
- AHP has its own git repository. Verify `git rev-parse --show-toplevel` before committing; never commit AHP content to the parent workspace repo.
- The repository is public and pushed. Everything in `docs/`, `memory/`, and the core files is public; the `SECRETS` gate now covers all three, but it is a backstop, not a permission.
- Numbers in prose are not gated. A document can still claim an item count the artifact contradicts; re-check numbers against the artifacts before publishing.
- Publishing is external and unverified by any gate. A published URL is evidence only after it is actually checked, and a platform can silently log the session out (知乎 did).
- 知乎 rejects automated publishing (`code 2015`) and CSDN needed a blogger record created by visiting the blog page. These are access controls; the work stops at the human.
## 6. Last verification
- 2026-11-25 · `npm test` → 23/23 (new: `SECRETS rejects a token in docs`); `node bin/ahp.mjs check` → 12 PASS / 0 FAIL on a clean tree; `node bin/ahp.mjs sync --check` → in sync.
- 2026-11-25 · `SECRETS` on the real repo after the change: PASS — `docs/`, `publish/` and `memory/` were also scanned by hand during publication and contain no credentials.
- 2026-11-25 · CSDN article verified in the browser: 7678 chars, 8 `h3`, 4 tables, 2 code blocks, appendix intact.
- 2026-11-25 · 掘金 publication verified: 4 tables, code blocks, 83-char 摘要, category 人工智能, tag AI编程, audit status normal.
- 2026-11-25 · dev.to publication verified: 16.8 KB body, 4 tables, 2 code blocks, tags devtools/ai/llm/agents, canonical = the repo.
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
