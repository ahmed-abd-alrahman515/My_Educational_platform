import type { Level } from "@/types";
import { LEVEL_XP_MULTIPLIER } from "@/lib/xp";

/**
 * Shared difficulty roadmap. Every track exposes these same five levels —
 * Beginner → Intermediate → Advanced → Expert → Boss Challenge — and the
 * question bank decides how many questions exist per level.
 *
 * `xpReward` is the headline completion bonus shown on the roadmap node;
 * `xpMultiplier` scales per-question XP. `badge` is the reward displayed for
 * clearing the level.
 */
export const LEVELS: Level[] = [
  {
    id: "beginner",
    title: { en: "Beginner", ar: "مبتدئ" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.beginner,
    xpReward: 100,
    badge: {
      icon: "Sprout",
      title: { en: "First Steps", ar: "الخطوات الأولى" },
    },
  },
  {
    id: "intermediate",
    title: { en: "Intermediate", ar: "متوسط" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.intermediate,
    xpReward: 200,
    badge: {
      icon: "Rocket",
      title: { en: "Rising Coder", ar: "مبرمج صاعد" },
    },
  },
  {
    id: "advanced",
    title: { en: "Advanced", ar: "متقدم" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.advanced,
    xpReward: 350,
    badge: {
      icon: "Gem",
      title: { en: "Skilled", ar: "ماهر" },
    },
  },
  {
    id: "expert",
    title: { en: "Expert", ar: "خبير" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.expert,
    xpReward: 500,
    badge: {
      icon: "Crown",
      title: { en: "Expert", ar: "خبير" },
    },
  },
  {
    id: "boss",
    title: { en: "Boss Challenge", ar: "تحدي الزعيم" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.boss,
    xpReward: 1000,
    isBoss: true,
    badge: {
      icon: "Swords",
      title: { en: "Boss Slayer", ar: "قاهر الزعيم" },
    },
  },
];

/** Difficulty levels in unlock order (index 0 is always unlocked). */
export const LEVEL_ORDER = LEVELS.map((l) => l.id);
