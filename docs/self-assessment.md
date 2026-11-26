# Self-assessment: AHP against its own checklist

- **Date:** 2026-11-26
- **Target:** this repository (public), at `f9eb1db`
- **Scope:** four core files, `memory/`, `docs/`, `templates/`, and the CLI in `bin/` + `lib/`
- **Authorization:** a self-audit of our own repository. No third-party system, no production data, no customer data. Every mutation ran in a detached git worktree (`/tmp/opencode/audit`), never in the working tree.
- **Method:** for each of the 13 items in `docs/memory-security-checklist.en.md`, read the pass criterion, run the evidence command, and record a verdict. Every FAIL or PARTIAL has one of the three dispositions: **fix**, **gate or test**, or **accepted in writing** with a trigger.

This is not a claim that AHP is secure. It is the checklist applied to the one system we can inspect completely, so that the gaps are named rather than implied.

## Summary

| # | Item | Verdict | Note |
|---|---|---|---|
| 1 | Memory inventory and injection surface | PARTIAL | inventory below; only `AGENTS.md` is auto-injected, and its review rule is "same commit as the work" — a convention, not a gate |
| 2 | Privilege boundaries | N/A | local CLI, no roles: the writer is the user's own shell. Cannot grant least privilege |
| 3 | Memory poisoning | FAIL (accepted) | facts and instructions are both prose; nothing intercepts at an action layer |
| 4 | Stale facts and state drift | PASS | one current-state source, derived block, `PROJECT_SYNC` fails when it drifts |
| 5 | Hook injection | N/A | AHP ships no hooks; the injection surface belongs to the harness |
| 6 | Cross-agent trust | PASS (advisory) | one-writer rule + lease; `LEASE` fails an expired lease. No locking |
| 7 | Fail-open gates | PASS | three fault injections, all exit 1 |
| 8 | Checks that write | PASS | `git status --porcelain` empty before and after every read-only command |
| 9 | Fixture strength | PASS | threshold 21 days vs fixture 40; assertions on gate ID + status; CLI exit codes asserted |
| 10 | Secrets | PASS (history CANNOT VERIFY) | gate passes; the two unscanned roots were grepped clean |
| 11 | Template supply chain | PASS | zero dependencies; clean-room `init` produced 7 expected files, no URLs or exec |
| 12 | Authorization scope | N/A | no target list to check; the protocol cannot re-check a scope |
| 13 | Reporting and retest | PASS | review notes carry per-finding dispositions and a dated recheck |

## §1 inventory

| File | Injection | Readers | Writers | Owner |
|---|---|---|---|---|
| `AGENTS.md` | **auto** (harness entry file) | every session | the agent, via a committed edit | maintainer |
| `HANDOFF.md` | on demand | every session | the agent at a pause | maintainer |
| `PROJECT.md` | on demand; its status block is **derived** | sessions and humans | the agent; `ahp sync` writes the block | maintainer |
| `INDEX.md` | on demand | sessions looking for a file | the agent | maintainer |
| `memory/*.md` | on demand, reached through `memory/MEMORY.md` hooks | sessions | the agent | maintainer |
| `docs/**/*.md` | on demand | humans and sessions | the agent | maintainer |

**Content-review rule for the auto-injected file:** a change to `AGENTS.md` ships in the same commit as the work it governs, so it appears in the diff a human reviews. There is no separate gate on its contents — `CORE_FILES` only asserts that it exists. Recorded as the reason this item is PARTIAL.

## Findings

### F1 — major — `lib/gates.mjs`, deferred commit-day message
**Evidence:** with `updated_at: "not-a-date"`, the gate printed `updated_at=not-a-date matches today` in the same run where `HANDOFF_SCHEMA` failed with `invalid updated_at`. The message asserted a comparison it never made.
**Disposition:** **fixed.** The detail is now emitted only when the value parses; otherwise the message stays silent and `HANDOFF_SCHEMA` owns the failure.

### F2 — major — §3: no fact/instruction distinction, no action-layer interception
**Evidence:** every memory file is prose. `SECRETS` looks for tokens; nothing looks at whether a line is shaped like an instruction. AHP cannot block an action because it does not perform actions.
**Disposition:** **accepted**, and now written into `docs/limits.md` §2 as a blind spot rather than left to the reader. Item 3 of the checklist applies to systems with an action layer; for AHP it is a property of the harness.

