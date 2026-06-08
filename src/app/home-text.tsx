"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeData } from "@/lib/page-content";

export function HomeHeroText({ data }: { data: HomeData }) {
  return (
    <>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
        {data.heroBadge}
      </p>
      <h1 className="max-w-5xl font-serif text-6xl leading-[0.95] md:text-8xl lg:text-9xl">
        {data.heroTitle}
      </h1>
      <Link
        href="/journal"
        className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-[#d4af37] pb-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
      >
        {data.heroCta} <ArrowUpRight size={16} />
      </Link>
    </>
  );
}

export function HomeJournalHeader({ data }: { data: HomeData }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{data.sectionLabel}</p>
        <h2 className="mt-4 font-serif text-5xl md:text-7xl">{data.sectionTitle}</h2>
      </div>
      <Link href="/journal" className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] md:block">
        {data.sectionViewAll}
      </Link>
    </div>
  );
}
