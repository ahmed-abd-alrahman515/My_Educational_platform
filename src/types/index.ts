/**
 * Core domain types for CodeQuest.
 *
 * These types are the single source of truth shared across the data layer
 * (question bank, tracks, badges), the localStorage progress system, and the
 * UI components. Keep them framework-agnostic so the data can later be moved
 * to a real backend with minimal changes.
 */

/* -------------------------------------------------------------------------- */
/*  Language & i18n                                                            */
/* -------------------------------------------------------------------------- */

/** Supported UI languages. `ar` is right-to-left. */
export type Language = "en" | "ar";

export type TextDirection = "ltr" | "rtl";

/**
 * A string that exists in every supported language. Used everywhere user-facing
 * content needs to be bilingual (track titles, question prompts, etc.).
 */
export type LocalizedText = Record<Language, string>;

/* -------------------------------------------------------------------------- */
/*  Tracks                                                                     */
/* -------------------------------------------------------------------------- */

/** Top-level learning categories. */
export type TrackCategory = "frontend" | "backend";

/** Stable identifiers for every track in the platform. */
export type TrackId =
  // Frontend
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  // Backend
  | "php"
  | "laravel"
  | "nodejs"
  | "express"
  | "sql"
  | "rest-api"
  | "authentication";

/** A learning track (e.g. JavaScript, Laravel). */
export interface Track {
  id: TrackId;
  category: TrackCategory;
  title: LocalizedText;
  description: LocalizedText;
  /** lucide-react icon name, resolved at render time. */
  icon: string;
  /** Tailwind gradient stops, e.g. "from-orange-500 to-rose-500". */
  gradient: string;
  /** Accent color used for glow effects (hex or rgb). */
  accent: string;
  /** Difficulty levels available for this track. */
  levels: Level[];
}

/* -------------------------------------------------------------------------- */
/*  Levels & difficulty                                                        */
/* -------------------------------------------------------------------------- */

export type LevelId =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert"
  | "boss";

/** A badge a player earns for clearing a level (shown on the roadmap). */
export interface LevelBadge {
  /** lucide-react icon name. */
  icon: string;
  title: LocalizedText;
}

export interface Level {
  id: LevelId;
  title: LocalizedText;
  /** XP multiplier applied to correct answers at this level. */
  xpMultiplier: number;
  /** Headline XP reward for clearing the level (display + bonus). */
  xpReward: number;
  /** Badge granted on completion, displayed on the roadmap node. */
  badge: LevelBadge;
  /** Marks the final "Boss Challenge" level for special styling. */
  isBoss?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Questions                                                                  */
/* -------------------------------------------------------------------------- */

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "code-output"
  | "fill-blank";

export interface QuestionOption {
  id: string;
  text: LocalizedText;
}

/** A single quiz question. Stored in JSON per track. */
export interface Question {
  id: string;
  trackId: TrackId;
  level: LevelId;
  type: QuestionType;
  prompt: LocalizedText;
  /** Optional code snippet shown with the question (language-agnostic string). */
  code?: string;
  options: QuestionOption[];
  /** id of the correct option in `options`. */
  correctOptionId: string;
  /** Shown after answering to teach the concept. */
  explanation: LocalizedText;
  /** Base XP awarded before level multiplier. */
  xp: number;
  tags?: string[];
}

/** A playable quiz = a track filtered to one level. */
export interface Quiz {
  trackId: TrackId;
  level: LevelId;
  questions: Question[];
}

/* -------------------------------------------------------------------------- */
/*  Gamification: XP, levels, badges                                           */
/* -------------------------------------------------------------------------- */

/** The player's global rank derived from total XP. */
export interface PlayerRank {
  level: number;
  title: LocalizedText;
  /** XP required to have reached this rank. */
  minXp: number;
}

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum";

/** Condition that unlocks a badge. Evaluated against UserProgress. */
export type BadgeCondition =
  | { kind: "total-xp"; value: number }
  | { kind: "quizzes-completed"; value: number }
  | { kind: "perfect-quizzes"; value: number }
  | { kind: "streak-days"; value: number }
  | { kind: "track-completed"; trackId: TrackId }
  | { kind: "category-completed"; category: TrackCategory };

export interface Badge {
  id: string;
  tier: BadgeTier;
  title: LocalizedText;
  description: LocalizedText;
  /** lucide-react icon name. */
  icon: string;
  condition: BadgeCondition;
}

/* -------------------------------------------------------------------------- */
/*  User progress (persisted in localStorage)                                  */
/* -------------------------------------------------------------------------- */

/** Result of a single completed quiz attempt. */
export interface QuizResult {
  trackId: TrackId;
  level: LevelId;
  score: number;
  total: number;
  xpEarned: number;
  /** ISO timestamp. */
  completedAt: string;
}

/** Per-track aggregated stats. */
export interface TrackProgress {
  trackId: TrackId;
  /** Highest level completed with a passing score. */
  bestLevel: LevelId | null;
  completedLevels: LevelId[];
  totalXp: number;
  bestScorePercent: number;
  attempts: number;
}

/**
 * The full persisted state for a single player. This is the exact shape stored
 * in localStorage under the progress key and validated on load.
 */
export interface UserProgress {
  /** Schema version for safe migrations of stored data. */
  version: number;
  language: Language;
  theme: Theme;
  totalXp: number;
  /** Current daily streak count. */
  streak: number;
  /** ISO date (YYYY-MM-DD) of the last activity, for streak calculation. */
  lastActiveDate: string | null;
  unlockedBadgeIds: string[];
  tracks: Record<string, TrackProgress>;
  history: QuizResult[];
}

/* -------------------------------------------------------------------------- */
/*  Theme                                                                      */
/* -------------------------------------------------------------------------- */

export type Theme = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";
