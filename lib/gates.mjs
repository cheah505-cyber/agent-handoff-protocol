import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  datesIn,
  dayOf,
  isoDate,
  parseFrontmatter,
  readHandoff,
  readIfExists,
  section,
} from "./handoff.mjs";
import { extractStatusBlock, statusContent } from "./sync.mjs";

const PASS = "PASS";
const FAIL = "FAIL";
const WARN = "WARN";
const SKIP = "SKIP";

function result(id, status, message) {
  return { id, status, message };
}

function git(root, args) {
  const run = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  return {
    ok: run.status === 0,
    out: (run.stdout || "").trim(),
    err: (run.stderr || run.error?.message || "").trim(),
  };
}

function buildContext(root, config) {
  const file = (key) => path.join(root, config.paths[key]);
  const handoff = readHandoff(root, config);
  const memoryDir = path.join(root, config.paths.memoryDir);
  const memoryIndex = path.join(memoryDir, "MEMORY.md");
  const memoryFiles = fs.existsSync(memoryDir)
    ? fs
        .readdirSync(memoryDir)
        .filter((name) => name.endsWith(".md") && name !== "MEMORY.md")
        .sort()
    : [];

  const insideGit = git(root, ["rev-parse", "--is-inside-work-tree"]).out === "true";
  const dirty = insideGit
    ? git(root, ["status", "--porcelain"]).out.split(/\r?\n/).filter(Boolean)
    : [];
  const handoffDirty = insideGit
    ? git(root, ["status", "--porcelain", "--", config.paths.handoff]).out
    : "";

  return {
    root,
    config,
    files: {
      agents: file("agents"),
      index: file("index"),
      project: file("project"),
      handoff: file("handoff"),
      memoryDir,
      memoryIndex,
    },
    texts: {
      agents: readIfExists(file("agents")),
      index: readIfExists(file("index")),
      project: readIfExists(file("project")),
      memoryIndex: readIfExists(memoryIndex),
    },
    handoff,
    memoryFiles,
    git: {
      inside: insideGit,
      dirty,
      handoffDirty,
    },
  };
}

function coreFiles(ctx) {
  const missing = [];
  for (const key of ["agents", "index", "project", "handoff"]) {
    if (!fs.existsSync(ctx.files[key])) missing.push(ctx.config.paths[key]);
  }
  if (missing.length) return result("CORE_FILES", FAIL, `missing: ${missing.join(", ")}`);

  if (ctx.config.requireMemoryIndex && !fs.existsSync(ctx.files.memoryIndex)) {
    return result("CORE_FILES", FAIL, `missing: ${ctx.config.paths.memoryDir}/MEMORY.md`);
  }
  return result("CORE_FILES", PASS, "core files present");
}

function handoffSchema(ctx) {
  if (!ctx.handoff.text) return result("HANDOFF_SCHEMA", FAIL, "HANDOFF.md is missing");
  if (!ctx.handoff.meta || Object.keys(ctx.handoff.meta).length === 0) {
    return result("HANDOFF_SCHEMA", FAIL, "frontmatter is missing");
  }

  const meta = ctx.handoff.meta;
  const missing = ctx.config.requiredFields.filter((field) => !meta[field]);
  if (missing.length) {
    return result("HANDOFF_SCHEMA", FAIL, `missing fields: ${missing.join(", ")}`);
  }

  if (!ctx.config.statuses.includes(meta.status)) {
    return result(
      "HANDOFF_SCHEMA",
      FAIL,
      `status must be one of ${ctx.config.statuses.join("|")}, got ${meta.status}`,
    );
  }
  if (!isoDate(meta.updated_at)) {
    return result("HANDOFF_SCHEMA", FAIL, `invalid updated_at: ${meta.updated_at}`);
  }
  if (!isoDate(meta.last_verified_at)) {
    return result(
      "HANDOFF_SCHEMA",
      FAIL,
      `invalid last_verified_at: ${meta.last_verified_at}`,
    );
  }
  return result("HANDOFF_SCHEMA", PASS, "frontmatter is valid");
}

function handoffTime(ctx) {
  const meta = ctx.handoff.meta;
  const updated = isoDate(meta.updated_at);
  const verified = isoDate(meta.last_verified_at);
  if (updated === null || verified === null) {
    return result("HANDOFF_TIME", SKIP, "schema gate did not produce valid timestamps");
  }
  const now = Date.now();
  if (verified > updated + 60_000) {
    return result(
      "HANDOFF_TIME",
      FAIL,
      "last_verified_at is later than updated_at (the verification cannot be newer than the handoff)",
    );
  }
  if (updated > now + 5 * 60_000) {
    return result("HANDOFF_TIME", FAIL, "updated_at is in the future");
  }
  if (verified > now + 5 * 60_000) {
    return result("HANDOFF_TIME", FAIL, "last_verified_at is in the future");
  }
  return result("HANDOFF_TIME", PASS, "timestamps are ordered");
}

