import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoadmapExperience } from "@/components/features/RoadmapExperience";
import { getCategory } from "@/data/categories";
import { TRACKS, getTrack } from "@/data/tracks";

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
  return {
    title: `${track.title.en} Roadmap`,
    description: `Climb the ${track.title.en} level roadmap — from Beginner to the Boss Challenge. ${track.description.en}`,
  };
}

export default function RoadmapPage({ params }: PageProps) {
  const category = getCategory(params.track);
  const track = getTrack(params.language);

  // Guard: language must exist AND belong to the category in the URL.
  if (!category || !track || track.category !== category.id) {
    notFound();
  }

  return <RoadmapExperience track={track} category={category} />;
}

export const dynamicParams = false;
