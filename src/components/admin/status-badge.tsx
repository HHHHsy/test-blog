import type { PostStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const labels: Record<PostStatus, string> = {
  DRAFT: "Draft",
  PENDING: "Pending",
  PUBLISHED: "Published",
  ARCHIVED: "Offline",
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        status === "PUBLISHED" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        status === "DRAFT" && "border-stone-200 bg-white text-stone-600",
        status === "PENDING" && "border-amber-200 bg-amber-50 text-amber-700",
        status === "ARCHIVED" && "border-zinc-300 bg-zinc-100 text-zinc-600",
      )}
    >
      {labels[status]}
    </span>
  );
}
