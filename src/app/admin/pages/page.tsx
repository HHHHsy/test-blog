import Link from "next/link";
import { Edit3 } from "lucide-react";
import { getAllPageKeys } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PagesAdminPage() {
  const pages = await getAllPageKeys();

  // If no pages exist yet, show defaults
  const knownPages: Record<string, string> = {
    home: "Home / 首页",
    about: "About / 关于我们",
    resume: "Resume / 个人履历",
  };

  if (pages.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Page Content</p>
          <h1 className="mt-3 font-serif text-5xl">Pages</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
            Manage structured page content for public-facing pages. Click &quot;Edit&quot; to modify the JSON data.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(knownPages).map(([key, title]) => (
            <div key={key} className="border border-stone-200 bg-[#fbf9f9] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{key}</p>
              <h2 className="mt-4 font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-sm text-stone-500">Not yet saved &mdash; frontend uses default content.</p>
              <Link
                href={`/admin/pages/${key}/edit`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                <Edit3 size={15} /> Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Page Content</p>
        <h1 className="mt-3 font-serif text-5xl">Pages</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
          Manage structured page content. Click &quot;Edit&quot; to modify.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <div key={page.key} className="border border-stone-200 bg-[#fbf9f9] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{page.key}</p>
            <h2 className="mt-4 font-serif text-3xl">{page.title}</h2>
            <p className="mt-3 text-xs text-stone-400">
              Updated: {page.updatedAt?.toLocaleDateString() ?? "—"}
            </p>
            <Link
              href={`/admin/pages/${page.key}/edit`}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              <Edit3 size={15} /> Edit
            </Link>
          </div>
        ))}
        {/* Also show pages not yet saved */}
        {Object.entries(knownPages)
          .filter(([k]) => !pages.find((p) => p.key === k))
          .map(([key, title]) => (
            <div key={key} className="border border-stone-200 bg-[#fbf9f9] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{key}</p>
              <h2 className="mt-4 font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-sm text-stone-500">Not yet saved.</p>
              <Link
                href={`/admin/pages/${key}/edit`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                <Edit3 size={15} /> Edit
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
