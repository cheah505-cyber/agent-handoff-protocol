# PROJECT — Agent Handoff Protocol (AHP)

AHP is a repo-local, machine-checkable handoff protocol for AI coding agents. It keeps four core files honest and makes the current state recoverable without chat history.

## Status

<!-- AHP:STATUS:START -->
- Phase: content-v0.1-shipped
- Next: Push `master` and the `v0.1.0` tag to `origin` (public repo `cheah505-cyber/agent-handoff-protocol`); then publish `docs/war-story.md` to the AI-engineering channels with the checklist as the free CTA; then open `AHP-CONTENT-002` (reviewer: `deepseek/deepseek-flash`).
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