function lease(ctx) {
  const meta = ctx.handoff.meta;
  const status = meta.status;
  const value = (key) => {
    const current = meta[key];
    return current === undefined || current === "" ? "none" : current;
  };

  if (status === "ACTIVE") {
    const until = isoDate(meta.lease_until);
    if (value("lease_until") === "none") {
      return result("LEASE", FAIL, "ACTIVE requires a lease_until timestamp");
    }
    if (until === null) {
      return result("LEASE", FAIL, `invalid lease_until: ${meta.lease_until}`);
    }
    if (until <= Date.now()) {
      return result("LEASE", FAIL, `ACTIVE lease expired at ${meta.lease_until}`);
    }
    return result("LEASE", PASS, `lease valid until ${meta.lease_until}`);
  }

  if (status === "PAUSED" || status === "COMPLETE") {
    const residual = ["owner", "session_id", "lease_until"].filter(
      (key) => value(key) !== "none",
    );
    if (residual.length) {
      return result(
        "LEASE",
        FAIL,
        `${status} still has ${residual.map((key) => `${key}=${meta[key]}`).join(", ")}`,
      );
    }
    if (status === "COMPLETE" && value("current_file") !== "none") {
      return result("LEASE", FAIL, "COMPLETE must not keep current_file");
    }
    return result("LEASE", PASS, `${status} has no residual lease`);
  }

  if (status === "BLOCKED" && value("blocked_by") === "none") {
    return result("LEASE", FAIL, "BLOCKED requires blocked_by evidence");
  }

  if (status === "MONITORING" && value("running_processes") === "none") {
    return result("LEASE", WARN, "MONITORING does not name a running process");
  }

  return result("LEASE", PASS, `${status} state is coherent`);
}

function verifyCommand(ctx) {
  const command = String(ctx.handoff.meta.last_verified_command || "").trim();
  if (!command) return result("VERIFY_COMMAND", FAIL, "last_verified_command is empty");

  const lifecycle = /(?:^|\s)(?:npx\s+)?ahp\s+(?:init|start|pause|complete|block|monitor)\b|python\s+\S*handoff\.py\s+(?:start|pause|complete|block|monitor)\b/i;
  if (lifecycle.test(command)) {
    return result(
      "VERIFY_COMMAND",
      FAIL,
      "last_verified_command is a lifecycle command, not a verification command",
    );
  }
  if (/\b(check|test|verify|audit|gate|resume|sync\s+--check)\b/i.test(command)) {
    return result("VERIFY_COMMAND", PASS, "verification command recorded");
  }
  return result(
    "VERIFY_COMMAND",
    WARN,
    "last_verified_command does not look like a check/test command",
  );
}

function handoffBody(ctx) {
  const meta = ctx.handoff.meta;
  const missing = [];
  for (let number = 0; number <= 7; number += 1) {
    if (!section(ctx.handoff.body, number)) missing.push(`## ${number}.`);
  }
  if (missing.length) {
    return result("HANDOFF_BODY", FAIL, `missing sections: ${missing.join(", ")}`);
  }

  const next = section(ctx.handoff.body, 4);
  if (!/^\s*\d+\.\s+/m.test(next)) {
    return result("HANDOFF_BODY", FAIL, "section 4 has no numbered next action");
  }
  if (!String(meta.next_action || "").trim()) {
    return result("HANDOFF_BODY", FAIL, "next_action is empty");
  }

  const current = section(ctx.handoff.body, 3);
  const saysNone = /(?:current file|当前编辑文件)\s*[:：]\s*(?:none|无)/i.test(current);
  if (saysNone && String(meta.current_file || "none") !== "none") {
    return result(
      "HANDOFF_BODY",
      FAIL,
      `current_file=${meta.current_file} contradicts section 3 ("none")`,
    );
  }
  return result("HANDOFF_BODY", PASS, "8 sections and next action are present");
}

function handoffFresh(ctx) {
  const body =
    section(ctx.handoff.body, 4) +
    section(ctx.handoff.body, 5) +
    section(ctx.handoff.body, 6);
  const now = Date.now();
  const past = datesIn(body).filter((time) => time <= now + 86_400_000);
  if (!past.length) {
    return result("HANDOFF_FRESH", FAIL, "sections 4-6 contain no date");
  }
  const age = Math.floor((now - Math.max(...past)) / 86_400_000);
  if (age > ctx.config.freshness.handoffDays) {
    return result(
      "HANDOFF_FRESH",
      FAIL,
      `sections 4-6 are ${age} days old (limit ${ctx.config.freshness.handoffDays})`,
    );
  }
  if (age > 7) {
    return result("HANDOFF_FRESH", WARN, `sections 4-6 are ${age} days old`);
  }
  return result("HANDOFF_FRESH", PASS, `sections 4-6 are fresh (${age} days)`);
}

