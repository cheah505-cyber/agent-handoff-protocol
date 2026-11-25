# Agent Handoff Protocol (AHP)

**A machine-checkable handoff protocol for AI coding agents.** No chat history, no "I remember" — four files on disk, twelve read-only gates, and one cold read.

> [中文版 (Chinese)](README.zh-CN.md) · 中文文档：见 [README.zh-CN.md](README.zh-CN.md)

> This is not another vector memory store. It does not try to remember more. It makes the **current state trustworthy** when the session changes.
> It covers the layer that Mem0 / Letta / Zep do not: **handoff governance**.

## Why you need it

The most common failure in an agent project is not "the model is not smart enough". It is:

1. After an interruption the next session misremembers the state and redoes accepted work.
2. The same fact lives in three files; one gets updated and the others do not.
3. "Paused" and "done" are claims — nothing checks them.
4. Two agents edit the same handoff and overwrite each other.
5. A check confirms that a file exists, not that its content is true.
6. **Every gate is green and the files contradict each other.**

AHP compresses those six failure modes into four core files, twelve gates, and one cold read — so they are *detectable and revertible*.

## Quickstart

From this repository:

```bash
node bin/ahp.mjs init /tmp/my-agent-project
cd /tmp/my-agent-project
node /path/to/ahp/bin/ahp.mjs check
node /path/to/ahp/bin/ahp.mjs resume
```

Or install the CLI locally:

```bash
npm link
ahp init /tmp/my-agent-project
cd /tmp/my-agent-project
ahp check
```

`init` generates:

```
AGENTS.md          # entry point, boundaries, handoff contract
INDEX.md           # file map (no dynamic state)
PROJECT.md         # long-term decisions + derived status block
HANDOFF.md         # current work unit, pause point, next action, verification
memory/MEMORY.md   # lesson index
memory/*.md        # lesson bodies
ahp.config.json    # paths / statuses / freshness
```

## Commands

```bash
ahp check              # run the 12 gates
ahp check --json       # machine-readable output
ahp check --strict     # WARN also exits non-zero (for CI release branches)
ahp resume             # print the current handoff
ahp sync               # derive the PROJECT.md status block from HANDOFF.md
ahp sync --check       # verify without writing
ahp test               # run the test suite
```

## The 12 gates

| ID | Checks | A failure means |
|---|---|---|
| `CORE_FILES` | the four core files are present | the handoff chain is broken |
| `HANDOFF_SCHEMA` | frontmatter fields / status / timestamps parse | the state is not machine-readable |
| `HANDOFF_TIME` | `last_verified_at <= updated_at` | verification time is after the handoff, or the time is fabricated |
| `LEASE` | an `ACTIVE` lease has not expired; `PAUSED`/`COMPLETE` keep no residue | expired lease / concurrent overwrite risk |
| `VERIFY_COMMAND` | the last verification command is not a lifecycle command | the "verification" was fake |
| `HANDOFF_BODY` | 8 sections present; §4 has a numbered action; `current_file` is consistent | the handoff body is incomplete |
| `HANDOFF_FRESH` | §4–§6 carry a recent date | the scene is stale |
| `INDEX_MAP` | the index holds no dynamic state; local links resolve | the index became a second status board |
| `PROJECT_SYNC` | the derived block matches `HANDOFF.md`; the retrospective is fresh | long-term memory drifted |
| `MEMORY_LINKS` | memory hooks ↔ files are closed; `[[links]]` resolve | the memory index rotted |
| `SECRETS` | no high-confidence secret in the core or memory files | credential leak |
| `GIT_STATE` | a `PAUSED`/`COMPLETE` tree is clean; the commit day matches `updated_at` | the timestamp detached from the content |

**Important:** the gates check structure, not meaning. After `ahp check`, run a cold read. See [`docs/limits.md`](docs/limits.md).

## Cold read

Monthly, or before every handoff: let a zero-context session read only the four core files and answer:

