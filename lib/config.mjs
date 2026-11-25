import fs from "node:fs";
import path from "node:path";

export const DEFAULT_CONFIG = Object.freeze({
  version: 1,
  paths: {
    agents: "AGENTS.md",
    index: "INDEX.md",
    project: "PROJECT.md",
    handoff: "HANDOFF.md",
    memoryDir: "memory",
    docsDir: "docs",
  },
  statuses: ["ACTIVE", "PAUSED", "BLOCKED", "COMPLETE", "MONITORING"],
  freshness: {
    handoffDays: 21,
    projectDays: 30,
  },
  requireProjectStatusBlock: true,
  requireMemoryIndex: false,
  requiredFields: [
    "handoff_version",
    "status",
    "updated_at",
    "work_unit_id",
    "phase",
    "owner",
    "session_id",
    "lease_until",
    "current_file",
    "next_action",
    "acceptance",
    "last_verified_at",
    "last_verified_command",
  ],
});

function merge(base, override) {
  return {
    ...base,
    ...override,
    paths: { ...base.paths, ...(override?.paths ?? {}) },
    freshness: { ...base.freshness, ...(override?.freshness ?? {}) },
    statuses: Array.isArray(override?.statuses) ? override.statuses : base.statuses,
    requiredFields: Array.isArray(override?.requiredFields)
      ? override.requiredFields
      : base.requiredFields,
  };
}

export function loadConfig(root) {
  const file = path.join(root, "ahp.config.json");
  if (!fs.existsSync(file)) return merge(DEFAULT_CONFIG, {});

  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`invalid ahp.config.json: ${error.message}`);
  }
  return merge(DEFAULT_CONFIG, raw);
}
