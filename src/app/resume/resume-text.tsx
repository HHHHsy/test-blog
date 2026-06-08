"use client";

import { useTranslation } from "@/i18n/use-translation";

export function ResumeHeader() {
  const { t } = useTranslation();
  return (
    <div className="mb-14 border-b border-stone-200 pb-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{t.resume.badge}</p>
      <h1 className="mt-5 font-serif text-6xl leading-none md:text-8xl">{t.resume.title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600">{t.resume.description}</p>
    </div>
  );
}
