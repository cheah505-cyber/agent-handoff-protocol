# Review: AHP-CONTENT-002 security article + SECRETS scope — 2026-11-25

- Reviewer: DeepSeek (`deepseek/deepseek-flash`), read-only
- Primary: MiniMax (`ses_deeb7bb94ffeRsMu83XUg8z1kp`)
- Primary/commit: working tree at `19ed276` plus 5 uncommitted paths
- Scope: `docs/agent-memory-attack-surface.md`, the README/INDEX links, and the `SECRETS` gate change from `19ed276`
- Commands run by the reviewer: `npm test` (23/23 at the time), `node bin/ahp.mjs check`, `node bin/ahp.mjs sync --check`, `git status`, `git log`, and isolated replays in `/tmp/ahp-pre`, `/tmp/ahp-docsfile`, `/tmp/ahp-sym`, `/tmp/ahp-sk`

Verdict: **fix-first**. Ten findings; three medium (F1–F3), six low (F4–F9), one info (F10). All fixed except two explicitly accepted items, listed at the end.

## Findings

### F1 — medium — `docs/agent-memory-attack-surface.md:64` — "三类真实发生过的失败" included an unobserved class

- Evidence: `docs/limits.md` §3 has five failure classes, none about templates; `docs/case-studies.md` has eight cases, none about templates; template supply chain exists only as a hypothetical in `docs/security.md` §2 and checklist item 11. `docs/war-story.en.md` says "four real cases".
- Disposition: **fixed** — the section now reads "前两类在本仓库有记录；第三类来自威胁模型，本仓库还没有观测到实例——按本文的规矩，它要标注为『未观测』，不能算作『真实发生过』". §3.3 was not deleted (the article sits only ~25 CJK above the 3000 floor at that point).

### F2 — medium — `docs/war-story.md` / `war-story.en.md` — 22 tests / 15 fixtures contradicted the new 23/16

- Evidence: the war story says 22/15 in four places in each language; `npm test` reported 23 (now 27); `docs/war-story.md:227` and `:194` were not labelled as a snapshot.
- Disposition: **fixed** — the war story is labelled "v0.1.0 快照 / v0.1.0 snapshot" at the prose claim, the "cost" sentence, the bash comment, and the appendix row, with the current number given next to it. History is not rewritten: the published copies were accurate when published.

### F3 — medium — `HANDOFF.md` — `PAUSED` / `AHP-GATE-002` while AHP-CONTENT-002 was in flight and `check` was red

- Evidence: `check` → `FAIL GIT_STATE PAUSED requires a clean tree; 5 uncommitted path(s)`; the handoff did not mention the article at all.
- Disposition: **fixed** — the unit, touched paths, §1–§6 and the next action now describe `AHP-CONTENT-002`; the work is committed, and the three commands were re-run on a clean tree.

### F4 — low — `lib/gates.mjs` — `readdirSync(docs)` threw when `docs` was a regular file, breaking `check --json`

- Evidence: reproduced; `check --json` returned a plain-text `ENOTDIR` error with exit 1, no JSON.
- Disposition: **fixed** — the listing is guarded by `fs.statSync(docsDir).isDirectory()`; new test `SECRETS survives docs being a regular file`.

### F5 — low — `lib/gates.mjs` — dotfiles, dot-directories, symlinked dirs and `.MD` were skipped

- Evidence: reproduced each case; all returned `PASS SECRETS`.
- Disposition: **fixed for dotfiles and case** — the walk now skips only `.git` and `node_modules`, and matches `.md` case-insensitively; two new tests (`docs/.drafts.md`, `docs/NOTE.MD`). **Accepted, not fixed:** symlinked directories are still not followed (`entry.isDirectory()` is false for symlinks, which also prevents cycles). Recorded in `docs/limits.md` §1.

### F6 — low — `CHANGELOG.md` — "published documents are inside the backstop" was false for `publish/` and `tasks/`

- Evidence: `secrets()` scans the core files, `memory/*.md` and `docs/**`; `publish/war-story.zhihu.md` is public and tracked.
- Disposition: **fixed** — the changelog now says "documents under `docs/`", and `docs/limits.md` §1 names `publish/` and `tasks/` as **not scanned**.

### F7 — low — `lib/gates.mjs` — modern `sk-proj-…` / `sk-ant-api03-…` keys were not matched

- Evidence: reproduced; the pattern stopped at the first hyphen.
- Disposition: **fixed** — pattern broadened to `/\bsk-[A-Za-z0-9_-]{20,}\b/`; new test `SECRETS rejects a modern sk- key`.

### F8 — low — `docs/agent-memory-attack-surface.md:16,69` — two citation-precision errors

- Evidence: the belief-state sentence is the **conclusion** of `security.md` §1, not its first assumption; and `limits.md` §3.2 says the **test** read a skip as a pass, not that the gate reported PASS.
- Disposition: **fixed** — both sentences corrected.

### F9 — low — `docs/agent-memory-attack-surface.md` §4 — hash custody unstated; `CANNOT VERIFY` slightly stretched

- Evidence: the "checker and subject are the same body" critique reappears one level up if the record keeper can recompute the hash; checklist §0 defines `CANNOT VERIFY` as missing permission or environment.
- Disposition: **fixed** — added "哈希必须保存在写入者控制之外（同意邮件、工单系统、第三方时间戳日志）" and "`CANNOT VERIFY`（无独立证据，不同于『缺权限』）".

### F10 — info — optional polish

- Disposition: **partly fixed** — "以下四类" → "取自 §2 的表（共九行，这里挑四类）"; the cold-read number `8 / 3 / 5` is now cited; the appendix row links the dev.to thread.
- **Accepted, not fixed:** `--strict` escalates `WARN` but not `SKIP`, so a gate that never ran is green. That is now written down in `docs/limits.md` §4 rather than changed — making `SKIP` fatal is a CLI behaviour change with its own tests, and it belongs to a separate unit.

## Core-file contradictions

- F2 was the only hard cross-document contradiction; fixed by labelling the snapshot.
- F1 was a citation contradiction (claim vs source); fixed by relabelling the class.
- No contradiction remains with `docs/security.md` §2, `docs/limits.md` §2/§6, or `docs/memory-security-checklist.md` §0.

## Security / framing

- No exploit steps, no payloads, no real target. The attack examples already existed verbatim in `docs/security.md`.
- Authorization section matches `docs/security.md` §6 and the checklist's preamble.
- No security guarantee is claimed; the checklist is explicitly "人工流程，不是自动扫描器".

## Could not verify

- The original external incidents behind case studies 3–5 (only that the repo records them).
- That hash-at-consent has ever been implemented (it is a proposal).
- The `8 / 3 / 5` cold-read results were not re-run.
- Whether any template-supply-chain incident exists anywhere; treated as unobserved, not false.
- The 2–5 day estimate for the checklist.

## Verdict

- [ ] block
- [x] fix-first → F1–F9 fixed, F10 partly fixed, two items explicitly accepted (symlinked directories under `docs/`; `--strict`/`SKIP`)
- [ ] acceptable-with-risks
