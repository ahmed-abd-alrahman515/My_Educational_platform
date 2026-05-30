import type { LevelId, PlayerRank } from "@/types";

/**
 * XP & rank system.
 *
 * Ranks are derived purely from total XP. The curve is quadratic-ish so early
 * levels come fast and later ones feel earned. Tweak `RANKS` freely — UI reads
 * everything from here.
 */
export const RANKS: PlayerRank[] = [
  { level: 1, minXp: 0, title: { en: "Novice", ar: "مبتدئ" } },
  { level: 2, minXp: 250, title: { en: "Apprentice", ar: "متدرّب" } },
  { level: 3, minXp: 600, title: { en: "Coder", ar: "مبرمج" } },
  { level: 4, minXp: 1200, title: { en: "Developer", ar: "مطوّر" } },
  { level: 5, minXp: 2200, title: { en: "Engineer", ar: "مهندس" } },
  { level: 6, minXp: 3800, title: { en: "Architect", ar: "معماري" } },
  { level: 7, minXp: 6000, title: { en: "Wizard", ar: "ساحر" } },
  { level: 8, minXp: 9000, title: { en: "Legend", ar: "أسطورة" } },
];

/** XP multiplier per difficulty level. */
export const LEVEL_XP_MULTIPLIER: Record<LevelId, number> = {
  beginner: 1,
  intermediate: 1.5,
  advanced: 2,
};

/** Resolve the player's current rank from total XP. */
export function getRank(totalXp: number): PlayerRank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (totalXp >= rank.minXp) current = rank;
    else break;
  }
  return current;
}

/** The next rank above the current one, or null if maxed. */
export function getNextRank(totalXp: number): PlayerRank | null {
  return RANKS.find((r) => r.minXp > totalXp) ?? null;
}

/**
 * Progress (0–1) toward the next rank, for progress bars. Returns 1 when the
 * player has reached the top rank.
 */
export function getRankProgress(totalXp: number): number {
  const current = getRank(totalXp);
  const next = getNextRank(totalXp);
  if (!next) return 1;
  const span = next.minXp - current.minXp;
  return span > 0 ? (totalXp - current.minXp) / span : 0;
}

/** XP awarded for a question given its base value and difficulty level. */
export function questionXp(baseXp: number, level: LevelId): number {
  return Math.round(baseXp * LEVEL_XP_MULTIPLIER[level]);
}
