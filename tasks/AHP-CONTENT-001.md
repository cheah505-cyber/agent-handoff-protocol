# AHP-CONTENT-001 — War story + memory-security checklist

Status: ready for the next session
Owner: next session (take the lease in `HANDOFF.md`)
Depends on: AHP-OPEN-SOURCE-001 (v0.1.0)

## Goal

Turn the v0.1 evidence into two publishable artifacts:

1. **War story** — how a green memory system hid contradictions, and how the verifier itself failed.
2. **Agent Memory Security Review checklist** — a practical, authorized-assessment checklist.

The article is the top of the funnel; the checklist is the lead magnet for the AI-security assessment direction.

## Inputs

- `docs/lessons-from-production.md` — six failure modes, five root causes, false-green taxonomy.
- `docs/case-studies.md` — eight concrete cases.
- `docs/open-source-report.md` — 2a–2e pairing, 30h plan, 90-day roadmap.
- `docs/limits.md` / `docs/security.md` — honest limits and threat model.
- Actual repo results: `npm test` 22/22, `ahp check` 12 gates, cold-read v1/v2/v3 findings.

Do not invent numbers. If a claim is not in the repo or a command output, mark it as an opinion or remove it.

## Deliverables

### 1. `docs/war-story.md`

A first-person post-mortem, 2500–4500 Chinese characters (an English version can follow):

- The green dashboard: 12 gates, 0 FAIL.
- The cold read: 12 contradictions in a learning project; 8/3/5 documentation issues in AHP itself.
- The verifier lied: 20-day fixture vs 21-day gate; real dirty repo; exact-message assertion; `--check` that wrote.
- The fix: one current-state source, derived status, negative tests, isolated git fixtures, cold read.
- The limits: structure is not truth; two models agreeing is not evidence.
- The CTA: repo + checklist; no “autonomous hacking” claims.

### 2. `docs/memory-security-checklist.md`

10–14 items, each with:

- what to inspect;
- why it matters;
- evidence to collect;
- a pass/fix criterion.

Cover: memory inventory, poisoning, stale facts, hook injection, cross-agent trust, fail-open gates, checks that write, secrets, supply-chain templates, authorization/scope, report/retest.

## Constraints

- No epl-pro business facts, production URLs, credentials, customer data, or private logs.
- No exploit publication; defensive framing only.
- No claims that AHP prevents all drift or replaces tests/humans.
- Keep the article concrete: commands, numbers, file names, before/after.
- Link new docs from `README.md` and `INDEX.md`; run `ahp check` after.

## Acceptance

- [ ] `docs/war-story.md` and `docs/memory-security-checklist.md` exist and are linked.
- [ ] Every number/claim is traceable to a repo file or a command output.
- [ ] No secrets, customer data, or production details.
- [ ] `npm test` 22/22; `node bin/ahp.mjs check` 0 FAIL; `node bin/ahp.mjs sync --check` pass.
- [ ] A fresh cold read can state the next action without chat history.

## Suggested sequence

1. Read the four core files + the three input docs.
2. Outline the article; mark each claim with its source.
3. Draft the checklist; keep it usable in a 2–5 day assessment.
4. Fact-check with `rg`/tests; remove or qualify unverifiable claims.
5. Update `HANDOFF`/`PROJECT`, run gates, commit.
6. Publish the article; use the checklist as the CTA.

## Open questions for the user

- Publish in Chinese only, or Chinese + English?
- Target length and channel (掘金/V2EX/先知/FreeBuf/dev.to)?
- Include code snippets from the repo, or link only?
- Is the checklist free, or a ¥99 lead magnet?
