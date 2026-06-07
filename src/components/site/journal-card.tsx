import type { Post } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/lib/sample-data";

type CardPost = Post | JournalPost;

export function JournalCard({ post, featured = false }: { post: CardPost; featured?: boolean }) {
  return (
    <article className="group border-t border-stone-200 py-8">
      <Link
        href={`/journal/${post.slug}`}
        className={featured ? "grid gap-8 md:grid-cols-[1.1fr_0.9fr]" : "grid gap-5 md:grid-cols-[0.7fr_1.3fr]"}
      >
        <div className={featured ? "aspect-[4/3] overflow-hidden bg-stone-200" : "aspect-[16/10] overflow-hidden bg-stone-200"}>
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : null}
        </div>
        <div className="flex min-h-full flex-col justify-between gap-8">
          <div>
            <div className="mb-5 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              <span>{post.category}</span>
              <span className="h-px w-10 bg-[#d4af37]" />
              <time>{formatDate(post.publishedAt)}</time>
            </div>
            <h2 className={featured ? "font-serif text-4xl leading-tight md:text-6xl" : "font-serif text-3xl leading-tight md:text-4xl"}>
              {post.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">{post.excerpt}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            Read entry <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
