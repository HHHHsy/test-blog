"use client";

import { useLocale } from "./provider";

export function useTranslation() {
  const { t, locale, setLocale } = useLocale();
  return { t: t(), locale, setLocale };
}
