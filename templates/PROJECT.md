# PROJECT — {{PROJECT_NAME}}

This file holds durable conclusions. It is not a diary and not the current-state source.

## Status

<!-- AHP:STATUS:START -->
- Phase: bootstrap
- Next: Customize AGENTS.md and PROJECT.md, then run `ahp check`.
<!-- AHP:STATUS:END -->

## Decisions

- {{DATE}} · Adopt AHP so that a new agent can resume from disk instead of chat history.
- {{DATE}} · Keep `INDEX.md` as a map; keep current state in `HANDOFF.md`.

## Open questions

- Which checks matter for this project? Remove gates that do not apply instead of weakening them silently.

## Retrospective

### {{DATE}} · Bootstrap `#result-bootstrap`

- **Did:** Initialized the AHP files and a memory index.
- **Learned:** Structure is necessary but not sufficient; a cold read is still required.
- **Next:** Customize the protocol, then run `ahp check`.
