import { cookies } from "next/headers";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ResumeHeader } from "./resume-text";
import { TimelineSection } from "@/components/site/timeline-card";
import { loadResumeData } from "@/lib/page-content";
import type { Locale } from "@/i18n/dictionaries";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "zh" ? "zh" : "en";
  const data = await loadResumeData(locale);

  const labels = {
    education: locale === "zh" ? "教育背景" : "Education",
    social: locale === "zh" ? "社会职务" : "Social appointments",
    experience: locale === "zh" ? "职业经历" : "Professional experience",
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <ResumeHeader />

        {/* Education */}
        <section className="mb-20">
          <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            {labels.education}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.education.map((entry, i) => (
              <div key={i} className="border border-stone-200 bg-[#fbf9f9] p-6 md:p-8">
                <span className="inline-block rounded-full border border-[#d4af37] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-stone-600">
                  {entry.period}
                </span>
                <h3 className="mt-4 font-serif text-2xl">{entry.company}</h3>
                <p className="mt-1 text-sm font-medium text-stone-600">{entry.title}</p>
                {entry.location && (
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {entry.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Social roles */}
        <section className="mb-20">
          <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            {labels.social}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.social.map((entry, i) => (
              <div key={i} className="border border-stone-200 p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl">{entry.company}</h3>
                <p className="mt-1 text-sm font-medium text-stone-600">{entry.title}</p>
                {entry.description && (
                  <p className="mt-3 text-sm leading-7 text-stone-500">{entry.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Work experience timeline */}
        <section>
          <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            {labels.experience}
          </h2>
          <TimelineSection entries={data.work} locale={locale} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
