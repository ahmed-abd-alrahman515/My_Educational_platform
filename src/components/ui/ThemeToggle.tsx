"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Icon button that flips between light and dark themes with a soft animation. */
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-foreground transition-colors hover:bg-surface-2 hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
