import type { MetadataRoute } from "next";
import { TRACKS } from "@/data/tracks";

const BASE_URL = "https://codequest.example";

/** Generates sitemap entries for static pages and every track quiz route. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tracks",
    "/tracks/frontend",
    "/tracks/backend",
    "/dashboard",
    "/about",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const trackRoutes = TRACKS.map((track) => ({
    url: `${BASE_URL}/quiz/${track.category}/${track.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...trackRoutes];
}