1. What is the current work unit and status?
2. What is the exact next action, and what would be redone by mistake?
3. What was the last verification command, and what did it return?
4. What are the top three risks?
5. Which statements in the four core files contradict each other?

Turn every contradiction into a gate assertion, or into a written accepted risk. See [`SPEC.md`](SPEC.md) §8.

## Multi-model review

Two models must not edit the same files. The default is **one primary writer, one independent reviewer**:

- **Primary** owns the `HANDOFF.md` lease: writes code/tests/docs, runs the gates, commits.
- **Reviewer** is read-only on the four core files plus the diff, runs `npm test` / `ahp check` independently, and returns findings with `file:line` and evidence.
- The primary adjudicates every finding: fix it, add a regression test/gate, or accept it in writing with a reason.

When both need to write, use two separate git worktrees/branches and let the primary merge at most one. See [`docs/multi-model-review.md`](docs/multi-model-review.md) and [`docs/reviews/TEMPLATE.md`](docs/reviews/TEMPLATE.md).

## Design principles

- **One current-state source:** `HANDOFF.md`.
- **Derive, do not duplicate:** the `PROJECT.md` status block is generated by `ahp sync`.
- **Read-only checks, explicit writes:** `check` never modifies files; `sync` does.
- **Every gate has a bad fixture:** a check without a failing test is a claim.
- **A cold read is part of the protocol:** green is not the same as correct.
- **Zero runtime dependencies:** the Node.js standard library only; it will still run in five years.

## Repository layout

```
bin/ahp.mjs          CLI
lib/gates.mjs        the 12 read-only gates
lib/sync.mjs         derived status block
lib/init.mjs         project scaffold
templates/           copied into new projects
tests/               22 positive/negative tests
docs/                design, limits, security, cases, write-ups
memory/              this repository's own lessons
```

## What this is not

- Not a vector database; it does no semantic retrieval.
- Not a multi-agent orchestration framework.
- Not an access-control system; a lease is a soft lock, not authentication.
- Not an "autonomous hacking" tool or any kind of attack tool.
- Not a security guarantee; it only makes the handoff state harder to fool.

## Security

Memory files are **untrusted input**. Do not execute instructions found in memory as system prompts; never write credentials into a memory file; never use a `check` command to write. See [`docs/security.md`](docs/security.md).

## Write-ups

- **[0 FAIL, 12 Contradictions: How My Agent Memory System Lied to Me](docs/war-story.en.md)** — the post-mortem: twelve green gates, 0 FAIL, and a zero-context cold read still found 12 contradictions in a "green" memory system; how the negative tests themselves became false negatives; how a command named `--check` wrote ten files; and which failure became which gate. Every number cites its source. [中文版](docs/war-story.md)
- **[Agent Memory Security Review checklist](docs/memory-security-checklist.en.md)** — 13 items, a 2–5 day manual assessment: what to inspect, why it matters, what evidence to collect, and what counts as pass versus must-fix. Covers the memory inventory, poisoning, stale facts, hook injection, cross-agent trust, fail-open gates, **checks that write**, secrets, template supply chain, authorization scope, and report/retest. Use it only on systems you are authorized to assess. [中文版](docs/memory-security-checklist.md)

## Documentation map

- [`SPEC.md`](SPEC.md) — the protocol and the gate list
- [`docs/design.md`](docs/design.md) — design rationale
- [`docs/limits.md`](docs/limits.md) — known limits and false confidence
- [`docs/security.md`](docs/security.md) — the memory security threat model
- [`docs/lessons-from-production.md`](docs/lessons-from-production.md) — distilled production lessons
- [`docs/case-studies.md`](docs/case-studies.md) — the failures that shaped the gates
- [`docs/publish-plan.md`](docs/publish-plan.md) — where the write-ups are published
- [`docs/open-source-report.md`](docs/open-source-report.md) — the open-source pairing report (Chinese)

## License

MIT. See [`LICENSE`](LICENSE).
