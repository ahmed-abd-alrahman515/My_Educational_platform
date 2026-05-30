"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LevelId, Track } from "@/types";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { LevelSelect } from "./LevelSelect";
import { QuizRunner } from "./QuizRunner";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Top-level client flow for a track's quiz page: pick a level, then play.
 * Keeps the route's server component thin (it just resolves the track).
 */
export function QuizExperience({ track }: { track: Track }) {
  const { tc, t } = useLanguage();
  const [level, setLevel] = useState<LevelId | null>(null);

  return (
    <Container className="py-12">
      <Link
        href="/tracks"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t("quiz.backToTracks")}
      </Link>

      {/* Track header */}
      <div className="mb-10 flex items-center gap-4">
        <span
          className={cn(
            "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
            track.gradient,
          )}
        >
          <Icon name={track.icon} className="h-7 w-7" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{tc(track.title)}</h1>
            <Pill tone={track.category === "frontend" ? "primary" : "accent"}>
              {t(
                track.category === "frontend"
                  ? "common.frontend"
                  : "common.backend",
              )}
            </Pill>
          </div>
          <p className="mt-1 text-sm text-muted">{tc(track.description)}</p>
        </div>
      </div>

      {level === null ? (
        <LevelSelect track={track} onSelect={setLevel} />
      ) : (
        <div className="mx-auto max-w-2xl">
          <QuizRunner
            track={track}
            level={level}
            onExit={() => setLevel(null)}
          />
        </div>
      )}
    </Container>
  );
}
