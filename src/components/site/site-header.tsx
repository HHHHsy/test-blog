import Link from "next/link";

const nav = [
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-[#fbf9f9]/95">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-serif text-2xl tracking-[0.08em]">
          ELÉGANCE
        </Link>
        <nav className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 md:gap-9">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
