import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { localDate, localIso } from "./handoff.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = path.resolve(here, "..", "templates");

function replace(text, values) {
  return text
    .replaceAll("{{PROJECT_NAME}}", values.projectName)
    .replaceAll("{{DATE}}", values.date)
    .replaceAll("{{NOW}}", values.now);
}

function copyTree(source, target, values, force) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyTree(from, to, values, force);
      continue;
    }
    if (fs.existsSync(to) && !force) {
      throw new Error(`refusing to overwrite ${to}; pass --force`);
    }
    fs.writeFileSync(to, replace(fs.readFileSync(from, "utf8"), values), "utf8");
  }
}

export function initProject(target, { force = false, git = false } = {}) {
  const root = path.resolve(target);
  if (fs.existsSync(root)) {
    const entries = fs.readdirSync(root).filter((name) => name !== ".git");
    if (entries.length && !force) {
      throw new Error(`${root} is not empty; pass --force to overwrite template files`);
    }
  }

  const values = {
    projectName: path.basename(root) || "project",
    date: localDate(),
    now: localIso(),
  };
  copyTree(TEMPLATES, root, values, force);

  if (git) {
    const run = spawnSync("git", ["init", "-q"], { cwd: root, encoding: "utf8" });
    if (run.status !== 0) throw new Error(run.stderr || "git init failed");
  }

  return { root, values };
}
