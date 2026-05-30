"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Map } from "lucide-react";
import type { LevelId, Track } from "@/types";
import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { LevelRoadmap } from "./LevelRoadmap";
import { QuizRunner } from "./QuizRunner";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { buildRoadmap, roadmapProgress, type RoadmapNode } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

interface RoadmapExperienceProps {
  track: Track;
  category: CategoryMeta;
}

/**
 * Hosts the level roadmap for a single language and switches into the quiz
 * runner when a level is chosen. Recomputes the roadmap from live progress so
 * unlock state updates immediately after a level is cleared.
 */
export function RoadmapExperience({ track, category }: RoadmapExperienceProps) {
  const { t, tc } = useLanguage();
  const { progress } = useProgress();
  const [activeLevel, setActiveLevel] = useState<LevelId | null>(null);

  const nodes = useMemo(
    () => buildRoadmap(track, progress.tracks[track.id]),
    [track, progress.tracks],
  );
  const overall = roadmapProgress(nodes);

  function handlePlay(node: RoadmapNode) {
    setActiveLevel(node.level.id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

      {activeLevel === null ? (
        <>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("roadmap.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {t("roadmap.subtitle")}
            </p>
          </div>
          <LevelRoadmap nodes={nodes} onPlay={handlePlay} />
        </>
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveLevel(null)}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("roadmap.title")}
            </Button>
          </div>
          <QuizRunner
            track={track}
            level={activeLevel}
            onExit={() => setActiveLevel(null)}
          />
        </div>
      )}
    </Container>
  );
}
