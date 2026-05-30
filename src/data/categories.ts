import type { LocalizedText, TrackCategory } from "@/types";
import type { TranslationKey } from "@/i18n/translations";

/**
 * Presentation metadata for the two top-level track categories. Keeps the
 * /tracks overview and the per-category pages data-driven (no duplicated UI).
 */
export interface CategoryMeta {
  id: TrackCategory;
  /** Route segment, e.g. /tracks/frontend. */
  slug: string;
  /** lucide-react icon name. */
  icon: string;
  /** UI dictionary keys for label + description. */
  labelKey: TranslationKey;
  descKey: TranslationKey;
  /** Tailwind gradient used for the category hero + accents. */
  gradient: string;
  /** Glow color (hex) for hover/ambient effects. */
  glow: string;
  /** Bilingual tagline shown on the category page hero. */
  tagline: LocalizedText;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "frontend",
    slug: "frontend",
    icon: "LayoutDashboard",
    labelKey: "common.frontend",
    descKey: "tracks.frontendDesc",
    gradient: "from-sky-500 via-indigo-500 to-purple-500",
    glow: "#6366f1",
    tagline: {
      en: "Everything the user sees and touches.",
      ar: "كل ما يراه المستخدم ويتفاعل معه.",
    },
  },
  {
    id: "backend",
    slug: "backend",
    icon: "ServerCog",
    labelKey: "common.backend",
    descKey: "tracks.backendDesc",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "#10b981",
    tagline: {
      en: "The engine that powers it all.",
      ar: "المحرّك الذي يشغّل كل شيء.",
    },
  },
];

export const CATEGORY_BY_SLUG: Record<string, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, CategoryMeta>,
);

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORY_BY_SLUG[slug];
}
