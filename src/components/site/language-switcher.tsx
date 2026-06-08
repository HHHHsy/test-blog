"use client";

import { useLocale } from "@/i18n/provider";
import { type Locale, locales } from "@/i18n/dictionaries";
import { Globe } from "lucide-react";

const labels: Record<Locale, string> = { en: "EN", zh: "中文" };

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  function toggle() {
    const next = locales[(locales.indexOf(locale) + 1) % locales.length];
    setLocale(next);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400 transition hover:text-black"
      title="Switch language"
    >
      <Globe size={14} />
      <span>{labels[locale]}</span>
    </button>
  );
}
