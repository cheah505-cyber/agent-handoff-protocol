# {{PROJECT_NAME}} — Agent Entry

This project uses the **Agent Handoff Protocol (AHP)**. Read this file first.

## Read order

1. `AGENTS.md` — boundaries and contract.
2. `INDEX.md` — file map only; no dynamic state.
3. `PROJECT.md` — long-term decisions and the latest distilled state.
4. `HANDOFF.md` — the only source of truth for the current work unit.
5. `memory/MEMORY.md` — lessons and links, when present.

## Boundaries

- Only operate on assets you are authorized to touch.
- Do not put secrets, tokens, credentials, or personal data in any memory file.
- Do not rewrite history to make a check pass. If the state is wrong, record the correction.
- A green check is not proof of correctness. Run a cold read before a handoff.

## Handoff contract

**Before work**

- Run `ahp check`.
- If `HANDOFF.md` says `PAUSED`, read §2 and §4 before changing it.
- If it says `ACTIVE`, check `lease_until`; do not take over an unexpired lease owned by another session.

**At a pause or completion**

1. Save the real artifact or evidence first.
2. Distill durable conclusions into `PROJECT.md`.
3. Update `HANDOFF.md`: frontmatter, §1, §2, §4, §5, §6.
4. Run `ahp sync` if `PROJECT.md` has an AHP status block.
5. Run `ahp check` and record the actual command in `last_verified_command`.
6. Commit the result. Do not declare completion with a dirty tree when status is `PAUSED` or `COMPLETE`.
7. Run `ahp check` again on the clean tree and amend if it fails. The commit-day check can only run after the commit; push only after this pass.

## Commands

```bash
ahp check          # run the gates
ahp resume         # print the current handoff
ahp sync           # derive PROJECT.md status from HANDOFF.md
ahp sync --check   # verify the derived block without writing
```

If AHP is not installed, use `node <path-to-ahp>/bin/ahp.mjs` with the same arguments.

## Status machine

| Status | Meaning | Required |
|---|---|---|
| `ACTIVE` | A session owns the current unit | a future `lease_until` |
| `PAUSED` | Work is intentionally stopped | no owner/session/lease |
| `BLOCKED` | Cannot proceed | `blocked_by` with evidence |
| `COMPLETE` | The current unit is accepted | no owner/session/lease; no current file |
| `MONITORING` | A background process is running | process/provider/target fields |
