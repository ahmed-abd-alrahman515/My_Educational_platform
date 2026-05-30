import type { Track, TrackCategory, TrackId } from "@/types";
import { LEVELS } from "./levels";

/**
 * Track registry. Each entry pairs a stable id with its bilingual metadata,
 * a lucide icon name, and the gradient/accent used for its glowing card.
 *
 * Icons are resolved at render time via the `iconMap` in components/ui/Icon.
 */
export const TRACKS: Track[] = [
  /* ----------------------------- Frontend ----------------------------- */
  {
    id: "html",
    category: "frontend",
    title: { en: "HTML", ar: "HTML" },
    description: {
      en: "Structure the web with semantic markup.",
      ar: "ابنِ هيكل الويب باستخدام العناصر الدلالية.",
    },
    icon: "FileCode2",
    gradient: "from-orange-500 to-rose-500",
    accent: "#f97316",
    levels: LEVELS,
  },
  {
    id: "css",
    category: "frontend",
    title: { en: "CSS", ar: "CSS" },
    description: {
      en: "Style, layout, and animate beautiful interfaces.",
      ar: "نسّق ونظّم وحرّك واجهات جميلة.",
    },
    icon: "Palette",
    gradient: "from-sky-500 to-blue-600",
    accent: "#0ea5e9",
    levels: LEVELS,
  },
  {
    id: "javascript",
    category: "frontend",
    title: { en: "JavaScript", ar: "جافاسكريبت" },
    description: {
      en: "The language that powers the interactive web.",
      ar: "اللغة التي تشغّل الويب التفاعلي.",
    },
    icon: "Braces",
    gradient: "from-yellow-400 to-amber-500",
    accent: "#eab308",
    levels: LEVELS,
  },
  {
    id: "typescript",
    category: "frontend",
    title: { en: "TypeScript", ar: "تايبسكريبت" },
    description: {
      en: "JavaScript with types for safer, scalable code.",
      ar: "جافاسكريبت مع أنواع لكود أكثر أمانًا وقابلية للتوسّع.",
    },
    icon: "FileType2",
    gradient: "from-blue-500 to-indigo-600",
    accent: "#3b82f6",
    levels: LEVELS,
  },
  {
    id: "react",
    category: "frontend",
    title: { en: "React.js", ar: "رياكت" },
    description: {
      en: "Build component-driven user interfaces.",
      ar: "ابنِ واجهات مستخدم قائمة على المكوّنات.",
    },
    icon: "Atom",
    gradient: "from-cyan-400 to-sky-500",
    accent: "#22d3ee",
    levels: LEVELS,
  },
  {
    id: "nextjs",
    category: "frontend",
    title: { en: "Next.js", ar: "نكست" },
    description: {
      en: "The React framework for production apps.",
      ar: "إطار عمل رياكت لتطبيقات الإنتاج.",
    },
    icon: "Triangle",
    gradient: "from-zinc-500 to-zinc-800",
    accent: "#a1a1aa",
    levels: LEVELS,
  },

  /* ------------------------------ Backend ----------------------------- */
  {
    id: "php",
    category: "backend",
    title: { en: "PHP", ar: "PHP" },
    description: {
      en: "Server-side scripting that runs the web.",
      ar: "برمجة من جانب الخادم تشغّل الويب.",
    },
    icon: "Server",
    gradient: "from-indigo-400 to-violet-600",
    accent: "#818cf8",
    levels: LEVELS,
  },
  {
    id: "laravel",
    category: "backend",
    title: { en: "Laravel", ar: "لارافيل" },
    description: {
      en: "Elegant PHP framework for web artisans.",
      ar: "إطار PHP أنيق لصُنّاع الويب.",
    },
    icon: "Flame",
    gradient: "from-red-500 to-rose-600",
    accent: "#ef4444",
    levels: LEVELS,
  },
  {
    id: "nodejs",
    category: "backend",
    title: { en: "Node.js", ar: "نود" },
    description: {
      en: "JavaScript on the server, at scale.",
      ar: "جافاسكريبت على الخادم وبكفاءة عالية.",
    },
    icon: "Hexagon",
    gradient: "from-green-500 to-emerald-600",
    accent: "#22c55e",
    levels: LEVELS,
  },
  {
    id: "express",
    category: "backend",
    title: { en: "Express.js", ar: "إكسبريس" },
    description: {
      en: "Fast, minimalist web framework for Node.",
      ar: "إطار ويب سريع وبسيط لنود.",
    },
    icon: "Route",
    gradient: "from-stone-400 to-stone-700",
    accent: "#a8a29e",
    levels: LEVELS,
  },
  {
    id: "sql",
    category: "backend",
    title: { en: "SQL", ar: "SQL" },
    description: {
      en: "Query and model relational data.",
      ar: "استعلم ونمذِج البيانات العلائقية.",
    },
    icon: "Database",
    gradient: "from-teal-400 to-cyan-600",
    accent: "#2dd4bf",
    levels: LEVELS,
  },
  {
    id: "rest-api",
    category: "backend",
    title: { en: "REST API", ar: "واجهات REST" },
    description: {
      en: "Design clean, resource-oriented APIs.",
      ar: "صمّم واجهات برمجية نظيفة موجّهة للموارد.",
    },
    icon: "Webhook",
    gradient: "from-fuchsia-500 to-purple-600",
    accent: "#d946ef",
    levels: LEVELS,
  },
  {
    id: "authentication",
    category: "backend",
    title: { en: "Authentication", ar: "المصادقة" },
    description: {
      en: "Secure users with sessions, JWT & OAuth.",
      ar: "أمّن المستخدمين عبر الجلسات و JWT و OAuth.",
    },
    icon: "ShieldCheck",
    gradient: "from-amber-500 to-orange-600",
    accent: "#f59e0b",
    levels: LEVELS,
  },
];

/** Fast lookup map by track id. */
export const TRACKS_BY_ID: Record<TrackId, Track> = TRACKS.reduce(
  (acc, track) => {
    acc[track.id] = track;
    return acc;
  },
  {} as Record<TrackId, Track>,
);

export function getTrack(id: string): Track | undefined {
  return TRACKS_BY_ID[id as TrackId];
}

export function getTracksByCategory(category: TrackCategory): Track[] {
  return TRACKS.filter((t) => t.category === category);
}
