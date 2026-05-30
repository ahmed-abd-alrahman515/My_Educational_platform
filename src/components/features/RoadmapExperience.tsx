"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Map } from "lucide-react";
import type { Track } from "@/types";
import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LevelRoadmap } from "./LevelRoadmap";
import { AdSlot } from "@/components/monetization/AdSlot";
import { HireMeCta } from "@/components/monetization/HireMeCta";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { buildRoadmap, roadmapProgress, type RoadmapNode } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

interface RoadmapExperienceProps {
  track: Track;
  category: CategoryMeta;
}

/**
 * Hosts the level roadmap for a single language. Choosing a level navigates to
 * the dedicated quiz-engine route (/quiz/[track]/[language]/[level]). The
 * roadmap recomputes from live progress, so unlock state updates the moment the
 * player returns from clearing a level.
 */
export function RoadmapExperience({ track, category }: RoadmapExperienceProps) {
  const { t, tc } = useLanguage();
  const { progress } = useProgress();
  const router = useRouter();

  const nodes = useMemo(
    () => buildRoadmap(track, progress.tracks[track.id]),
    [track, progress.tracks],
  );
  const overall = roadmapProgress(nodes);

  function handlePlay(node: RoadmapNode) {
    router.push(`/quiz/${category.slug}/${track.id}/${node.level.id}`);
  }

  return (
    <Container className="py-12">
      {/* Breadcrumb */}
      <Link
        href={`/tracks/${category.slug}`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t("roadmap.backToLanguages")}
      </Link>

      {/* Track header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                track.gradient,
              )}
            >
              <Icon name={track.icon} className="h-8 w-8" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {tc(track.title)}
                </h1>
                <Pill tone={category.id === "frontend" ? "primary" : "accent"}>
                  {t(category.labelKey)}
                </Pill>
              </div>
              <p className="mt-1 text-sm text-muted">{tc(track.description)}</p>
            </div>
          </div>

          {/* Overall progress dial */}
          <div className="min-w-[200px] rounded-2xl border border-line glass p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Map className="h-3.5 w-3.5" />
                {t("roadmap.overallProgress")}
              </span>
              <span className="font-bold tabular-nums">
                {Math.round(overall * 100)}%
              </span>
            </div>
            <ProgressBar value={overall} />
          </div>
        </div>
      </motion.div>

      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {t("roadmap.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          {t("roadmap.subtitle")}
        </p>
      </div>

      {/* Roadmap + optional desktop sidebar ad (sidebar hidden on smaller
          screens so the experience is never cramped). */}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
        <div className="min-w-0">
          <LevelRoadmap nodes={nodes} onPlay={handlePlay} />
        </div>
        <div className="hidden lg:block">
          <AdSlot format="sidebar" slotId="quiz-sidebar" sticky />
        </div>
      </div>

      {/* Primary monetization funnel */}
      <HireMeCta className="mt-16" />
    </Container>
  );
}
