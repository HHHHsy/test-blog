"use client";

import type { Post } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/lib/sample-data";
import { useLocale } from "@/i18n/provider";

type CardPost = Post | JournalPost;

export function JournalCard({ post, featured = false }: { post: CardPost; featured?: boolean }) {
  const { locale } = useLocale();
  const hasImage = !!post.coverImage;

  if (featured) {
    return (
      <article className="group border-t border-stone-200 pt-8 pb-0 md:pt-10">
        <Link href={`/journal/${post.slug}`} className="block">
          {/* Category + date */}
          <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            <span>{post.category}</span>
            <span className="h-px w-10 bg-[#d4af37]" />
            <time>{formatDate(post.publishedAt, locale)}</time>
          </div>

          {/* Title + image row */}
          <div className={`grid gap-8 ${hasImage ? "md:grid-cols-[1.2fr_0.8fr]" : ""}`}>
            <div>
              <h2 className="font-serif text-4xl leading-tight md:text-6xl transition group-hover:text-stone-600">
                {post.title}
              </h2>
              <p className="mt-5 max-w-xl break-words text-base leading-8 text-stone-600">{post.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 transition group-hover:text-black">
                Read entry <ArrowUpRight size={16} />
              </span>
            </div>
            {hasImage && (
              <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={post.coverImage ?? ""}
                  alt=""
                  className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group border-t border-stone-200 py-8">
      <Link href={`/journal/${post.slug}`} className="block">
        {/* Category + date */}
        <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
          <span>{post.category}</span>
          <span className="h-px w-8 bg-[#d4af37]" />
          <time>{formatDate(post.publishedAt, locale)}</time>
        </div>

        {/* Title + excerpt */}
        <div className="grid gap-4 md:grid-cols-[1fr_1.8fr]">
          <h2 className="font-serif text-2xl leading-tight md:text-3xl transition group-hover:text-stone-600">
            {post.title}
          </h2>
          <div>
            <p className="break-words text-sm leading-7 text-stone-600">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 transition group-hover:text-black">
              Read entry <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
