#!/usr/bin/env node
/**
 * Static check over supabase/migrations/*.sql to catch common
 * misconfigurations BEFORE they reach the database:
 *
 *   1. Every `CREATE TABLE public.<name>` must be followed (anywhere in the
 *      migration set) by `ALTER TABLE public.<name> ENABLE ROW LEVEL SECURITY`.
 *   2. Every RLS-enabled table must have at least one `CREATE POLICY` on it.
 *   3. Every public-schema table must have a `GRANT` statement.
 *   4. Flag overly-permissive policies (`USING (true)` without auth scoping).
 *
 * Exits non-zero on failure so the PR check blocks merge.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const MIG_DIR = "supabase/migrations";
if (!existsSync(MIG_DIR)) {
  console.log("No supabase/migrations directory — skipping RLS check.");
  process.exit(0);
}

const sql = readdirSync(MIG_DIR)
  .filter((f) => f.endsWith(".sql"))
  .map((f) => readFileSync(join(MIG_DIR, f), "utf8"))
  .join("\n")
  .toLowerCase();

const createdTables = new Set(
  [...sql.matchAll(/create\s+table\s+(?:if\s+not\s+exists\s+)?public\.([a-z0-9_]+)/g)].map((m) => m[1]),
);
const rlsEnabled = new Set(
  [...sql.matchAll(/alter\s+table\s+(?:public\.)?([a-z0-9_]+)\s+enable\s+row\s+level\s+security/g)].map((m) => m[1]),
);
const withPolicy = new Set(
  [...sql.matchAll(/create\s+policy\s+[^;]*?on\s+(?:public\.)?([a-z0-9_]+)/g)].map((m) => m[1]),
);
const withGrant = new Set(
  [...sql.matchAll(/grant\s+[^;]*?on\s+(?:table\s+)?(?:public\.)?([a-z0-9_]+)/g)].map((m) => m[1]),
);

const errors = [];
for (const t of createdTables) {
  if (!rlsEnabled.has(t)) errors.push(`Table public.${t} is missing ENABLE ROW LEVEL SECURITY`);
  if (!withPolicy.has(t)) errors.push(`Table public.${t} has no CREATE POLICY statements`);
  if (!withGrant.has(t)) errors.push(`Table public.${t} has no GRANT statements`);
}

const permissive = [...sql.matchAll(/create\s+policy[^;]*?using\s*\(\s*true\s*\)[^;]*;/g)];
for (const m of permissive) {
  const snippet = m[0].replace(/\s+/g, " ").slice(0, 120);
  errors.push(`Overly permissive policy detected (USING (true)): ${snippet}...`);
}

if (errors.length) {
  console.error("❌ RLS / policy check failed:\n");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`✅ RLS check passed (${createdTables.size} public tables verified).`);
