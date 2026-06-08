"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/use-translation";

export function SiteFooter({ description }: { description?: string }) {
  const { t } = useTranslation();

  return (
    <footer className="mt-24 border-t border-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1fr_1.2fr] md:px-8">
        <div>
          <p className="font-serif text-3xl">{t.site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">
            {description ?? t.footer.description}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { href: "/journal", label: t.site.journal },
            { href: "/resume", label: t.site.resume },
            { href: "/about", label: t.site.about },
            { href: "/contact", label: t.site.contact },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
