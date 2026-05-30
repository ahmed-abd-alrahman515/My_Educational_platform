import type { Language, TextDirection } from "@/types";

export const LANGUAGES: Language[] = ["en", "ar"];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  ar: "العربية",
};

export const LANGUAGE_DIRECTION: Record<Language, TextDirection> = {
  en: "ltr",
  ar: "rtl",
};

export function getDirection(language: Language): TextDirection {
  return LANGUAGE_DIRECTION[language];
}