function indexMap(ctx) {
  const text = ctx.texts.index;
  const lines = text.split(/\r?\n/);
  const dynamic = lines.filter(
    (line) =>
      /^\|\s*(当前阶段|暂停点|下一动作|当前状态|next action|pause point|current phase)\s*\|/i.test(
        line,
      ) ||
      /^#{1,6}\s*(当前状态|暂停点|下一动作|current status|next action|pause point)/i.test(
        line,
      ) ||
      /(?:最近活跃|current phase|last active)\s*[:=]/i.test(line),
  );
  if (dynamic.length) {
    return result(
      "INDEX_MAP",
      FAIL,
      `dynamic state in INDEX.md: ${dynamic[0].trim().slice(0, 80)}`,
    );
  }

  const missing = [];
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const clean = decodeURIComponent(target.split("#")[0].split("?")[0]);
    if (!clean) continue;
    if (!fs.existsSync(path.resolve(ctx.root, clean))) missing.push(target);
  }
  if (missing.length) {
    return result("INDEX_MAP", FAIL, `dead INDEX link(s): ${missing.join(", ")}`);
  }
  return result("INDEX_MAP", PASS, "INDEX is a map and its links resolve");
}

function projectSync(ctx) {
  if (!ctx.config.requireProjectStatusBlock) {
    return result("PROJECT_SYNC", SKIP, "status block is disabled");
  }
  if (!ctx.texts.project) {
    return result("PROJECT_SYNC", FAIL, "PROJECT.md is missing");
  }

  const current = extractStatusBlock(ctx.texts.project);
  if (current === null) {
    return result(
      "PROJECT_SYNC",
      FAIL,
      "PROJECT.md has no AHP status markers (run ahp init or add them)",
    );
  }
  const desired = statusContent(ctx.handoff.meta).trim();
  if (current !== desired) {
    return result("PROJECT_SYNC", FAIL, "PROJECT.md status is stale; run ahp sync");
  }
  if (Buffer.byteLength(current, "utf8") > 2048) {
    return result("PROJECT_SYNC", FAIL, "PROJECT.md status block is larger than 2KB");
  }

  const retro = [...ctx.texts.project.matchAll(/^###\s+(20\d{2}-\d{2}-\d{2})[^\n]*/gm)];
  if (!retro.length) {
    return result("PROJECT_SYNC", WARN, "no dated retrospective entry");
  }
  const latest = retro
    .map((match) => dayOf(match[1]))
    .filter((time) => time !== null)
    .sort((a, b) => b - a)[0];
  if (latest === undefined) {
    return result("PROJECT_SYNC", WARN, "retrospective dates are invalid");
  }
  const age = Math.floor((Date.now() - latest) / 86_400_000);
  if (age > ctx.config.freshness.projectDays) {
    return result(
      "PROJECT_SYNC",
      FAIL,
      `latest retrospective is ${age} days old (limit ${ctx.config.freshness.projectDays})`,
    );
  }
  if (age > Math.floor(ctx.config.freshness.projectDays / 2)) {
    return result("PROJECT_SYNC", WARN, `latest retrospective is ${age} days old`);
  }
  return result("PROJECT_SYNC", PASS, "derived status matches HANDOFF");
}

function memoryLinks(ctx) {
  if (!fs.existsSync(ctx.files.memoryDir)) {
    return ctx.config.requireMemoryIndex
      ? result("MEMORY_LINKS", FAIL, "memory directory is missing")
      : result("MEMORY_LINKS", SKIP, "no memory directory");
  }
  if (!ctx.texts.memoryIndex) {
    return ctx.config.requireMemoryIndex
      ? result("MEMORY_LINKS", FAIL, "memory/MEMORY.md is missing")
      : result("MEMORY_LINKS", SKIP, "no memory index");
  }

  const hooks = [...ctx.texts.memoryIndex.matchAll(/^- \[[^\]]*\]\(([^)]+\.md)\)/gm)].map(
    (match) => match[1],
  );
  const duplicates = hooks.filter((hook, index) => hooks.indexOf(hook) !== index);
  if (duplicates.length) {
    return result("MEMORY_LINKS", FAIL, `duplicate MEMORY hook(s): ${duplicates.join(", ")}`);
  }

  const missing = hooks.filter((hook) => !ctx.memoryFiles.includes(hook));
  if (missing.length) {
    return result("MEMORY_LINKS", FAIL, `MEMORY hook points to missing file(s): ${missing.join(", ")}`);
  }

  const orphans = ctx.memoryFiles.filter((file) => !hooks.includes(file));
  if (orphans.length) {
    return result("MEMORY_LINKS", WARN, `memory file(s) without hook: ${orphans.join(", ")}`);
  }

  const valid = new Set([...ctx.memoryFiles, "MEMORY.md"]);
  const dangling = [];
  for (const file of ctx.memoryFiles) {
    const text = readIfExists(path.join(ctx.files.memoryDir, file));
    for (const match of text.matchAll(/\[\[([^\]]+)\]\]/g)) {
      const target = match[1].split("|")[0].trim();
      if (!valid.has(`${target}.md`)) dangling.push(`${file} -> [[${target}]]`);
    }
  }
  if (dangling.length) {
    return result("MEMORY_LINKS", FAIL, `dangling wiki link(s): ${dangling.join(", ")}`);
  }
  return result("MEMORY_LINKS", PASS, "memory index and links are closed");
}

