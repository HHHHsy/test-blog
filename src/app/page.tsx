import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data";
import { JournalCard } from "@/components/site/journal-card";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-black text-white">
          {featured?.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 md:px-8">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              Automated Premium Journal
            </p>
            <h1 className="max-w-5xl font-serif text-6xl leading-[0.95] md:text-8xl lg:text-9xl">
              The quiet architecture of modern elegance.
            </h1>
            <Link
              href="/journal"
              className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-[#d4af37] pb-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
            >
              Enter journal <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Latest entries</p>
              <h2 className="mt-4 font-serif text-5xl md:text-7xl">Journal</h2>
            </div>
            <Link href="/journal" className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] md:block">
              View all
            </Link>
          </div>
          {featured ? <JournalCard post={featured} featured /> : null}
          <div className="grid gap-2 md:grid-cols-2">
            {rest.slice(0, 2).map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        </section>
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
