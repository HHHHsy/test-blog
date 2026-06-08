import { getPublishedPosts } from "@/lib/data";
import { JournalCard } from "@/components/site/journal-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JournalHeader } from "./journal-text";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <JournalHeader />
        <div>
          {posts.map((post, index) => (
            <JournalCard key={post.id} post={post} featured={index === 0} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
