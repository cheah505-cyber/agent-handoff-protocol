# Cold-read ledger

A cold read finds contradictions that the gates cannot see (`docs/limits.md` §3.5). The findings used to live only in chat and commit messages, so a later reader could not tell which ones were **pre-existing** and which were **introduced by a fix**. This file closes that gap for future reads and backfills what is actually documented.

Rule: every cold read is recorded here with the commit that was read, and every finding with `file:line`. A finding without a line is a note, not a finding.

## How to classify origin

Pick one, and write down which you used:

1. **Blame the line.** `git log -L <start>,<end>:<file>` or `git blame -L <start>,<end> <commit> -- <file>`. If the line existed before the fix under discussion, the finding is pre-existing; if the fix created it, it is introduced.
2. **Re-run against the parent.** Run the same question against the previous commit in a temp checkout. If the contradiction appears there too, it is pre-existing.
3. **Unknown.** If neither is possible, write `unknown`. Do not infer from memory; that is the guessing this file exists to stop.

## 2026-11-25 · v1 — baseline before `v0.1.0`

Commit: unknown (pre-`2847eb5`). Reader: fresh session, four core files. Claimed **8** findings; `docs/lessons-from-production.md` §3.7 names **6**, so two were never recorded — the ledger cannot recover them.

| # | Finding | Evidence | Origin | Disposition |
|---|---|---|---|---|
| 1 | A stale warning that the repo might still live inside a larger workspace git repo | `AGENTS.md` (then) | pre-existing | fixed |
| 2 | The acceptance criterion omitted the cold read | `HANDOFF.md` (then) | pre-existing | fixed |
| 3 | Four different orderings of test → cold read → commit/tag → article across `PROJECT.md` and `HANDOFF.md` | both files (then) | pre-existing | fixed |
| 4 | `last_verified_command` recorded only `ahp check` while the actual verification also ran `npm test` | `HANDOFF.md` (then) | pre-existing | fixed |
| 5 | An ambiguous "finish docs" when the docs were already drafted | `HANDOFF.md` (then) | pre-existing | fixed |
| 6 | No explicit statement that `PROJECT.md`'s status block is derived | `PROJECT.md` (then) | pre-existing | fixed |

## 2026-11-25 · v2 — after the v1 fixes

Commit: unknown (pre-`2847eb5`; fixes in `5c8db0c`). Reader: fresh session. **3** findings, all sequencing/ambiguity questions that the v1 fixes created or exposed:

| # | Finding | Evidence | Origin | Disposition |
|---|---|---|---|---|
| 1 | Which validation order applies to a clean tree | release steps (then) | introduced by the v1 clean-tree fix | fixed |
| 2 | Local tag vs remote tag, and which one the acceptance checks | `HANDOFF.md` (then) | introduced by the release steps | fixed |
| 3 | Where the next unit is opened | `HANDOFF.md` (then) | introduced by the handoff rewrite | fixed |

## 2026-11-25 · v3 — after v2, before `v0.1.0`

**5** findings. None were recorded; `PROJECT.md` only says all five were fixed. Origin and disposition per item: `unknown`. This is the gap the ledger exists to prevent; do not reconstruct them from memory.

## 2026-11-26 · v4 — before the `v0.1.1` release

Commit read: `82747c7`. Reader: fresh session, four files only. **4** findings, all prose, no code:

| # | Finding | Evidence | Origin | Disposition |
|---|---|---|---|---|
| 1 | 安全客 said both "phone and contact supplied" and "still lacks the phone number and a contact" | `HANDOFF.md` §1, two entries from the same day | pre-existing (two moments, present tense) | fixed in `17c4d5d` (chronology made explicit) |
| 2 | The publish order 先知 → FreeBuf → 安全客 was internally wrong: 安全客 requires first publication, so it cannot go last | `HANDOFF.md` §1 | pre-existing (a 2026-11-26 entry) | fixed in `17c4d5d` (marked wrong, not rewritten) |
| 3 | The HNS bullet still said the draft "needs" the user's details after the pitch had been sent | `HANDOFF.md` §1 | pre-existing (stale tense) | fixed in `17c4d5d` |
| 4 | A 2026-11-25 entry says `README.en.md`, but the file is now `README.zh-CN.md` | `PROJECT.md` retrospective | pre-existing (correct for its date) | fixed by the as-of-date note in both logs |

The same read also noted that the four files cannot confirm git state. That is by design; the acceptance line points at `git`, not at the files.

## Template for the next read

```
## <date> · v<n> — <what changed since the last read>
Commit read: <sha> · Reader: fresh context? · Files: the four core files
| # | Finding | Evidence (file:line) | Origin (pre-existing / introduced by <sha> / unknown) | Disposition (gate / fix / accepted risk) |
```

Record the read even when the answer is "no contradictions": that is the evidence that the handoff was readable at that commit.
