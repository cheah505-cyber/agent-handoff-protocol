# Review: AHP-CONTENT-002 security article — diff-scoped re-review — 2026-11-25

- Reviewer: DeepSeek (`deepseek/deepseek-flash`), read-only
- Primary: MiniMax (`ses_deeb7bb94ffeRsMu83XUg8z1kp`)
- Primary/commit: `86a1dba` (clean tree)
- Scope: **only what changed since the first round** — the ten findings F1–F10 of `docs/reviews/2026-11-25-deepseek-flash.md`, the edits applied afterwards, and whether anything in the article went stale
- Commands run: `npm test`, `node bin/ahp.mjs check`, `node bin/ahp.mjs sync --check`, `git log`, `git show 86a1dba`

Verdict: **fix-first**. Everything substantive held (12 gates / 27 tests / 19 fixtures / 13 checklist items / the three §7 pointers / no exploit content). The blockers were one false count in the very sentence F8 was meant to fix, and a 19-vs-20 split the previous fix left half-done — including in the files published to 知乎.

## Disposition of the first round's findings

| # | Verdict | Proof in the current file |
|---|---|---|
| F1 | FIXED | `:64` now says the template class has **no recorded instance** and cites the threat model instead of the case studies |
| F2 | PARTIAL → now fixed | Snapshot labels were right, but the "cost" sentence still said 20. Corrected to 19 in `docs/war-story.md:166` and `docs/war-story.en.md:164`; the 知乎 publish copies were regenerated so they no longer carry the stale 20 |
| F3 | FIXED | `HANDOFF.md` names `AHP-CONTENT-002`; tree clean; `check` → 12 PASS |
| F4 | FIXED | `lib/gates.mjs:58` guards the listing; the "docs is a regular file" test passes |
| F5 | FIXED (symlink exclusion stays accepted) | only `.git`/`node_modules` skipped, `.md` matched case-insensitively; the exclusion is written down in `docs/limits.md` §1 |
| F6 | FIXED | `CHANGELOG.md` and `docs/limits.md` both name `publish/` and `tasks/` as unscanned |
| F7 | FIXED | `/\bsk-[A-Za-z0-9_-]{20,}\b/`; the modern-key test passes |
| F8 | PARTIAL → now fixed | `:16` claimed "下面七个假设"; `docs/security.md` §1 has **five** `Assume:` bullets and there is no list "below" in the article. Now "那一节的五条威胁假设" |
| F9 | FIXED | `:110` `CANNOT VERIFY`（无独立证据，不同于"缺权限"）; `:112` hash custody requirement |
| F10 | PARTIAL → now fixed | "9 rows / 4 of them" and the cold-read figures are in; the cold-read figure now has its own appendix row and is described as three rounds |

## New problems found in this pass

1. **The 19/20 split was already live.** `746b36b` corrected two of the three places that said 20 and missed the "cost" sentence; the 知乎 publish copies were regenerated from that file, so they carried both "19" and "20". Fixed in the source and the copies regenerated.
2. **A stale pointer in an old review note.** `docs/reviews/2026-11-25-deepseek.md:65` cited `docs/limits.md` §7 for the "no security guarantee" text, which became §8 when §7 was added. Now §8.
3. **The handoff over-claimed.** "ten findings, all fixed or explicitly accepted" was false while F8 and F2 were partial, and "every number traced in the appendix" was false while the cold-read figure had no row. Both statements are now accurate.

## Stale numbers checked

Every number in the article was re-checked against the current repository: 12 gates, 27 tests, 19 negative fixtures, 13 checklist items, the 21-day threshold, the 20-day fixture (labelled historical — the live fixture is 40 days), the 10 modified files, the nine rows of `docs/security.md` §2, and the three cold-read rounds (8 / 3 / 5). The appendix now has one checkable source per row.

## Still unverified / weak

- The "19 negative fixtures" row cites `npm test` plus the count of `status, "FAIL"` assertions in `tests/gates.test.mjs`; a reader has to reproduce that classification rather than read a number.
- The dev.to comment ids behind the provenance row are not verifiable from the repository alone.
- "十八行" (the reader's record) and "2–5 天" are external claims, attributed or hedged in the text.
- Counting Chinese characters with tables included is what puts the article over 3000; excluding table rows it would be ~2967.
- The article has no fenced code blocks, so "after stripping fences" and "as written" are the same count.

## Verdict

- [ ] block
- [x] fix-first → both blockers fixed; the article is publish-ready
- [ ] acceptable-with-risks
