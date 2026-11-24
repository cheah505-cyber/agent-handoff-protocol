import fs from "node:fs";
import path from "node:path";
import { readHandoff } from "./handoff.mjs";

export const STATUS_START = "<!-- AHP:STATUS:START -->";
export const STATUS_END = "<!-- AHP:STATUS:END -->";

export function statusContent(meta) {
  return `- Phase: ${meta.phase || "unknown"}\n- Next: ${meta.next_action || "none"}`;
}

export function extractStatusBlock(text) {
  const start = text.indexOf(STATUS_START);
  const end = text.indexOf(STATUS_END);
  if (start < 0 || end < 0 || end < start) return null;
  return text
    .slice(start + STATUS_START.length, end)
    .replace(/^\r?\n/, "")
    .replace(/\r?\n$/, "")
    .trim();
}

export function syncProject(root, config, { check = false } = {}) {
  const projectFile = path.join(root, config.paths.project);
  const text = fs.readFileSync(projectFile, "utf8");
  const start = text.indexOf(STATUS_START);
  const end = text.indexOf(STATUS_END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error(`STATUS markers not found in ${config.paths.project}`);
  }

  const { meta } = readHandoff(root, config);
  const desired = statusContent(meta).trim();
  const current = extractStatusBlock(text) ?? "";
  const ok = current === desired;

  if (check) return { ok, current, desired };

  if (!ok) {
    const next =
      text.slice(0, start + STATUS_START.length) +
      "\n" +
      desired +
      "\n" +
      text.slice(end);
    fs.writeFileSync(projectFile, next, "utf8");
  }
  return { ok, current, desired };
}
