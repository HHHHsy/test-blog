import { NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};

  // 1. Check DATABASE_URL
  results["DATABASE_URL exists"] = !!process.env.DATABASE_URL;
  results["DATABASE_URL prefix"] = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.slice(0, 30) + "..."
    : "NOT SET";

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL is not set", results }, { status: 500 });
  }

  // 2. Parse URL
  try {
    const url = new URL(process.env.DATABASE_URL);
    results["host"] = url.hostname;
    results["port"] = url.port;
    results["database"] = url.pathname.slice(1);
    results["schema"] = url.searchParams.get("schema") || "public";
  } catch (e) {
    return NextResponse.json({ error: "Failed to parse DATABASE_URL", detail: String(e), results }, { status: 500 });
  }

  // 3. Try to connect
  let pool;
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false,
      connectionTimeoutMillis: 5000,
    });
    const client = await pool.connect();
    results["connect"] = "OK";

    // 4. Try a simple query
    const versionResult = await client.query("select version()");
    results["pg_version"] = versionResult.rows[0]?.version;

    // 5. Try querying the schema
    const schema = results["schema"] as string;
    const schemaResult = await client.query(
      `select schema_name from information_schema.schemata where schema_name = $1`,
      [schema],
    );
    results["schema_exists"] = schemaResult.rows.length > 0;

    // 6. Try listing tables in the schema
    const tablesResult = await client.query(
      `select table_name from information_schema.tables where table_schema = $1`,
      [schema],
    );
    results["tables"] = tablesResult.rows.map((r: { table_name: string }) => r.table_name);

    // 7. Try querying the Post table
    if (tablesResult.rows.some((r: { table_name: string }) => r.table_name === "Post")) {
      try {
        const postCount = await client.query(`select count(*) from ${schema}."Post"`);
        results["post_count"] = parseInt(postCount.rows[0]?.count ?? "0", 10);
      } catch (e) {
        results["post_query_error"] = String(e);
      }
    }

    // 8. Try querying PageContent table
    if (tablesResult.rows.some((r: { table_name: string }) => r.table_name === "PageContent")) {
      try {
        const pcResult = await client.query(`select count(*) from ${schema}."PageContent"`);
        results["page_content_count"] = parseInt(pcResult.rows[0]?.count ?? "0", 10);
      } catch (e) {
        results["page_content_query_error"] = String(e);
      }
    }

    client.release();
  } catch (e) {
    results["connect_error"] = String(e);
    return NextResponse.json({ error: "Database connection failed", results }, { status: 500 });
  } finally {
    if (pool) await pool.end();
  }

  return NextResponse.json({ status: "ok", results });
}
