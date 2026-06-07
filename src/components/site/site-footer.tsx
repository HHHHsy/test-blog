import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1fr_1.2fr] md:px-8">
        <div>
          <p className="font-serif text-3xl">ELÉGANCE</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">
            A premium journal for interiors, architecture, art, and considered living.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {["Journal", "About", "Contact"].map((label) => (
            <Link
              key={label}
              href={label === "Journal" ? "/journal" : `/${label.toLowerCase()}`}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 hover:text-black"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
