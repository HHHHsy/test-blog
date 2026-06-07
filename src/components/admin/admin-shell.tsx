"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Newspaper, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/", label: "View Site", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-100 text-stone-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-stone-200 bg-[#fbf9f9] p-5 md:block">
        <Link href="/admin" className="block font-serif text-2xl tracking-[0.08em]">
          ELÉGANCE
        </Link>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
          Editorial CMS
        </p>
        <nav className="mt-10 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm text-stone-600 transition",
                  active && "bg-black text-white",
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="md:pl-64">
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-stone-200 bg-[#fbf9f9]/95 px-5 md:px-8">
          <p className="text-sm font-semibold">Admin</p>
          <Link href="/admin/posts/new" className="bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            New Post
          </Link>
        </div>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
