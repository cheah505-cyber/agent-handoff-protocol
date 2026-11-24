---
name: test-isolation
description: Why every AHP fixture uses a temp project, a temp git repo, and an explicit root; and why a check must never write.
metadata:
  node_type: memory
  type: lesson
---

- **A bad fixture can be worse than no test.** A 20-day fixture against a >21-day gate only produces a warning; a test that asserts "20 days" fails on a 21-day message. Assert the gate id/status, not the exact age string.
- **Git-based gates need a temp repo.** If the test runs against the real repo, a dirty `HANDOFF.md` can silently skip the timestamp check. Pass `--root` to a fresh temp git repo and commit the fixture.
- **A check must not write.** `--check` that copies files before comparing is not a check. Compare first; write only behind an explicit non-check flag.
- **Assert the exit code too.** A test that only greps output can pass while the process exits non-zero for another reason.

Related: [[design-decisions]]
