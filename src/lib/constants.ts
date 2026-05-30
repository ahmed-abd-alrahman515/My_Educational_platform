/** Centralized app-wide constants. */

export const APP_NAME = "CodeQuest";

/** localStorage keys. Versioned key prefix so we can migrate cleanly. */
export const STORAGE_KEYS = {
  progress: "codequest:progress:v1",
} as const;

/** Current schema version of UserProgress stored in localStorage. */
export const PROGRESS_SCHEMA_VERSION = 2;

/** Score (percent) required to mark a level as "completed". */
export const PASS_THRESHOLD = 70;

/** Number of questions served per level attempt. */
export const QUESTIONS_PER_QUIZ = 10;

/**
 * Scoring model for the quiz engine. All values are in XP.
 *
 * - correctFirstTry: full reward for a correct answer with no hint used
 * - correctAfterHint: reduced reward when the hint was revealed first
 * - wrongAnswer:      penalty applied on an incorrect answer
 * - levelComplete:    bonus for finishing (passing) a level
 *
 * Per-question rewards are further scaled by the level's XP multiplier.
 */
export const SCORING = {
  correctFirstTry: 10,
  correctAfterHint: 5,
  wrongAnswer: -3,
  levelComplete: 50,
} as const;