function secrets(ctx) {
  const patterns = [
    /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
    /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
    /\bAKIA[0-9A-Z]{16}\b/,
    /\bsk-[A-Za-z0-9]{20,}\b/,
    /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
    /\bAIza[0-9A-Za-z_-]{35}\b/,
  ];
  const files = [
    ctx.files.agents,
    ctx.files.index,
    ctx.files.project,
    ctx.files.handoff,
    ...ctx.memoryFiles.map((file) => path.join(ctx.files.memoryDir, file)),
  ].filter((file) => fs.existsSync(file));

  const hits = [];
  for (const file of files) {
    const lines = readIfExists(file).split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      if (patterns.some((pattern) => pattern.test(lines[index]))) {
        hits.push(`${path.relative(ctx.root, file)}:${index + 1}`);
      }
    }
  }
  if (hits.length) {
    return result("SECRETS", FAIL, `possible secret(s) at ${hits.join(", ")} (redacted)`);
  }
  return result("SECRETS", PASS, "no high-confidence secret pattern found");
}

function gitState(ctx) {
  if (!ctx.git.inside) return result("GIT_STATE", SKIP, "not a git repository");

  const status = ctx.handoff.meta.status;
  if ((status === "PAUSED" || status === "COMPLETE") && ctx.git.dirty.length) {
    return result(
      "GIT_STATE",
      FAIL,
      `${status} requires a clean tree; ${ctx.git.dirty.length} uncommitted path(s)`,
    );
  }

  if (ctx.git.handoffDirty) {
    return result("GIT_STATE", WARN, "commit-date check skipped: HANDOFF.md is dirty");
  }

  const commit = git(ctx.root, [
    "log",
    "-1",
    "--format=%cI",
    "--",
    ctx.config.paths.handoff,
  ]);
  if (!commit.ok || !commit.out) {
    return result("GIT_STATE", WARN, "no commit history for HANDOFF.md");
  }
  const commitDay = commit.out.slice(0, 10);
  const updatedDay = String(ctx.handoff.meta.updated_at || "").slice(0, 10);
  if (commitDay !== updatedDay) {
    return result(
      "GIT_STATE",
      FAIL,
      `HANDOFF updated_at=${updatedDay} does not match its commit day=${commitDay}`,
    );
  }

  if (ctx.git.dirty.length) {
    return result("GIT_STATE", WARN, `${ctx.git.dirty.length} uncommitted path(s) allowed for ${status}`);
  }
  return result("GIT_STATE", PASS, "tree clean; timestamp matches the commit");
}

const GATES = [
  ["CORE_FILES", coreFiles],
  ["HANDOFF_SCHEMA", handoffSchema],
  ["HANDOFF_TIME", handoffTime],
  ["LEASE", lease],
  ["VERIFY_COMMAND", verifyCommand],
  ["HANDOFF_BODY", handoffBody],
  ["HANDOFF_FRESH", handoffFresh],
  ["INDEX_MAP", indexMap],
  ["PROJECT_SYNC", projectSync],
  ["MEMORY_LINKS", memoryLinks],
  ["SECRETS", secrets],
  ["GIT_STATE", gitState],
];

export function runGates(root, config) {
  const ctx = buildContext(root, config);
  const results = [];
  for (const [id, gate] of GATES) {
    try {
      results.push(gate(ctx));
    } catch (error) {
      results.push(result(id, FAIL, `gate crashed: ${error.message}`));
    }
  }
  const counts = { PASS: 0, FAIL: 0, WARN: 0, SKIP: 0 };
  for (const entry of results) counts[entry.status] += 1;
  return { results, counts, ok: counts.FAIL === 0 };
}
