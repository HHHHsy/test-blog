"use client";

import { useTranslation } from "@/i18n/use-translation";
import { useLocale } from "@/i18n/provider";
import { formatDate } from "@/lib/utils";

export function DetailMeta({ category, publishedAt }: { category: string; publishedAt?: Date | string | null }) {
  const { locale } = useLocale();
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
      {category} / {formatDate(publishedAt, locale)}
    </p>
  );
}

export function ContinueReading() {
  const { t } = useTranslation();
  return <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{t.journalDetail.continueReading}</p>;
}
