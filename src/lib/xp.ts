import type { LevelId, PlayerRank } from "@/types";

/**
 * XP & rank system.
 *
 * Ranks are derived purely from total XP. The curve is quadratic-ish so early
 * levels come fast and later ones feel earned. Tweak `RANKS` freely — UI reads
 * everything from here.
 */
export const RANKS: PlayerRank[] = [
  { level: 1, minXp: 0, title: { en: "Newbie Coder", ar: "مبرمج مبتدئ" } },
  { level: 2, minXp: 300, title: { en: "Code Explorer", ar: "مستكشف الكود" } },
  { level: 3, minXp: 800, title: { en: "Bug Hunter", ar: "صائد الأخطاء" } },
  { level: 4, minXp: 1600, title: { en: "Logic Builder", ar: "باني المنطق" } },
  { level: 5, minXp: 2800, title: { en: "Frontend Warrior", ar: "محارب الواجهة الأمامية" } },
  { level: 6, minXp: 4400, title: { en: "Backend Warrior", ar: "محارب الواجهة الخلفية" } },
  { level: 7, minXp: 6500, title: { en: "Full Stack Challenger", ar: "متحدّي الفول ستاك" } },
  { level: 8, minXp: 9500, title: { en: "Code Master", ar: "سيّد الكود" } },
];

/** XP multiplier per difficulty level. */
export const LEVEL_XP_MULTIPLIER: Record<LevelId, number> = {
  beginner: 1,
  intermediate: 1.5,
  advanced: 2,
  expert: 2.5,
  boss: 3,
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
