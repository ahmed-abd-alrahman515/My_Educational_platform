"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Track } from "@/types";
import { GlowCard } from "@/components/ui/GlowCard";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getQuestionCount } from "@/data/questions";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  track: Track;
}

/** Glowing, animated card representing a single track on the tracks grid. */
export function TrackCard({ track }: TrackCardProps) {
  const { tc, t, dir } = useLanguage();
  const { progress } = useProgress();

  const count = getQuestionCount(track.id);
  const tp = progress.tracks[track.id];
  const completion = tp ? tp.completedLevels.length / track.levels.length : 0;
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <Link href={`/quiz/${track.id}`} className="block">
      <GlowCard glowColor={track.accent} className="h-full">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              track.gradient,
            )}
          >
            <Icon name={track.icon} className="h-6 w-6" />
          </span>
          <Pill tone={track.category === "frontend" ? "primary" : "accent"}>
            {t(track.category === "frontend" ? "common.frontend" : "common.backend")}
          </Pill>
        </div>

        <h3 className="mt-4 text-lg font-semibold">{tc(track.title)}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {tc(track.description)}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span>
            {track.levels.length} {t("tracks.levels")}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted" />
          <span>
            {count} {t("tracks.questions")}
          </span>
        </div>

        {completion > 0 && (
          <div className="mt-4">
            <ProgressBar value={completion} />
          </div>
        )}

        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
          {t(completion > 0 ? "common.continue" : "common.start")}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </GlowCard>
    </Link>
  );
}
