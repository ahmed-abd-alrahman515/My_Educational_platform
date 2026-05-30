"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackCard } from "@/components/features/TrackCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRACKS } from "@/data/tracks";

/** Home-page preview of the first tracks, linking to the full grid. */
export function TracksShowcase() {
  const { t } = useLanguage();
  const featured = TRACKS.slice(0, 6);

  return (
    <Container className="py-12">
      <SectionHeading
        title={t("home.tracks.title")}
        subtitle={t("home.tracks.subtitle")}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </Container>
  );
}
