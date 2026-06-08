"use client";

import { useState, useEffect } from "react";

type FormData = {
  heroBadge: string;
  heroTitle: string;
  heroCta: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionViewAll: string;
  newsletterBadge: string;
  newsletterTitle: string;
  newsletterPlaceholder: string;
  newsletterSubscribe: string;
  siteName: string;
  footerDescription: string;
};

const empty: FormData = {
  heroBadge: "", heroTitle: "", heroCta: "",
  sectionLabel: "", sectionTitle: "", sectionViewAll: "",
  newsletterBadge: "", newsletterTitle: "", newsletterPlaceholder: "", newsletterSubscribe: "",
  siteName: "", footerDescription: "",
};

export function HomeForm({ saved, onSave }: { saved?: string; onSave: (json: string) => void }) {
  const [en, setEn] = useState<FormData>(empty);
  const [zh, setZh] = useState<FormData>(empty);
  const [mode, setMode] = useState<"en" | "zh">("en");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (saved && !loaded) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.en && parsed.zh) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setEn({ ...empty, ...parsed.en });
           
          setZh({ ...empty, ...parsed.zh });
        } else {
           
          setEn({ ...empty, ...parsed });
           
          setZh({ ...empty, ...parsed });
        }
        setLoaded(true);
      } catch {
        setLoaded(true);
      }
    }
  }, [saved, loaded]);

  const data = mode === "en" ? en : zh;
  function setData(v: FormData) {
    if (mode === "en") setEn(v);
    else setZh(v);
  }
  function patch(part: Partial<FormData>) { setData({ ...data, ...part }); }

  function handleSave() {
    const output = JSON.stringify({ en, zh }, null, 2);
    onSave(output);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("en")} className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${mode === "en" ? "bg-black text-white" : "border border-stone-200 text-stone-600"}`}>English</button>
        <button onClick={() => setMode("zh")} className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${mode === "zh" ? "bg-black text-white" : "border border-stone-200 text-stone-600"}`}>中文</button>
      </div>
      <Field label="Hero badge" value={data.heroBadge} onChange={(v) => patch({ heroBadge: v })} />
      <Field label="Hero title" value={data.heroTitle} onChange={(v) => patch({ heroTitle: v })} large />
      <Field label="Hero CTA button" value={data.heroCta} onChange={(v) => patch({ heroCta: v })} />
      <Field label="Section label" value={data.sectionLabel} onChange={(v) => patch({ sectionLabel: v })} />
      <Field label="Section title" value={data.sectionTitle} onChange={(v) => patch({ sectionTitle: v })} />
      <Field label="Section view all" value={data.sectionViewAll} onChange={(v) => patch({ sectionViewAll: v })} />
      <Field label="Newsletter badge" value={data.newsletterBadge} onChange={(v) => patch({ newsletterBadge: v })} />
      <Field label="Newsletter title" value={data.newsletterTitle} onChange={(v) => patch({ newsletterTitle: v })} large />
      <Field label="Newsletter placeholder" value={data.newsletterPlaceholder} onChange={(v) => patch({ newsletterPlaceholder: v })} />
      <Field label="Newsletter button" value={data.newsletterSubscribe} onChange={(v) => patch({ newsletterSubscribe: v })} />
      <Field label="Site name" value={data.siteName} onChange={(v) => patch({ siteName: v })} />
      <Field label="Footer description" value={data.footerDescription} onChange={(v) => patch({ footerDescription: v })} large />
      <SaveButton onClick={handleSave} />
    </div>
  );
}

export function AboutForm({ saved, onSave }: { saved?: string; onSave: (json: string) => void }) {
  const [intro, setIntro] = useState("");
  const [services, setServices] = useState("");
  const [clients, setClients] = useState("");
  const [ceoIntro, setCeoIntro] = useState("");
  const [committees, setCommittees] = useState<string[]>([""]);
  const [sp, setSp] = useState("");
  const [st, setSt] = useState("");
  const [sc, setSc] = useState("");

  useEffect(() => {
    if (saved) {
      try {
        const d = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIntro(d.intro ?? "");
         
        setServices(d.services ?? "");
         
        setClients(d.clients ?? "");
         
        setCeoIntro(d.ceoIntro ?? "");
         
        setCommittees(d.isoCommittees?.length ? [...d.isoCommittees] : [""]);
         
        setSp(d.serviceProjects ?? "");
         
        setSt(d.serviceTraining ?? "");
         
        setSc(d.serviceConsulting ?? "");
      } catch { /* keep defaults */ }
    }
  }, [saved]);

  function addCommittee() { setCommittees((prev) => [...prev, ""]); }
  function removeCommittee(i: number) { setCommittees((prev) => prev.filter((_, idx) => idx !== i)); }
  function setCommittee(i: number, v: string) {
    setCommittees((prev) => { const next = [...prev]; next[i] = v; return next; });
  }

  function handleSave() {
    const data = { intro, services, clients, ceoIntro, isoCommittees: committees.filter(Boolean), serviceProjects: sp, serviceTraining: st, serviceConsulting: sc };
    onSave(JSON.stringify(data, null, 2));
  }

  return (
    <div className="space-y-4">
      <Field label="Company intro" value={intro} onChange={setIntro} large />
      <Field label="Services description" value={services} onChange={setServices} large />
      <Field label="Clients" value={clients} onChange={setClients} large />
      <Field label="CEO intro" value={ceoIntro} onChange={setCeoIntro} large />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 mb-2">ISO Committees</p>
        <div className="space-y-2">
          {committees.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input value={c} onChange={(e) => setCommittee(i, e.target.value)} className="flex-1 border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#d4af37]" placeholder="e.g. ISO/TCxxx Committee Name" />
              {committees.length > 1 && <button onClick={() => removeCommittee(i)} className="text-stone-400 hover:text-red-500 text-xs px-2">&times;</button>}
            </div>
          ))}
        </div>
        <button onClick={addCommittee} className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 hover:text-black">+ Add committee</button>
      </div>
      <Field label="Service: Standard Development Project" value={sp} onChange={setSp} large />
      <Field label="Service: Standard Development Training" value={st} onChange={setSt} large />
      <Field label="Service: Management Consultation" value={sc} onChange={setSc} large />
      <SaveButton onClick={handleSave} />
    </div>
  );
}

