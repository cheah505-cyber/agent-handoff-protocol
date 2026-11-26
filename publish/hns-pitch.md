# Pitch: Help Net Security (guest piece)

> Paste-ready. Fill the three `<...>` slots. Do **not** commit your email address here; the repo is public and `publish/` is not scanned by the `SECRETS` gate.
> Send to the guest-post address on `helpnetsecurity.com/contact` (they publish a submission address there; check it before sending — it changed once).

**Subject:** Pitch: agent memory is an attack surface — a defensive write-up

Hi,

I maintain [Agent Handoff Protocol](https://github.com/cheah505-cyber/agent-handoff-protocol), an MIT-licensed protocol for the state an AI coding agent hands to the next session. I would like to pitch a guest piece.

The angle is one layer below the usual agent-security coverage. Most of it is about models and prompts; the durable failure lives in the Markdown that decides what the next session believes — poisoned facts, stale decisions, and verification layers that skip themselves and report green. Mine did exactly that: a gate skipped its own check whenever the working tree was dirty, which is the state you are always in while editing the handoff. It reported green for weeks.

The piece is defensive only: four attack classes, three ways a verification layer lies to itself, and the one boundary where no test can exist — record integrity is testable (hash the words at consent, mutate one character, the check must turn red); the truth of an unrecorded quote is not, so it is marked `attested, not verified` and never printed green. No exploit steps, no named targets, no product pitch.

I can deliver 1,200–1,800 words within a week, exclusive to Help Net Security, with the repository and a free 13-item assessment checklist as references for readers. Every number in the piece traces to a file or a command in the repository.

Sample of the material: https://dev.to/willcheah/your-agents-memory-is-an-attack-surface-1fi7

Disclosure: I used an AI assistant as the drafting tool and reviewed and revised every claim myself. The repository, the numbers, and the checklist are public and reproducible.

Best regards,
`<your name>`
`<role / company, or "independent maintainer">`
`<email>` · `<GitHub or LinkedIn profile>`
