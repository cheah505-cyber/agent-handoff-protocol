---
name: design-decisions
description: Why AHP is a lite handoff protocol with derived fields, twelve gates, and no runtime dependencies.
metadata:
  node_type: memory
  type: project
---

- **Handoff, not retrieval.** AHP does not try to remember more. It tries to make the current state, the next action, and the last verification trustworthy.
- **Four core files.** `AGENTS.md` is the boundary, `INDEX.md` is the map, `PROJECT.md` is durable context, `HANDOFF.md` is the current state.
- **Twelve gates.** Each gate exists because a real failure was observed: stale timestamps, expired leases, lifecycle commands posing as verification, dynamic state in the index, dead memory links, secrets, dirty trees.
- **Derived status.** `PROJECT.md` carries a generated block. If it is hand-edited, `ahp sync --check` fails.
- **Cold read is separate.** Gates check structure; a fresh agent checks meaning. See [limits](../docs/limits.md).

Related: [[test-isolation]]