type ResumeEntry = { period: string; company: string; location: string; title: string; description?: string };
type ResumeData = { education: ResumeEntry[]; social: ResumeEntry[]; work: ResumeEntry[] };

const emptyResumeEntry = (): ResumeEntry => ({ period: "", company: "", location: "", title: "", description: "" });
const emptyResumeData = (): ResumeData => ({ education: [], social: [], work: [] });

export function ResumeForm({ saved, onSave }: { saved?: string; onSave: (json: string) => void }) {
  const [en, setEn] = useState<ResumeData>(emptyResumeData);
  const [zh, setZh] = useState<ResumeData>(emptyResumeData);
  const [mode, setMode] = useState<"en" | "zh">("en");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (saved && !loaded) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.en && parsed.zh) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setEn({ ...emptyResumeData(), ...parsed.en });
           
          setZh({ ...emptyResumeData(), ...parsed.zh });
        } else {
           
          setEn({ ...emptyResumeData(), ...parsed });
           
          setZh({ ...emptyResumeData(), ...parsed });
        }
        setLoaded(true);
      } catch {
        setLoaded(true);
      }
    }
  }, [saved, loaded]);

  const data = mode === "en" ? en : zh;

  function setData(v: ResumeData) {
    if (mode === "en") setEn(v);
    else setZh(v);
  }

  function addEntry(section: "education" | "social" | "work") {
    const arr = data[section] ?? [];
    setData({ ...data, [section]: [...arr, emptyResumeEntry()] });
  }

  function removeEntry(section: "education" | "social" | "work", i: number) {
    setData({ ...data, [section]: data[section].filter((_, idx) => idx !== i) });
  }

  function updateEntry(section: "education" | "social" | "work", i: number, field: keyof ResumeEntry, value: string) {
    const next = data[section].map((item, idx) => idx === i ? { ...item, [field]: value } : item);
    setData({ ...data, [section]: next });
  }

  function handleSave() {
    const output = en && zh ? { en, zh } : (en ?? zh);
    onSave(JSON.stringify(output, null, 2));
  }

  const sections: Array<"education" | "social" | "work"> = ["education", "social", "work"];
  const sectionLabels: Record<string, string> = { education: "Education", social: "Social Appointments", work: "Work Experience" };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode("en")} className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${mode === "en" ? "bg-black text-white" : "border border-stone-200 text-stone-600"}`}>English</button>
        <button onClick={() => setMode("zh")} className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${mode === "zh" ? "bg-black text-white" : "border border-stone-200 text-stone-600"}`}>中文</button>
      </div>

      {sections.map((section) => (
        <div key={section} className="rounded-lg border border-stone-200 bg-[#fbf9f9] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{sectionLabels[section]}</h3>
            <button onClick={() => addEntry(section)} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 hover:text-black">+ Add</button>
          </div>
          {(data[section] ?? []).length === 0 && <p className="text-sm text-stone-400">No entries.</p>}
          {data[section].map((entry: ResumeEntry, i: number) => (
            <div key={i} className="relative mb-3 rounded border border-stone-200 bg-white p-4">
              <button onClick={() => removeEntry(section, i)} className="absolute right-2 top-2 text-stone-400 hover:text-red-500 text-xs">&times;</button>
              <div className="grid gap-3 sm:grid-cols-2">
                {( ["period", "company", "location", "title"] as const ).map((field) => (
                  <input key={field} value={entry[field] ?? ""} onChange={(e) => updateEntry(section, i, field, e.target.value)} className="w-full border-b border-stone-200 bg-transparent px-0 py-1.5 text-sm outline-none focus:border-[#d4af37]" placeholder={field} />
                ))}
              </div>
              <textarea value={entry.description ?? ""} onChange={(e) => updateEntry(section, i, "description", e.target.value)} rows={2} className="mt-2 w-full border-b border-stone-200 bg-transparent px-0 py-1.5 text-sm outline-none focus:border-[#d4af37]" placeholder="Description" />
            </div>
          ))}
        </div>
      ))}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

// ── shared widgets ──

function Field({ label, value, onChange, large }: { label: string; value: string; onChange: (v: string) => void; large?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</span>
      {large ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-2 w-full border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#d4af37]" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full border-b border-stone-300 bg-transparent px-0 py-2 text-sm outline-none focus:border-[#d4af37]" />
      )}
    </label>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
      Save
    </button>
  );
}
