import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function uploadRoot() {
  if (process.env.UPLOAD_DIR) return process.env.UPLOAD_DIR;
  if (process.cwd().startsWith("/opt/elegance-journal")) return "/opt/elegance-journal-uploads";
  return path.join(/* turbopackIgnore: true */ process.cwd(), "public", "uploads");
}

function cleanFileName(name: string) {
  const extension = path.extname(name).toLowerCase();
  const base = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "file"}-${randomUUID()}${extension}`;
}

function mediaKind(type: string) {
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  return "attachment";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File is larger than 50MB." }, { status: 413 });
  }

  const now = new Date();
  const folder = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const fileName = cleanFileName(file.name);
  const uploadDir = path.join(uploadRoot(), folder);
  const filePath = path.join(uploadDir, fileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({
    url: `/uploads/${folder}/${fileName}`,
    name: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    kind: mediaKind(file.type || ""),
  });
}
