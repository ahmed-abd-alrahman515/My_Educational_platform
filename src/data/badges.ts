import type { Badge, UserProgress } from "@/types";
import { PASS_THRESHOLD } from "@/lib/constants";

/**
 * Badge registry + unlock evaluation.
 *
 * Badges are pure metadata; `evaluateBadges` checks each badge's condition
 * against a UserProgress snapshot and returns the full set of unlocked ids.
 */
export const BADGES: Badge[] = [
  /* ----------------------- Milestone / progression ---------------------- */
  {
    id: "first-steps",
    tier: "bronze",
    title: { en: "First Steps", ar: "الخطوات الأولى" },
    description: {
      en: "Complete your first quiz.",
      ar: "أكمل أول اختبار لك.",
    },
    icon: "Footprints",
    condition: { kind: "quizzes-completed", value: 1 },
  },
  {
    id: "rising-star",
    tier: "silver",
    title: { en: "Rising Star", ar: "نجم صاعد" },
    description: {
      en: "Earn 500 total XP.",
      ar: "اكسب 500 نقطة خبرة.",
    },
    icon: "Star",
    condition: { kind: "total-xp", value: 500 },
  },
  {
    id: "perfectionist",
    tier: "gold",
    title: { en: "Perfectionist", ar: "الكمالي" },
    description: {
      en: "Score 100% on 3 quizzes.",
      ar: "احصل على 100% في 3 اختبارات.",
    },
    icon: "Target",
    condition: { kind: "perfect-quizzes", value: 3 },
  },
  {
    id: "on-fire",
    tier: "gold",
    title: { en: "On Fire", ar: "متّقد" },
    description: {
      en: "Maintain a 7-day streak.",
      ar: "حافظ على سلسلة 7 أيام.",
    },
    icon: "Flame",
    condition: { kind: "streak-days", value: 7 },
  },

  /* ------------------------ Per-language starters ----------------------- */
  {
    id: "html-starter",
    tier: "bronze",
    title: { en: "HTML Starter", ar: "مبتدئ HTML" },
    description: { en: "Pass an HTML level.", ar: "اجتَز مستوى HTML." },
    icon: "FileCode2",
    condition: { kind: "track-completed", trackId: "html" },
  },
  {
    id: "css-stylist",
    tier: "bronze",
    title: { en: "CSS Stylist", ar: "منسّق CSS" },
    description: { en: "Pass a CSS level.", ar: "اجتَز مستوى CSS." },
    icon: "Palette",
    condition: { kind: "track-completed", trackId: "css" },
  },
  {
    id: "javascript-thinker",
    tier: "silver",
    title: { en: "JavaScript Thinker", ar: "مفكّر جافاسكريبت" },
    description: { en: "Pass a JavaScript level.", ar: "اجتَز مستوى جافاسكريبت." },
    icon: "Braces",
    condition: { kind: "track-completed", trackId: "javascript" },
  },
  {
    id: "react-builder",
    tier: "silver",
    title: { en: "React Builder", ar: "باني رياكت" },
    description: { en: "Pass a React level.", ar: "اجتَز مستوى رياكت." },
    icon: "Atom",
    condition: { kind: "track-completed", trackId: "react" },
  },
  {
    id: "next-architect",
    tier: "gold",
    title: { en: "Next Architect", ar: "معماري Next" },
    description: { en: "Pass a Next.js level.", ar: "اجتَز مستوى Next.js." },
    icon: "Triangle",
    condition: { kind: "track-completed", trackId: "nextjs" },
  },
  {
    id: "laravel-warrior",
    tier: "gold",
    title: { en: "Laravel Warrior", ar: "محارب لارافيل" },
    description: { en: "Pass a Laravel level.", ar: "اجتَز مستوى لارافيل." },
    icon: "Flame",
    condition: { kind: "track-completed", trackId: "laravel" },
  },
  {
    id: "sql-solver",
    tier: "silver",
    title: { en: "SQL Solver", ar: "حلّال SQL" },
    description: { en: "Pass a SQL level.", ar: "اجتَز مستوى SQL." },
    icon: "Database",
    condition: { kind: "track-completed", trackId: "sql" },
  },
  {
    id: "api-hunter",
    tier: "gold",
    title: { en: "API Hunter", ar: "صائد الواجهات البرمجية" },
    description: { en: "Pass a REST API level.", ar: "اجتَز مستوى REST API." },
    icon: "Webhook",
    condition: { kind: "track-completed", trackId: "rest-api" },
  },

  /* ----------------------------- Prestige ------------------------------- */
  {
    id: "boss-slayer",
    tier: "platinum",
    title: { en: "Boss Slayer", ar: "قاهر الزعيم" },
    description: {
      en: "Defeat any Boss Challenge.",
      ar: "اهزم أي تحدٍّ للزعيم.",
    },
    icon: "Swords",
    condition: { kind: "boss-slayer" },
  },
  {
    id: "frontend-master",
    tier: "platinum",
    title: { en: "Frontend Master", ar: "سيّد الواجهة الأمامية" },
    description: {
      en: "Complete every frontend track.",
      ar: "أكمل جميع مسارات الواجهة الأمامية.",
    },
    icon: "LayoutDashboard",
    condition: { kind: "category-completed", category: "frontend" },
  },
  {
    id: "backend-master",
    tier: "platinum",
    title: { en: "Backend Master", ar: "سيّد الواجهة الخلفية" },
    description: {
      en: "Complete every backend track.",
      ar: "أكمل جميع مسارات الواجهة الخلفية.",
    },
    icon: "ServerCog",
    condition: { kind: "category-completed", category: "backend" },
  },
];

