import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAdminPosts, getDashboardStats } from "@/lib/data";
import { PostTable } from "@/components/admin/post-table";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [stats, posts] = await Promise.all([getDashboardStats(), getAdminPosts()]);
  const cards = [
    ["Total", stats.total],
    ["Published", stats.published],
    ["Drafts", stats.drafts],
    ["Pending", stats.pending],
    ["Offline", stats.archived],
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Overview</p>
          <h1 className="mt-3 font-serif text-5xl">Dashboard</h1>
        </div>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-2 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          Write post <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value]) => (
          <div key={label} className="border border-stone-200 bg-[#fbf9f9] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</p>
            <p className="mt-5 font-serif text-5xl">{value}</p>
          </div>
        ))}
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-3xl">Recent posts</h2>
          <Link href="/admin/posts" className="text-xs font-semibold uppercase tracking-[0.16em]">Manage all</Link>
        </div>
        <PostTable posts={posts.slice(0, 5)} />
      </section>
    </div>
  );
}
