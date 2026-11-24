# PROJECT — Agent Handoff Protocol (AHP)

AHP is a repo-local, machine-checkable handoff protocol for AI coding agents. It keeps four core files honest and makes the current state recoverable without chat history.

## Status

<!-- AHP:STATUS:START -->
- Phase: v0.1-publish
- Next: Tag v0.1.0 after the final commit; then open AHP-CONTENT-001 for the war-story article and memory-security checklist.
<!-- AHP:STATUS:END -->

## Decisions

- **Lite core, not a memory database.** AHP does not replace Mem0/Letta/Zep. It governs handoff truth: what is current, what was decided, what was verified.
- **Twelve gates, no runtime dependencies.** Node.js standard library only. A solo developer can read the whole implementation in one sitting.
- **Negative tests are the product.** Every gate has a fixture that must turn red. A gate without a failing fixture is a claim, not a check.
- **Isolation is mandatory.** Tests use a temp project and a temp git repo; they never read the real repo's state.
- **Derived fields beat discipline.** The `PROJECT.md` status block is generated from `HANDOFF.md`; `ahp sync --check` fails when they drift.
- **Structure is not truth.** The gates catch shape and stale state; a cold read catches contradictions. `docs/limits.md` is part of the protocol.
- **Cold read is a release gate.** A v0.1 release needs a zero-context read of the four core files with no contradictions.
- **No secrets in memory.** The `SECRETS` gate is a backstop, not a permission to store credentials.
- **MIT license.** The protocol is a public good; the paid layer, if any, is team workflow and support, not the markdown.

## Open questions

- Should `MONITORING` require explicit provider/target fields in v0.2?
- Is the commit-day gate too strict for squash-merge workflows?
- Which gate is most likely to create alarm fatigue after 30 days?

## Retrospective

### 2026-11-25 · Build, cold read, and publish gate `#result-v0.1`

- **Did:** Built the CLI, 12 gates, templates, 22 tests, and the documentation set; dogfooded the protocol on this repository.
- **Learned:** A cold read found eight issues the gates could not see: stale git-ownership risk, an incomplete acceptance, inconsistent step order across `PROJECT.md`/`HANDOFF.md`, and an incomplete verification record. The first version of a memory system fails in the verifier, not in the memory.
- **Next:** Final commit, tag `v0.1.0`, then `AHP-CONTENT-001`: war-story article and memory-security checklist.
