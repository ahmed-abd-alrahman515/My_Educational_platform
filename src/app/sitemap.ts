import type { MetadataRoute } from "next";
import { TRACKS } from "@/data/tracks";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap of indexable routes: marketing/landing pages, the track listings,
 * and every language roadmap. Personal pages (profile, dashboard) and the
 * transient quiz-play screens are intentionally excluded — they're noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/tracks", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/tracks/frontend", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tracks/backend", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  ];
  const staticRoutes: MetadataRoute.Sitemap = pages.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const trackRoutes: MetadataRoute.Sitemap = TRACKS.map((track) => ({
    url: `${SITE_URL}/quiz/${track.category}/${track.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...trackRoutes];
}
