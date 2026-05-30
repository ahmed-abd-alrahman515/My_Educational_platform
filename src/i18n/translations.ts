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
    "home.stats.languages": "Languages",
    "home.stats.xp": "XP to earn",
    "home.stats.title": "Trusted by curious developers",
    "home.stats.subtitle": "A growing universe of challenges across the stack.",
    "home.features.title": "Built like a game, designed for learning",

    "home.paths.title": "Two paths, one journey",
    "home.paths.subtitle": "Specialize in the browser or own the server.",
    "home.paths.frontend.title": "Frontend Track",
    "home.paths.frontend.desc":
      "Craft beautiful, interactive interfaces. Master markup, styling, and the modern component era.",
    "home.paths.backend.title": "Backend Track",
    "home.paths.backend.desc":
      "Power the web behind the scenes. Build APIs, model data, and secure your apps.",
    "home.paths.explore": "Explore track",
    "home.paths.skills": "skills",

    "home.how.title": "How it works",
    "home.how.subtitle": "From zero to hero in five simple steps.",
    "home.how.step1.title": "Choose a track",
    "home.how.step1.desc": "Pick from 13 frontend & backend skills.",
    "home.how.step2.title": "Pick your language",
    "home.how.step2.desc": "Switch instantly between Arabic and English.",
    "home.how.step3.title": "Unlock levels",
    "home.how.step3.desc": "Progress through beginner to advanced.",
    "home.how.step4.title": "Answer questions",
    "home.how.step4.desc": "Test yourself with real, practical challenges.",
    "home.how.step5.title": "Earn XP & badges",
    "home.how.step5.desc": "Level up your rank and collect achievements.",

    "home.languages.title": "Featured languages & frameworks",
    "home.languages.subtitle": "The technologies that run the modern web.",

    "home.cta.title": "Ready to start your quest?",
    "home.cta.subtitle":
      "No sign-up. No cost. Just pick a track and start leveling up.",
    "home.cta.button": "Begin now",

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
    "footer.connect": "Connect",
    "footer.explore": "Explore",
    "footer.madeWith": "Designed & built with passion for learners everywhere.",
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
    "home.stats.languages": "لغات",
    "home.stats.xp": "نقاط خبرة للكسب",
    "home.stats.title": "موثوق من المطوّرين الفضوليين",
    "home.stats.subtitle": "عالم متنامٍ من التحديات عبر كامل المنظومة.",
    "home.features.title": "بُنيت كلعبة، صُممت للتعلم",

    "home.paths.title": "مساران، رحلة واحدة",
    "home.paths.subtitle": "تخصّص في المتصفّح أو تملّك الخادم.",
    "home.paths.frontend.title": "مسار الواجهة الأمامية",
    "home.paths.frontend.desc":
      "اصنع واجهات جميلة وتفاعلية. أتقن الترميز والتنسيق وعصر المكوّنات الحديث.",
    "home.paths.backend.title": "مسار الواجهة الخلفية",
    "home.paths.backend.desc":
      "شغّل الويب من خلف الكواليس. ابنِ الواجهات البرمجية، ونمذِج البيانات، وأمّن تطبيقاتك.",
    "home.paths.explore": "استكشف المسار",
    "home.paths.skills": "مهارات",

    "home.how.title": "كيف يعمل",
    "home.how.subtitle": "من الصفر إلى الاحتراف في خمس خطوات بسيطة.",
    "home.how.step1.title": "اختر مسارًا",
    "home.how.step1.desc": "اختر من 13 مهارة في الواجهتين الأمامية والخلفية.",
    "home.how.step2.title": "اختر لغتك",
    "home.how.step2.desc": "بدّل فورًا بين العربية والإنجليزية.",
    "home.how.step3.title": "افتح المستويات",
    "home.how.step3.desc": "تقدّم من المبتدئ إلى المتقدّم.",
    "home.how.step4.title": "أجب عن الأسئلة",
    "home.how.step4.desc": "اختبر نفسك بتحديات عملية حقيقية.",
    "home.how.step5.title": "اكسب الخبرة والأوسمة",
    "home.how.step5.desc": "ارفع مرتبتك واجمع الإنجازات.",

    "home.languages.title": "لغات وأطر مميّزة",
    "home.languages.subtitle": "التقنيات التي تشغّل الويب الحديث.",

    "home.cta.title": "هل أنت مستعد لبدء مهمتك؟",
    "home.cta.subtitle":
      "بلا تسجيل. بلا تكلفة. فقط اختر مسارًا وابدأ التطوّر.",
    "home.cta.button": "ابدأ الآن",

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
    "footer.connect": "تواصل",
    "footer.explore": "استكشف",
    "footer.madeWith": "صُمّم وبُني بشغف للمتعلّمين في كل مكان.",
  },
} as const;

/** Union of every valid translation key (enforces EN/AR parity). */
export type TranslationKey = keyof (typeof translations)["en"];

export function getTranslations(language: Language) {
  return translations[language];
}
