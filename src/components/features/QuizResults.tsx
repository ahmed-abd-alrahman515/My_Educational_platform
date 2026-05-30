"use client";

import { motion } from "framer-motion";
import { RotateCcw, Trophy, Home } from "lucide-react";
import Link from "next/link";
import type { LevelId, Track } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BadgeCard } from "./BadgeCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BADGES_BY_ID } from "@/data/badges";
import { PASS_THRESHOLD } from "@/lib/constants";

interface QuizResultsProps {
  track: Track;
  level: LevelId;
  score: number;
  total: number;
  xpEarned: number;
  newBadgeIds: string[];
  onRetry: () => void;
}

/** Celebration / summary screen shown when a quiz finishes. */
export function QuizResults({
  track,
  score,
  total,
  xpEarned,
  newBadgeIds,
  onRetry,
}: QuizResultsProps) {
  const { tc, t } = useLanguage();
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percent >= PASS_THRESHOLD;
  const newBadges = newBadgeIds.map((id) => BADGES_BY_ID[id]).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card glass className="overflow-hidden p-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow"
        >
          <Trophy className="h-10 w-10" />
        </motion.div>

        <h2 className="mt-6 text-2xl font-bold">
          {passed ? "🎉 " : ""}
          {tc(track.title)}
        </h2>

        <div className="mt-6 flex items-center justify-center gap-8">
          <div>
            <p className="text-4xl font-extrabold text-gradient">{percent}%</p>
            <p className="mt-1 text-sm text-muted">{t("quiz.score")}</p>
          </div>
          <div className="h-12 w-px bg-line" />
          <div>
            <p className="text-4xl font-extrabold text-gradient">+{xpEarned}</p>
            <p className="mt-1 text-sm text-muted">{t("quiz.xpEarned")}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">
          {score} / {total}
        </p>

        {/* Newly unlocked badges */}
        {newBadges.length > 0 && (
          <div className="mt-8">
            <div className="mx-auto grid max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
              {newBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} unlocked />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={onRetry} variant="outline">
            <RotateCcw className="h-4 w-4" />
            {t("common.retry")}
          </Button>
          <Link href="/tracks">
            <Button>
              <Home className="h-4 w-4" />
              {t("quiz.backToTracks")}
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
