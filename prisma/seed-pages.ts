import { Pool } from "pg";
import { randomUUID } from "crypto";
import { serializeBilingualResumeData, serializeBilingualHomeData } from "../src/lib/page-content";
import { serializeAboutData, defaultAboutData } from "../src/lib/page-content";

function getConnectionString() {
  const url = new URL(process.env.DATABASE_URL!);
  const schema = url.searchParams.get("schema") || "myapp";
  url.searchParams.delete("schema");
  url.searchParams.set("options", `-c search_path=${schema}`);
  return url.toString();
}

async function main() {
  const pool = new Pool({
    connectionString: getConnectionString(),
    max: 1,
  });

  // Upsert home page (bilingual)
  const homeJson = serializeBilingualHomeData();
  await pool.query(
    `insert into "PageContent" (id, key, title, "contentHtml", "updatedAt")
     values ($1, 'home', 'Home / 首页', $2, now())
     on conflict (key)
     do update set title = 'Home / 首页', "contentHtml" = $2, "updatedAt" = now()`,
    [randomUUID(), homeJson],
  );
  console.log("✓ Seeded home page content (bilingual)");

  // Upsert about page (single language — stored as flat JSON)
  const aboutJson = serializeAboutData(defaultAboutData);
  await pool.query(
    `insert into "PageContent" (id, key, title, "contentHtml", "updatedAt")
     values ($1, 'about', 'About / 关于我们', $2, now())
     on conflict (key)
     do update set title = 'About / 关于我们', "contentHtml" = $2, "updatedAt" = now()`,
    [randomUUID(), aboutJson],
  );
  console.log("✓ Seeded about page content");

  // Upsert resume page (bilingual)
  const resumeJson = serializeBilingualResumeData();
  await pool.query(
    `insert into "PageContent" (id, key, title, "contentHtml", "updatedAt")
     values ($1, 'resume', 'Resume / 个人履历', $2, now())
     on conflict (key)
     do update set title = 'Resume / 个人履历', "contentHtml" = $2, "updatedAt" = now()`,
    [randomUUID(), resumeJson],
  );
  console.log("✓ Seeded resume page content (bilingual)");

  await pool.end();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
