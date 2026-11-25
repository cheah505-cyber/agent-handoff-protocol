# 0 FAIL, 12 Contradictions: How My Agent Memory System Lied to Me

> A green check is not the truth. The liar was my verifier.

> Every number in this post points at a file or a command output in the repository. If it is not there, it is not here.

> **Note:** the "12 contradictions" in the title belong to a *different* project — a learning project I audited. AHP's own cold reads found **8 / 3 / 5**. Both teach the same lesson, so they are told together.

---

## 1. A green dashboard

Let me be concrete about what I built, otherwise the "gotcha" later lands soft.

I built a repo-local handoff protocol for AI coding agents, **AHP (Agent Handoff Protocol)** — a *machine-checkable* handoff protocol. It does not try to remember more. It answers one question: **is the current state trustworthy, and can the next session pick it up?**

Four files:

| File | Owns |
|---|---|
| `AGENTS.md` | Agent entry point, boundaries, handoff contract |
| `INDEX.md` | A file map — and *no* dynamic state |
| `PROJECT.md` | Long-term decisions + a **derived** status block |
| `HANDOFF.md` | Current work unit, exact pause point, next action, acceptance |

Plus a status machine: `PAUSED → ACTIVE → PAUSED / BLOCKED / COMPLETE / MONITORING`. `ACTIVE` requires a future lease; `PAUSED` and `COMPLETE` must not keep an owner, a session, or a lease residue (`SPEC.md` §3).

Then **twelve read-only gates**, run in one command:

```
PASS CORE_FILES       core files present
PASS HANDOFF_SCHEMA   frontmatter is valid
PASS HANDOFF_TIME     timestamps are ordered
PASS LEASE            PAUSED has no residual lease
PASS VERIFY_COMMAND   verification command recorded
PASS HANDOFF_BODY     8 sections and next action are present
PASS HANDOFF_FRESH    sections 4-6 are fresh (0 days)
PASS INDEX_MAP        INDEX is a map and its links resolve
PASS PROJECT_SYNC     derived status matches HANDOFF
PASS MEMORY_LINKS     memory index and links are closed
PASS SECRETS          no high-confidence secret pattern found
PASS GIT_STATE        tree clean; timestamp matches the commit

[ahp] 0 FAIL / 0 WARN / 12 PASS / 0 SKIP
```

One number matters more than the others: **fail-open gates are forbidden**. Every gate needs a negative fixture that *must* turn red; a check with no failing fixture is a claim, not a check. The whole suite is 22 tests: 15 negative "must turn red" fixtures (one per gate), 6 CLI/scaffold tests, and 1 positive "a valid project should pass everything". `npm test` → 22/22.

That is where I thought the story ended.

Then I ran a **cold read**: a zero-context session that only got the four core files, and had to answer five questions — what is the current work unit and status, what is the exact next action, what was the last verification command and its result, what are the top three risks, and which statements in the four files contradict each other.

It found **12 contradictions**.

The gates were **0 FAIL**.

---

## 2. What the gates could not see

First, whose "12" this is: it belongs to **another project** — a learning project whose gates were all green while a zero-context reader found 12 contradictions in its four core files (`docs/case-studies.md`, case 8):

- `current_file` named one file while §3 of the same document said "no file is being edited";
- the acceptance criteria lived in two files — three items in one, four in the other;
- the project documented **three different** verification command sets;
- the long-term summary's "last updated" header was four days older than its own newest entry;
- `INDEX.md` said "map and status" in one line and "map only" in another;
- the status was `ACTIVE` with a lease that had **expired 34 minutes earlier**;
- the recorded "last verification command" was a *lifecycle* command (`ahp pause`), not a verification.

The production project I audited was bigger: 70+ memory files, 279 wiki links, a 211 KB `HANDOFF.md`, a 185 KB long-term summary, 5 derived mirrors. It had the same disease: §1 said the work unit was accepted and pushed, while §2, §5 and the frontmatter still said "in progress, uncommitted files" — with a clean tree and the commit already on the remote. All gates green; the cold read found it.

**Lesson one: structural checks are necessary but not sufficient.** Eight sections can coexist with a contradiction. I wrote that into the protocol itself (`docs/limits.md` §2: "the worst failure is not a red gate — it is a **green gate over a contradictory handoff**").

What about my own repo? Same rules: zero context, four files only, one contradiction at a time.

- **v1: eight issues.** A stale warning about the repo living inside a larger workspace git repo; an acceptance criterion that omitted the cold read; **four different orderings** of "test → cold read → commit/tag → article" across `PROJECT.md` and `HANDOFF.md`; a `last_verified_command` that recorded only `ahp check` when the real verification also ran `npm test`; a vague "finish the docs" when the docs were already written; and a missing statement that `PROJECT.md`'s status block is *derived*.
- **v2: three issues.** Release sequencing (requiring a clean tree before committing) and local-vs-remote tag ambiguity; and where the next work unit is opened.
- **v3: five more**, smaller and semantic.

Eight, three, five — **every single one was a documentation issue.** The code was fine. The handoff was not.

