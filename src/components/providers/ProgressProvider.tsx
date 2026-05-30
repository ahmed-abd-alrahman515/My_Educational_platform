"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { LevelResult, QuizResult, UserProgress } from "@/types";
import {
  applyLevelResult,
  applyQuizResult,
  createInitialProgress,
  loadProgress,
  resetProgress as clearProgress,
  saveProgress,
} from "@/lib/storage";
import { evaluateBadges } from "@/data/badges";
import { getTracksByCategory } from "@/data/tracks";

/** Returned after submitting a level so the UI can celebrate appropriately. */
export interface LevelSubmitOutcome {
  /** Badge ids unlocked by this submission (not previously held). */
  newBadgeIds: string[];
  /** The progress snapshot immediately after applying the result. */
  progress: UserProgress;
}

interface ProgressContextValue {
  progress: UserProgress;
  /** True until localStorage has hydrated (avoids SSR mismatch flashes). */
  hydrated: boolean;
  /** Record a finished quiz: updates XP, streak, tracks, and badges. */
  submitQuiz: (result: QuizResult) => string[];
  /** Record a finished engine level: scoring, solved-ids, badges. */
  submitLevel: (result: LevelResult) => LevelSubmitOutcome;
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

  // Mirror of the latest progress for synchronous reads inside callbacks.
  const progressRef = useRef(progress);
  progressRef.current = progress;

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

  const submitLevel = useCallback((result: LevelResult): LevelSubmitOutcome => {
    let outcome: LevelSubmitOutcome = { newBadgeIds: [], progress: progressRef.current };
    setProgress((prev) => {
      const advanced = applyLevelResult(prev, result);
      const unlockedIds = evaluateBadges(advanced, TRACK_IDS_BY_CATEGORY);
      const newBadgeIds = unlockedIds.filter(
        (id) => !prev.unlockedBadgeIds.includes(id),
      );
      const next = { ...advanced, unlockedBadgeIds: unlockedIds };
      outcome = { newBadgeIds, progress: next };
      return next;
    });
    return outcome;
  }, []);

  const reset = useCallback(() => {
    setProgress(clearProgress());
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({ progress, hydrated, submitQuiz, submitLevel, resetProgress: reset }),
    [progress, hydrated, submitQuiz, submitLevel, reset],
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