export const BADGES_BY_ID: Record<string, Badge> = BADGES.reduce(
  (acc, badge) => {
    acc[badge.id] = badge;
    return acc;
  },
  {} as Record<string, Badge>,
);

/* -------------------------------------------------------------------------- */
/*  Evaluation                                                                 */
/* -------------------------------------------------------------------------- */

function countPerfectQuizzes(progress: UserProgress): number {
  return progress.history.filter(
    (r) => r.total > 0 && r.score === r.total,
  ).length;
}

function isCategoryCompleted(
  progress: UserProgress,
  trackIdsInCategory: string[],
): boolean {
  if (trackIdsInCategory.length === 0) return false;
  return trackIdsInCategory.every((id) => {
    const tp = progress.tracks[id];
    return tp && tp.bestScorePercent >= PASS_THRESHOLD;
  });
}

/** True once any track has cleared its Boss Challenge level. */
function hasSlainBoss(progress: UserProgress): boolean {
  return Object.values(progress.tracks).some((tp) =>
    tp.completedLevels.includes("boss"),
  );
}

/**
 * Evaluate which badges should be unlocked for the given progress. Pass in the
 * category→trackIds map (from the tracks data) so this module stays decoupled
 * from the track registry.
 */
export function evaluateBadges(
  progress: UserProgress,
  trackIdsByCategory: { frontend: string[]; backend: string[] },
): string[] {
  const unlocked = new Set(progress.unlockedBadgeIds);

  for (const badge of BADGES) {
    if (unlocked.has(badge.id)) continue;
    const c = badge.condition;
    let met = false;

    switch (c.kind) {
      case "total-xp":
        met = progress.totalXp >= c.value;
        break;
      case "quizzes-completed":
        met = progress.history.length >= c.value;
        break;
      case "perfect-quizzes":
        met = countPerfectQuizzes(progress) >= c.value;
        break;
      case "streak-days":
        met = progress.streak >= c.value;
        break;
      case "track-completed": {
        const tp = progress.tracks[c.trackId];
        met = !!tp && tp.bestScorePercent >= PASS_THRESHOLD;
        break;
      }
      case "track-mastered": {
        const tp = progress.tracks[c.trackId];
        met = !!tp && tp.completedLevels.length >= 5;
        break;
      }
      case "boss-slayer":
        met = hasSlainBoss(progress);
        break;
      case "category-completed":
        met = isCategoryCompleted(progress, trackIdsByCategory[c.category]);
        break;
    }

    if (met) unlocked.add(badge.id);
  }

  return [...unlocked];
}
