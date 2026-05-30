import type {
  Language,
  QuizResult,
  Theme,
  TrackId,
  TrackProgress,
  UserProgress,
} from "@/types";
import {
  PASS_THRESHOLD,
  PROGRESS_SCHEMA_VERSION,
  STORAGE_KEYS,
} from "./constants";
import { daysBetween, todayKey } from "./utils";
import { LEVEL_ORDER } from "@/data/levels";

/**
 * localStorage progress system.
 *
 * This module is the ONLY place that touches localStorage for progress. It is
 * SSR-safe (guards `window`), validates the stored shape, and exposes pure-ish
 * reducer helpers (`applyQuizResult`) so the React layer stays thin.
 */

export function createInitialProgress(
  language: Language = "en",
  theme: Theme = "system",
): UserProgress {
  return {
    version: PROGRESS_SCHEMA_VERSION,
    language,
    theme,
    totalXp: 0,
    streak: 0,
    lastActiveDate: null,
    unlockedBadgeIds: [],
    tracks: {},
    history: [],
  };
}

/** True when running in a browser with localStorage available. */
function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/** Minimal runtime validation; falls back to a fresh object on mismatch. */
function isValidProgress(value: unknown): value is UserProgress {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<UserProgress>;
  return (
    typeof v.version === "number" &&
    typeof v.totalXp === "number" &&
    Array.isArray(v.history) &&
    typeof v.tracks === "object"
  );
}

export function loadProgress(): UserProgress {
  if (!hasStorage()) return createInitialProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.progress);
    if (!raw) return createInitialProgress();
    const parsed = JSON.parse(raw);
    if (!isValidProgress(parsed)) return createInitialProgress();
    // Future: run migrations here when parsed.version < PROGRESS_SCHEMA_VERSION.
    return parsed;
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(
      STORAGE_KEYS.progress,
      JSON.stringify(progress),
    );
  } catch {
    /* storage full or unavailable — fail silently */
  }
}

export function resetProgress(): UserProgress {
  if (hasStorage()) {
    window.localStorage.removeItem(STORAGE_KEYS.progress);
  }
  return createInitialProgress();
}

/* -------------------------------------------------------------------------- */
/*  Reducers (pure: take state + event, return next state)                     */
/* -------------------------------------------------------------------------- */

function emptyTrackProgress(trackId: TrackId): TrackProgress {
  return {
    trackId,
    bestLevel: null,
    completedLevels: [],
    totalXp: 0,
    bestScorePercent: 0,
    attempts: 0,
  };
}

/** Recompute the daily streak based on the last active date. */
function nextStreak(progress: UserProgress): number {
  const today = todayKey();
  if (!progress.lastActiveDate) return 1;
  const gap = daysBetween(progress.lastActiveDate, today);
  if (gap === 0) return progress.streak || 1;
  if (gap === 1) return progress.streak + 1;
  return 1; // streak broken
}

/**
 * Apply a completed quiz to progress. Returns a new UserProgress object;
 * badge unlocking is layered on top by the badges module.
 */
export function applyQuizResult(
  progress: UserProgress,
  result: QuizResult,
): UserProgress {
  const today = todayKey();
  const percent = result.total > 0 ? (result.score / result.total) * 100 : 0;
  const passed = percent >= PASS_THRESHOLD;

  const existing =
    progress.tracks[result.trackId] ?? emptyTrackProgress(result.trackId);

  const completedLevels = new Set(existing.completedLevels);
  if (passed) completedLevels.add(result.level);

  const updatedTrack: TrackProgress = {
    ...existing,
    attempts: existing.attempts + 1,
    totalXp: existing.totalXp + result.xpEarned,
    bestScorePercent: Math.max(existing.bestScorePercent, percent),
    completedLevels: [...completedLevels],
    bestLevel: passed
      ? highestLevel(existing.bestLevel, result.level)
      : existing.bestLevel,
  };

  return {
    ...progress,
    totalXp: progress.totalXp + result.xpEarned,
    streak: nextStreak(progress),
    lastActiveDate: today,
    tracks: { ...progress.tracks, [result.trackId]: updatedTrack },
    history: [result, ...progress.history].slice(0, 50),
  };
}

function highestLevel(
  a: TrackProgress["bestLevel"],
  b: TrackProgress["bestLevel"],
): TrackProgress["bestLevel"] {
  if (!a) return b;
  if (!b) return a;
  return LEVEL_ORDER.indexOf(a) >= LEVEL_ORDER.indexOf(b) ? a : b;
}
