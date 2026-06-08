"use client";

import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/use-translation";

export function ContactHeader() {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{t.contact.badge}</p>
      <h1 className="mt-5 font-serif text-6xl leading-none md:text-8xl">{t.contact.title}</h1>
      <p className="mt-7 max-w-lg text-lg leading-8 text-stone-600">{t.contact.description}</p>
      <div className="mt-10 space-y-4 text-sm text-stone-600">
        <p className="flex items-center gap-3"><Mail size={17} /> {t.contact.emailAddr}</p>
        <p className="flex items-center gap-3"><MapPin size={17} /> {t.contact.address}</p>
      </div>
    </div>
  );
}

export function ContactForm() {
  const { t } = useTranslation();
  return (
    <form className="space-y-5 border border-stone-200 bg-[#fbf9f9] p-5 md:p-8">
      {[t.contact.name, t.contact.email, t.contact.subject].map((label) => (
        <label key={label} className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</span>
          <input className="mt-2 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 outline-none focus:border-[#d4af37]" />
        </label>
      ))}
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{t.contact.message}</span>
        <textarea className="mt-2 min-h-40 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 outline-none focus:border-[#d4af37]" />
      </label>
      <button className="bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
        {t.contact.send}
      </button>
    </form>
  );
}
