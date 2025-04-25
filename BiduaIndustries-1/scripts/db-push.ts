import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";
import * as schema from "../shared/schema";
import { migrate } from "drizzle-orm/neon-serverless/migrator";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  console.log("🔄 Pushing schema to database...");
  
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Schema pushed successfully!");
  } catch (error) {
    console.error("❌ Error pushing schema:", error);
  } finally {
    await pool.end();
  }
}

main();