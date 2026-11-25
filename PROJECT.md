# PROJECT — Agent Handoff Protocol (AHP)

AHP is a repo-local, machine-checkable handoff protocol for AI coding agents. It keeps four core files honest and makes the current state recoverable without chat history.

## Status

<!-- AHP:STATUS:START -->
- Phase: content-v0.1-shipped
- Next: Re-create the 知乎 article from `publish/war-story.zhihu.md` (the old draft is gone; the 知乎 session was logged out) and publish it past the security check, then delete the broken article https://zhuanlan.zhihu.com/p/2108969541657163196; add the `Agent` and `GitHub` tags to the 掘金 article; then open `AHP-CONTENT-002` (reviewer: `deepseek/deepseek-flash`).
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
- **The reviewer model is `deepseek/deepseek-flash`.** Reviews are advisory; a cheaper reviewer changes how much depth you get, not what counts as evidence. `AHP-CONTENT-001` was reviewed on `deepseek-v4-pro` and its note says so.
- **No secrets in memory.** The `SECRETS` gate is a backstop, not a permission to store credentials.
- **Every published claim is traceable.** A number in a document must point at a repo file or a command output; a quoted command output must be labelled with the state it was produced in (the war story quoted a `PAUSED` snapshot that no longer reproduces under `ACTIVE`). Reviewers check this, not the author.
- **MIT license.** The protocol is a public good; the paid layer, if any, is team workflow and support, not the markdown.

## Open questions

- Should `MONITORING` require explicit provider/target fields in v0.2?
- Is the commit-day gate too strict for squash-merge workflows?
- Which gate is most likely to create alarm fatigue after 30 days?
- Should the `SECRETS` gate also scan `docs/`? It currently covers the core files and `memory/*.md` only, so published documents sit outside the backstop (raised by the DeepSeek review, accepted for this unit).

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

### 2026-11-25 · The English track shipped: dev.to live, README in English `#result-english-track`

- **Did:** Wrote `docs/war-story.en.md` and `docs/memory-security-checklist.en.md`, made `README.md` English with the Chinese quickstart moved to `README.zh-CN.md`, and published the English article to dev.to: https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0 (tags devtools/ai/llm/agents, canonical = the repo). The Chinese article stays on 掘金: https://juejin.cn/post/7711934164547141659.
- **Learned:** A public repo's landing page has one audience — GitHub and dev.to are international, 掘金 and V2EX are Chinese. Splitting the repo by audience (English README + Chinese translation, one source file per track) is cheaper than pretending one language serves both. Two platform details cost time: dev.to's account had **no username**, so it used the account id as the URL prefix until it was set to `willcheah`; and dev.to's article API needs the body wrapped as `{article:{...}}` with an `x-csrf-token` header, otherwise it answers "Invalid authenticity token" and then "article param must be a JSON object".
- **Next:** V2EX needs a normal browser (the in-app Electron browser cannot pass Cloudflare); add the two missing 掘金 tags; open `AHP-CONTENT-002`.
