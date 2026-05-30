"use client";

import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRACKS } from "@/data/tracks";
import { QUESTION_BANK } from "@/data/questions";
import { LEVELS } from "@/data/levels";
import { formatNumber } from "@/lib/utils";

/** Headline metrics strip shown under the hero. */
export function StatsStrip() {
  const { t, language } = useLanguage();

  const totalQuestions = Object.values(QUESTION_BANK).reduce(
    (sum, qs) => sum + (qs?.length ?? 0),
    0,
  );

  const stats = [
    { value: TRACKS.length, label: t("home.stats.tracks") },
    { value: totalQuestions, label: t("home.stats.questions") },
    { value: LEVELS.length, label: t("home.stats.levels") },
  ];

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-line glass p-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-gradient sm:text-4xl">
              {formatNumber(s.value, language)}+
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
