# Limits: a green check is not the truth

AHP exists because a memory system can be **structurally green and semantically wrong**. This document is part of the protocol, not a disclaimer at the bottom of the README.

## 1. What the gates can see

- A file exists and has the required sections.
- Frontmatter has the required fields and a valid status.
- Timestamps are ordered and the lease has not expired.
- The index does not contain dynamic state.
- The memory index and wiki links are closed.
- The derived status block matches `HANDOFF.md`.
- A high-confidence secret pattern is absent.
- A `PAUSED` tree is clean and the handoff's commit day matches its `updated_at`.

## 2. What the gates cannot see

- Whether `next_action` is the **right** action.
- Whether the stated verification actually ran.
- Whether two files contradict each other in prose.
- Whether a memory fact is still true in the world.
- Whether a `COMPLETE` unit was accepted by a human.
- Whether the agent followed the boundaries.

The worst failure is not a red gate. It is a **green gate over a contradictory handoff**.

## 3. Five ways the verifier itself fails

These are real failure classes found while auditing production and learning projects.

### 3.1 The fixture is not at the threshold

A freshness gate fails above 21 days. The negative fixture was 20 days old. The gate correctly produced a **warning**, not a failure, so the "must turn red" test failed. The gate was fine; the fixture was not.

**Fix:** set the fixture clearly beyond the threshold (for example 40 days), or assert the exact gate/status rather than a message string.

### 3.2 The git gate runs against the real repository

A test wrote its fixture to a temp directory, but the `git status` and `git log` calls used the real project root. The real `HANDOFF.md` was dirty, so the timestamp gate skipped itself. The test reported "not red" even though the gate logic was correct.

**Fix:** pass an explicit `--root` to a temp git repo, initialize it, and commit the fixture. Never let a test read the real repository's git state.

### 3.3 The assertion is a brittle message

A gate fired with `21 days`; the test looked for `20 days`. The test failed, but the gate was working. The reverse is also possible: a message changes, the test silently passes, and the gate is no longer exercised.

**Fix:** assert the gate ID and status; use a regex for numeric details. Assert the exit code too.

### 3.4 The check writes

A backup script named `--check` copied the source into the backup before comparing. It reported differences and left the backup repository dirty. A check that writes is not a check; it is a migration with a misleading name.

**Fix:** a read-only mode must not create, delete, or modify files. Compare first; write only behind an explicit non-check flag.

### 3.5 The semantic blind spot

All 12 gates were green while the handoff said `current_file: roadmap.md` and §3 said "Current file: none"; the summary's last-updated header was four days older than its own retrospective; the INDEX said "map and status" and then "map only". No structural gate can see this.

**Fix:** a cold read. A fresh session reads the four core files and answers the exact state, next action, and contradictions. Every contradiction becomes a gate assertion or a written accepted risk.

## 4. When not to use AHP

- A one-shot task with no handoff and no second session.
- A repository with no git and no intention to use it.
- A team that will not commit at pause points (the `GIT_STATE` gate will be noise).
- A project whose real source of truth is a database or an issue tracker; link to it, do not duplicate it.

AHP is a handoff protocol, not a project management system.

## 5. Tuning and alarm fatigue

- Keep `handoffDays` short enough to catch drift, long enough to survive a vacation. 21 days is a starting point.
- If a gate produces the same warning for months, either fix the state or remove the gate with a written reason. Do not train people to ignore red.
- `--strict` turns warnings into a non-zero exit for CI. Use it on release branches, not on every local run.
- Commit-day checks are sensitive to squash merges and rebases. If your workflow rewrites dates, relax that gate explicitly and record why.

## 6. Cold read: the minimum useful version

A cold read is not "read the README and summarize". Ask a fresh session to answer:

1. What is the current work unit and status?
2. What is the exact next action, and what would be redone by mistake?
3. What was the last verification command and its result?
4. What are the top three risks?
5. Which statements in the four core files contradict each other?

Then compare with the live state. A cold read that only recovers the project's topic is too shallow.

## 7. No security guarantee

AHP reduces drift. It does not prevent a malicious agent, a poisoned memory file, or an authorized user from doing damage. Read `docs/security.md`; use least privilege, review writes, and never store credentials in memory.