That is exactly the failure AHP exists to catch, and it also showed that a cold read is not a one-off: **it iterates, and every round produces something.**

### Where those contradictions ended up

The value of a cold read is not the discovery — it is that the same thing cannot happen twice. Every one of the 12 became either **a gate assertion** or **a written "accepted, not fixed"**.

Three became gates, because the wording of the problem and the wording of the check are nearly identical:

| Contradiction found | Gate | What the gate actually checks |
|---|---|---|
| `current_file` contradicts §3 | `HANDOFF_BODY` | if §3 says "none", `current_file` must be "none" |
| Status is `ACTIVE` but the lease expired | `LEASE` | `ACTIVE` requires a future `lease_until`; `PAUSED`/`COMPLETE` must not keep residues |
| The last verification command is a lifecycle command | `VERIFY_COMMAND` | `last_verified_command` cannot be `ahp start`/`ahp pause`-style |

The rest **did not** become gates, not because they matter less, but because **none of them can be machine-checked reliably**:

| Contradiction found | Why no machine can check it |
|---|---|
| Three different verification command sets | `VERIFY_COMMAND` inspects **one field**; it cannot see three documents each describing their own |
| Acceptance criteria split across two files, with different counts | `HANDOFF_BODY` requires a numbered action in §4 and a non-empty `next_action`; it does not count acceptance items |
| The summary's "last updated" header predates its own newest entry | `HANDOFF_FRESH` measures the age of dates in §4–§6 (threshold: 21 days); it does not compare a header against an entry |
| `INDEX.md` says "map and status" in one line and "map only" in another | `INDEX_MAP` matches **dynamic state rows**; it does not recognise two different paraphrases of a policy |

Those four became written acceptances instead of gates. **A gate cobbled together to fit a case manufactures false greens — the one thing this whole design exists to prevent.**

---

## 3. Worse: the verifier itself lies

The contradictions above were at least catchable by a cold read. The failures that actually scared me were of another kind: **my negative tests told me a gate was broken, when my tests were the broken part.**

Four real cases. All of them are in `docs/lessons-from-production.md` §3 and `docs/case-studies.md`.

### 3.1 The fixture was not past the threshold, so "red" was fake

The freshness gate fails above 21 days (the threshold comes from `freshness.handoffDays` in `ahp.config.json`). My negative fixture built a **20-day-old** `HANDOFF.md`.

20 < 21, so the gate correctly emitted a **WARN**, not a FAIL. My test expected FAIL, so it could not turn red.

It looked like a broken gate. It was a bad fixture. Two fixes: push the fixture clearly past the threshold (40 days), or stop asserting the human-readable sentence.

### 3.2 The gate read the real repository, not the fixture

This one was worse. The fixture was written into a temp directory, but the `git status` and `git log` calls ran against the **real project**. The real repository was dirty at that moment, so the gate **skipped itself** and reported success.

The test said "not red". The gate logic was perfectly correct.

Fix: the test creates a **temp git repo**, passes the root explicitly, and every git command uses that root. **Isolation is part of the test, not a convenience.**

### 3.3 The assertion tested the message, not the gate

The gate printed `21 days`; the test looked for `20 days`. The test failed while the gate worked.

The reverse is worse: change the message and the test **silently passes**, so the gate is never exercised again — it becomes a decoration that can never fail.

Fix: assert the **gate ID and status** (`LEASE` / `FAIL`), use a regex for numeric details, and assert the exit code too.

### 3.4 A command named `--check` that wrote files

This one deserves its own paragraph.

A backup script took `--check` as an argument. Its behaviour: **copy the source into the backup first**, *then* enter the comparison branch, then report the resulting git differences. Result: it reported "10 differences" and left **10 files modified** in the backup repository.

A check that writes is not a check. It is a migration wearing a misleading flag.

Fix: compare first, write only behind an explicit non-check flag, and verify `git status` **before and after** every `--check`.

AHP carries the same rule: gates must be read-only, and `sync` is the only thing that writes.

---

## 4. What I changed

Five moves, each of them turning a discovery into "this cannot happen again".

**1. One current-state source.** Dynamic state lives in `HANDOFF.md` and nowhere else. `INDEX.md` is a map, so the `INDEX_MAP` gate checks that it has not grown a status board. Long-term decisions live in `PROJECT.md`. The same fact is not allowed three homes.

**2. Derive, do not duplicate.** The status block at the top of `PROJECT.md` is generated from `HANDOFF.md` by `ahp sync`, not written by hand. Hand-written means it will drift, so `ahp sync --check` exists to catch the drift. **Fields a tool can generate should not be maintained by discipline.**

**3. Negative tests are the product.** Twelve gates, each with a fixture that must turn red. The cost is that I had to write 15 negative fixtures; the payoff is that every gate is still alive.

**4. Isolated git fixtures.** See 3.2.

**5. The cold read is part of the protocol.** A cold read is not "read the README and summarise it" — it is a zero-context session answering five specific questions. And every contradiction it finds must become **either a gate assertion or a written acceptance**. "Read it and forget it" is forbidden.

