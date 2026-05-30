import type { LevelId, Question, Quiz, TrackId } from "@/types";
import { QUESTIONS_PER_QUIZ } from "@/lib/constants";
import { shuffle } from "@/lib/utils";

import html from "./html.json";
import css from "./css.json";
import javascript from "./javascript.json";
import react from "./react.json";
import sql from "./sql.json";
import nodejs from "./nodejs.json";

/**
 * Central question bank.
 *
 * Each track maps to an array of questions loaded from its JSON file. Tracks
 * without a JSON file yet resolve to an empty array — the UI handles this
 * gracefully (shows an "empty" state) so the platform stays shippable while
 * the bank is filled in incrementally.
 *
 * To add a track's questions: create `src/data/questions/<track>.json`, import
 * it here, and register it in QUESTION_BANK. The `as Question[]` cast keeps the
 * JSON aligned with the domain type.
 */
export const QUESTION_BANK: Partial<Record<TrackId, Question[]>> = {
  html: html as Question[],
  css: css as Question[],
  javascript: javascript as Question[],
  react: react as Question[],
  sql: sql as Question[],
  nodejs: nodejs as Question[],
  // typescript, nextjs, php, laravel, express, rest-api, authentication: TODO
};

/** All questions for a track (across every level). */
export function getQuestionsForTrack(trackId: TrackId): Question[] {
  return QUESTION_BANK[trackId] ?? [];
}

/** Questions for a track filtered to one difficulty level. */
export function getQuestionsForLevel(
  trackId: TrackId,
  level: LevelId,
): Question[] {
  return getQuestionsForTrack(trackId).filter((q) => q.level === level);
}

/** Count of available questions for a track. */
export function getQuestionCount(trackId: TrackId): number {
  return getQuestionsForTrack(trackId).length;
}

/**
 * Build a playable quiz: shuffled questions for the given track + level,
 * capped at QUESTIONS_PER_QUIZ.
 */
export function buildQuiz(trackId: TrackId, level: LevelId): Quiz {
  const pool = getQuestionsForLevel(trackId, level);
  return {
    trackId,
    level,
    questions: shuffle(pool).slice(0, QUESTIONS_PER_QUIZ),
  };
}
