import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizExperience } from "@/components/features/QuizExperience";
import { TRACKS, getTrack } from "@/data/tracks";

interface PageProps {
  params: { track: string };
}

/** Pre-render a route for every known track (SEO + performance). */
export function generateStaticParams() {
  return TRACKS.map((track) => ({ track: track.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const track = getTrack(params.track);
  if (!track) return { title: "Quiz not found" };
  return {
    title: `${track.title.en} Quiz`,
    description: track.description.en,
  };
}

export default function QuizPage({ params }: PageProps) {
  const track = getTrack(params.track);
  if (!track) notFound();
  return <QuizExperience track={track} />;
}
