import type { Language } from "@/types";

/**
 * UI string dictionary. Domain content (tracks, questions, badges) carries its
 * own bilingual `LocalizedText`; this dictionary is only for chrome/UI labels.
 *
 * Keys use dot notation for grouping. Add new keys to BOTH languages — the
 * `TranslationKey` type below enforces parity at compile time.
 */
export const translations = {
  en: {
    "brand.name": "CodeQuest",
    "brand.tagline": "Level up your code, one quest at a time.",

    "nav.home": "Home",
    "nav.tracks": "Tracks",
    "nav.dashboard": "Dashboard",
    "nav.about": "About",
    "nav.startLearning": "Start Learning",

    "common.frontend": "Frontend",
    "common.backend": "Backend",
    "common.beginner": "Beginner",
    "common.intermediate": "Intermediate",
    "common.advanced": "Advanced",
    "common.start": "Start",
    "common.continue": "Continue",
    "common.next": "Next",
    "common.back": "Back",
    "common.finish": "Finish",
    "common.retry": "Retry",
    "common.xp": "XP",
    "common.level": "Level",
    "common.loading": "Loading…",

    "home.hero.badge": "Gamified learning platform",
    "home.hero.title": "Master programming by playing",
    "home.hero.subtitle":
      "Bilingual quizzes across 13 tracks — from HTML to Authentication. Earn XP, unlock badges, and climb the ranks.",
    "home.hero.cta": "Explore tracks",
    "home.hero.secondary": "View dashboard",
    "home.stats.tracks": "Tracks",
    "home.stats.questions": "Questions",
    "home.stats.levels": "Levels",
    "home.features.title": "Built like a game, designed for learning",
    "home.tracks.title": "Choose your track",
    "home.tracks.subtitle": "Two paths. Thirteen skills. Infinite levels.",

    "tracks.title": "Learning Tracks",
    "tracks.subtitle": "Pick a track and start your quest.",
    "tracks.levels": "levels",
    "tracks.questions": "questions",

    "quiz.question": "Question",
    "quiz.of": "of",
    "quiz.correct": "Correct!",
    "quiz.incorrect": "Not quite",
    "quiz.explanation": "Explanation",
    "quiz.score": "Your score",
    "quiz.xpEarned": "XP earned",
    "quiz.backToTracks": "Back to tracks",
    "quiz.empty": "No questions available for this track yet.",

    "dashboard.title": "Your Dashboard",
    "dashboard.subtitle": "Track your progress, XP, and badges.",
    "dashboard.totalXp": "Total XP",
    "dashboard.rank": "Rank",
    "dashboard.streak": "Day streak",
    "dashboard.badges": "Badges",
    "dashboard.completed": "Quizzes completed",
    "dashboard.recentActivity": "Recent activity",
    "dashboard.noActivity": "No quizzes completed yet. Start a track to earn XP!",
    "dashboard.locked": "Locked",

    "theme.toggle": "Toggle theme",
    "lang.toggle": "Switch language",

    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js, Tailwind & Framer Motion.",
  },

  ar: {
    "brand.name": "كودكويست",
    "brand.tagline": "طوّر مهاراتك البرمجية، مهمة تلو الأخرى.",

    "nav.home": "الرئيسية",
    "nav.tracks": "المسارات",
    "nav.dashboard": "لوحة التحكم",
    "nav.about": "حول",
    "nav.startLearning": "ابدأ التعلم",

    "common.frontend": "الواجهة الأمامية",
    "common.backend": "الواجهة الخلفية",
    "common.beginner": "مبتدئ",
    "common.intermediate": "متوسط",
    "common.advanced": "متقدم",
    "common.start": "ابدأ",
    "common.continue": "متابعة",
    "common.next": "التالي",
    "common.back": "رجوع",
    "common.finish": "إنهاء",
    "common.retry": "إعادة المحاولة",
    "common.xp": "نقطة خبرة",
    "common.level": "المستوى",
    "common.loading": "جارٍ التحميل…",

    "home.hero.badge": "منصة تعلم تفاعلية",
    "home.hero.title": "أتقن البرمجة باللعب",
    "home.hero.subtitle":
      "اختبارات ثنائية اللغة عبر 13 مسارًا — من HTML إلى المصادقة. اكسب نقاط الخبرة، افتح الأوسمة، وتسلّق المراتب.",
    "home.hero.cta": "استكشف المسارات",
    "home.hero.secondary": "عرض لوحة التحكم",
    "home.stats.tracks": "مسارات",
    "home.stats.questions": "أسئلة",
    "home.stats.levels": "مستويات",
    "home.features.title": "بُنيت كلعبة، صُممت للتعلم",
    "home.tracks.title": "اختر مسارك",
    "home.tracks.subtitle": "مساران. ثلاث عشرة مهارة. مستويات لا نهائية.",

    "tracks.title": "مسارات التعلم",
    "tracks.subtitle": "اختر مسارًا وابدأ مهمتك.",
    "tracks.levels": "مستويات",
    "tracks.questions": "أسئلة",

    "quiz.question": "سؤال",
    "quiz.of": "من",
    "quiz.correct": "إجابة صحيحة!",
    "quiz.incorrect": "ليست صحيحة",
    "quiz.explanation": "الشرح",
    "quiz.score": "نتيجتك",
    "quiz.xpEarned": "نقاط الخبرة المكتسبة",
    "quiz.backToTracks": "العودة إلى المسارات",
    "quiz.empty": "لا توجد أسئلة متاحة لهذا المسار بعد.",

    "dashboard.title": "لوحة التحكم",
    "dashboard.subtitle": "تابع تقدمك ونقاط خبرتك وأوسمتك.",
    "dashboard.totalXp": "إجمالي الخبرة",
    "dashboard.rank": "المرتبة",
    "dashboard.streak": "أيام متتالية",
    "dashboard.badges": "الأوسمة",
    "dashboard.completed": "اختبارات مكتملة",
    "dashboard.recentActivity": "النشاط الأخير",
    "dashboard.noActivity": "لم تكمل أي اختبار بعد. ابدأ مسارًا لكسب نقاط الخبرة!",
    "dashboard.locked": "مقفل",

    "theme.toggle": "تبديل المظهر",
    "lang.toggle": "تغيير اللغة",

    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.builtWith": "بُني باستخدام Next.js و Tailwind و Framer Motion.",
  },
} as const;

/** Union of every valid translation key (enforces EN/AR parity). */
export type TranslationKey = keyof (typeof translations)["en"];

export function getTranslations(language: Language) {
  return translations[language];
}
