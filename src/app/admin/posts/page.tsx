import Link from "next/link";
import { getAdminPosts } from "@/lib/data";
import { PostTable } from "@/components/admin/post-table";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getAdminPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Content</p>
          <h1 className="mt-3 font-serif text-5xl">Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          New post
        </Link>
      </div>
      <PostTable posts={posts} />
    </div>
  );
}
