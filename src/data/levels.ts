import type { Level } from "@/types";
import { LEVEL_XP_MULTIPLIER } from "@/lib/xp";

/**
 * Shared difficulty levels. Every track exposes these same three levels; the
 * question bank decides how many questions exist per level.
 */
export const LEVELS: Level[] = [
  {
    id: "beginner",
    title: { en: "Beginner", ar: "مبتدئ" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.beginner,
  },
  {
    id: "intermediate",
    title: { en: "Intermediate", ar: "متوسط" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.intermediate,
  },
  {
    id: "advanced",
    title: { en: "Advanced", ar: "متقدم" },
    xpMultiplier: LEVEL_XP_MULTIPLIER.advanced,
  },
];
