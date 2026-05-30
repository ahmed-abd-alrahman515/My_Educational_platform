import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/features/QuizEngine";
import { getCategory } from "@/data/categories";
import { TRACKS, getTrack } from "@/data/tracks";
import { LEVELS } from "@/data/levels";

interface PageProps {
  params: { track: string; language: string; level: string };
}

/**
 * Pre-render a route for every (category, language, level) combination, e.g.
 * /quiz/frontend/javascript/beginner … /quiz/backend/laravel/boss.
 */
export function generateStaticParams() {
  return TRACKS.flatMap((track) =>
    LEVELS.map((level) => ({
      track: track.category,
      language: track.id,
      level: level.id,
    })),
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const track = getTrack(params.language);
  const level = LEVELS.find((l) => l.id === params.level);
  if (!track || !level || track.category !== params.track) {
    return { title: "Quiz not found" };
  }
  return {
    title: `${track.title.en} · ${level.title.en}`,
    description: `Play the ${level.title.en} level of the ${track.title.en} quiz. Answer questions, earn XP, and build your streak.`,
  };
}

export default function LevelQuizPage({ params }: PageProps) {
  const category = getCategory(params.track);
  const track = getTrack(params.language);
  const level = LEVELS.find((l) => l.id === params.level);

  // Validate the full path: category, language belonging to it, and a real level.
  if (!category || !track || track.category !== category.id || !level) {
    notFound();
  }

  return <QuizEngine track={track} level={level} category={category} />;
}

export const dynamicParams = false;
