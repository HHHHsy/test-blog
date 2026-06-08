"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { HomeForm, AboutForm, ResumeForm } from "@/components/admin/page-forms";

const pageLabels: Record<string, string> = {
  home: "Home / 首页",
  about: "About / 关于我们",
  resume: "Resume / 个人履历",
};

export default function EditPageContent() {
  const { key } = useParams<{ key: string }>();
  const router = useRouter();
  const [savedJson, setSavedJson] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${key}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setSavedJson(data.contentHtml))
      .catch(() => setSavedJson("{}"));
  }, [key]);

  async function handleSave(json: string) {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/pages/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: pageLabels[key] ?? key, contentHtml: json }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSavedJson(json);
      setMessage("Saved successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (e: unknown) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Page Content Editor
          </p>
          <h1 className="mt-3 font-serif text-5xl">
            {pageLabels[key] ?? key}
          </h1>
        </div>
        <button
          onClick={() => router.push("/admin/pages")}
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500"
        >
          &larr; Back
        </button>
      </div>

      <div className="rounded-lg border border-stone-200 bg-[#fbf9f9] p-6">
        {key === "home" && <HomeForm saved={savedJson} onSave={handleSave} />}
        {key === "about" && <AboutForm saved={savedJson} onSave={handleSave} />}
        {key === "resume" && <ResumeForm saved={savedJson} onSave={handleSave} />}
        {!["home", "about", "resume"].includes(key) && (
          <p className="text-stone-500">Unknown page key: {key}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {saving && <span className="text-sm text-stone-500">Saving...</span>}
        {message && (
          <span className={`text-sm ${message === "Saved successfully!" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
