#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([
  ".git",
  "node_modules",
  ".nuxt",
  ".next",
  ".output",
  ".netlify",
  ".railway",
  ".vercel",
  "dist",
  "coverage",
  "playwright-report",
  "test-results",
]);
const allowedSecretNames = new Set([".env.example"]);
const forbiddenNamePatterns = [
  /^\.env(?:\.|$)/,
  /\.(?:pem|key|p12|pfx|der)$/i,
  /^id_(?:rsa|dsa|ecdsa|ed25519)$/i,
];
const secretPatterns = [
  {
    name: "private key block",
    re: new RegExp("-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?" + "PRIVATE KEY-----"),
  },
  { name: "GitHub token", re: /gh[pousr]_[A-Za-z0-9_]{36,}/ },
  { name: "AWS access key", re: /AKIA[0-9A-Z]{16}/ },
  { name: "Google API key", re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: "Slack token", re: /xox[baprs]-[0-9A-Za-z-]{20,}/ },
  { name: "generic secret assignment", re: /(?:api[_-]?key|token|secret|password|private[_-]?key|client[_-]?secret)\s*[:=]\s*["']?(?!your_|example|placeholder|changeme|replace_me|not_set|process\.env)([A-Za-z0-9_./+=-]{24,})/i },
];

function walk(dir = root, prefix = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      files.push(...walk(join(dir, entry.name), join(prefix, entry.name)));
      continue;
    }
    if (entry.isFile()) files.push(join(prefix, entry.name).replace(/\\/g, "/"));
  }
  return files;
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

const files = walk();
const failures = [];

for (const file of files) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) continue;
  const parts = file.split(/[\\/]/);
  if (parts.some((part) => ignoredDirs.has(part))) continue;

  const base = basename(file);
  if (!allowedSecretNames.has(base) && forbiddenNamePatterns.some((pattern) => pattern.test(base))) {
    failures.push(`${file}: forbidden secret-like filename`);
    continue;
  }

  const stat = statSync(fullPath);
  if (!stat.isFile() || stat.size > 1_000_000) continue;

  let content;
  try {
    content = readFileSync(fullPath, "utf8");
  } catch {
    continue;
  }
  if (content.includes("\0")) continue;

  for (const pattern of secretPatterns) {
    const match = pattern.re.exec(content);
    if (match) failures.push(`${file}:${lineNumber(content, match.index)} matched ${pattern.name}`);
  }
}

if (failures.length > 0) {
  console.error("Potential secrets detected. Values are intentionally not printed.");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("No high-confidence secrets detected.");
