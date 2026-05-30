"use client";

import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { CategoryHero } from "@/components/features/CategoryHero";
import { TrackGrid } from "@/components/features/TrackGrid";
import { HireMeCta } from "@/components/monetization/HireMeCta";
import { AdSlot } from "@/components/monetization/AdSlot";
import { getTracksByCategory } from "@/data/tracks";

/** /tracks/[category] — lists every track (language) in a category. */
export function CategoryView({ category }: { category: CategoryMeta }) {
  const tracks = getTracksByCategory(category.id);

  return (
    <>
      <CategoryHero category={category} />
      <Container className="py-12">
        <TrackGrid tracks={tracks} />

        {/* Bottom of page: lead funnel first, then an optional ad. */}
        <HireMeCta className="mt-16" />
        <AdSlot
          format="leaderboard"
          slotId="tracks-category-bottom"
          className="mt-8"
        />
      </Container>
    </>
  );
}
