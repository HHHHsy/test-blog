import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/data";
import { JournalCard } from "@/components/site/journal-card";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { DetailMeta, ContinueReading } from "./detail-text";

export const dynamic = "force-dynamic";

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = (await getPublishedPosts()).filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <DetailMeta category={post.category} publishedAt={post.publishedAt} />
            <h1 className="mt-6 font-serif text-balance text-4xl leading-tight md:text-6xl">{post.title}</h1>
            <p className="mx-auto mt-7 max-w-2xl break-words text-lg leading-8 text-stone-600">{post.excerpt}</p>
          </div>
          {post.coverImage ? (
            <div className="mt-14 aspect-[21/9] overflow-hidden bg-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt="" className="h-full w-full object-cover grayscale-[25%]" />
            </div>
          ) : null}
          <div
          className="prose prose-stone mx-auto mt-14 max-w-3xl break-words text-xl leading-9 text-stone-700 [&_p]:![overflow-wrap:break-word] [&_p]:![word-break:break-word] [&_pre]:![white-space:pre-wrap] [&_pre]:![overflow-wrap:break-word] [&_code]:![white-space:pre-wrap]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        </article>
        {related.length ? (
          <section className="mx-auto max-w-7xl border-t border-stone-200 px-5 py-16 md:px-8">
            <ContinueReading />
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <JournalCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
