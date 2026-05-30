"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/types";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Language; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "ar", label: "ع" },
];

/**
 * Segmented EN / ع switcher. Shows both languages with an animated pill
 * highlighting the active one, and flips layout direction on selection.
 */
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="relative inline-flex h-10 items-center rounded-xl border border-line bg-surface p-1"
    >
      {OPTIONS.map((opt) => {
        const active = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLanguage(opt.id)}
            aria-pressed={active}
            aria-label={opt.id === "en" ? "English" : "العربية"}
            className={cn(
              "relative z-10 grid h-8 w-9 place-items-center rounded-lg text-sm font-semibold transition-colors",
              active ? "text-primary-foreground" : "text-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={opt.id === "ar" ? "font-arabic text-base" : "font-mono"}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
