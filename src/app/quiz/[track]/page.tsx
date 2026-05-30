import { redirect, notFound } from "next/navigation";
import { getCategory } from "@/data/categories";
import { getTrack } from "@/data/tracks";

interface PageProps {
  params: { track: string };
}

/**
 * The roadmap lives at /quiz/[track]/[language] (category/language). This
 * single-segment route only exists to gracefully redirect:
 *   - a category slug  → its language listing (/tracks/[category])
 *   - a legacy track id → its roadmap (/quiz/[category]/[trackId])
 *
 * Rendered dynamically (no static params) since it never returns markup.
 */
export const dynamic = "force-dynamic";

export default function QuizCategoryRedirect({ params }: PageProps) {
  // Category slug → show the languages in that category.
  if (getCategory(params.track)) {
    redirect(`/tracks/${params.track}`);
  }

  // Legacy /quiz/<trackId> link → forward to the new roadmap URL.
  const track = getTrack(params.track);
  if (track) {
    redirect(`/quiz/${track.category}/${track.id}`);
  }

  notFound();
}
