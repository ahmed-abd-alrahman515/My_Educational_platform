"use client";

import type { Level } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface DifficultyPathProps {
  levels: Level[];
  /** ids of levels the player has completed. */
  completedLevelIds?: string[];
}

const DOT_TONE: Record<string, string> = {
  beginner: "bg-success",
  intermediate: "bg-warning",
  advanced: "bg-accent",
};

/**
 * Compact "Beginner → Intermediate → Advanced" path with connecting segments.
 * Completed levels are filled; remaining ones are muted.
 */
export function DifficultyPath({
  levels,
  completedLevelIds = [],
}: DifficultyPathProps) {
  const { tc } = useLanguage();
  const done = new Set(completedLevelIds);

  return (
    <div className="flex items-center gap-1.5">
      {levels.map((level, i) => {
        const isDone = done.has(level.id);
        return (
          <div key={level.id} className="flex items-center gap-1.5">
            <span
              title={tc(level.title)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                isDone ? DOT_TONE[level.id] ?? "bg-primary" : "bg-line",
              )}
            />
            {i < levels.length - 1 && (
              <span
                className={cn(
                  "h-px w-4 transition-colors",
                  isDone ? "bg-primary/40" : "bg-line",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
