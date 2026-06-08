import { cookies } from "next/headers";
import { getPublishedPosts } from "@/lib/data";
import { JournalCard } from "@/components/site/journal-card";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { HomeHeroText, HomeJournalHeader } from "./home-text";
import { loadHomeData } from "@/lib/page-content";
import type { Locale } from "@/i18n/dictionaries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "zh" ? "zh" : "en";
  const homeData = await loadHomeData(locale);
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <SiteHeader siteName={homeData.siteName} />
      <main>
        <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-black text-white">
          {featured?.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 md:px-8">
            <HomeHeroText data={homeData} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <HomeJournalHeader data={homeData} />
          {featured ? <JournalCard post={featured} featured /> : null}
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {rest.slice(0, 2).map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        </section>
        <Newsletter data={homeData} />
      </main>
      <SiteFooter description={homeData.footerDescription} />
    </>
  );
}
