"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackCard } from "@/components/features/TrackCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTracksByCategory } from "@/data/tracks";

/** Full tracks catalog grouped by category (frontend / backend). */
export function TracksView() {
  const { t } = useLanguage();
  const groups = [
    { key: "frontend", label: t("common.frontend") },
    { key: "backend", label: t("common.backend") },
  ] as const;

  return (
    <Container className="py-12">
      <SectionHeading
        title={t("tracks.title")}
        subtitle={t("tracks.subtitle")}
      />

      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <section key={group.key}>
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
              {group.label}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getTracksByCategory(group.key).map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
