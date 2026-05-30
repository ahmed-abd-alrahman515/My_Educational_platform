"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Trophy,
  Map,
  ArrowRight,
  Swords,
  Frown,
  Zap,
  Flame,
  Target,
} from "lucide-react";
import type { Level, LevelId, Track } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BadgeCard } from "./BadgeCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BADGES_BY_ID } from "@/data/badges";
import { PASS_THRESHOLD } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LevelCompleteProps {
  track: Track;
  level: Level;
  category: string;
  score: number;
  total: number;
  xpEarned: number;
  bestStreak: number;
  levelBonus: number;
  passed: boolean;
  newBadgeIds: string[];
  /** id of the next level to advance to, if any and unlocked. */
  nextLevelId: LevelId | null;
  onRetry: () => void;
}

/** Celebration / summary screen shown after a level finishes in the engine. */
export function LevelComplete({
  track,
  level,
  category,
  score,
  total,
  xpEarned,
  bestStreak,
  levelBonus,
  passed,
  newBadgeIds,
  nextLevelId,
  onRetry,
}: LevelCompleteProps) {
  const { t, tc } = useLanguage();
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const isBoss = level.isBoss;
  const newBadges = newBadgeIds.map((id) => BADGES_BY_ID[id]).filter(Boolean);

  const title = !passed
    ? t("complete.failedTitle")
    : isBoss
      ? t("complete.bossTitle")
      : t("complete.title");

  const subtitle = !passed
    ? t("complete.failSubtitle").replace("{threshold}", String(PASS_THRESHOLD))
    : isBoss
      ? t("complete.bossSubtitle")
      : t("complete.passSubtitle");

  const HeroIcon = !passed ? Frown : isBoss ? Swords : Trophy;

  const stats = [
    { icon: Target, label: t("complete.score"), value: `${score}/${total}` },
    { icon: Zap, label: t("complete.xpEarned"), value: `${xpEarned >= 0 ? "+" : ""}${xpEarned}` },
    { icon: Flame, label: t("complete.bestStreak"), value: bestStreak },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card glass className="relative overflow-hidden p-8 text-center">
        {/* ambient glow */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-0 h-48 w-[480px] -translate-x-1/2 rounded-full blur-3xl",
            passed ? "bg-radial-glow" : "bg-danger/10",
          )}
        />

        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className={cn(
              "mx-auto grid h-20 w-20 place-items-center rounded-3xl text-white shadow-glow",
              !passed
                ? "bg-gradient-to-br from-slate-400 to-slate-600"
                : isBoss
                  ? "bg-gradient-to-br from-rose-500 to-orange-500"
                  : "bg-gradient-to-br from-primary to-accent",
            )}
          >
            <HeroIcon className="h-10 w-10" />
          </motion.div>

          <h2 className="mt-6 text-2xl font-bold">{title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">{subtitle}</p>

          {/* track + level chip */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">
            <span
              className={cn(
                "grid h-5 w-5 place-items-center rounded bg-gradient-to-br text-white",
                track.gradient,
              )}
            >
              <Icon name={track.icon} className="h-3 w-3" />
            </span>
            {tc(track.title)} · {tc(level.title)}
          </div>

          {/* big numbers */}
          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
            <div>
              <p className="text-4xl font-extrabold text-gradient">{percent}%</p>
              <p className="mt-1 text-xs text-muted">{t("complete.accuracy")}</p>
            </div>
            <div className="h-12 w-px bg-line" />
            <div>
              <p className="text-4xl font-extrabold text-gradient">
                {xpEarned >= 0 ? "+" : ""}
                {xpEarned}
              </p>
              <p className="mt-1 text-xs text-muted">{t("complete.xpEarned")}</p>
            </div>
          </div>

          {/* level bonus note */}
          {passed && levelBonus > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-success"
            >
              <Zap className="h-3.5 w-3.5" />
              {t("complete.levelBonus")}: +{levelBonus} XP
            </motion.p>
          )}

          {/* stat row */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((s) => {
              const SIcon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-line bg-surface p-3"
                >
                  <SIcon className="mx-auto h-4 w-4 text-primary" />
                  <p className="mt-1.5 text-lg font-bold tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-muted">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* new badges */}
          {newBadges.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold">
                {t("complete.newBadges")}
              </p>
              <div className="mx-auto grid max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
                {newBadges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <BadgeCard badge={badge} unlocked />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={onRetry} variant="outline">
              <RotateCcw className="h-4 w-4" />
              {passed ? t("complete.replay") : t("complete.retry")}
            </Button>

            {passed && nextLevelId ? (
              <Link href={`/quiz/${category}/${track.id}/${nextLevelId}`}>
                <Button>
                  {t("complete.nextLevel")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            ) : (
              <Link href={`/quiz/${category}/${track.id}`}>
                <Button>
                  <Map className="h-4 w-4" />
                  {t("complete.backToRoadmap")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
