"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Button that switches between English and Arabic (and flips direction). */
export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("lang.toggle")}
      title={t("lang.toggle")}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
    >
      <Languages className="h-4 w-4" />
      <span className="font-mono">{language === "en" ? "EN" : "ع"}</span>
    </button>
  );
}
