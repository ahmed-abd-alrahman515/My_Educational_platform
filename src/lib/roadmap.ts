import type { Level, Track, TrackProgress } from "@/types";
import { LEVEL_ORDER } from "@/data/levels";
import { getQuestionsForLevel } from "@/data/questions";
import { questionXp } from "./xp";

/** Lifecycle state of a single roadmap level for the current player. */
export type LevelState = "locked" | "unlocked" | "completed";

export interface RoadmapNode {
  level: Level;
  /** Position in the roadmap (0-based). */
  index: number;
  state: LevelState;
  /** Number of questions available for this level. */
  questionCount: number;
  /** Total XP obtainable (sum of question XP × multiplier) + completion reward. */
  potentialXp: number;
  /** 0–1 progress: 1 when completed, otherwise 0 (levels are pass/fail units). */
  progress: number;
  /** True when there are no questions yet (shown as "coming soon" but unlock-aware). */
  empty: boolean;
}

/**
 * Sequential unlock rules:
 *   - The first level (Beginner) is always unlocked.
 *   - Every subsequent level unlocks only once the previous one is completed.
 *   - A level is "completed" when it's in the player's completedLevels set.
 *
 * This is computed purely from TrackProgress so it stays in sync with the
 * localStorage progress system and works for any track dynamically.
 */
export function buildRoadmap(
  track: Track,
  trackProgress: TrackProgress | undefined,
): RoadmapNode[] {
  const completed = new Set(trackProgress?.completedLevels ?? []);

  return track.levels.map((level, index) => {
    const isCompleted = completed.has(level.id);

    // Unlocked if first level, already completed, or the previous level is done.
    const prevId = index > 0 ? LEVEL_ORDER[index - 1] : null;
    const prevCompleted = prevId ? completed.has(prevId) : true;
    const isUnlocked = index === 0 || prevCompleted || isCompleted;

    const state: LevelState = isCompleted
      ? "completed"
      : isUnlocked
        ? "unlocked"
        : "locked";

    const questions = getQuestionsForLevel(track.id, level.id);
    const questionCount = questions.length;
    const potentialXp =
      questions.reduce((sum, q) => sum + questionXp(q.xp, level.id), 0) +
      level.xpReward;

    return {
      level,
      index,
      state,
      questionCount,
      potentialXp,
      progress: isCompleted ? 1 : 0,
      empty: questionCount === 0,
    };
  });
}

/** Overall roadmap completion ratio (completed levels / total levels). */
export function roadmapProgress(nodes: RoadmapNode[]): number {
  if (nodes.length === 0) return 0;
  const done = nodes.filter((n) => n.state === "completed").length;
  return done / nodes.length;
}

/** The next actionable (unlocked, not completed, non-empty) node, if any. */
export function nextPlayableNode(nodes: RoadmapNode[]): RoadmapNode | undefined {
  return nodes.find((n) => n.state === "unlocked" && !n.empty);
}
