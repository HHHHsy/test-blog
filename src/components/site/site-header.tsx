"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/use-translation";
import { LanguageSwitcher } from "@/components/site/language-switcher";

export function SiteHeader({ siteName }: { siteName?: string }) {
  const { t } = useTranslation();

  const nav = [
    { href: "/journal", label: t.site.journal },
    { href: "/resume", label: t.site.resume },
    { href: "/about", label: t.site.about },
    { href: "/contact", label: t.site.contact },
  ];

  return (
    <header className="border-b border-stone-200 bg-[#fbf9f9]/95">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-serif text-2xl tracking-[0.08em]">
          {siteName ?? t.site.name}
        </Link>
        <nav className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 md:gap-9">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-black">
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
