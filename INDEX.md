# INDEX — Agent Handoff Protocol

This file is a map, not a status board. Dynamic state belongs in `HANDOFF.md`.

| File | Role |
|---|---|
| [AGENTS.md](AGENTS.md) | Agent entry, boundaries, contract |
| [INDEX.md](INDEX.md) | File map (this file) |
| [PROJECT.md](PROJECT.md) | Durable decisions, distilled state, retrospective |
| [HANDOFF.md](HANDOFF.md) | Current work unit; only current-state source |
| [README.md](README.md) | English quickstart (primary) |
| [README.zh-CN.md](README.zh-CN.md) | Chinese quickstart |
| [SPEC.md](SPEC.md) | Protocol specification and gate list |
| [bin/ahp.mjs](bin/ahp.mjs) | CLI entry |
| [lib/gates.mjs](lib/gates.mjs) | 12 gate implementations |
| [lib/sync.mjs](lib/sync.mjs) | Derived status block |
| [templates/AGENTS.md](templates/AGENTS.md) | Project starter: agent entry |
| [templates/HANDOFF.md](templates/HANDOFF.md) | Project starter: handoff |
| [tests/gates.test.mjs](tests/gates.test.mjs) | Gate and negative-injection tests |
| [tests/cli.test.mjs](tests/cli.test.mjs) | CLI tests |
| [docs/design.md](docs/design.md) | Design rationale |
| [docs/limits.md](docs/limits.md) | Known limits and false confidence |
| [docs/security.md](docs/security.md) | Memory security threat model |
| [docs/lessons-from-production.md](docs/lessons-from-production.md) | Distilled production lessons |
| [docs/case-studies.md](docs/case-studies.md) | Failure cases that shaped the gates |
| [docs/open-source-report.md](docs/open-source-report.md) | Open-source pairing report |
| [docs/war-story.md](docs/war-story.md) | Post-mortem (Chinese): the green dashboard that lied |
| [docs/war-story.en.md](docs/war-story.en.md) | Post-mortem (English) |
| [docs/memory-security-checklist.md](docs/memory-security-checklist.md) | Authorized memory-security assessment checklist (Chinese) |
| [docs/memory-security-checklist.en.md](docs/memory-security-checklist.en.md) | Authorized memory-security assessment checklist (English) |
| [docs/publish-plan.md](docs/publish-plan.md) | Per-platform metadata for publishing the war story |
| [docs/multi-model-review.md](docs/multi-model-review.md) | One-writer/one-reviewer protocol |
| [docs/reviews/README.md](docs/reviews/README.md) | Review note policy |
| [docs/reviews/TEMPLATE.md](docs/reviews/TEMPLATE.md) | Review note template |
| [tasks/AHP-CONTENT-001.md](tasks/AHP-CONTENT-001.md) | Task card: war story + security checklist |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution and gate rules |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [LICENSE](LICENSE) | MIT license |
| [memory/MEMORY.md](memory/MEMORY.md) | Lesson index |

## Status pointer

- Current state: see [HANDOFF.md](HANDOFF.md) §2 and §4. This is the only current-state source.
- [PROJECT.md](PROJECT.md) carries a derived status block; verify it with `ahp sync --check` (or `node bin/ahp.mjs sync --check`). Do not edit the block by hand.
