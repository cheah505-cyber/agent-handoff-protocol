import fs from "node:fs";
import path from "node:path";

export function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

export function parseFrontmatter(text) {
  const match = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: text };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!field) continue;
    let value = field[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[field[1]] = value;
  }
  return { meta, body: text.slice(match[0].length) };
}

export function section(body, number) {
  const pattern = new RegExp(`^##\\s+${number}\\.`, "m");
  const start = body.search(pattern);
  if (start < 0) return "";
  const rest = body.slice(start);
  const next = rest.slice(1).search(/^##\s+/m);
  return next < 0 ? rest : rest.slice(0, next + 1);
}

export function bodySections(body) {
  const result = {};
  const matches = [...body.matchAll(/^##\s+(\d+)\.[^\n]*/gm)];
  for (let i = 0; i < matches.length; i += 1) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    result[matches[i][1]] = body.slice(start, end);
  }
  return result;
}

export function isoDate(value) {
  if (!value || value === "none") return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : null;
}

export function dayOf(value) {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).getTime();
}

export function datesIn(text) {
  const result = [];
  for (const match of String(text).matchAll(/(20\d{2})-(\d{2})-(\d{2})/g)) {
    const time = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
    ).getTime();
    if (Number.isFinite(time)) result.push(time);
  }
  return result;
}

export function localIso(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = pad(Math.floor(Math.abs(offset) / 60));
  const minutes = pad(Math.abs(offset) % 60);
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${hours}:${minutes}`
  );
}

export function localDate(date = new Date()) {
  return localIso(date).slice(0, 10);
}

export function readHandoff(root, config) {
  const file = path.join(root, config.paths.handoff);
  const text = readIfExists(file);
  const parsed = parseFrontmatter(text);
  return { file, text, meta: parsed.meta, body: parsed.body };
}
