"use client";

import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { CategoryHero } from "@/components/features/CategoryHero";
import { TrackGrid } from "@/components/features/TrackGrid";
import { getTracksByCategory } from "@/data/tracks";

/** /tracks/[category] — lists every track (language) in a category. */
export function CategoryView({ category }: { category: CategoryMeta }) {
  const tracks = getTracksByCategory(category.id);

  return (
    <>
      <CategoryHero category={category} />
      <Container className="py-12">
        <TrackGrid tracks={tracks} />
      </Container>
    </>
  );
}
