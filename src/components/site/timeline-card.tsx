import type { ResumeEntry } from "@/lib/page-content";
import type { Locale } from "@/i18n/dictionaries";

const groupLabelsEn = ["Early · State-owned & Foreign", "Transition · Education", "Entrepreneurship"];
const groupLabelsZh = ["早期 · 国企与外企起步", "转型 · 教育行业深耕", "创业 · 自主经营"];

const groupRanges: [number, number][] = [
  [0, 3],   // 1989-2000
  [4, 9],   // 2003-2012
  [10, 10], // 2012-至今
];

function getGroupIndex(index: number): number {
  for (let i = 0; i < groupRanges.length; i++) {
    if (index >= groupRanges[i][0] && index <= groupRanges[i][1]) return i;
  }
  return -1;
}

function isFirstInGroup(index: number, groupIndex: number): boolean {
  return index === groupRanges[groupIndex][0];
}

export function TimelineSection({ entries, locale = "en" }: { entries: ResumeEntry[]; locale?: Locale }) {
  const labels = locale === "zh" ? groupLabelsZh : groupLabelsEn;

  return (
    <div className="relative">
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-stone-200" />
      <div className="space-y-0">
        {entries.map((entry, index) => {
          const groupIndex = getGroupIndex(index);
          return (
            <div key={index} className="group relative pl-10 pb-12 last:pb-0">
              {groupIndex >= 0 && isFirstInGroup(index, groupIndex) && (
                <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  {labels[groupIndex]}
                </div>
              )}
              <div className="absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full border-2 border-[#d4af37] bg-[#fbf9f9] transition group-hover:bg-[#d4af37]" />
              </div>
              {entry.period && (
                <span className="mb-3 inline-block rounded-full border border-stone-300 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-stone-500">
                  {entry.period}
                </span>
              )}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="font-serif text-xl leading-snug md:text-2xl">{entry.company}</h4>
                {entry.location && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {entry.location}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-stone-700">{entry.title}</p>
              {entry.description && (
                <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-500">{entry.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
