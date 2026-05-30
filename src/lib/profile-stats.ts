import type {
  LocalizedText,
  Track,
  TrackCategory,
  UserProgress,
} from "@/types";
import { TRACKS } from "@/data/tracks";
import { getQuestionCount } from "@/data/questions";
import { PASS_THRESHOLD } from "./constants";

/**
 * Pure derivation of every metric the profile dashboard shows, computed from a
 * UserProgress snapshot (localStorage). Keeping this framework-agnostic makes
 * it trivially testable and lets the React layer stay declarative.
 */

export interface SkillStat {
  track: Track;
  title: LocalizedText;
  /** 0–1 completion ratio (completed levels / total levels). */
  completion: number;
  completedLevels: number;
  totalLevels: number;
  bestScorePercent: number;
  totalXp: number;
  attempts: number;
  mastered: boolean;
  started: boolean;
}

export interface ProfileStats {
  totalXp: number;
  streak: number;
  /** Total quizzes (levels attempted), from history length. */
  quizzesCompleted: number;
  /** Overall accuracy across all attempts (0–100). */
  accuracy: number;
  /** Distinct languages with at least one passed level. */
  completedLanguages: number;
  totalLanguages: number;
  /** Distinct levels passed across all tracks. */
  completedLevels: number;
  /** Tracks fully mastered (all 5 levels passed). */
  completedTracks: number;
  /** Categories fully completed (every track passed). */
  completedCategories: TrackCategory[];
  badgesEarned: number;
  /** Per-language progress, sorted by completion desc then XP. */
  skills: SkillStat[];
  /** Highest-progress started skill, or null if none started. */
  strongest: SkillStat | null;
  /** Lowest-progress started skill (room to grow), or null. */
  weakest: SkillStat | null;
}

function buildSkill(track: Track, progress: UserProgress): SkillStat {
  const tp = progress.tracks[track.id];
  const totalLevels = track.levels.length;
  const completedLevels = tp?.completedLevels.length ?? 0;
  const hasQuestions = getQuestionCount(track.id) > 0;
  return {
    track,
    title: track.title,
    completion: totalLevels > 0 ? completedLevels / totalLevels : 0,
    completedLevels,
    totalLevels,
    bestScorePercent: tp?.bestScorePercent ?? 0,
    totalXp: tp?.totalXp ?? 0,
    attempts: tp?.attempts ?? 0,
    mastered: completedLevels >= totalLevels && hasQuestions,
    started: (tp?.attempts ?? 0) > 0,
  };
}

export function computeProfileStats(progress: UserProgress): ProfileStats {
  const skills = TRACKS.map((track) => buildSkill(track, progress));

  // Accuracy from history (sum correct / sum total across every attempt).
  let correct = 0;
  let total = 0;
  for (const r of progress.history) {
    correct += r.score;
    total += r.total;
  }
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const completedLanguages = skills.filter(
    (s) => s.bestScorePercent >= PASS_THRESHOLD || s.completedLevels > 0,
  ).length;

  const completedLevels = skills.reduce((sum, s) => sum + s.completedLevels, 0);
  const completedTracks = skills.filter((s) => s.mastered).length;

  // Categories where every track has at least passed (bestScore >= threshold).
  const categories: TrackCategory[] = ["frontend", "backend"];
  const completedCategories = categories.filter((cat) => {
    const inCat = skills.filter((s) => s.track.category === cat);
    return (
      inCat.length > 0 &&
      inCat.every((s) => s.bestScorePercent >= PASS_THRESHOLD)
    );
  });

  // Strongest / weakest among *started* skills.
  const started = skills.filter((s) => s.started);
  const byStrength = [...started].sort(
    (a, b) =>
      b.completion - a.completion ||
      b.bestScorePercent - a.bestScorePercent ||
      b.totalXp - a.totalXp,
  );
  const strongest = byStrength[0] ?? null;
  const weakest =
    byStrength.length > 0 ? byStrength[byStrength.length - 1] : null;

  // Display order: most progress first, then most XP.
  const sortedSkills = [...skills].sort(
    (a, b) => b.completion - a.completion || b.totalXp - a.totalXp,
  );

  return {
    totalXp: progress.totalXp,
    streak: progress.streak,
    quizzesCompleted: progress.history.length,
    accuracy,
    completedLanguages,
    totalLanguages: TRACKS.length,
    completedLevels,
    completedTracks,
    completedCategories,
    badgesEarned: progress.unlockedBadgeIds.length,
    skills: sortedSkills,
    strongest,
    // Only surface a distinct weakest when there's more than one started skill.
    weakest: started.length > 1 ? weakest : null,
  };
}
