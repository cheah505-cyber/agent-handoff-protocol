---
name: bootstrap-decisions
description: Why this project adopted AHP, and the first three decisions a new session should know.
metadata:
  node_type: memory
  type: project
---

- **Adopt AHP:** chat history is not a reliable source of truth; disk files plus a check are.
- **Keep files small:** `HANDOFF.md` is current state, `PROJECT.md` is distilled decisions, `INDEX.md` is a map.
- **Prefer derived fields:** if a status appears in two places, derive one from the other and check it.

## What to change first

1. Replace `DEMO-001` with a real work-unit ID.
2. Set `status` to `PAUSED` or `ACTIVE` with a real lease.
3. Add only the gates that catch a failure you have actually seen.

## Links

- [MEMORY](MEMORY.md)
