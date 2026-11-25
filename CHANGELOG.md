# Changelog

## Unreleased

- `GIT_STATE` no longer skips the commit-day check while `HANDOFF.md` is dirty. The next commit is dated today, so a stale `updated_at` is now predicted locally and fails before the commit instead of surfacing in CI afterwards. New fixtures: a dirty handoff with a stale stamp (FAIL) and with today's stamp (WARN). 29 tests.
- `SECRETS` now scans `docs/**/*.md` (case-insensitive, dotfiles included) as well as the core files and `memory/`, so documents under `docs/` are inside the backstop. `publish/` and `tasks/` are **not** scanned (see `docs/limits.md` §1). New negative tests: a token under `docs/`, in a dotfile, in an uppercase `.MD`, and a modern `sk-` key; plus a guard for `docs` being a regular file. `SPEC.md`, `docs/limits.md`, and both READMEs updated. 27 tests.

## v0.1.0 — 2026-11-25

- Initial AHP lite implementation.
- 12 read-only gates: `CORE_FILES`, `HANDOFF_SCHEMA`, `HANDOFF_TIME`, `LEASE`, `VERIFY_COMMAND`, `HANDOFF_BODY`, `HANDOFF_FRESH`, `INDEX_MAP`, `PROJECT_SYNC`, `MEMORY_LINKS`, `SECRETS`, `GIT_STATE`.
- CLI: `init`, `check`, `resume`, `sync`, `test`.
- Derived `PROJECT.md` status block via `ahp sync`.
- Templates for a new project.
- 22 positive/negative tests with temp project and temp git isolation.
- Docs: design, limits, security, production lessons, case studies, open-source report.