### F3 — minor — §2 and §12: no roles, no authorization re-check
**Evidence:** `bin/ahp.mjs` runs with the invoking user's privileges and makes no network calls; `package.json` has no dependencies. There is no role model to test, and no target list to validate against an authorization window.
**Disposition:** **accepted**, recorded in `docs/limits.md` §2 (authorization is an external fact) and §4 (when not to use AHP).

### F4 — minor — `HANDOFF.md` is 16 KB, §1 alone 7.1 KB
**Evidence:** §1 is append-only history; the war story criticises a production handoff that reached 211 KB for the same reason.
**Disposition:** **accepted with a trigger:** when the file passes ~20 KB, move entries older than the current work unit into `PROJECT.md` retrospectives and leave a one-line pointer.

### F5 — nit — §4: reversed decisions carry no formal `superseded` marker
**Evidence:** reversals are recorded in the prose of `PROJECT.md` retrospectives and in the commit history (for example the 19-vs-20 count correction and the retracted "add a FAIL gate" fix).
**Disposition:** **accepted.** A marker field would be a second source for a fact the commit already carries; the trace is the retrospective plus `git log`.

### F6 — nit — §10: the working tree is scanned, the history is not
**Evidence:** `SECRETS` reads files on disk. `git log -p` is not scanned; a token removed in a later commit is still in the history.
**Disposition:** **accepted** — the gate is a backstop, not history hygiene. Recorded here as `CANNOT VERIFY` for the history.

## Evidence

### §7 fault injections (detached worktree, exit codes captured)

| Fault | Result | Exit |
|---|---|---|
| clean baseline | 12 PASS | 0 |
| dirty tree (`untracked.txt`) | `FAIL GIT_STATE PAUSED requires a clean tree; 1 uncommitted path(s)` | 1 |
| unparsable date | `FAIL HANDOFF_SCHEMA invalid updated_at: not-a-date` + `FAIL GIT_STATE` | 1 |
| missing `AGENTS.md` | `FAIL CORE_FILES missing: AGENTS.md` + `FAIL INDEX_MAP dead INDEX link(s)` + `FAIL GIT_STATE` | 1 |

### §8 read-only proof

`git status --porcelain` was empty before and after `ahp check`, `ahp check --json`, and `ahp sync --check` (byte-identical output, 0 bytes).

### §9 thresholds and assertions

`ahp.config.json` sets `handoffDays: 21`; the live freshness fixture is 40 days (`tests/gates.test.mjs`), not 20. Assertions read `gate(report, "ID").status`; `tests/cli.test.mjs` asserts process exit codes (`status, 0` / `status, 1`).

### §10 secrets

`SECRETS` passes on the real repository. The two roots it does not scan were grepped directly: `publish/` and `tasks/` contain no high-confidence pattern (`sk-…`, `AKIA…`, `ghp_…`, private-key headers, `xox…`).

### §11 templates and clean room

`templates/` contains 7 files and no URL, `curl`/`wget`/`npx`/`eval`/`base64` or "ignore previous" text. `node bin/ahp.mjs init /tmp/opencode/demo-init` exited 0 and produced exactly `AGENTS.md`, `ahp.config.json`, `HANDOFF.md`, `INDEX.md`, `PROJECT.md`, `memory/MEMORY.md`, `memory/bootstrap-decisions.md`.

### §13 reporting

`docs/reviews/2026-11-25-deepseek-flash.md` and `-recheck.md` record ten findings with per-item dispositions; `docs/reviews/TEMPLATE.md` fixes the shape. The one regression the re-review found became a test, not a note.

## What this audit cannot verify

- Whether the incidents narrated in `docs/limits.md` and `docs/case-studies.md` happened exactly as written. The only source is our own write-up; there is no independent record.
- Whether the git history is free of secrets (see F6).
- Whether a human actually read the handoff. No gate can see attention.

A green checklist over an honest report is not the same as a secure system. The two rows marked FAIL and N/A are the ones that matter: AHP reduces the chance that a handoff lies to the next session, and does nothing about an agent that decides to act on it.
