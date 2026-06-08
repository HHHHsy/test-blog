import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value?: Date | string | null, locale = "en") {
  if (!value) return locale === "zh" ? "未排期" : "Unscheduled";
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
