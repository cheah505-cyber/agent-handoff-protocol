import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { loadConfig } from "../lib/config.mjs";
import { runGates } from "../lib/gates.mjs";
import { localDate, localIso } from "../lib/handoff.mjs";
import { syncProject } from "../lib/sync.mjs";
import {
  cleanup,
  gitRun,
  handoffText,
  indexText,
  makeProject,
  memoryTexts,
  write,
} from "./helpers.mjs";

function report(root) {
  return runGates(root, loadConfig(root));
}

function gate(result, id) {
  const entry = result.results.find((item) => item.id === id);
  assert.ok(entry, `missing gate ${id}`);
  return entry;
}

test("valid project passes", () => {
  const root = makeProject();
  try {
    const result = report(root);
    assert.equal(result.ok, true, JSON.stringify(result.results, null, 2));
    assert.equal(result.counts.FAIL, 0);
  } finally {
    cleanup(root);
  }
});

test("CORE_FILES fails when a core file is missing", () => {
  const root = makeProject();
  try {
    fs.rmSync(path.join(root, "AGENTS.md"));
    const result = report(root);
    assert.equal(gate(result, "CORE_FILES").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("HANDOFF_SCHEMA rejects an unknown status", () => {
  const root = makeProject({ handoff: { status: "DONE" } });
  try {
    assert.equal(gate(report(root), "HANDOFF_SCHEMA").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("HANDOFF_TIME rejects verification newer than the handoff", () => {
  const now = new Date();
  const root = makeProject({
    handoff: {
      updatedAt: localIso(now),
      lastVerifiedAt: localIso(new Date(now.getTime() + 60 * 60 * 1000)),
    },
  });
  try {
    assert.equal(gate(report(root), "HANDOFF_TIME").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("LEASE rejects an expired ACTIVE lease", () => {
  const root = makeProject({
    handoff: {
      status: "ACTIVE",
      owner: "agent",
      session: "session",
      lease: "2020-01-01T00:00:00+08:00",
    },
  });
  try {
    assert.equal(gate(report(root), "LEASE").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("LEASE rejects PAUSED with residual ownership", () => {
  const root = makeProject({
    handoff: { owner: "agent", session: "session" },
  });
  try {
    assert.equal(gate(report(root), "LEASE").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("VERIFY_COMMAND rejects a lifecycle command", () => {
  const root = makeProject({
    handoff: { lastVerifiedCommand: "ahp pause" },
  });
  try {
    assert.equal(gate(report(root), "VERIFY_COMMAND").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("HANDOFF_BODY rejects a missing section", () => {
  const root = makeProject();
  try {
    const file = path.join(root, "HANDOFF.md");
    const text = fs.readFileSync(file, "utf8").replace("## 4. Next action & acceptance", "## Next");
    fs.writeFileSync(file, text, "utf8");
    assert.equal(gate(report(root), "HANDOFF_BODY").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("HANDOFF_FRESH rejects stale sections 4-6", () => {
  const old = localDate(new Date(Date.now() - 40 * 86_400_000));
  const root = makeProject({ handoff: { section6Date: old } });
  try {
    assert.equal(gate(report(root), "HANDOFF_FRESH").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("INDEX_MAP rejects dynamic state", () => {
  const root = makeProject({
    index: `${indexText()}\n| 当前阶段 | ACTIVE |\n`,
  });
  try {
    assert.equal(gate(report(root), "INDEX_MAP").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("PROJECT_SYNC rejects a stale derived block", () => {
  const root = makeProject({
    handoff: { phase: "new-phase", nextAction: "Do the next thing." },
    project: { phase: "old-phase", nextAction: "Do the next thing." },
  });
  try {
    assert.equal(gate(report(root), "PROJECT_SYNC").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("MEMORY_LINKS rejects a hook to a missing file", () => {
  const root = makeProject({
    memory: { "memory/MEMORY.md": "# MEMORY\n\n- [Missing](missing.md)\n" },
  });
  try {
    assert.equal(gate(report(root), "MEMORY_LINKS").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("MEMORY_LINKS rejects a dangling wiki link", () => {
  const memory = memoryTexts();
  memory["memory/note.md"] += "\nSee [[missing-note]].\n";
  const root = makeProject({ memory });
  try {
    assert.equal(gate(report(root), "MEMORY_LINKS").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("SECRETS rejects a high-confidence token", () => {
  const memory = memoryTexts();
  memory["memory/note.md"] += "\nghp_abcdefghijklmnopqrstuvwxyz123456\n";
  const root = makeProject({ memory });
  try {
    assert.equal(gate(report(root), "SECRETS").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("GIT_STATE rejects PAUSED with a dirty tree", () => {
  const root = makeProject({ git: true });
  try {
    fs.writeFileSync(path.join(root, "untracked.txt"), "dirty", "utf8");
    assert.equal(gate(report(root), "GIT_STATE").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("GIT_STATE rejects a commit-day mismatch", () => {
  const yesterday = new Date(Date.now() - 86_400_000);
  const root = makeProject({
    git: true,
    handoff: {
      updatedAt: localIso(yesterday),
      lastVerifiedAt: localIso(yesterday),
      section6Date: localDate(yesterday),
    },
  });
  try {
    assert.equal(gate(report(root), "GIT_STATE").status, "FAIL");
  } finally {
    cleanup(root);
  }
});

test("sync check detects and repairs a stale block", () => {
  const root = makeProject();
  try {
    const config = loadConfig(root);
    const file = path.join(root, "HANDOFF.md");
    const text = fs.readFileSync(file, "utf8")
      .replace('phase: "bootstrap"', 'phase: "new-phase"')
      .replace('next_action: "Do the next thing."', 'next_action: "New next action."')
      .replace("1. Do the next thing.", "1. New next action.");
    fs.writeFileSync(file, text, "utf8");

    assert.equal(syncProject(root, config, { check: true }).ok, false);
    syncProject(root, config);
    assert.equal(syncProject(root, config, { check: true }).ok, true);
    assert.equal(report(root).ok, true);
  } finally {
    cleanup(root);
  }
});
