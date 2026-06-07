import type { PostStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { Pool, type PoolConfig, type QueryResultRow } from "pg";
import { samplePosts, type JournalPost } from "./sample-data";

const globalForPg = globalThis as unknown as { pgPool?: Pool };

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (process.env.NEXT_PHASE === "phase-production-build") return null;

  globalForPg.pgPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    max: 3,
  } satisfies PoolConfig);

  return globalForPg.pgPool;
}

function visible(post: JournalPost) {
  return post.status === "PUBLISHED" && (!post.publishedAt || post.publishedAt <= new Date());
}

function byNewest(a: JournalPost, b: JournalPost) {
  return (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0);
}

function mapPost(row: QueryResultRow): JournalPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    contentHtml: row.contentHtml,
    coverImage: row.coverImage,
    category: row.category,
    status: row.status,
    publishedAt: row.publishedAt,
    scheduledAt: row.scheduledAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

async function safeQuery<T>(query: (pool: Pool) => Promise<T>, fallback: T) {
  const pool = getPool();
  if (!pool) return fallback;
  try {
    return await query(pool);
  } catch {
    return fallback;
  }
}

const postSelect = `
  select
    id,
    title,
    slug,
    excerpt,
    "contentHtml",
    "coverImage",
    category,
    status,
    "publishedAt",
    "scheduledAt",
    "createdAt",
    "updatedAt"
  from "Post"
`;

export async function getPublishedPosts() {
  return safeQuery(async (pool) => {
    const result = await pool.query(
      `${postSelect}
       where status = 'PUBLISHED'
       and ("publishedAt" is null or "publishedAt" <= now())
       order by "publishedAt" desc nulls last, "createdAt" desc`,
    );
    return result.rows.map(mapPost);
  }, samplePosts.filter(visible).sort(byNewest));
}

export async function getPostBySlug(slug: string) {
  return safeQuery(async (pool) => {
    const result = await pool.query(
      `${postSelect}
       where slug = $1
       and status = 'PUBLISHED'
       and ("publishedAt" is null or "publishedAt" <= now())
       limit 1`,
      [slug],
    );
    return result.rows[0] ? mapPost(result.rows[0]) : null;
  }, samplePosts.find((post) => post.slug === slug && visible(post)) ?? null);
}

export async function getAdminPosts() {
  return safeQuery(async (pool) => {
    const result = await pool.query(`${postSelect} order by "updatedAt" desc`);
    return result.rows.map(mapPost);
  }, [...samplePosts].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
}

export async function getAdminPost(id: string) {
  return safeQuery(async (pool) => {
    const result = await pool.query(`${postSelect} where id = $1 limit 1`, [id]);
    return result.rows[0] ? mapPost(result.rows[0]) : null;
  }, samplePosts.find((post) => post.id === id) ?? null);
}

export async function getDashboardStats() {
  const posts = await getAdminPosts();
  return {
    total: posts.length,
    published: posts.filter((post) => post.status === "PUBLISHED").length,
    drafts: posts.filter((post) => post.status === "DRAFT").length,
    pending: posts.filter((post) => post.status === "PENDING").length,
    archived: posts.filter((post) => post.status === "ARCHIVED").length,
  };
}

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImage?: string | null;
  category: string;
  status: PostStatus;
  publishedAt?: Date | null;
  scheduledAt?: Date | null;
};

export async function createPost(input: PostInput) {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is required for writes.");
  const result = await pool.query(
    `insert into "Post"
      (id, title, slug, excerpt, "contentHtml", "coverImage", category, status, "publishedAt", "scheduledAt", "createdAt", "updatedAt")
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), now())
     returning *`,
    [
      randomUUID(),
      input.title,
      input.slug,
      input.excerpt,
      input.contentHtml,
      input.coverImage,
      input.category,
      input.status,
      input.publishedAt,
      input.scheduledAt,
    ],
  );
  return mapPost(result.rows[0]);
}

export async function updatePost(id: string, input: PostInput) {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is required for writes.");
  const result = await pool.query(
    `update "Post"
     set title = $2,
       slug = $3,
       excerpt = $4,
       "contentHtml" = $5,
       "coverImage" = $6,
       category = $7,
       status = $8,
       "publishedAt" = $9,
       "scheduledAt" = $10,
       "updatedAt" = now()
     where id = $1
     returning *`,
    [
      id,
      input.title,
      input.slug,
      input.excerpt,
      input.contentHtml,
      input.coverImage,
      input.category,
      input.status,
      input.publishedAt,
      input.scheduledAt,
    ],
  );
  return mapPost(result.rows[0]);
}

export async function deletePost(id: string) {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is required for writes.");
  await pool.query(`delete from "Post" where id = $1`, [id]);
  return { id };
}
