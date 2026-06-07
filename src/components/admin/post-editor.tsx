"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";
import type { Post, PostStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Bold, FileUp, Heading2, ImageIcon, Italic, List, Paperclip, Quote, Save, Video } from "lucide-react";
import { AttachmentNode, VideoNode } from "@/lib/editor-media";

const statuses: Array<{ value: PostStatus; label: string }> = [
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING", label: "Pending" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Offline" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PostEditor({ post }: { post?: Post | null }) {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    coverImage: post?.coverImage ?? "",
    category: post?.category ?? "Journal",
    status: (post?.status ?? "DRAFT") as PostStatus,
    publishedAt: post?.publishedAt ? post.publishedAt.toISOString().slice(0, 16) : "",
    scheduledAt: post?.scheduledAt ? post.scheduledAt.toISOString().slice(0, 16) : "",
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          loading: "lazy",
        },
      }),
      VideoNode,
      AttachmentNode,
      Placeholder.configure({
        placeholder: "Write the entry in an editorial, WYSIWYG canvas...",
      }),
    ],
    content: post?.contentHtml ?? "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-stone max-w-none min-h-[380px] border border-stone-200 bg-white px-5 py-4 text-base leading-8 outline-none focus:border-[#d4af37]",
      },
    },
  });

  const disabled = useMemo(() => !form.title || !form.slug || saving, [form.title, form.slug, saving]);

  async function uploadFile(file: File, kind: "image" | "video" | "attachment") {
    setUploading(kind);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData,
    });

    setUploading(null);

    if (!response.ok) {
      alert("Upload failed. Please try a smaller file or check the server.");
      return null;
    }

    return (await response.json()) as {
      url: string;
      name: string;
      mimeType: string;
      size: number;
      kind: "image" | "video" | "attachment";
    };
  }

  async function handleFileSelect(event: ChangeEvent<HTMLInputElement>, kind: "image" | "video" | "attachment") {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor) return;

    const uploaded = await uploadFile(file, kind);
    if (!uploaded) return;

    if (kind === "image") {
      editor.chain().focus().insertContent({ type: "image", attrs: { src: uploaded.url, alt: uploaded.name } }).run();
      return;
    }

    if (kind === "video") {
      editor.chain().focus().insertContent({ type: "videoBlock", attrs: { src: uploaded.url, title: uploaded.name } }).run();
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent({
        type: "attachment",
        attrs: {
          href: uploaded.url,
          title: uploaded.name,
          mimeType: uploaded.mimeType,
          size: uploaded.size,
        },
      })
      .run();
  }

  async function save() {
    setSaving(true);
    const response = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
      method: post ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        contentHtml: editor?.getHTML() ?? "",
        coverImage: form.coverImage || null,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
        scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
      }),
    });
    setSaving(false);
    if (!response.ok) {
      alert("Save failed. Check DATABASE_URL and PostgreSQL status.");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="space-y-5">
        <input
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              title: event.target.value,
              slug: current.slug || slugify(event.target.value),
            }))
          }
          placeholder="Post title"
          className="w-full border border-stone-200 bg-[#fbf9f9] px-4 py-4 font-serif text-4xl outline-none focus:border-[#d4af37]"
        />
        <textarea
          value={form.excerpt}
          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
          placeholder="Excerpt"
          className="min-h-28 w-full border border-stone-200 bg-[#fbf9f9] px-4 py-3 text-sm leading-7 outline-none focus:border-[#d4af37]"
        />
        <div className="flex flex-wrap gap-2 border border-stone-200 bg-[#fbf9f9] p-2">
          <button type="button" title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} className="p-2 hover:bg-stone-100">
            <Bold size={17} />
          </button>
          <button type="button" title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-2 hover:bg-stone-100">
            <Italic size={17} />
          </button>
          <button type="button" title="Heading" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="p-2 hover:bg-stone-100">
            <Heading2 size={17} />
          </button>
          <button type="button" title="Quote" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="p-2 hover:bg-stone-100">
            <Quote size={17} />
          </button>
          <button type="button" title="List" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="p-2 hover:bg-stone-100">
            <List size={17} />
          </button>
          <span className="mx-1 h-9 w-px bg-stone-200" />
          <button type="button" title="Upload image" onClick={() => imageInputRef.current?.click()} className="p-2 hover:bg-stone-100">
            {uploading === "image" ? <FileUp size={17} /> : <ImageIcon size={17} />}
          </button>
          <button type="button" title="Upload video" onClick={() => videoInputRef.current?.click()} className="p-2 hover:bg-stone-100">
            {uploading === "video" ? <FileUp size={17} /> : <Video size={17} />}
          </button>
          <button type="button" title="Upload attachment" onClick={() => attachmentInputRef.current?.click()} className="p-2 hover:bg-stone-100">
            {uploading === "attachment" ? <FileUp size={17} /> : <Paperclip size={17} />}
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleFileSelect(event, "image")}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(event) => void handleFileSelect(event, "video")}
          />
          <input
            ref={attachmentInputRef}
            type="file"
            className="hidden"
            onChange={(event) => void handleFileSelect(event, "attachment")}
          />
        </div>
        <EditorContent editor={editor} />
      </section>
      <aside className="space-y-4">
        <div className="border border-stone-200 bg-[#fbf9f9] p-4">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Status</label>
          <select
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as PostStatus }))}
            className="mt-2 w-full border border-stone-200 bg-white px-3 py-2 text-sm"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        {[
          ["slug", "Slug"],
          ["category", "Category"],
          ["coverImage", "Cover image URL"],
          ["publishedAt", "Publish time"],
          ["scheduledAt", "Scheduled time"],
        ].map(([key, label]) => (
          <div key={key} className="border border-stone-200 bg-[#fbf9f9] p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{label}</label>
            <input
              type={key.endsWith("At") ? "datetime-local" : "text"}
              value={form[key as keyof typeof form]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="mt-2 w-full border border-stone-200 bg-white px-3 py-2 text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={save}
          className="flex w-full items-center justify-center gap-2 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          <Save size={16} />
          {saving ? "Saving" : "Save"}
        </button>
      </aside>
    </div>
  );
}
