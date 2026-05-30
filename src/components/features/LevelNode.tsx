"use client";

import { motion } from "framer-motion";
import {
  Check,
  Lock,
  Play,
  Zap,
  HelpCircle,
  Swords,
  RotateCcw,
} from "lucide-react";
import type { RoadmapNode } from "@/lib/roadmap";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatNumber, cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

interface LevelNodeProps {
  node: RoadmapNode;
  /** Render mirrored (node on the right) for the alternating timeline. */
  side: "start" | "end";
  onPlay: (node: RoadmapNode) => void;
}

const STATE_PILL: Record<
  RoadmapNode["state"],
  { tone: "neutral" | "warning" | "success"; key: TranslationKey }
> = {
  locked: { tone: "neutral", key: "roadmap.locked" },
  unlocked: { tone: "warning", key: "roadmap.unlocked" },
  completed: { tone: "success", key: "roadmap.completed" },
};

/**
 * A single level card on the roadmap. Handles all three visual states:
 *   - completed: glowing, gradient, check medallion
 *   - unlocked:  premium interactive card with CTA
 *   - locked:    disabled but premium (dimmed, lock icon, hint)
 */
export function LevelNode({ node, side, onPlay }: LevelNodeProps) {
  const { t, tc } = useLanguage();
  const { level, state, questionCount, potentialXp, empty } = node;

  const locked = state === "locked";
  const completed = state === "completed";
  const isBoss = level.isBoss;
  const playable = !locked && !empty;

  const ctaKey: TranslationKey = completed
    ? "roadmap.replay"
    : "roadmap.start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: node.index * 0.06 }}
      whileHover={playable ? { y: -4 } : undefined}
      className={cn(
        "relative w-full max-w-md rounded-3xl p-px",
        side === "end" ? "lg:ms-auto" : "lg:me-auto",
        completed
          ? "bg-gradient-to-br shadow-glow"
          : locked
            ? "bg-line"
            : "bg-gradient-to-br",
        (completed || !locked) && level.badge && !locked
          ? isBoss
            ? "from-rose-500 via-red-500 to-orange-500"
            : "from-primary/60 to-accent/60"
          : "",
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-6",
          locked ? "bg-surface/50" : "bg-surface",
          isBoss && !locked && "ring-1 ring-rose-500/30",
        )}
      >
        {/* Boss ambient glow */}
        {isBoss && !locked && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px opacity-60"
            style={{
              background:
                "radial-gradient(420px circle at 50% 0%, rgba(244,63,94,0.18), transparent 70%)",
            }}
          />
        )}

        <div className="relative flex items-start gap-4">
          {/* Level medallion */}
          <div className="relative shrink-0">
            <span
              className={cn(
                "grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300",
                playable && "group-hover:scale-105",
                completed
                  ? "bg-gradient-to-br from-success to-emerald-600"
                  : locked
                    ? "bg-surface-2 text-muted"
                    : isBoss
                      ? "bg-gradient-to-br from-rose-500 to-orange-500"
                      : "bg-gradient-to-br from-primary to-accent",
              )}
            >
              {locked ? (
                <Lock className="h-6 w-6" />
              ) : completed ? (
                <Check className="h-7 w-7" />
              ) : isBoss ? (
                <Swords className="h-6 w-6" />
              ) : (
                <Icon name={level.badge.icon} className="h-6 w-6" />
              )}
            </span>
            {/* Step number tag */}
            <span
              className={cn(
                "absolute -end-1 -top-1 grid h-6 w-6 place-items-center rounded-full text-xs font-bold",
                completed
                  ? "bg-success text-white"
                  : locked
                    ? "bg-surface-2 text-muted"
                    : "bg-gradient-to-br from-primary to-accent text-primary-foreground",
              )}
            >
              {node.index + 1}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={cn(
                  "text-lg font-bold",
                  locked && "text-muted",
                )}
              >
                {tc(level.title)}
              </h3>
              {empty && !locked ? (
                <Pill tone="neutral">{t("roadmap.comingSoon")}</Pill>
              ) : (
                <Pill tone={STATE_PILL[state].tone}>
                  {completed && <Check className="h-3 w-3" />}
                  {t(STATE_PILL[state].key)}
                </Pill>
              )}
            </div>

            {isBoss && (
              <p className="mt-1 text-xs text-muted">{t("roadmap.bossHint")}</p>
            )}

            {/* Stats row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 text-muted">
                <HelpCircle className="h-4 w-4" />
                {formatNumber(questionCount, "en")} {t("roadmap.questions")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-primary">
                <Zap className="h-4 w-4" />+{formatNumber(potentialXp, "en")} XP
              </span>
            </div>

            {/* Badge reward */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-lg",
                  locked
                    ? "bg-surface-2 text-muted"
                    : "bg-gradient-to-br from-yellow-400 to-amber-500 text-white",
                )}
              >
                <Icon name={level.badge.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs text-muted">
                {t("roadmap.badgeReward")}:{" "}
                <span className="font-medium text-foreground">
                  {tc(level.badge.title)}
                </span>
              </span>
            </div>

            {/* CTA / hint */}
            <div className="mt-5">
              {locked ? (
                <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <Lock className="h-3.5 w-3.5" />
                  {t("roadmap.lockedHint")}
                </p>
              ) : empty ? (
                <p className="text-xs text-muted">{t("roadmap.comingSoon")}</p>
              ) : (
                <Button
                  size="sm"
                  variant={completed ? "outline" : "primary"}
                  onClick={() => onPlay(node)}
                  className={cn(
                    !completed &&
                      isBoss &&
                      "from-rose-500 to-orange-500 shadow-[0_0_30px_-8px_rgba(244,63,94,0.6)]",
                  )}
                >
                  {completed ? (
                    <RotateCcw className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {t(ctaKey)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
