import type { LevelId, Question, Quiz, TrackId } from "@/types";
import { QUESTIONS_PER_QUIZ } from "@/lib/constants";
import { shuffle } from "@/lib/utils";

// Frontend
import html from "./html.json";
import css from "./css.json";
import javascript from "./javascript.json";
import typescript from "./typescript.json";
import react from "./react.json";
import nextjs from "./nextjs.json";
// Backend
import php from "./php.json";
import laravel from "./laravel.json";
import nodejs from "./nodejs.json";
import express from "./express.json";
import sql from "./sql.json";
import restApi from "./rest-api.json";
import authentication from "./authentication.json";

/**
 * Central question bank.
 *
 * Every track ships with a full bank of 40 questions (10 beginner /
 * 10 intermediate / 10 advanced / 5 expert / 5 boss), bilingual (EN/AR). To
 * extend a track, edit its `src/data/questions/<track>.json` file — no code
 * changes needed. The `as Question[]` cast keeps the JSON aligned with the
 * domain type.
 */
export const QUESTION_BANK: Partial<Record<TrackId, Question[]>> = {
  // Frontend
  html: html as Question[],
  css: css as Question[],
  javascript: javascript as Question[],
  typescript: typescript as Question[],
  react: react as Question[],
  nextjs: nextjs as Question[],
  // Backend
  php: php as Question[],
  laravel: laravel as Question[],
  nodejs: nodejs as Question[],
  express: express as Question[],
  sql: sql as Question[],
  "rest-api": restApi as Question[],
  authentication: authentication as Question[],
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
