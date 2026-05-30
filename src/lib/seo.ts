import type { Metadata } from "next";

/**
 * Centralized SEO configuration + a small helper to build consistent page
 * metadata (canonical, Open Graph, Twitter) without repeating boilerplate.
 *
 * `SITE_URL` can be overridden at build time via NEXT_PUBLIC_SITE_URL so the
 * same code works in preview and production deployments.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://codequest.example";

export const SITE_NAME = "CodeQuest";

export const SITE_DESCRIPTION =
  "A bilingual (Arabic/English) gamified programming quiz platform. Master frontend and backend tracks, earn XP, build streaks, and unlock badges — free and private to your browser.";

export const SITE_KEYWORDS = [
  "programming quiz",
  "learn to code",
  "coding challenges",
  "frontend",
  "backend",
  "JavaScript quiz",
  "TypeScript",
  "React",
  "Next.js",
  "Laravel",
  "SQL",
  "REST API",
  "Arabic programming",
  "اختبارات برمجة",
  "تعلم البرمجة",
];

interface BuildMetaOptions {
  title?: string;
  description: string;
  /** Path beginning with "/", used for the canonical + OG url. */
  path: string;
  keywords?: string[];
  /** Override the OG/Twitter image (defaults to the site OG image). */
  imagePath?: string;
}

/**
 * Build a page's Metadata with canonical URL, Open Graph, and Twitter card
 * wired up consistently. `title` flows through the layout's title template
 * ("%s · CodeQuest") unless this is the home page.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: BuildMetaOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
