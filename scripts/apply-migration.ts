import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const sql = readFileSync(
  "prisma/migrations/20260909094906_init/migration.sql",
  "utf-8"
);

const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

async function run() {
  for (const stmt of statements) {
    await client.execute(stmt);
    console.log("✓", stmt.slice(0, 60).replace(/\n/g, " "));
  }
  console.log("\nMigration applied to Turso.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
