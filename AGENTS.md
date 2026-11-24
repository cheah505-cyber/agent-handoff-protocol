# Agent Handoff Protocol — Agent Entry

This repository builds **AHP**, a machine-checkable handoff protocol for AI coding agents.

## Read order

1. `AGENTS.md` — boundaries and contract (this file).
2. `INDEX.md` — file map only.
3. `PROJECT.md` — durable decisions and the latest distilled state.
4. `HANDOFF.md` — the only current-state source.
5. `memory/MEMORY.md` — lessons and links.

## Boundaries

- This is a tooling repository. Do not add customer data, credentials, or private project facts.
- Do not weaken a gate to make a check pass. Fix the fixture or the state, and record why.
- Keep the runtime dependency-free: Node.js standard library only.
- Every new gate needs a negative test in `tests/` and a short note in `SPEC.md`.

## Handoff contract

**Before work**

- Run `node bin/ahp.mjs check`.
- If `HANDOFF.md` says `PAUSED`, read §2 and §4 before changing it.
- If it says `ACTIVE`, do not take over an unexpired lease owned by another session.

**At a pause**

1. Save the real artifact or evidence first.
2. Distill durable conclusions into `PROJECT.md`.
3. Update `HANDOFF.md` frontmatter and §1/§2/§4/§5/§6.
4. Run `node bin/ahp.mjs sync` when the derived status block changes.
5. Run `npm test` and `node bin/ahp.mjs check`; record the actual command.
6. Commit. Do not declare completion with a dirty tree when status is `PAUSED` or `COMPLETE`.

## Commands

```bash
npm test                         # 22 gate/CLI tests
node bin/ahp.mjs check           # 12 gates on this repo
node bin/ahp.mjs check --json
node bin/ahp.mjs resume
node bin/ahp.mjs sync --check
node bin/ahp.mjs init /tmp/demo  # scaffold a project
```

## Change rules

- `bin/`, `lib/`, and `tests/` are the product. `templates/` is the copied starter.
- `docs/` carries the rationale. If a change alters a gate, update `SPEC.md`, `docs/limits.md`, and the test matrix.
- The protocol must remain useful for a solo developer: no database, no daemon, no vendor lock-in.

## Status machine

| Status | Meaning | Required |
|---|---|---|
| `ACTIVE` | A session owns the current unit | a future `lease_until` |
| `PAUSED` | Work is intentionally stopped | no owner/session/lease |
| `BLOCKED` | Cannot proceed | `blocked_by` with evidence |
| `COMPLETE` | The unit is accepted | no owner/session/lease; no current file |
| `MONITORING` | A background process is running | a named process |
