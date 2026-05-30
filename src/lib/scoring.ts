import type { LevelId } from "@/types";
import { SCORING } from "./constants";
import { LEVEL_XP_MULTIPLIER } from "./xp";

/** Outcome of answering one question, used to compute XP delta. */
export interface AnswerOutcome {
  correct: boolean;
  /** Whether the hint was revealed before answering. */
  hintUsed: boolean;
}

/**
 * XP delta for a single answer, scaled by the level multiplier.
 *
 *   correct + no hint  →  +10 × mult
 *   correct + hint     →  +5  × mult
 *   wrong              →  -3  × mult
 *
 * Penalties are scaled too so higher levels carry higher stakes. The result is
 * rounded to a whole number.
 */
export function answerXp(level: LevelId, outcome: AnswerOutcome): number {
  const mult = LEVEL_XP_MULTIPLIER[level];
  const base = !outcome.correct
    ? SCORING.wrongAnswer
    : outcome.hintUsed
      ? SCORING.correctAfterHint
      : SCORING.correctFirstTry;
  return Math.round(base * mult);
}

/** Level-completion bonus, scaled by the level multiplier. */
export function levelCompleteBonus(level: LevelId): number {
  return Math.round(SCORING.levelComplete * LEVEL_XP_MULTIPLIER[level]);
}
