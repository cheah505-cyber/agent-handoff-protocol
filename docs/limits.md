# Limits: a green check is not the truth

AHP exists because a memory system can be **structurally green and semantically wrong**. This document is part of the protocol, not a disclaimer at the bottom of the README.

## 1. What the gates can see

- A file exists and has the required sections.
- Frontmatter has the required fields and a valid status.
- Timestamps are ordered and the lease has not expired.
- The index does not contain dynamic state.
- The memory index and wiki links are closed.
- The derived status block matches `HANDOFF.md`.
- A high-confidence secret pattern is absent from the core files, `memory/`, and `docs/` (recursive, case-insensitive, dotfiles included). **Not scanned:** symlinked directories under `docs/`, and the `publish/` and `tasks/` roots. A token pasted there will not be caught.
- A `PAUSED` tree is clean and the handoff's commit day matches its `updated_at`. While `HANDOFF.md` is uncommitted the commit day does not exist yet, so the check is deferred; the deferral names a stamp older than today, because that stamp cannot match the commit that will carry it. The commit is still only proven after the fact: a commit made with an overridden committer date, or one that lands after midnight, can still reach CI red.

## 2. What the gates cannot see

- Whether `next_action` is the **right** action.
- Whether the stated verification actually ran.
- Whether two files contradict each other in prose.
- Whether a memory fact is still true in the world.
- Whether a superseded fact **names what it replaced**. The status block is derived, so that copy cannot drift, but decisions are prose: a resolved one is struck through in place by whoever resolves it. No pointer means the old and the new fact are both live, both dated, both plausible — and that reads as freshness working. **Candidate gate for v0.2, not in v0.1.0:** count still-open claims older than the freshness window that have neither a successor nor a retirement marker; the set should be small and every member explainable. Proposed by a reader after the English article: https://dev.to/mickyarun/your-agent-is-licensed-to-read-the-email-it-is-not-licensed-to-pay-the-account-number-inside-it-3ajm
- Whether the same frontmatter field is **restated** in a second file. The `PROJECT.md` status block is derived, so that one cannot drift, but a key copied into another file is a second owner. **Candidate gate for v0.2:** parse the four files' frontmatter and fail when a key outside an allowlist appears twice. Proposed by gimalay in the war-story comments (`3mhg4`); it catches duplicated fields, not two paraphrases of one policy — that stays with the cold read.
- Whether a line is a **fact or an instruction**: both are prose, and nothing in the format marks the difference. A reader that treats one as the other is behaving correctly by the format.
- Whether a target named in memory is still **authorized**. Authorization is an external fact, not a line on disk; the gates cannot re-check a scope or a validity window.
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
- The thresholds live in `ahp.config.json` **inside the repository**, so widening one is a diff, and `git log -p ahp.config.json` is the count of how many times the gate has already moved. A threshold outside version control is an unlogged decision.
- `--strict` turns warnings into a non-zero exit for CI. Use it on release branches, not on every local run.
- `--strict` escalates `WARN` but **not** `SKIP`. A gate that could not run (for example `GIT_STATE` outside a git repository) still counts as green. If you need fail-closed CI, treat `SKIP` as a failure in your own wrapper — the CLI does not.
- Commit-day checks are sensitive to squash merges and rebases. Measured on 2026-11-26: a handoff authored `2026-11-24` and squash-merged on `2026-11-26` fails with `updated_at=2026-11-24 does not match its commit day=2026-11-26`. The remedy is one amend — re-stamp `updated_at` to the merge day — and it passes. That is also semantically right: the merged handoff now describes the merged state. In a squash merge the re-stamp is not a timestamp-only commit, because the commit carries the branch's content. Keep the gate; relaxing it would reintroduce the failure it exists for (a stamp that moved without the work, or work that moved without the stamp).

## 6. Cold read: the minimum useful version

A cold read is not "read the README and summarize". Ask a fresh session to answer:

1. What is the current work unit and status?
2. What is the exact next action, and what would be redone by mistake?
3. What was the last verification command and its result?
4. What are the top three risks?
5. Which statements in the four core files contradict each other?

Then compare with the live state. A cold read that only recovers the project's topic is too shallow.

Every finding must name a **file and line**. Hand the reader the prompt in `docs/cold-reads.md` — it asks for the line up front, so the ledger is a paste rather than a reconstruction. Record the read, and the commit it read, in the same file. That is what lets a later reader use `git blame` to say whether a contradiction was pre-existing or introduced by a fix, instead of guessing from memory.

The same test applied to a prose handoff note — no files, no fixtures — is in §7.

## 7. The same test for a prose handoff note

The four core files are not the only thing a team hands over. Plenty of teams hand over a **note**: a paragraph, a doc, a message thread. The cold read applies, but the check is different — there is no second copy, so there is no fixture to turn red.

**The cheapest useful probe.** Hand the note to someone with no context and ask one question: *can you pick this up and say what is next?* That is worth more than any checklist. Its weakness: "say what's next" can be answered confidently and still be wrong, because a note can be internally consistent and stale, or consistent with itself and inconsistent with the repository it describes.

**Add two questions.**

- *"What would you redo by mistake?"* — the question that surfaces contradictions. If the fresh reader cannot tell what is already done, they will guess, and the guess **is** the contradiction.
- *"Which file did you take that from?"* — a note that does not cite its sources cannot be checked against them.

**The criterion.** The fresh reader writes the next three steps. Every step must be traceable to a specific file rather than inferred. **Any step they had to guess is a failed handoff — not a failed reader.**

**The closest thing to a failing fixture is a disconfirming question.** Ask the fresh reader something the note claims, and see whether they can answer it from the note alone rather than from your head. If they have to come back to you, that note is a gate that did not turn red.

**And the floor that no check reaches.** A provenance chain — verbatim quotes, each with the speaker's written consent and the message id it came from — is not a check either. There is no second copy, so there is no fixture; the only test that can fail is the speaker saying "no, that isn't what I said", which makes the checker and the subject the same body. What can be made machine-checkable is the **integrity** of the record (hash the consented words at consent time; fail on any divergence), not the **truth** of the quote. Mark the rest `attested, not verified`, and never report it green.

The two problems meet here: a prose handoff and a remembered quotation fail for the same reason — there is nobody independent to contradict them. The discipline is the same too: say which kind of claim you are making, and never let "attested" print as "verified".

## 8. No security guarantee

AHP reduces drift. It does not prevent a malicious agent, a poisoned memory file, or an authorized user from doing damage. Read `docs/security.md`; use least privilege, review writes, and never store credentials in memory.
