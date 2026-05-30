import type { LevelId, Question, TrackId, TrackProgress } from "@/types";
import { QUESTIONS_PER_QUIZ } from "./constants";
import { shuffle } from "./utils";
import { getQuestionsForLevel } from "@/data/questions";

/**
 * No-repeat question selection.
 *
 * Rules implemented (per track + level):
 *   1. Questions are randomized.
 *   2. Already-solved questions are skipped until the whole level pool has been
 *      solved, at which point the solved set "wraps" and selection starts over.
 *   3. The set of solved ids lives in TrackProgress.solvedByLevel (localStorage).
 *
 * Returns up to QUESTIONS_PER_QUIZ questions, preferring unsolved ones and
 * topping up with solved ones only if the unsolved pool is too small (so the
 * player always gets a full-length session when enough questions exist).
 */
export function selectLevelQuestions(
  trackId: TrackId,
  level: LevelId,
  trackProgress: TrackProgress | undefined,
  limit: number = QUESTIONS_PER_QUIZ,
): Question[] {
  const pool = getQuestionsForLevel(trackId, level);
  if (pool.length === 0) return [];

  const solvedIds = new Set(trackProgress?.solvedByLevel?.[level] ?? []);

  // If everything has been solved, treat the pool as fresh again.
  const allSolved = pool.every((q) => solvedIds.has(q.id));
  const effectiveSolved = allSolved ? new Set<string>() : solvedIds;

  const unsolved = shuffle(pool.filter((q) => !effectiveSolved.has(q.id)));
  const solved = shuffle(pool.filter((q) => effectiveSolved.has(q.id)));

  // Prefer unsolved; only top up from solved if needed to reach the limit.
  return [...unsolved, ...solved].slice(0, limit);
}

/**
 * Merge newly solved ids into a level's solved set. When every question in the
 * level has now been solved, the set is cleared so the pool can repeat fresh
 * (rule: "should not repeat until all level questions are completed").
 */
export function mergeSolved(
  trackId: TrackId,
  level: LevelId,
  existing: string[] | undefined,
  newlySolved: string[],
): string[] {
  const pool = getQuestionsForLevel(trackId, level);
  const poolIds = new Set(pool.map((q) => q.id));

  // Keep only ids that still exist in the pool (guards against stale data).
  const merged = new Set(
    [...(existing ?? []), ...newlySolved].filter((id) => poolIds.has(id)),
  );

  // Pool exhausted → reset so questions can cycle again.
  if (pool.length > 0 && merged.size >= pool.length) return [];

  return [...merged];
}
