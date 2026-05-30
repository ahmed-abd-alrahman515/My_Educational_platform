import type {
  Language,
  LevelResult,
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
import { mergeSolved } from "./question-selection";

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
    return migrate(parsed);
  } catch {
    return createInitialProgress();
  }
}

/**
 * Forward-migrate stored progress to the current schema. Migrations are
 * additive and non-destructive: older saves gain new fields with safe
 * defaults. v1 → v2 introduced per-level solved-question tracking.
 */
function migrate(progress: UserProgress): UserProgress {
  if (progress.version >= PROGRESS_SCHEMA_VERSION) return progress;

  const tracks: UserProgress["tracks"] = {};
  for (const [id, tp] of Object.entries(progress.tracks)) {
    tracks[id] = { ...tp, solvedByLevel: tp.solvedByLevel ?? {} };
  }

  return { ...progress, version: PROGRESS_SCHEMA_VERSION, tracks };
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
    solvedByLevel: {},
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

/**
 * Apply a finished level from the quiz engine. Unlike `applyQuizResult`, this
 * also persists the no-repeat solved-question set and clamps the per-track XP
 * floor at zero (penalties can't push a track negative). `result.xpEarned`
 * already includes per-question scoring; the level-completion bonus is added
 * separately by the caller into the same field, so this reducer treats it as a
 * single net delta.
 */
export function applyLevelResult(
  progress: UserProgress,
  result: LevelResult,
): UserProgress {
  const today = todayKey();
  const percent = result.total > 0 ? (result.score / result.total) * 100 : 0;
  const passed = result.passed;

  const existing =
    progress.tracks[result.trackId] ?? emptyTrackProgress(result.trackId);

  const completedLevels = new Set(existing.completedLevels);
  if (passed) completedLevels.add(result.level);

  // Merge newly solved ids (wraps to empty once the level pool is exhausted).
  const solvedByLevel = { ...(existing.solvedByLevel ?? {}) };
  solvedByLevel[result.level] = mergeSolved(
    result.trackId,
    result.level,
    solvedByLevel[result.level],
    result.solvedQuestionIds,
  );

  const updatedTrack: TrackProgress = {
    ...existing,
    attempts: existing.attempts + 1,
    totalXp: Math.max(0, existing.totalXp + result.xpEarned),
    bestScorePercent: Math.max(existing.bestScorePercent, percent),
    completedLevels: [...completedLevels],
    bestLevel: passed
      ? highestLevel(existing.bestLevel, result.level)
      : existing.bestLevel,
    solvedByLevel,
  };

  const historyEntry: QuizResult = {
    trackId: result.trackId,
    level: result.level,
    score: result.score,
    total: result.total,
    xpEarned: result.xpEarned,
    completedAt: result.completedAt,
  };

  return {
    ...progress,
    totalXp: Math.max(0, progress.totalXp + result.xpEarned),
    streak: nextStreak(progress),
    lastActiveDate: today,
    tracks: { ...progress.tracks, [result.trackId]: updatedTrack },
    history: [historyEntry, ...progress.history].slice(0, 50),
  };
}
