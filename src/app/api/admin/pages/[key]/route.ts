import { NextResponse } from "next/server";
import { getPageContent, upsertPageContent } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const page = await getPageContent(key);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const body = await request.json();
  const { title, contentHtml } = body;
  if (!title || contentHtml === undefined) {
    return NextResponse.json({ error: "title and contentHtml are required" }, { status: 400 });
  }
  const result = await upsertPageContent(key, title, contentHtml);
  return NextResponse.json(result);
}
