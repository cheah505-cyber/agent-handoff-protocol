# Multi-model review protocol

Use two models for **different perspectives**, not for two writers on the same files. The default is:

> **One writer, one independent reviewer.**  
> If both need to write, put them in separate git worktrees/branches and let the primary compare.

This protocol is part of AHP. It follows the same rule as external findings: every finding becomes a gate assertion, a test, or a written accepted risk.

## 1. Roles

| Role | Example | Permission | Output |
|---|---|---|---|
| Primary | DeepSeek / current agent | Write, lease, run tests, commit, merge | Code, tests, docs, commits |
| Reviewer | MiniMax / another model | Read-only on main; separate worktree if it must run code | Findings with file:line and evidence |
| Human | You | Final decision | Approve, reject, or ask for another pass |

The model names are examples. The role separation matters more than the brand.

## 2. Hard rules

1. **One writer per branch/worktree.** Never edit the same files from two sessions.
2. **Reviewer is read-only on the primary branch.** It may create a review note, not a merge.
3. **No shared `HANDOFF.md` edits.** Only the primary updates the handoff and holds the lease.
4. **Evidence is required.** Every finding needs `file:line`, a command/output, or a reproducible test. “I think” is not a finding.
5. **Primary adjudicates.** Each finding is either fixed, converted to a test/gate, or explicitly accepted with a reason.
6. **No secrets.** Do not paste `.env`, keys, customer data, or production logs into a review prompt.
7. **Tests and code beat model consensus.** Two models agreeing is not proof.

## 3. Workflow

1. **Primary opens the work unit** in `HANDOFF.md` (`owner`, `session_id`, `lease_until`) and states the scope.
2. **Primary implements** on a feature branch; runs `npm test`, `node bin/ahp.mjs check`, and `node bin/ahp.mjs sync --check`.
3. **Reviewer gets a clean context.** It reads only:
   - `AGENTS.md`, `INDEX.md`, `PROJECT.md`, `HANDOFF.md`
   - the diff / feature branch
   - relevant tests and SPEC sections
4. **Reviewer writes one review note** using `docs/reviews/TEMPLATE.md`, or returns the same structure in chat.
5. **Primary triages every finding**:
   - fix it, or
   - add a regression test/gate, or
   - write “accepted, not fixed” with a reason and a re-evaluation trigger.
6. **Primary reruns the gates**, updates `HANDOFF`/`PROJECT.md`, and commits.
7. **Reviewer may do a second pass** on the fixed commit; it still does not merge.

## 4. Isolation commands

Reviewer on a separate branch:

```bash
git worktree add /tmp/ahp-review -b review/ahp-YYYYMMDD main
cd /tmp/ahp-review
npm test
node bin/ahp.mjs check
git diff main...HEAD
```

Two independent implementations:

```bash
git worktree add /tmp/ahp-deepseek -b feat/ahp-deepseek main
git worktree add /tmp/ahp-minimax  -b feat/ahp-minimax  main
```

The primary compares the two diffs and merges at most one. Do not merge both blindly.

## 5. Reviewer prompt template

```text
You are an independent reviewer. Read-only. Do not edit the primary branch, do not commit, do not push.

Scope:
- repo: <path>
- branch/commit: <ref>
- diff: <command or patch>
- files allowed: AGENTS.md, INDEX.md, PROJECT.md, HANDOFF.md, relevant source/tests

Run:
- npm test
- node bin/ahp.mjs check
- node bin/ahp.mjs sync --check

Report:
1. Findings, each with severity, file:line, evidence, and a suggested test.
2. Contradictions between the four core files.
3. Security/edge cases the tests miss.
4. What you could not verify.
5. Verdict: block / fix-first / acceptable-with-risks.

Do not propose a rewrite. Do not treat model consensus as evidence.
```

## 6. Primary prompt template

```text
You are the primary implementer. You own the work unit and the HANDOFF lease.

1. Read AGENTS.md -> INDEX.md -> PROJECT.md -> HANDOFF.md.
2. State the scope in HANDOFF (owner/session/lease/next_action/acceptance).
3. Implement the smallest complete change.
4. Run npm test, node bin/ahp.mjs check, node bin/ahp.mjs sync --check.
5. Triage every reviewer finding: fix, test, or explicitly accept.
6. Update HANDOFF/PROJECT, commit, and report the exact commands/results.
```

## 7. Findings format

See `docs/reviews/TEMPLATE.md`. Minimum:

```md
### F1 — [high] src/lib/example.ts:42 — stale cache after retry
- Evidence: `npm test -- ...` / reproduction steps / output
- Suggested test: ...
- Disposition: fixed in <commit> / accepted (reason, re-evaluate when ...)
```

## 8. When this is worth it

Use multi-model review for:

- release candidates and security-sensitive changes;
- gate/test changes where false negatives are the risk;
- cold reads of the four core files;
- architecture/design alternatives;
- documentation claims that need fact-checking.

Do not use it for:

- every small commit (coordination cost > benefit);
- two writers on the same files;
- letting a reviewer edit `main`;
- replacing tests or human decisions with model opinions.

## 9. Security boundaries

- Reviewers get the minimum context; never production secrets.
- A review note is not an authorization to test a live target.
- If a finding involves a real vulnerability, follow responsible disclosure; do not publish an exploit.
- The primary remains accountable for the merge.
