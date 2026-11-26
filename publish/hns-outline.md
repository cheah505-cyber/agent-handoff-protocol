# Pitch outline: Help Net Security

> Ready if the editor asks for an outline (they usually do). Keep it to bullets; do not send the article unasked.

**Working title:** Agent memory is an attack surface: poisoned facts, stale decisions, and checks that lie green

1. **The asset moved.** The next session believes whatever it reads: four files (entry, index, decisions, current handoff) plus a memory directory. A poisoned line breaks no type system and trips no lint. Code review cannot see it — the attack surface is "which content gets read automatically", not file permissions.
2. **Four attack classes, each stopping at the observable failure shape** — memory poisoning, stale facts, instruction injection through hooks and auto-injection, cross-agent trust and concurrent overwrite. No exploit steps, no named targets; the reader learns what to look for in a log or a diff.
3. **The verifier's own attack surface.** Fail-open gates (skip and report green), checks that write (a `--check` that migrated 10 files), template supply chains. First-hand case: my own gate skipped the commit-day check whenever the working tree was dirty — which is the state you are always in while editing the handoff — and reported green for weeks.
4. **The boundary no tool crosses.** Record integrity is testable: hash the exact words at consent, mutate one character, the check must turn red — and the hash must live outside the writer's control. The truth of an unrecorded quote is not testable: no second copy, no fixture, and the checker and the subject are the same body. So it is marked `attested, not verified`, with `CANNOT VERIFY` as its own state in a report. The operational rule for practitioners: "verified" must distinguish "integrity verified" from "truth verified".
5. **What a reader can do on Monday.** Five minimal defenses (memory is untrusted input; least privilege; checks read only; a cold read by a zero-context session; every finding becomes a gate/test or a written accepted risk), each with a minimum acceptance test.
6. **Authorization.** Defensive scope only; test what you have written authorization for; a memory line is not authorization.
7. **A starting artifact.** A free 13-item assessment checklist (2–5 days) and the MIT repository as a reference implementation (12 read-only gates, 27 tests, 19 negative fixtures).

**Length:** 1,200–1,800 words. **Exclusivity:** offered. **Sources:** every number maps to a file or a command in the repository, listed in an appendix table — the piece is checkable, which is the point.
