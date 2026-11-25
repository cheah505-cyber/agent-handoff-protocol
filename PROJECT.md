# PROJECT — Agent Handoff Protocol (AHP)

AHP is a repo-local, machine-checkable handoff protocol for AI coding agents. It keeps four core files honest and makes the current state recoverable without chat history.

## Status

<!-- AHP:STATUS:START -->
- Phase: security-article-reviewed
- Next: Publish the security article by hand — `publish/agent-memory-attack-surface.meta.md` has the title, summaries, tags and per-site steps; order 先知 → FreeBuf → 安全客 (安全客 requires first publication, so last). The article is review-ready; the publish package is prepared. Optionally write the English version for LinkedIn. Then the 90-day roadmap: one awesome list / newsletter, and one free or low-price assessment for a testimonial.
<!-- AHP:STATUS:END -->

## Decisions

- **Lite core, not a memory database.** AHP does not replace Mem0/Letta/Zep. It governs handoff truth: what is current, what was decided, what was verified.
- **Twelve gates, no runtime dependencies.** Node.js standard library only. A solo developer can read the whole implementation in one sitting.
- **Negative tests are the product.** Every gate has a fixture that must turn red. A gate without a failing fixture is a claim, not a check.
- **Isolation is mandatory.** Tests use a temp project and a temp git repo; they never read the real repo's state.
- **Derived fields beat discipline.** The `PROJECT.md` status block is generated from `HANDOFF.md`; `ahp sync --check` fails when they drift.
- **Structure is not truth.** The gates catch shape and stale state; a cold read catches contradictions. `docs/limits.md` is part of the protocol.
- **Cold read is a release gate.** A v0.1 release needs a zero-context read of the four core files with no contradictions.
- **Multi-model work is one writer + one reviewer.** Two models do not edit the same branch. A reviewer produces evidence-backed findings; the primary fixes them, adds a test, or explicitly accepts the risk. See `docs/multi-model-review.md`.
- **Language follows the audience, not the author's preference.** `README.md` is English because GitHub is an international landing page; `README.zh-CN.md` is the translation. dev.to takes `docs/war-story.en.md`; 掘金 and V2EX take `docs/war-story.md`. Each track has exactly one source file, so the two cannot drift apart.
- **The `SECRETS` gate covers `docs/` too.** Published documents are as public as the core files, so scanning only the core files and `memory/` left the widest surface out. If a repo keeps no `docs/`, the scan is a no-op.
- **The reviewer model is `deepseek/deepseek-flash`.** Reviews are advisory; a cheaper reviewer changes how much depth you get, not what counts as evidence. `AHP-CONTENT-001` was reviewed on `deepseek-v4-pro` and its note says so.
- **No secrets in memory.** The `SECRETS` gate is a backstop, not a permission to store credentials.
- **Every published claim is traceable.** A number in a document must point at a repo file or a command output; a quoted command output must be labelled with the state it was produced in (the war story quoted a `PAUSED` snapshot that no longer reproduces under `ACTIVE`). Reviewers check this, not the author.
- **MIT license.** The protocol is a public good; the paid layer, if any, is team workflow and support, not the markdown.

## Open questions

- Should `MONITORING` require explicit provider/target fields in v0.2?
- Is the commit-day gate too strict for squash-merge workflows?
- Which gate is most likely to create alarm fatigue after 30 days?

## Retrospective

### 2026-11-25 · Build, cold reads, and v0.1 release `#result-v0.1`

- **Did:** Built the CLI, 12 gates, templates, 22 tests, and the documentation set; dogfooded the protocol on this repository; released `v0.1.0`.
- **Learned:** Cold read v1 found eight documentation issues; v2 found three sequencing/ambiguity issues (clean-tree validation order, local-vs-remote tag, where the next unit is opened); v3 found five more. All fixed; the final four-file self-check found no contradictions. The code was fine; the handoff was not. The first version of a memory system fails in the verifier, not in the memory.
- **Next:** `AHP-CONTENT-001`: war-story article and memory-security checklist.

### 2026-11-25 · Content unit: war story + memory-security checklist `#result-content-v0.1`

