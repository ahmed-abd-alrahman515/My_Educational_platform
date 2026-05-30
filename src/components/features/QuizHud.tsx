"use client";

import { motion } from "framer-motion";
import { Flame, Target, Zap } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface QuizHudProps {
  /** Questions answered so far. */
  answered: number;
  total: number;
  score: number;
  streak: number;
  xp: number;
}

/** Sticky heads-up display showing live score, streak, XP, and progress. */
export function QuizHud({ answered, total, score, streak, xp }: QuizHudProps) {
  const { t } = useLanguage();
  const progress = total > 0 ? answered / total : 0;

  const stats = [
    {
      icon: Target,
      label: t("engine.score"),
      value: `${score}/${total}`,
      tone: "text-primary",
    },
    {
      icon: Flame,
      label: t("engine.streak"),
      value: streak,
      tone: streak > 0 ? "text-orange-500" : "text-muted",
    },
    {
      icon: Zap,
      label: t("engine.xp"),
      value: xp,
      tone: "text-accent",
    },
  ];

  return (
    <div className="sticky top-16 z-30 rounded-2xl border border-line glass p-4 shadow-card">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => {
          const SIcon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2",
                  s.tone,
                )}
              >
                <SIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <motion.p
                  key={String(s.value)}
                  initial={{ scale: 1.3, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="text-lg font-bold leading-none tabular-nums"
                >
                  {s.value}
                </motion.p>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted">
          <span>{t("engine.progress")}</span>
          <span className="tabular-nums">
            {answered}/{total}
          </span>
        </div>
        <ProgressBar value={progress} />
      </div>
    </div>
  );
}
