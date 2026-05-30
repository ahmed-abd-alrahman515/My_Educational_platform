import type { Track, TrackProgress } from "@/types";
import { getQuestionCount } from "@/data/questions";
import { PASS_THRESHOLD } from "./constants";
import { clamp } from "./utils";

/** Lifecycle status of a track for the current player. */
export type TrackStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "coming-soon";

export interface TrackStatusInfo {
  status: TrackStatus;
  /** 0–1 completion ratio (completed levels / total levels). */
  progress: number;
  /** Best score percent achieved across attempts. */
  bestScorePercent: number;
  /** Whether any questions exist yet (false ⇒ "coming-soon"/locked). */
  available: boolean;
  totalQuestions: number;
}

/**
 * Derives a track's status + progress from the player's stored progress.
 *
 * Rules:
 * - No questions in the bank yet      → "coming-soon" (locked visual)
 * - No attempts                       → "not-started"
 * - All levels passed                 → "completed"
 * - Otherwise                         → "in-progress"
 */
export function getTrackStatus(
  track: Track,
  trackProgress: TrackProgress | undefined,
): TrackStatusInfo {
  const totalQuestions = getQuestionCount(track.id);
  const available = totalQuestions > 0;

  if (!available) {
    return {
      status: "coming-soon",
      progress: 0,
      bestScorePercent: 0,
      available: false,
      totalQuestions: 0,
    };
  }

  const totalLevels = track.levels.length;
  const completedLevels = trackProgress?.completedLevels.length ?? 0;
  const attempts = trackProgress?.attempts ?? 0;
  const progress = totalLevels > 0 ? clamp(completedLevels / totalLevels, 0, 1) : 0;
  const bestScorePercent = trackProgress?.bestScorePercent ?? 0;

  let status: TrackStatus;
  if (attempts === 0) status = "not-started";
  else if (completedLevels >= totalLevels) status = "completed";
  else status = "in-progress";

  return { status, progress, bestScorePercent, available, totalQuestions };
}

/** Whether a best-score percent counts as a pass (shared threshold). */
export function isPassing(percent: number): boolean {
  return percent >= PASS_THRESHOLD;
}