- **Did:** Wrote `docs/war-story.md` (3213 Chinese characters) and `docs/memory-security-checklist.md` (13 items), linked both from `README.md`/`README.en.md`/`INDEX.md`, and ran the one-writer/one-reviewer protocol end to end: MiniMax wrote, DeepSeek (`deepseek/deepseek-v4-pro`) reviewed read-only, findings recorded in `docs/reviews/2026-11-25-deepseek.md`.
- **Learned:** The reviewer's two medium findings were exactly the failure class the project is about. The article quoted an `ahp check` output block that no longer reproduces under a different handoff status, and it said the checklist had 12 items when it has 13 — **no gate can see either**, because both live in prose. The lesson from `docs/limits.md` §3.5 ("structure is not truth") extends to documents: a quoted output has to be labelled with the state that produced it, and a number in prose has to be re-checked against the artifact. The reviewer also found that three of my "contradiction → gate" rows overstated what the gates check; splitting them into "became a gate assertion" and "cannot be machine-checked" was more honest and made the point better.
- **Next:** Publish the article (AI-engineering channels first, checklist as the free CTA); then open `AHP-CONTENT-002` for the security-circle article. Open item recorded in `PROJECT.md`: the `SECRETS` gate does not scan `docs/`.

### 2026-11-25 · Publishing: 掘金 live, the English track, and the Cloudflare wall `#result-publish-v0.1`

