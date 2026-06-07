import Link from "next/link";
import { Edit3 } from "lucide-react";

const pages = [
  { key: "home", title: "Home", path: "/" },
  { key: "journal", title: "Journal Index", path: "/journal" },
  { key: "about", title: "About", path: "/about" },
  { key: "contact", title: "Contact", path: "/contact" },
];

export default function PagesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">WYSIWYG-ready</p>
        <h1 className="mt-3 font-serif text-5xl">Pages</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
          These public pages are structured to accept editable page content. The post editor is fully wired now; page-level editing can reuse the same editor surface.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pages.map((page) => (
          <div key={page.key} className="border border-stone-200 bg-[#fbf9f9] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{page.key}</p>
            <h2 className="mt-4 font-serif text-3xl">{page.title}</h2>
            <Link href={page.path} className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <Edit3 size={15} /> Preview
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
