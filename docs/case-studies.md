# Case studies: eight failures that shaped AHP

These cases are anonymized. They are the evidence behind the gates, not hypotheticals.

## Case 1 — The green handoff that contradicted itself

**Symptom:** Every structural gate passed. §1 said the work unit was accepted and pushed; §2, §5, and the frontmatter still said it was in progress with uncommitted files.

**Root cause:** A state change updated §1 but not §2/§5/frontmatter. The gate checked section presence, not consistency.

**Response:** A cold read found it. The fix was to update all four places in one commit and add a cold-read step.

**Lesson:** A handoff is a state machine, not a document with headings.

## Case 2 — The timestamp that moved without the work

**Symptom:** Five commits changed only `updated_at` and `last_verified_at`; the phase and next action were days old. The freshness gate was green.

**Root cause:** Freshness checked the timestamp, not the diff.

**Response:** The commit-day gate was added: if the handoff is clean, its `updated_at` date must match the commit date. A timestamp-only commit fails.

**Lesson:** A timestamp is a claim. The commit is the evidence.

## Case 3 — The negative test that was not negative

**Symptom:** A "must turn red" test reported failure. The gate was actually working.

**Root cause:** The freshness gate failed above 21 days; the fixture was 20 days old. The gate correctly warned; the test expected a failure.

**Response:** The fixture moved to 40 days, and the assertion became "gate ID + FAIL" rather than an exact age string.

**Lesson:** A test that asserts a message is testing the message, not the gate.

## Case 4 — The gate that read the real repo

**Symptom:** A timestamp gate did not turn red in a test. The fixture was in a temp directory, but the git commands ran against the real project. The real handoff was dirty, so the gate skipped itself.

**Response:** The test creates a temp git repo and passes an explicit root. The check uses that root for every git command.

**Lesson:** Isolation is part of the test, not a convenience.

## Case 5 — The check that wrote

**Symptom:** `memory-backup --check` reported ten differences and left ten files modified in the backup repository.

**Root cause:** The script copied the source into the backup before entering the check branch.

**Response:** The check was separated from the sync. A read-only mode must not create, delete, or modify files.

**Lesson:** A check that writes is a migration with a misleading flag.

## Case 6 — The expired lease that still said ACTIVE

**Symptom:** A learning project's handoff was `ACTIVE` with a lease that had expired 34 minutes earlier. The project-level gate did not check lease expiry; the parent workspace check did.

**Root cause:** The status enum and the lease were treated as documentation, not invariants.

**Response:** AHP's `LEASE` gate fails an expired `ACTIVE` lease and forbids residual ownership in `PAUSED`/`COMPLETE`.

**Lesson:** A status that cannot fail is a label.

## Case 7 — The summary, the index, and the vacation

**Symptom:** In a production project, the long-term summary said "no routine during the vacation" in one section and "morning routine on 11/25" in another; the index still listed an old task range; the handoff status was `ACTIVE` while the human was on vacation.

**Root cause:** Multiple sources, manual sync, and a status enum that did not distinguish "human paused" from "server running".

**Response:** One current-state source, a derived status block, and a cold read. AHP keeps the same constraints in a smaller form.

**Lesson:** "Active" is not a synonym for "a server is running".

## Case 8 — The cold read with twelve contradictions

**Symptom:** A learning project passed 13 gates, but a zero-context reader found 12 contradictions in four core files: current file, acceptance criteria, verification commands, stale header, index semantics, expired lease, and more.

**Response:** The contradictions became fixes or explicit accepted risks. The project added a cold-read step and a semantic-lite check for lease/verification/current-file consistency.

**Lesson:** The most valuable test is often a fresh reader, not another regex.

## What the cases have in common

- The failure was in the **verification layer**, not the memory content.
- A green check created confidence that was not earned.
- The fix was a smaller, more precise assertion plus a cold read.
- The lesson was only reliable after it became a test.

AHP is the smallest system that keeps these lessons executable.
