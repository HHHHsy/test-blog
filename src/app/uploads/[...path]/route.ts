import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

function uploadRoot() {
  if (process.env.UPLOAD_DIR) return process.env.UPLOAD_DIR;
  if (process.cwd().startsWith("/opt/elegance-journal")) return "/opt/elegance-journal-uploads";
  return path.join(/* turbopackIgnore: true */ process.cwd(), "public", "uploads");
}

function contentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".txt": "text/plain; charset=utf-8",
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".mov": "video/quicktime",
    ".mp4": "video/mp4",
  };
  return types[extension] ?? "application/octet-stream";
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: fileParts } = await params;
  const root = uploadRoot();
  const filePath = path.join(root, ...fileParts);
  const relative = path.relative(root, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse("Not found", { status: 404 });

    const file = await readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(info.size),
        "Content-Type": contentType(filePath),
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
