# Design: from a production handoff system to a lite protocol

## 1. Problem

AI coding agents fail in predictable ways:

1. **Interruption drift** — a new session reconstructs the state from memory, misses a step, and redoes work.
2. **Source-of-truth confusion** — the same fact lives in three files; one is updated, the others are not.
3. **Unverifiable state** — "done" and "paused" are claims, not checkable facts.
4. **Concurrent overwrite** — two agents edit the same handoff or file.
5. **Review theater** — a check only verifies that a file exists, not that the claim is true.
6. **Green-gate illusion** — every structural check passes while the files contradict each other.

AHP targets 1–6 with a small, repo-local artifact set. It does not try to solve long-term retrieval.

## 2. Principles

### 2.1 One current-state source

`HANDOFF.md` is the only file allowed to say what is happening now. `INDEX.md` is a map. `PROJECT.md` is durable context. `AGENTS.md` is the boundary. `memory/` is lessons.

If a fact is current, it appears once; other files point to it.

### 2.2 Derive, do not duplicate

The `PROJECT.md` status block is generated from `HANDOFF.md` by `ahp sync`. The check compares them. A human editing the block is a drift event, not an update.

This is the most important lesson from the production system: **manual four-way synchronization always loses**. Derive the fields that can be derived; check the rest.

### 2.3 Machine-checkable invariants

Each gate is a small, deterministic assertion about the artifact set. The gates are deliberately boring: file presence, schema, timestamps, status, links, secrets, git state.

A gate that requires a language model to decide is not a gate; it is a review prompt. Use a cold read for that.

### 2.4 Negative tests

Every gate has a fixture that must fail. The test suite is the evidence that the gate is sensitive. A gate without a failing fixture is a claim.

The tests must be isolated: temp project, temp git repo, explicit root, exit-code assertion. See `docs/limits.md`.

### 2.5 Read-only checks, explicit writes

`ahp check` never writes. `ahp sync` writes the derived block; it has a `--check` mode that does not. This separation prevents a "verification" step from hiding the problem it is supposed to find.

### 2.6 Cold read

Gates check shape. A fresh agent checks meaning. A cold read is a required maintenance activity, not a nice-to-have. It answers: what is the state, what is next, what would be redone by mistake, and what contradicts?

### 2.7 Least authority

The protocol works on source files in a repository. It does not need a database, a daemon, production credentials, or a vendor account. The smaller the authority, the smaller the blast radius.

## 3. Architecture

```
AGENTS.md      boundary + read order + contract
INDEX.md       file map (no dynamic state)
PROJECT.md     durable decisions + derived status block
HANDOFF.md     current unit + pause point + next action + verification
memory/        lessons, methods, verified facts
ahp.config.json  paths, statuses, thresholds, required fields
bin/ahp.mjs    CLI: init/check/resume/sync/test
lib/gates.mjs  12 read-only gates
lib/sync.mjs   derived status block
lib/init.mjs   template copy + placeholder replacement
tests/         positive + negative fixtures
```

The runtime is Node.js 20+ with no dependencies. The artifact set is plain Markdown and JSON. It works with any agent that can read files.

## 4. Why these choices

### Why not a database?

A database makes retrieval better but does not make the handoff true. The failure mode is not "we could not find the memory"; it is "the memory said something different from the code". A small set of versioned files is easier to review, diff, and roll back.

### Why not a hosted memory service?

A hosted service adds a trust boundary, a data residency question, and a vendor dependency. For a solo developer or a small team, repo-local files plus git are enough. AHP can sit next to a hosted memory service if one is needed.

### Why no runtime dependencies?

The protocol should still work in five years. Node's standard library is enough for file I/O, JSON, dates, and git. A dependency-free CLI is easy to audit and easy to vendor.

### Why 12 gates and not 50?

Each gate should map to a failure that was actually observed. Fifty gates create alarm fatigue and a maintenance burden. The lite set covers the failures that cause the most damage: stale state, expired leases, false verification, dynamic indexes, dead links, secrets, dirty trees.

### Why a lease for a solo developer?

A lease is optional in practice but cheap to encode. It prevents accidental concurrent writes when a second agent or a second terminal appears. It is a soft lock, not a security control.

### Why `PAUSED` rather than `ACTIVE` during vacation?

`ACTIVE` means a session owns the unit and has a future lease. A vacation with systemd processes running is `MONITORING` or `PAUSED` plus a note; it is not `ACTIVE` with an expired lease. The status should describe the human handoff, not the fact that a server is running.

## 5. Trade-offs

| Choice | Benefit | Cost |
|---|---|---|
| Strict `PAUSED` clean tree | Strong evidence of a deliberate stop | Noisy during active work; use `ACTIVE` or commit |
| Commit-day check | Catches timestamp-only updates | Sensitive to squash/rebase; relax explicitly |
| Derived status block | Eliminates a whole class of drift | One more command at pause; hand-edits fail |
| 8-section handoff | Predictable cold-read path | Some sections are short for small tasks |
| No dependencies | Portable and auditable | No rich UI, no semantic search |
| Legacy `handoff.py` compatibility | Easier migration | Two command vocabularies to document |

## 6. Alternatives considered

- **Mem0/Letta/Zep:** excellent for retrieval and long-term memory; they do not enforce a handoff contract or a current-state source. Complementary, not competing.
- **A README plus discipline:** works until the first interruption; no machine check.
- **Git hooks only:** good for formatting; poor at semantic handoff state.
- **A database plus a dashboard:** better for a team, overkill for a solo developer; adds a service to maintain.
- **A full agent framework:** solves orchestration, not truth. AHP can be a file contract inside any framework.

## 7. Success metrics

- **Cold-start recovery:** a fresh agent can state the current unit, next action, acceptance, and top risks without chat history.
- **Drift incidents per month:** contradictions found by cold read or review.
- **Time to resume:** minutes from clone to the first correct action.
- **False-positive rate:** warnings that did not correspond to a real risk.
- **Gate sensitivity:** every gate has a negative test that fails.
- **Write safety:** no `check` command mutates the repository.

## 8. Evolution

- **v0.1:** four files, 12 gates, CLI, tests, templates, docs.
- **v0.2 (candidate):** optional `MONITORING` schema, adapters for common agent tools, a `doctor` command, a cold-read prompt pack.
- **Team edition (only on demand):** multi-agent leases, audit dashboard, CI policy packs, SSO. Do not build it before three teams ask.

The lite version must stay lite. Every new feature needs a failure it prevents and a test that proves it.
