"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/features/CategoryCard";
import { HireMeCta } from "@/components/monetization/HireMeCta";
import { AdSlot } from "@/components/monetization/AdSlot";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CATEGORIES } from "@/data/categories";

/** /tracks — overview that lets the player pick a category (Frontend/Backend). */
export function TracksView() {
  const { t } = useLanguage();

  return (
    <Container className="py-14">
      <SectionHeading
        title={t("tracks.overviewTitle")}
        subtitle={t("tracks.overviewSubtitle")}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {CATEGORIES.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>

      {/* Bottom of page: lead funnel first, then an optional ad. */}
      <HireMeCta className="mt-16" />
      <AdSlot format="leaderboard" slotId="tracks-bottom" className="mt-8" />
    </Container>
  );
}
