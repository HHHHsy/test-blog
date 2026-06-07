import type { Post } from "@prisma/client";
import Link from "next/link";
import { Edit3, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/lib/sample-data";
import { StatusBadge } from "./status-badge";

export function PostTable({ posts }: { posts: Array<Post | JournalPost> }) {
  return (
    <div className="overflow-hidden border border-stone-200 bg-[#fbf9f9]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-stone-200 text-[11px] uppercase tracking-[0.18em] text-stone-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Published</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-stone-200 last:border-b-0">
                <td className="max-w-sm px-4 py-4">
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-1 truncate text-xs text-stone-500">{post.slug}</p>
                </td>
                <td className="px-4 py-4 text-stone-600">{post.category}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-4 text-stone-600">{formatDate(post.publishedAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/posts/${post.id}/edit`} className="text-stone-600 hover:text-black" title="Edit">
                      <Edit3 size={17} />
                    </Link>
                    <Link href={`/journal/${post.slug}`} className="text-stone-600 hover:text-black" title="Open">
                      <ExternalLink size={17} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
