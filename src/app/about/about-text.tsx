"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/use-translation";
import type { AboutData } from "@/lib/page-content";

export function AboutHero({ data }: { data: AboutData }) {
  const { t } = useTranslation();
  return (
    <section className="relative mb-24 overflow-hidden bg-black pb-24 pt-24 text-white md:pb-32 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/80" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">{t.about.badge}</p>
        <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
          {t.about.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
          {data.intro}
        </p>
      </div>
    </section>
  );
}

export function AboutServices() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="mb-12 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">What we do</p>
        <h2 className="mt-4 font-serif text-5xl md:text-6xl">{t.about.badge}</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="group border border-stone-200 bg-[#fbf9f9] p-8 md:p-10">
          <div className="mb-6 h-px w-12 bg-[#d4af37]" />
          <h3 className="font-serif text-2xl md:text-3xl">Educational Services</h3>
          <p className="mt-4 text-base leading-8 text-stone-600">
            Curriculum design, staff training, learning assessment, multimedia classroom design, virtual school design, on-line course design, digital learning system design.
          </p>
        </div>
        <div className="group border border-stone-200 bg-[#fbf9f9] p-8 md:p-10">
          <div className="mb-6 h-px w-12 bg-[#d4af37]" />
          <h3 className="font-serif text-2xl md:text-3xl">Management Consulting</h3>
          <p className="mt-4 text-base leading-8 text-stone-600">
            Branding, HR management, marketing, sales, operation, customer service, supply chain management.
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutClients({ data }: { data: AboutData }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
      <div className="border-t border-stone-200 pt-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">Clients</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Our clients</h2>
          </div>
          <div className="border-l border-stone-200 pl-8 md:pl-12">
            <p className="text-lg leading-8 text-stone-600">{data.clients}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutStandards({ data }: { data: AboutData }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
      <div className="border-t border-stone-200 pt-16">
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">Leadership</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Standards &amp; Leadership</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-8 text-stone-600">{data.ceoIntro}</p>
          </div>
          <div className="border-l border-stone-200 pl-8 md:pl-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              ISO Committees
            </p>
            <div className="flex flex-wrap gap-2">
              {data.isoCommittees.map((item, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full border border-stone-300 px-3 py-1.5 text-[10px] font-medium leading-tight text-stone-600 transition hover:border-[#d4af37] hover:text-[#d4af37]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutServiceDetail({ data }: { data: AboutData }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
      <div className="border-t border-stone-200 pt-16">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">Services</p>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl">In detail</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Standard Development Project", desc: data.serviceProjects },
            { title: "Standard Development Training", desc: data.serviceTraining },
            { title: "Management Consultation", desc: data.serviceConsulting },
          ].map((item, i) => (
            <div key={i} className="group border border-stone-200 p-8 transition hover:border-stone-400">
              <span className="font-serif text-5xl text-stone-200">0{i + 1}</span>
              <h3 className="mt-6 font-serif text-xl md:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutCta() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 py-20 md:px-8">
      <div className="border-y border-stone-200 py-16 text-center">
        <h2 className="font-serif text-4xl italic md:text-5xl">Let&apos;s work together</h2>
        <div className="mt-10 flex items-center justify-center gap-8">
          <Link
            href="/contact"
            className="bg-black px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-stone-800"
          >
            Contact us
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500 transition hover:text-black"
          >
            <span className="h-px w-6 bg-stone-400" />
            {t.site.resume}
          </Link>
        </div>
      </div>
    </section>
  );
}
