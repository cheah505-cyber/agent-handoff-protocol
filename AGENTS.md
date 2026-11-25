# Agent Handoff Protocol — Agent Entry

This repository builds **AHP**, a machine-checkable handoff protocol for AI coding agents.

## Read order

1. `AGENTS.md` — boundaries and contract (this file).
2. `INDEX.md` — file map only.
3. `PROJECT.md` — durable decisions and the latest distilled state.
4. `HANDOFF.md` — the only current-state source.
5. `memory/MEMORY.md` — lessons and links.

The **four core files** are `AGENTS.md`, `INDEX.md`, `PROJECT.md`, and `HANDOFF.md`. `memory/` is the lesson layer; it is not a fifth current-state source.

## Boundaries

- This is a tooling repository. Do not add customer data, credentials, or private project facts.
- Do not weaken a gate to make a check pass. Fix the fixture or the state, and record why.
- Keep the runtime dependency-free: Node.js standard library only.
- Every new gate needs a negative test in `tests/` and a short note in `SPEC.md`.
- Multi-model work follows `docs/multi-model-review.md`: **one writer, one reviewer**; no concurrent edits to the same files.

## Handoff contract

**Before work**

- Run `node bin/ahp.mjs check`.
- If `HANDOFF.md` says `PAUSED`, read §2 and §4 before changing it.
- If it says `ACTIVE`, do not take over an unexpired lease owned by another session.

**At a pause**

1. Save the real artifact or evidence first.
2. Distill durable conclusions into `PROJECT.md`.
3. Update `HANDOFF.md` frontmatter and §0/§1/§2/§3/§4/§5/§6.
4. Run `node bin/ahp.mjs sync` when the derived status block changes.
5. Run `npm test`, `node bin/ahp.mjs check`, and `node bin/ahp.mjs sync --check`; record the actual command.
6. Commit. Do not declare completion with a dirty tree when status is `PAUSED` or `COMPLETE`.
7. Run `node bin/ahp.mjs check` again on the clean tree and amend if it fails. The commit-day check can only be evaluated after the commit, and `GIT_STATE` predicts it beforehand; push only after this pass.
8. If a release needs to validate a dirty tree, say so explicitly and run the validation twice: once before the commit (non-git gates) and once after the commit (all gates). Do not call a dirty tree `PAUSED`.

## Commands

In this repository, `ahp` in the docs means `node bin/ahp.mjs`; if the package is installed/linked, the `ahp` shim works too.

```bash
npm test                         # 29 tests (20 negative fixtures)
node bin/ahp.mjs check           # 12 gates on this repo
node bin/ahp.mjs check --json
node bin/ahp.mjs resume
node bin/ahp.mjs sync --check
node bin/ahp.mjs init /tmp/demo  # scaffold a project
```

## Change rules

- `bin/`, `lib/`, and `tests/` are the product. `templates/` is the copied starter.
- `docs/` carries the rationale. If a change alters a gate, update `SPEC.md`, `docs/limits.md`, and the tests that exercise that gate.
- The protocol must remain useful for a solo developer: no database, no daemon, no vendor lock-in.

## Status machine

| Status | Meaning | Required |
|---|---|---|
| `ACTIVE` | A session owns the current unit | a future `lease_until` |
| `PAUSED` | Work is intentionally stopped | no owner/session/lease |
| `BLOCKED` | Cannot proceed | `blocked_by` with evidence |
| `COMPLETE` | The unit is accepted | no owner/session/lease; no current file |
| `MONITORING` | A background process is running | a named process |
