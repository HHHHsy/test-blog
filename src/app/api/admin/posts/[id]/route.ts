import { NextResponse } from "next/server";
import { z } from "zod";
import { deletePost, updatePost } from "@/lib/data";

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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = postSchema.parse(await request.json());
    const post = await updatePost(id, {
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

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
