/** Centralized app-wide constants. */

export const APP_NAME = "CodeQuest";

/** localStorage keys. Versioned key prefix so we can migrate cleanly. */
export const STORAGE_KEYS = {
  progress: "codequest:progress:v1",
} as const;

/** Current schema version of UserProgress stored in localStorage. */
export const PROGRESS_SCHEMA_VERSION = 1;

/** Score (percent) required to mark a level as "completed". */
export const PASS_THRESHOLD = 70;

/** Number of questions served per quiz attempt. */
export const QUESTIONS_PER_QUIZ = 10;
