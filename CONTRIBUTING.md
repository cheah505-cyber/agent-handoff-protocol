# Contributing

AHP is intentionally small. Before opening a PR:

1. Run `npm test` and `node bin/ahp.mjs check`.
2. If you add or change a gate, add a negative fixture in `tests/` that fails before the fix and passes after.
3. If you change a gate's semantics, update `SPEC.md` and `docs/limits.md`.
4. Keep the runtime dependency-free.
5. Do not weaken a gate to make a fixture pass. Explain the trade-off in the PR.
6. Do not include secrets, customer data, or private project facts.

## Adding a gate

A gate needs:

- a stable ID;
- a read-only implementation;
- a positive fixture that passes;
- a negative fixture that fails;
- a one-line entry in the SPEC table;
- a note in `docs/limits.md` if it has a known blind spot.

If a gate cannot be made deterministic, it belongs in a cold-read checklist, not in `ahp check`.
