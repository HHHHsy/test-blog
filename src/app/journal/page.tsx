import { getPublishedPosts } from "@/lib/data";
import { JournalCard } from "@/components/site/journal-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-14 border-b border-stone-200 pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Archive</p>
          <h1 className="mt-5 font-serif text-6xl leading-none md:text-8xl">Journal</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600">
            Essays on interior restraint, architectural atmosphere, ritual, and the cultivated life.
          </p>
        </div>
        <div className="space-y-2">
          {posts.map((post, index) => (
            <JournalCard key={post.id} post={post} featured={index === 0} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
