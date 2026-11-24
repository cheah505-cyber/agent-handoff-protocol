import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { localDate, localIso } from "../lib/handoff.mjs";

export function tempProject(name = "ahp-test-") {
  return fs.mkdtempSync(path.join(os.tmpdir(), name));
}

export function write(root, relative, text) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

export function handoffText({
  status = "PAUSED",
  updatedAt = localIso(),
  lastVerifiedAt = updatedAt,
  lastVerifiedCommand = "ahp check",
  phase = "bootstrap",
  nextAction = "Do the next thing.",
  acceptance = "check passes",
  currentFile = "none",
  owner = "none",
  session = "none",
  lease = "none",
  blockedBy = "none",
  section6Date = localDate(),
} = {}) {
  return `---
handoff_version: "1"
status: "${status}"
updated_at: "${updatedAt}"
work_unit_id: "TEST-001"
phase: "${phase}"
owner: "${owner}"
session_id: "${session}"
active_branch: "main"
started_at: "none"
lease_until: "${lease}"
touched_paths: "none"
current_file: "${currentFile}"
next_action_file: "PROJECT.md"
next_action_anchor: "## Next"
next_action: "${nextAction}"
acceptance: "${acceptance}"
blocked_by: "${blockedBy}"
running_processes: "none"
external_responsibilities: "none"
last_verified_at: "${lastVerifiedAt}"
last_verified_command: "${lastVerifiedCommand}"
---

# HANDOFF

## 0. Takeover status

- Status: ${status}
- Work unit: TEST-001

## 1. Last completed

- ${localDate()} · test fixture.

## 2. Exact pause point

- Test pause point.

## 3. Current working set

- Current file: ${currentFile === "none" ? "none" : currentFile}.
- Running processes: none.
- Blocked by: none.

## 4. Next action & acceptance

1. ${nextAction}

**Acceptance:** ${acceptance}

## 5. Open risks

- Test risk.

## 6. Last verification

- ${section6Date} · Command: \`${lastVerifiedCommand}\` (fixture).

## 7. Recovery commands

\`\`\`bash
ahp check
ahp resume
\`\`\`
`;
}

export function projectText({
  phase = "bootstrap",
  nextAction = "Do the next thing.",
  retroDate = localDate(),
} = {}) {
  return `# PROJECT

<!-- AHP:STATUS:START -->
- Phase: ${phase}
- Next: ${nextAction}
<!-- AHP:STATUS:END -->

## Decisions

- Test decision.

## Retrospective

### ${retroDate} · Test \`#test\`

- Did: test.
- Learned: test.
- Next: test.
`;
}

export function indexText() {
  return `# INDEX

| File | Role |
|---|---|
| [AGENTS.md](AGENTS.md) | entry |
| [INDEX.md](INDEX.md) | map |
| [PROJECT.md](PROJECT.md) | decisions |
| [HANDOFF.md](HANDOFF.md) | current |
| [memory/MEMORY.md](memory/MEMORY.md) | memory |

## Status pointer

See [HANDOFF.md](HANDOFF.md).
`;
}

export function memoryTexts() {
  return {
    "memory/MEMORY.md": "# MEMORY\n\n- [Test note](note.md) — test.\n",
    "memory/note.md": "---\nname: note\ndescription: test\n---\n\nSee [[MEMORY]].\n",
  };
}

export function makeProject(options = {}) {
  const root = tempProject();
  const {
    git = false,
    handoff = {},
    project = {},
    index = indexText(),
    memory = memoryTexts(),
    agents = "# AGENTS\n\nRun `ahp check`.\n",
  } = options;

  write(root, "AGENTS.md", agents);
  write(root, "INDEX.md", index);
  write(root, "PROJECT.md", projectText(project));
  write(root, "HANDOFF.md", handoffText(handoff));
  for (const [file, text] of Object.entries(memory)) write(root, file, text);
  write(root, "ahp.config.json", JSON.stringify({
    version: 1,
    requireProjectStatusBlock: true,
  }, null, 2));

  if (git) {
    gitRun(root, ["init", "-q"]);
    gitRun(root, ["config", "user.name", "AHP Test"]);
    gitRun(root, ["config", "user.email", "ahp@example.invalid"]);
    gitRun(root, ["add", "-A"]);
    gitRun(root, ["commit", "-qm", "fixture"]);
  }
  return root;
}

export function gitRun(root, args) {
  const run = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (run.status !== 0) throw new Error(run.stderr || `git ${args.join(" ")} failed`);
  return run.stdout.trim();
}

export function cleanup(root) {
  fs.rmSync(root, { recursive: true, force: true });
}
