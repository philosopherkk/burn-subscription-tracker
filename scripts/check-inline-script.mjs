import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const htmlPath = join(dirname(fileURLToPath(import.meta.url)), "..", "index.html");
const html = readFileSync(htmlPath, "utf8");
const openTag = "<script>";
const closeTag = "</script>";
const scripts = [];
let from = 0;

while (from < html.length) {
  const start = html.indexOf(openTag, from);
  if (start === -1) break;
  const end = html.indexOf(closeTag, start + openTag.length);
  if (end === -1) {
    console.error("index.html has an unclosed inline script");
    process.exit(1);
  }
  scripts.push(html.slice(start + openTag.length, end));
  from = end + closeTag.length;
}

if (scripts.length === 0) {
  console.error("index.html has no inline script");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "burn-inline-"));

for (let i = 0; i < scripts.length; i++) {
  const scriptPath = join(dir, `inline-${i}.js`);
  writeFileSync(scriptPath, scripts[i]);
  const result = spawnSync(process.execPath, ["--check", scriptPath], { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status === null ? 1 : result.status);
  }
}
