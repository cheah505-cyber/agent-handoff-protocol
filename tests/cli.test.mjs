import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { cleanup, tempProject } from "./helpers.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const bin = path.resolve(here, "..", "bin", "ahp.mjs");

function run(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    encoding: "utf8",
  });
}

test("init creates a project that passes check", () => {
  const root = tempProject("ahp-cli-");
  try {
    const init = run(["init", root]);
    assert.equal(init.status, 0, init.stderr);
    for (const file of ["AGENTS.md", "INDEX.md", "PROJECT.md", "HANDOFF.md", "memory/MEMORY.md"]) {
      assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);
    }

    const check = run(["check", "--root", root]);
    assert.equal(check.status, 0, check.stdout + check.stderr);
    assert.match(check.stdout, /check passed/);
  } finally {
    cleanup(root);
  }
});

test("resume prints the current handoff", () => {
  const root = tempProject("ahp-cli-");
  try {
    assert.equal(run(["init", root]).status, 0);
    const resume = run(["resume", "--root", root]);
    assert.equal(resume.status, 0, resume.stderr);
    assert.match(resume.stdout, /Status:\s+PAUSED/);
    assert.match(resume.stdout, /Next:\s+Customize/);
  } finally {
    cleanup(root);
  }
});

test("sync check fails on a stale block and sync repairs it", () => {
  const root = tempProject("ahp-cli-");
  try {
    assert.equal(run(["init", root]).status, 0);
    const file = path.join(root, "HANDOFF.md");
    const text = fs.readFileSync(file, "utf8")
      .replace('phase: "bootstrap"', 'phase: "new-phase"')
      .replace(
        'next_action: "Customize AGENTS.md and PROJECT.md, then run `ahp check`."',
        'next_action: "Ship the next version."',
      );
    fs.writeFileSync(file, text, "utf8");

    const stale = run(["sync", "--check", "--root", root]);
    assert.equal(stale.status, 1, stale.stdout);
    assert.match(stale.stdout, /STALE/);

    assert.equal(run(["sync", "--root", root]).status, 0);
    assert.equal(run(["sync", "--check", "--root", root]).status, 0);
    assert.equal(run(["check", "--root", root]).status, 0);
  } finally {
    cleanup(root);
  }
});

test("init refuses a non-empty directory unless forced", () => {
  const root = tempProject("ahp-cli-");
  try {
    assert.equal(run(["init", root, "--force"]).status, 0);
    fs.writeFileSync(path.join(root, "extra.txt"), "keep", "utf8");

    const refused = run(["init", root]);
    assert.equal(refused.status, 1);
    assert.match(refused.stderr, /not empty/);

    const forced = run(["init", root, "--force"]);
    assert.equal(forced.status, 0);
    assert.equal(fs.readFileSync(path.join(root, "extra.txt"), "utf8"), "keep");
  } finally {
    cleanup(root);
  }
});

test("check --json returns a machine-readable report", () => {
  const root = tempProject("ahp-cli-");
  try {
    assert.equal(run(["init", root]).status, 0);
    const output = run(["check", "--root", root, "--json"]);
    assert.equal(output.status, 0, output.stderr);
    const report = JSON.parse(output.stdout);
    assert.equal(report.ok, true);
    assert.ok(Array.isArray(report.results));
    assert.ok(report.results.some((entry) => entry.id === "CORE_FILES"));
  } finally {
    cleanup(root);
  }
});
