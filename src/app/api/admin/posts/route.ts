import { NextResponse } from "next/server";
import { z } from "zod";
import { createPost, getAdminPosts } from "@/lib/data";

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().default(""),
  contentHtml: z.string().default(""),
  coverImage: z.string().nullable().optional(),
  category: z.string().default("Journal"),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"]),
  publishedAt: z.string().nullable().optional(),
  scheduledAt: z.string().nullable().optional(),
});

export async function GET() {
  return NextResponse.json(await getAdminPosts());
}

export async function POST(request: Request) {
  try {
    const body = postSchema.parse(await request.json());
    const post = await createPost({
      ...body,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
    });
    return NextResponse.json(post);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "Save failed", detail: msg }, { status: 500 });
  }
}
