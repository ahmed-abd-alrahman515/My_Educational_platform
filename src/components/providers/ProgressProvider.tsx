"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { QuizResult, UserProgress } from "@/types";
import {
  applyQuizResult,
  createInitialProgress,
  loadProgress,
  resetProgress as clearProgress,
  saveProgress,
} from "@/lib/storage";
import { evaluateBadges } from "@/data/badges";
import { getTracksByCategory } from "@/data/tracks";

interface ProgressContextValue {
  progress: UserProgress;
  /** True until localStorage has hydrated (avoids SSR mismatch flashes). */
  hydrated: boolean;
  /** Record a finished quiz: updates XP, streak, tracks, and badges. */
  submitQuiz: (result: QuizResult) => string[];
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

/** Track id groups passed to the badge evaluator. */
const TRACK_IDS_BY_CATEGORY = {
  frontend: getTracksByCategory("frontend").map((t) => t.id),
  backend: getTracksByCategory("backend").map((t) => t.id),
};

/**
 * Single source of truth for player progress in the React tree. Hydrates from
 * localStorage on mount and persists on every change.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() =>
    createInitialProgress(),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  // Persist whenever progress changes (after hydration).
  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const submitQuiz = useCallback((result: QuizResult): string[] => {
    let newlyUnlocked: string[] = [];
    setProgress((prev) => {
      const advanced = applyQuizResult(prev, result);
      const unlockedIds = evaluateBadges(advanced, TRACK_IDS_BY_CATEGORY);
      newlyUnlocked = unlockedIds.filter(
        (id) => !prev.unlockedBadgeIds.includes(id),
      );
      return { ...advanced, unlockedBadgeIds: unlockedIds };
    });
    return newlyUnlocked;
  }, []);

  const reset = useCallback(() => {
    setProgress(clearProgress());
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({ progress, hydrated, submitQuiz, resetProgress: reset }),
    [progress, hydrated, submitQuiz, reset],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
