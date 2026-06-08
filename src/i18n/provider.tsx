"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { type Locale, type Dictionary, defaultLocale, getDictionary } from "./dictionaries";

type I18nContext = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: () => Dictionary;
};

const ctx = createContext<I18nContext | null>(null);

const STORAGE_KEY = "elegance-locale";
const COOKIE_KEY = "locale";

function setCookie(locale: Locale) {
  try {
    document.cookie = `${COOKIE_KEY}=${locale};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  } catch {}
}

export function I18nProvider({ children, initialLocale = defaultLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Sync localStorage after hydration — but only if different from server
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "zh") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(stored);
        document.documentElement.lang = stored;
        setCookie(stored);
      }
    } catch {}
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {}
    setCookie(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(() => getDictionary(locale), [locale]);

  return <ctx.Provider value={{ locale, setLocale, t }}>{children}</ctx.Provider>;
}

export function useLocale() {
  const c = useContext(ctx);
  if (!c) throw new Error("useLocale must be used within I18nProvider");
  return c;
}
