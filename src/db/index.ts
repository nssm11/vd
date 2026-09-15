import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required for database access. The storefront renders from src/data/products.ts, so the site works without Postgres — only the API routes and src/db/seed.ts need it."
    );
  }

  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({ connectionString });
  }

  return globalForDb.__arenaNextJsPostgresqlPool;
}

/**
 * `db` connects on first query instead of on import.
 *
 * Previously the pool was built at module scope and threw immediately when
 * `DATABASE_URL` was absent, so `next build` died during "collecting page
 * data" for anyone deploying without a live Postgres — a missing optional
 * integration was enough to fail the whole build.
 */
export const db: NodePgDatabase = new Proxy({} as NodePgDatabase, {
  get(_target, property, receiver) {
    const client = drizzle(getPool());
    const value = Reflect.get(client, property, receiver);
    // Drizzle's query builders are bound to the instance, so keep `this`.
    return typeof value === "function" ? value.bind(client) : value;
  },
});