- **Did:** Published the Chinese war story to 掘金 (https://juejin.cn/post/7711934164547141659 — category 人工智能, tag AI编程, 原创, 所有人可见, no review banner) and drove the browser through juejin's editor: the real editor route is `/editor/drafts/new?v=2`, not `/creator/post`, which redirects to the home page. Then corrected the language split: wrote `docs/war-story.en.md` and `docs/memory-security-checklist.en.md`, made `README.md` English and moved the Chinese quickstart to `README.zh-CN.md`.
- **Learned:** Three platform facts cost real time and are worth writing down. (1) 掘金's tag select is a Vue multi-select whose options only commit on a real click — `fill` + Enter sets the search text and adds nothing; the same applies to dev.to's tag autocomplete. (2) The OpenCode desktop app's browser is **Electron**, and Cloudflare scores it as automated: V2EX serves an interstitial on every page, the challenge loops (`cf_chl_rc_ni` climbing, a new Ray ID per reload) and never issues `cf_clearance` — while the **same egress IP** gets HTTP 200 from `curl` on `/`, `/signin` and `/go/share`. So the blocker is the browser environment, not the IP, the network, or the human clicking. (3) A Cloudflare human check is a human check; automating it would defeat its purpose, so that platform stays manual.
- **Next:** Post the Chinese article to V2EX from a normal browser; add the two missing 掘金 tags in 创作者中心; then open `AHP-CONTENT-002` (reviewer `deepseek/deepseek-flash`).

### 2026-11-25 · Gate hardening + the security article `#result-content-v0.2`

- **Did:** Extended `SECRETS` to scan `docs/**/*.md` (recursive, case-insensitive, dotfiles included) with four new negative fixtures, and wrote `docs/agent-memory-attack-surface.md` (3315 Chinese characters) for the security audience. Reviewed twice by `deepseek/deepseek-flash` — a full pass (`fix-first`, ten findings) and a diff-scoped re-review that caught two of them still partial; notes in `docs/reviews/2026-11-25-deepseek-flash.md` and `docs/reviews/2026-11-25-deepseek-flash-recheck.md`. Test suite is 27, of which 19 are negative fixtures.
- **Learned:** The reviewer caught the exact failure the protocol is about — a claim ("三类真实发生过的失败") that cited files which do not contain that class. The template-supply-chain case exists only as a threat-model hypothesis, so it had to be labelled "未观测". It also caught that the already-published war story said 22/15 while the new article said 23/16: the fix was to label the war story as a v0.1.0 snapshot, not to rewrite published history. And it found a real regression in my own change: `docs` as a regular file threw inside `buildContext`, so `check --json` returned `ENOTDIR` text instead of JSON — a case where a new gate path broke the machine-readable contract.
- **Also learned:** 掘金 allows exactly one tag per article, so the "add Agent/GitHub tags" item was never achievable; recorded as a platform limit rather than an unfinished task. 知乎's draft and session were both lost to its anti-automation check, so that publication is handed back to the human.
- **Learned (errata round):** updating a published article is not the same operation as publishing one. On CSDN, editing through the markdown importer **created a second article** and silently re-tagged it `arcgis`; on 掘金, opening `/editor/drafts/<article_id>` creates an empty draft instead of editing. The lesson for the protocol: after any publish, verify the article **id** and the **count** of articles, not just the success banner — and tags must be applied by clicking an autocomplete suggestion, because a click on a recommendation list item changes nothing.
- **Merged the two threads into `docs/limits.md` §7** ("The same test for a prose handoff note"): the ML Systems variant of the cold read (one cheap probe, plus "what would you redo by mistake?" and "which file did you take that from?", with "a guessed step is a failed handoff, not a failed reader") and the provenance floor from Dolores (integrity is testable, truth is not; mark it `attested, not verified`). They are the same problem: nothing independent can contradict you. The old §7 became §8.
- **Learned (re-review):** a fix that touches one of three copies of the same number leaves the other two stale. The 19-vs-20 split survived in the war story's "cost" sentence and had already reached the 知乎 publish copies, because those copies are *generated* from the source — regenerate them, never hand-edit them.
- **Next:** publish the security article in one security channel (先知 / FreeBuf / 安全客), decide on the English version for LinkedIn, then move to the 90-day roadmap (awesome lists / one free assessment).

### 2026-11-25 · First external signals: two dev.to comments `#result-external-signal`

- **What happened:** the English article on dev.to drew two substantive comments within an hour of publishing. One asks how often the cold read runs in practice; the other argues that a provenance chain (verbatim quotes with written consent and message ids) is **not a check** — with no second copy there is no fixture, and a read-back makes the checker and the subject the same body.
- **Why it matters:** that second comment is the sharpest statement of the limit in `docs/limits.md` §2. It is not a bug report; it is the boundary case, and the honest answer is to separate *integrity of the record* (testable: hash the consented words, fail on any divergence) from *truth of the quote* (no independent fixture without a recording or a second witness — mark it `attested, not verified`, never green).
- **Replied** (2026-11-25, as `willcheah`): comment `3md5g` under `3mcmi` (cold-read cadence — every handoff change, with the 21-day freshness gate as the backstop for forgetting); comment `3md5h` under `3md09` (split the question: integrity of the record is testable by hashing the consented words and failing on any divergence; truth of the quote has no independent fixture without a recording or a second witness, so mark it `attested, not verified` and never green). No selling, technical only.
- **Third comment (`3dae`, salparvez, 2026-11-25):** calls the green-gate-over-a-contradictory-handoff a punch list where every box is checked and the door still does not close, and says their team at ML Systems wants the same test for a handoff note: can someone with no context pick it up and say what's next. Replied (`3mdf0`): the one-question test is the right cheap version, but "say what's next" can be answered confidently and still be wrong — add "what would you redo by mistake?" and "which file did you take that from?", and treat any step the fresh reader had to guess as a failed handoff, not a failed reader.
- **Next:** the provenance question is a strong seed for `AHP-CONTENT-002` or a follow-up section in `docs/limits.md`; the ML Systems handoff-note variant is a third candidate (a cold read for prose, where the closest analogue of a failing fixture is a disconfirming question).

### 2026-11-25 · The English track shipped: dev.to live, README in English `#result-english-track`

- **Did:** Wrote `docs/war-story.en.md` and `docs/memory-security-checklist.en.md`, made `README.md` English with the Chinese quickstart moved to `README.zh-CN.md`, and published the English article to dev.to: https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0 (tags devtools/ai/llm/agents, canonical = the repo). The Chinese article stays on 掘金: https://juejin.cn/post/7711934164547141659.
- **Learned:** A public repo's landing page has one audience — GitHub and dev.to are international, 掘金 and V2EX are Chinese. Splitting the repo by audience (English README + Chinese translation, one source file per track) is cheaper than pretending one language serves both. Two platform details cost time: dev.to's account had **no username**, so it used the account id as the URL prefix until it was set to `willcheah`; and dev.to's article API needs the body wrapped as `{article:{...}}` with an `x-csrf-token` header, otherwise it answers "Invalid authenticity token" and then "article param must be a JSON object".
- **Next:** V2EX needs a normal browser (the in-app Electron browser cannot pass Cloudflare); add the two missing 掘金 tags; open `AHP-CONTENT-002`.
