"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { Track } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { TrackStatusBadge } from "./TrackStatusBadge";
import { DifficultyPath } from "./DifficultyPath";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getTrackStatus } from "@/lib/track-status";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

interface TrackCardProps {
  track: Track;
  /** Stagger index for entrance animation. */
  index?: number;
}

const CTA_KEY: Record<string, TranslationKey> = {
  "not-started": "tracks.cta.start",
  "in-progress": "tracks.cta.continue",
  completed: "tracks.cta.review",
  "coming-soon": "tracks.cta.locked",
};

/**
 * Premium "game card" for a single track. Self-contained: reads its own
 * status + progress from the progress provider, so any grid can drop it in.
 */
export function TrackCard({ track, index = 0 }: TrackCardProps) {
  const { tc, t } = useLanguage();
  const { progress } = useProgress();

  const tp = progress.tracks[track.id];
  const info = getTrackStatus(track, tp);
  const locked = !info.available;
  const percent = Math.round(info.progress * 100);

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={locked ? undefined : { y: -6 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl p-px transition-shadow duration-300",
        locked
          ? "bg-line"
          : "bg-gradient-to-br from-line via-line to-line hover:shadow-glow",
      )}
    >
      {/* Animated gradient border (revealed on hover) */}
      {!locked && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            track.gradient,
          )}
        />
      )}

      <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-surface p-6">
        {/* hover glow wash */}
        {!locked && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at 50% 0%, ${track.accent}22, transparent 70%)`,
            }}
          />
        )}

        <div className="relative flex flex-1 flex-col">
          {/* Header: icon + status */}
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                track.gradient,
                locked && "opacity-50 grayscale",
              )}
            >
              {locked ? (
                <Lock className="h-5 w-5" />
              ) : (
                <Icon name={track.icon} className="h-6 w-6" />
              )}
            </span>
            <TrackStatusBadge status={info.status} />
          </div>

          {/* Name + description */}
          <h3 className="mt-4 text-lg font-semibold">{tc(track.title)}</h3>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-muted">
            {tc(track.description)}
          </p>

          {/* Difficulty path + levels count */}
          <div className="mt-4 flex items-center justify-between">
            <DifficultyPath
              levels={track.levels}
              completedLevelIds={tp?.completedLevels}
            />
            <span className="text-xs text-muted">
              {track.levels.length} {t("tracks.levels")}
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted">{t("tracks.progress")}</span>
              <span className="font-medium tabular-nums">{percent}%</span>
            </div>
            <ProgressBar value={info.progress} />
          </div>

          {/* CTA */}
          <div className="mt-5">
            <Button
              variant={locked ? "secondary" : "primary"}
              size="sm"
              disabled={locked}
              className="w-full"
            >
              {t(CTA_KEY[info.status])}
              {!locked && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (locked) {
    return <div className="h-full cursor-not-allowed">{card}</div>;
  }

  return (
    <Link href={`/quiz/${track.category}/${track.id}`} className="block h-full">
      {card}
    </Link>
  );
}
