// Validates every question bank JSON against the engine's schema.
// Usage: node scripts/validate-questions.mjs
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "src", "data", "questions");

const TRACKS = {
  html: "html",
  css: "css",
  javascript: "javascript",
  typescript: "typescript",
  react: "react",
  nextjs: "nextjs",
  php: "php",
  laravel: "laravel",
  nodejs: "nodejs",
  express: "express",
  sql: "sql",
  "rest-api": "rest-api",
  authentication: "authentication",
};

const LEVELS = ["beginner", "intermediate", "advanced", "expert", "boss"];
const TYPES = [
  "multiple-choice",
  "code-output",
  "debugging",
  "true-false",
  "fill-blank",
  "scenario",
];
const EXPECTED = { beginner: 10, intermediate: 10, advanced: 10, expert: 5, boss: 5 };

let totalErrors = 0;
let totalQuestions = 0;

function localized(v) {
  return v && typeof v.en === "string" && v.en.length > 0 && typeof v.ar === "string" && v.ar.length > 0;
}

for (const [file, trackId] of Object.entries(TRACKS)) {
  const path = join(dir, `${file}.json`);
  if (!existsSync(path)) {
    console.log(`⚠️  ${file}.json — MISSING`);
    continue;
  }

  let data;
  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    console.log(`❌ ${file}.json — INVALID JSON: ${e.message}`);
    totalErrors++;
    continue;
  }

  const errors = [];
  const ids = new Set();
  const byLevel = {};

  if (!Array.isArray(data)) {
    console.log(`❌ ${file}.json — not an array`);
    totalErrors++;
    continue;
  }

  for (const [i, q] of data.entries()) {
    const at = `${file}[${i}] ${q?.id ?? "?"}`;
    if (typeof q.id !== "string") errors.push(`${at}: missing id`);
    if (ids.has(q.id)) errors.push(`${at}: duplicate id`);
    ids.add(q.id);
    if (q.trackId !== trackId) errors.push(`${at}: trackId "${q.trackId}" != "${trackId}"`);
    if (!LEVELS.includes(q.level)) errors.push(`${at}: bad level "${q.level}"`);
    if (!TYPES.includes(q.type)) errors.push(`${at}: bad type "${q.type}"`);
    if (!localized(q.prompt)) errors.push(`${at}: prompt not bilingual`);
    if (!localized(q.explanation)) errors.push(`${at}: explanation not bilingual`);
    if (q.hint !== undefined && !localized(q.hint)) errors.push(`${at}: hint present but not bilingual`);
    if (typeof q.xp !== "number" || q.xp <= 0) errors.push(`${at}: bad xp`);
    if (q.code !== undefined && typeof q.code !== "string") errors.push(`${at}: code not string`);

    if (!Array.isArray(q.options)) {
      errors.push(`${at}: options missing`);
    } else {
      const optIds = q.options.map((o) => o.id);
      const expectedCount = q.type === "true-false" ? 2 : 4;
      if (q.options.length !== expectedCount)
        errors.push(`${at}: ${q.options.length} options (expected ${expectedCount})`);
      for (const o of q.options) {
        if (typeof o.id !== "string") errors.push(`${at}: option missing id`);
        if (!localized(o.text)) errors.push(`${at}: option ${o.id} text not bilingual`);
      }
      if (new Set(optIds).size !== optIds.length) errors.push(`${at}: duplicate option ids`);
      if (!optIds.includes(q.correctOptionId))
        errors.push(`${at}: correctOptionId "${q.correctOptionId}" not in options`);
    }

    byLevel[q.level] = (byLevel[q.level] ?? 0) + 1;
  }

  // Count check
  for (const lvl of LEVELS) {
    const got = byLevel[lvl] ?? 0;
    if (got !== EXPECTED[lvl]) errors.push(`${file}: ${lvl} has ${got} (expected ${EXPECTED[lvl]})`);
  }

  totalQuestions += data.length;
  if (errors.length) {
    totalErrors += errors.length;
    console.log(`❌ ${file}.json — ${data.length} questions, ${errors.length} issue(s):`);
    for (const e of errors.slice(0, 12)) console.log(`     • ${e}`);
    if (errors.length > 12) console.log(`     … and ${errors.length - 12} more`);
  } else {
    console.log(`✅ ${file}.json — ${data.length} questions, all valid`);
  }
}

console.log(`\n${totalQuestions} questions checked, ${totalErrors} error(s).`);
process.exit(totalErrors > 0 ? 1 : 0);
