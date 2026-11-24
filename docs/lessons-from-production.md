# Lessons from production: what a real handoff system taught us

Coverage: all 71 memory files in the production project, its root governance docs, and the audit cards WP-111/123/134/135/136/137/138/139; production application code was read only where a cited handoff rule depended on it. This is a governance review, not a security audit.

This note distills a read-only review of two real projects:

- **Project A:** a live production analytics site with a mature handoff system, 70+ memory files, 279 wiki links, a 211 KB `HANDOFF.md`, a 185 KB long-term summary, five derived mirrors, and multiple independent audits.
- **Project B:** a personal security-learning project with seven core files, three memory files, 13 gates, and three negative fixtures.

Names and business facts are removed. The failures are kept because they are the reason AHP exists.

## 1. The six failure modes

1. **Interruption drift.** A new session reconstructs the state from memory, misses a step, and redoes accepted work.
2. **Source-of-truth confusion.** The same fact lives in three files; one is updated and the others are not.
3. **Unverifiable state.** "Paused" and "complete" are claims; nothing checks them.
4. **Concurrent overwrite.** Two agents edit the same handoff or file; one loses.
5. **Review theater.** A check confirms that a file exists, not that its content is true.
6. **Green-gate illusion.** Every structural gate passes while the files contradict each other.

The first five were known. The sixth is the one that survived the longest.

## 2. Five root causes

The production audit reduced a year of drift to five causes:

1. **`updated_at` can be changed without changing content.** A commit that only bumps a timestamp looks like progress.
2. **A hand-written arc touches about 20 places; one will be missed.** Manual four-way synchronization loses.
3. **Many sources, no single-source discipline.** The anti-drift system itself becomes a drift engine.
4. **Role contracts check structure, not content.** A handoff can have all eight sections and still lie.
5. **A fail-open gate creates false confidence.** A skipped check is worse than no check because it looks green.

AHP addresses 1 with the commit-day and verification checks, 2 with the derived status block, 3 with one current-state source, 4 with a cold read, and 5 with explicit `SKIP`/`WARN` and negative tests.

## 3. The false-green taxonomy

### 3.1 Same-file contradiction

A production handoff said in §1 that a work unit was accepted and pushed, while §2, §5, and the frontmatter still said it was in progress with uncommitted files. The tree was clean; the remote contained the commit. Every gate was green. A cold read found it.

**Lesson:** a state change must update §1, §2, §5, and the frontmatter together. A gate that checks only section presence will not see the contradiction.

### 3.2 Timestamp-only "synchronization"

Five commits changed only `updated_at` and `last_verified_at`; the phase, next action, and §0 were days old. The freshness gate passed because the timestamp was fresh.

**Lesson:** the commit day must match `updated_at`, and the diff must contain a semantic line, not only a timestamp.

### 3.3 The gate that skipped itself

A timestamp gate skipped when `HANDOFF.md` was dirty. The test fixture was in a temp directory, but the git commands ran against the real repository, which was dirty. The test reported "not red"; the gate was correct.

**Lesson:** git-based gates need a temp git repo. A dirty tree must produce a loud `WARN` or `FAIL`, never a silent skip.

### 3.4 The fixture below the threshold

A freshness gate failed above 21 days. The negative fixture was 20 days old, so the gate produced a warning, not a failure. The test expected a failure and "found" a false negative.

**Lesson:** put the fixture clearly beyond the threshold; assert the gate ID and status, not a human-readable age.

### 3.5 The check that writes

A backup command named `--check` copied the source into the backup before comparing, then reported the resulting git differences. It left ten files modified. A check that writes is a migration with a misleading name.

**Lesson:** compare first; write only behind an explicit non-check flag. Verify `git status` before and after a `--check`.

### 3.6 The semantic blind spot

A learning project's four core files passed 13 gates. A fresh read found 12 issues:

- `current_file` said one file; §3 said "no file being edited".
- The acceptance criteria had three items in one file and four in another.
- Three different verification command sets were documented.
- The summary header was four days older than its own latest entry.
- The index said "map and status" and then "map only".
- The status was `ACTIVE` with an expired lease; the last verification command was a lifecycle command.

**Lesson:** structural checks are necessary, not sufficient. A cold read is part of the protocol.

### 3.7 Dogfooding AHP

The first cold read of AHP itself found eight issues that the 12 gates did not see:

- a stale warning that the repo might still live inside a larger workspace git repo;
- an acceptance criterion that omitted the cold read;
- four different orderings of “test → cold read → commit/tag → article” across `PROJECT.md` and `HANDOFF.md`;
- an incomplete `last_verified_command` that recorded only `ahp check` while the actual verification also ran `npm test`;
- an ambiguous “finish docs” when the docs were already drafted;
- a missing explicit statement that `PROJECT.md`'s status block is derived.

All eight were documentation issues. The code was fine; the handoff was not. That is exactly the failure AHP is meant to catch.

## 4. What survived

These invariants survived both projects and became AHP's gates:

- One current-state source (`HANDOFF.md`).
- One map (`INDEX.md`) with no dynamic state.
- One durable context file (`PROJECT.md`) with a derived status block.
- One lesson index (`memory/MEMORY.md`) with closed links.
- A status machine with a lease and a clean pause.
- A verification command that is not a lifecycle command.
- A commit-day check for timestamp-only updates.
- A secret scan.
- A cold read before a handoff.

## 5. What to cut for a lite version

The production system was powerful and expensive. For a solo developer or small repository:

- **Keep:** the four core files, the status machine, the derived block, 10–12 gates, negative tests, a cold read.
- **Cut:** multi-agent leases (keep a single optional lease), five-run daily checklists, 70+ memory files, domain-specific route/resource files, dashboards, daemons.
- **Move to docs:** the audit archaeology and the long war stories. Do not put them in the daily handoff.

The lite version should be readable in one sitting and runnable in one command. If it needs a database, it is no longer lite.

## 6. What the production system got right

- **Derived fields.** Five mirrors generated from one handoff eliminated a class of drift.
- **Negative tests.** The gates that had a failing fixture were the ones that stayed sensitive.
- **External findings rule.** Every audit finding became either a gate assertion or a written accepted risk. "Read it and forget it" was forbidden.
- **Cold reads.** Independent, zero-context audits found contradictions that the gates could not see.
- **Backup.** A local git mirror of the memory library made the knowledge recoverable.
- **Portability.** Plain Markdown, YAML frontmatter, wiki links, and Node/Python scripts survived a machine migration and a tool change.

## 7. What the production system got wrong

- **It grew.** A 211 KB handoff and a 185 KB summary are not a handoff; they are an archive that still looks current.
- **It trusted timestamps.** A timestamp is a claim, not evidence.
- **It trusted structure.** Eight sections can coexist with a contradiction.
- **It let a check write.** A read-only label is not a read-only implementation.
- **It tested against the real repo.** A test that depends on the real dirty state is not a test.

AHP is the smaller version that keeps the good parts and refuses the growth.

## 8. The one-sentence conclusion

A handoff system is not a memory system; it is a **truth-maintenance system**. The moment its checks stop being able to fail, it becomes another source of drift.