One more rule, borrowed verbatim from an external audit: **every finding becomes either a gate/test or a written accepted risk**, with a reason and a trigger for re-evaluation. It is the rule that stops "I know about this problem" from dying in a chat log.

---

## 5. What this does *not* fix (and what I will not claim)

It is easy to read the above as "install this and your memory system is safe". It is not. Stating the limits matters more than stating the wins.

- **Green is not true.** The gates can see that a file exists, that the frontmatter is well-formed, that timestamps are ordered, that the lease has not expired, that the derived block has not drifted, that the index has not turned into a status board, and that no obvious key is committed. They **cannot** see whether `next_action` is the *right* next action, whether the recorded verification actually ran, whether two files contradict each other in prose, whether a remembered fact is still true in the world, whether a `COMPLETE` unit was actually accepted by a human, or whether the agent respected its boundaries. **The worst failure is not a red gate — it is a green gate over a contradictory handoff.**
- **Two models agreeing is not evidence.** My workflow is one writer plus one independent reviewer: the reviewer is read-only, returns findings with `file:line` and evidence, and the primary adjudicates each one — fix it, turn it into a test/gate, or accept it in writing with a reason. The reviewer **cannot merge**. Tests and code always beat model consensus. Two models can also agree and both be wrong in the same way.
- **AHP is not a memory system.** It does not replace Mem0 / Letta / Zep, does not do vector retrieval, does not do long-term memory extraction. It is four files, one status machine, a set of read-only checks, and one cold read.
- **AHP is not an access-control system.** A lease is a soft lock, not authentication. It prevents accidents and low-grade concurrency, not malice.
- **AHP is not a security guarantee, and it is not an attack tool.** It touches no live target and does not "hack things automatically". It just makes the handoff state harder to fool the next person.

One more thing I deliberately keep in the docs: `docs/limits.md` is not fine print at the bottom of a README. It is **part of the protocol**. A guarantee you cannot back is a disclaimer, and disclaimers are a form of dishonesty.

---

## 6. Try it yourself

You do not have to take my word. Use my repo as the target:

```bash
git clone https://github.com/cheah505-cyber/agent-handoff-protocol.git
cd agent-handoff-protocol
npm test                       # 22 tests, 15 of them negative fixtures
node bin/ahp.mjs check         # 12 gates
node bin/ahp.mjs init /tmp/demo && cd /tmp/demo
# now deliberately change HANDOFF.md's last_verified_command to "ahp pause"
# run check again and watch VERIFY_COMMAND turn red
```

Go further: stale the derived status block in `PROJECT.md`, run `node bin/ahp.mjs sync --check` and it fails; run `node bin/ahp.mjs sync` and it is repaired.

If you want to run the same checks against your own agent memory, I wrote them up as a **practical, authorized-assessment checklist**: [`docs/memory-security-checklist.md`](memory-security-checklist.md). Thirteen items, each with what to inspect, why it matters, what evidence to collect, and what counts as pass versus must-fix. It covers the memory inventory, poisoning, stale facts, hook injection, cross-agent trust, fail-open gates, **checks that write**, secrets, template supply chain, authorization scope, and report/retest.

The checklist is **free** and lives in the repository. If you want the packaged version (team rollout checklist + cold-read question card), leave an email and I will send it when it exists.

It is not an "automated scanner". It is a 2–5 day manual assessment process — **use it only on systems you are authorized to assess.**

---

## 7. One sentence

If this post leaves you with a single line, let it be this:

> **A handoff system is not a memory system; it is a truth-maintenance system.**
> **The moment its checks stop being able to fail, it becomes another source of drift.**

And the cheapest place to start is not a tool. It is this: **the next time you hand off, let someone with no context read your state files.** Whatever they cannot reconstruct is where your system is currently lying to you.

---

## Appendix: where every number comes from

| Number | Source |
|---|---|
| 12 gates, 0 FAIL | `node bin/ahp.mjs check`; gate list in `SPEC.md` §6 |
| 22 tests (15 negative, 6 CLI, 1 positive) | `npm test` |
| 12 contradictions in the learning project | `docs/case-studies.md` case 8 |
| Cold reads 8 / 3 / 5 on AHP itself | `docs/lessons-from-production.md` §3.7; `HANDOFF.md` §1 |
| Production project: 70+ files, 279 links, 211 KB, 185 KB, 5 mirrors | `docs/lessons-from-production.md`, preamble |
| 21-day threshold / 40-day fixture | `ahp.config.json`; `docs/limits.md` §3.1 |
| 20-day fixture | `docs/lessons-from-production.md` §3.4; `docs/case-studies.md` case 3 |
| `--check` left 10 files modified | `docs/lessons-from-production.md` §3.5; `docs/case-studies.md` case 5 |
| Lease expired 34 minutes earlier | `docs/case-studies.md` case 6 |
| 5 derived mirrors | `docs/lessons-from-production.md` §6 |
| The five cold-read questions | `docs/limits.md` §6; `AGENTS.md` handoff contract |

License: MIT. The protocol and the CLI are open source.
