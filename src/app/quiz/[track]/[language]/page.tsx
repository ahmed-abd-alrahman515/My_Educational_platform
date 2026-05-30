import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoadmapExperience } from "@/components/features/RoadmapExperience";
import { getCategory } from "@/data/categories";
import { TRACKS, getTrack } from "@/data/tracks";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: { track: string; language: string };
}

/**
 * Pre-render a roadmap route for every (category, language) pair, e.g.
 * /quiz/frontend/javascript, /quiz/backend/laravel.
 *
 * Here `track` is the category slug and `language` is the track id — matching
 * the requested URL shape /quiz/[track]/[language].
 */
export function generateStaticParams() {
  return TRACKS.map((track) => ({
    track: track.category,
    language: track.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const track = getTrack(params.language);
  if (!track || track.category !== params.track) {
    return { title: "Roadmap not found" };
  }
  const name = track.title.en;
  return buildMetadata({
    title: `${name} Quiz`,
    description: `Climb the ${name} level roadmap on CodeQuest — Beginner, Intermediate, Advanced, Expert, and the Boss Challenge. ${track.description.en} Bilingual questions, hints, XP, and badges.`,
    path: `/quiz/${track.category}/${track.id}`,
    keywords: [`${name} quiz`, `learn ${name}`, `${name} interview questions`],
  });
}

export default function RoadmapPage({ params }: PageProps) {
  const category = getCategory(params.track);
  const track = getTrack(params.language);

  // Guard: language must exist AND belong to the category in the URL.
  if (!category || !track || track.category !== category.id) {
    notFound();
  }

  const label = category.id === "frontend" ? "Frontend" : "Backend";
  const path = `/quiz/${category.slug}/${track.id}`;

  return (
    <>
      <CourseJsonLd
        name={`${track.title.en} — CodeQuest`}
        description={track.description.en}
        path={path}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tracks", path: "/tracks" },
          { name: label, path: `/tracks/${category.slug}` },
          { name: track.title.en, path },
        ]}
      />
      <RoadmapExperience track={track} category={category} />
    </>
  );
}

export const dynamicParams = false;
