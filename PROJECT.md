# PROJECT — Agent Handoff Protocol (AHP)

AHP is a repo-local, machine-checkable handoff protocol for AI coding agents. It keeps four core files honest and makes the current state recoverable without chat history.

## Status

<!-- AHP:STATUS:START -->
- Phase: v0.1-released
- Next: Open AHP-CONTENT-001: write the war-story article and memory-security checklist.
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
- **No secrets in memory.** The `SECRETS` gate is a backstop, not a permission to store credentials.
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
