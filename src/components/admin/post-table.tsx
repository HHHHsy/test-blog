"use client";

import type { Post } from "@prisma/client";
import Link from "next/link";
import { Edit3, ExternalLink, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/lib/sample-data";
import { StatusBadge } from "./status-badge";

export function PostTable({ posts: allPosts }: { posts: Array<Post | JournalPost> }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const statuses = ["ALL", "DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"];

  const filtered = allPosts.filter((post) => {
    const q = search.toLowerCase();
    if (q && !post.title.toLowerCase().includes(q) && !post.slug.toLowerCase().includes(q)) return false;
    if (statusFilter !== "ALL" && post.status !== statusFilter) return false;
    return true;
  });

  async function handleDelete(id: string) {
    setDeletingId(id);
    setConfirmId(null);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch {
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full border border-stone-200 bg-[#fbf9f9] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#d4af37]"
          />
        </div>
        <div className="flex gap-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                statusFilter === s
                  ? "bg-black text-white"
                  : "border border-stone-200 bg-[#fbf9f9] text-stone-600 hover:border-stone-400"
              }`}
            >
              {s === "ALL" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-stone-500">
        {filtered.length} of {allPosts.length} posts
      </p>

      {/* Table */}
      <div className="overflow-hidden border border-stone-200 bg-[#fbf9f9]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-stone-200 text-[11px] uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Published</th>
                <th className="px-4 py-3 font-semibold w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-stone-500">
                    No posts found.
                  </td>
                </tr>
              )}
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-stone-200 last:border-b-0 group">
                  <td className="max-w-sm px-4 py-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="mt-1 truncate text-xs text-stone-500">{post.slug}</p>
                  </td>
                  <td className="px-4 py-4 text-stone-600">{post.category}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-4 text-stone-600">
                    {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/posts/${post.id}/edit`} className="text-stone-600 hover:text-black" title="Edit">
                        <Edit3 size={17} />
                      </Link>
                      <Link href={`/journal/${post.slug}`} className="text-stone-600 hover:text-black" title="Open">
                        <ExternalLink size={17} />
                      </Link>
                      {confirmId === post.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-600 hover:text-red-800"
                          >
                            {deletingId === post.id ? "..." : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500 hover:text-black"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(post.id)}
                          className="text-stone-400 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
