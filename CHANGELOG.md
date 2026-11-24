# Changelog

## v0.1.0 — 2026-11-25

- Initial AHP lite implementation.
- 12 read-only gates: `CORE_FILES`, `HANDOFF_SCHEMA`, `HANDOFF_TIME`, `LEASE`, `VERIFY_COMMAND`, `HANDOFF_BODY`, `HANDOFF_FRESH`, `INDEX_MAP`, `PROJECT_SYNC`, `MEMORY_LINKS`, `SECRETS`, `GIT_STATE`.
- CLI: `init`, `check`, `resume`, `sync`, `test`.
- Derived `PROJECT.md` status block via `ahp sync`.
- Templates for a new project.
- 22 positive/negative tests with temp project and temp git isolation.
- Docs: design, limits, security, production lessons, case studies, open-source report.
