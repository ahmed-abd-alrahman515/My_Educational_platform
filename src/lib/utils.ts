import type { Language, LocalizedText } from "@/types";

/**
 * Tiny className combiner (avoids pulling in clsx/tailwind-merge for the
 * scaffold). Filters falsy values and joins with spaces.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Safely resolve a LocalizedText for the active language. */
export function t(text: LocalizedText, language: Language): string {
  return text[language] ?? text.en;
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Format a number with locale-aware grouping. */
export function formatNumber(value: number, language: Language): string {
  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US").format(
    value,
  );
}

/** Shuffle an array (Fisher–Yates), returning a new array. */
export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Today's date as YYYY-MM-DD (local time). */
export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Whole days between two YYYY-MM-DD date keys. */
export function daysBetween(a: string, b: string): number {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}
