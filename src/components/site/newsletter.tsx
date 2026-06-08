"use client";

import type { HomeData } from "@/lib/page-content";

export function Newsletter({ data }: { data: HomeData }) {
  return (
    <section className="mx-auto mt-20 max-w-3xl border-y border-stone-200 px-5 py-14 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
        {data.newsletterBadge}
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
        {data.newsletterTitle}
      </h2>
      <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder={data.newsletterPlaceholder}
          className="min-h-12 flex-1 border border-stone-300 bg-transparent px-4 text-sm outline-none focus:border-[#d4af37]"
        />
        <button className="min-h-12 bg-black px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          {data.newsletterSubscribe}
        </button>
      </form>
    </section>
  );
}
