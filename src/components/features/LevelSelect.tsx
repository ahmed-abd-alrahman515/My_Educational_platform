"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import type { LevelId, Track } from "@/types";
import { Pill } from "@/components/ui/Pill";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getQuestionsForLevel } from "@/data/questions";
import { cn } from "@/lib/utils";

interface LevelSelectProps {
  track: Track;
  onSelect: (level: LevelId) => void;
}

/** Choose a difficulty level for a track before starting the quiz. */
export function LevelSelect({ track, onSelect }: LevelSelectProps) {
  const { tc, t } = useLanguage();
  const { progress } = useProgress();
  const tp = progress.tracks[track.id];

  return (
    <AnimatePresence>
      <div className="grid gap-4 sm:grid-cols-3">
        {track.levels.map((level, i) => {
          const completed = tp?.completedLevels.includes(level.id) ?? false;
          const available = getQuestionsForLevel(track.id, level.id).length > 0;

          return (
            <motion.button
              key={level.id}
              type="button"
              disabled={!available}
              onClick={() => onSelect(level.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative flex flex-col items-start gap-3 rounded-2xl border border-line p-5 text-start transition-all",
                available
                  ? "bg-surface hover:border-primary/50 hover:shadow-glow"
                  : "cursor-not-allowed bg-surface/40 opacity-60",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <Pill
                  tone={
                    level.id === "beginner"
                      ? "success"
                      : level.id === "intermediate"
                        ? "warning"
                        : "accent"
                  }
                >
                  {tc(level.title)}
                </Pill>
                {completed ? (
                  <Check className="h-4 w-4 text-success" />
                ) : !available ? (
                  <Lock className="h-4 w-4 text-muted" />
                ) : null}
              </div>
              <p className="text-sm text-muted">
                ×{level.xpMultiplier} {t("common.xp")}
              </p>
            </motion.button>
          );
        })}
      </div>
    </AnimatePresence>
  );
}
