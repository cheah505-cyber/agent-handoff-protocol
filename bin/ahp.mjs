#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { loadConfig } from "../lib/config.mjs";
import { initProject } from "../lib/init.mjs";
import { runGates } from "../lib/gates.mjs";
import { readHandoff, section } from "../lib/handoff.mjs";
import { syncProject } from "../lib/sync.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, "..");

function usage() {
  return `Agent Handoff Protocol (AHP)

Usage:
  ahp init [dir] [--force] [--git]
  ahp check [--root dir] [--json] [--strict]
  ahp resume [--root dir]
  ahp sync [--root dir] [--check]
  ahp test
`;
}

function printResults(report) {
  for (const entry of report.results) {
    console.log(`${entry.status.padEnd(4)} ${entry.id.padEnd(16)} ${entry.message}`);
  }
  const { PASS, FAIL, WARN, SKIP } = report.counts;
  console.log(`\n[ahp] ${FAIL} FAIL / ${WARN} WARN / ${PASS} PASS / ${SKIP} SKIP`);
  console.log(report.ok ? "[ahp] check passed" : "[ahp] check failed");
}

function firstBullet(text) {
  const line = text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .find((item) => item.startsWith("-") || item.startsWith("*"));
  return line ? line.replace(/^[-*]\s*/, "") : "";
}

function recovery(text) {
  const block = text.match(/```[a-zA-Z]*\r?\n([\s\S]*?)```/);
  return block ? block[1].trim() : "";
}

function resume(root) {
  const config = loadConfig(root);
  const handoff = readHandoff(root, config);
  if (!handoff.text) throw new Error(`no ${config.paths.handoff} in ${root}`);
  const meta = handoff.meta;
  console.log(`Status:    ${meta.status || "unknown"}`);
  console.log(`Work unit: ${meta.work_unit_id || "unknown"}`);
  console.log(`Phase:     ${meta.phase || "unknown"}`);
  console.log(`Next:      ${meta.next_action || "unknown"}`);
  console.log(`Accept:    ${meta.acceptance || "unknown"}`);
  const pause = firstBullet(section(handoff.body, 2));
  if (pause) console.log(`Pause:     ${pause}`);
  const commands = recovery(section(handoff.body, 7));
  if (commands) console.log(`Recovery:\n${commands}`);
}

function check(root, { json = false, strict = false } = {}) {
  const config = loadConfig(root);
  const report = runGates(root, config);
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printResults(report);
  }
  const failed = !report.ok || (strict && report.counts.WARN > 0);
  if (failed) process.exitCode = 1;
}

function sync(root, { checkOnly = false } = {}) {
  const config = loadConfig(root);
  const outcome = syncProject(root, config, { check: checkOnly });
  if (checkOnly) {
    if (!outcome.ok) {
      console.log("STATUS BLOCK STALE");
      console.log("--- current ---");
      console.log(outcome.current);
      console.log("--- desired ---");
      console.log(outcome.desired);
      process.exitCode = 1;
    } else {
      console.log("status block is in sync");
    }
    return;
  }
  console.log(outcome.ok ? "status block already in sync" : "status block updated");
}

function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      root: { type: "string" },
      json: { type: "boolean", default: false },
      strict: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      git: { type: "boolean", default: false },
      check: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  const command = positionals[0];
  if (!command || values.help) {
    console.log(usage());
    return;
  }

  if (command === "init") {
    const target = positionals[1] || process.cwd();
    const { root } = initProject(target, { force: values.force, git: values.git });
    console.log(`initialized ${root}`);
    console.log("next: edit AGENTS.md and PROJECT.md, then run `ahp check`");
    return;
  }

  const root = path.resolve(values.root || process.cwd());

  if (command === "check") {
    check(root, { json: values.json, strict: values.strict });
    return;
  }
  if (command === "resume") {
    resume(root);
    return;
  }
  if (command === "sync") {
    sync(root, { checkOnly: values.check });
    return;
  }
  if (command === "test") {
    const run = spawnSync(process.execPath, ["--test", "tests/"], {
      cwd: packageRoot,
      stdio: "inherit",
    });
    process.exitCode = run.status ?? 1;
    return;
  }

  console.error(`unknown command: ${command}\n`);
  console.error(usage());
  process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`ahp: ${error.message}`);
  process.exitCode = 1;
}
