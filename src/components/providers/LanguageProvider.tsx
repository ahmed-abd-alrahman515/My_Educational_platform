"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Language, LocalizedText } from "@/types";
import { DEFAULT_LANGUAGE, getDirection } from "@/i18n/config";
import {
  getTranslations,
  type TranslationKey,
} from "@/i18n/translations";

interface LanguageContextValue {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /** Translate a UI dictionary key. */
  t: (key: TranslationKey) => string;
  /** Resolve a bilingual content string for the active language. */
  tc: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_KEY = "codequest:language";

/**
 * Provides the active language, direction, and translation helpers. Keeps the
 * <html lang> and <html dir> attributes in sync so RTL works platform-wide.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY) as Language | null;
    if (stored === "en" || stored === "ar") setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(LANG_KEY, lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en");
  }, [language, setLanguage]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = getTranslations(language);
    return {
      language,
      dir: getDirection(language),
      setLanguage,
      toggleLanguage,
      t: (key) => dict[key] ?? key,
      tc: (text) => text[language] ?? text.en,
    };
  }, [language, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
