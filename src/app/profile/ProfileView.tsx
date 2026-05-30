"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  Award,
  Target,
  Layers,
  Crown,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/ui/Spinner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatCard } from "@/components/features/StatCard";
import { SkillCard } from "@/components/features/SkillCard";
import { BadgeCard } from "@/components/features/BadgeCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { BADGES } from "@/data/badges";
import { getTrack } from "@/data/tracks";
import { getRank, getNextRank, getRankProgress } from "@/lib/xp";
import { computeProfileStats, type SkillStat } from "@/lib/profile-stats";
import { formatNumber, cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

/** Player profile dashboard — all metrics derived from localStorage. */
export function ProfileView() {
  const { t, tc, language } = useLanguage();
  const { progress, hydrated, resetProgress } = useProgress();

  const stats = useMemo(() => computeProfileStats(progress), [progress]);

  const rank = getRank(progress.totalXp);
  const nextRank = getNextRank(progress.totalXp);
  const rankProgress = getRankProgress(progress.totalXp);
  const unlockedSet = new Set(progress.unlockedBadgeIds);

  const [confirming, setConfirming] = useState(false);

  if (!hydrated) {
    return (
      <Container className="py-24">
        <div className="flex justify-center">
          <Spinner size={44} />
        </div>
      </Container>
    );
  }

  const hasActivity = progress.history.length > 0;

  function handleReset() {
    if (confirming) {
      resetProgress();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 4000);
    }
  }

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title={t("profile.title")}
          subtitle={t("profile.subtitle")}
          align="start"
        />
        {hasActivity && (
          <Button
            variant={confirming ? "primary" : "outline"}
            size="sm"
            onClick={handleReset}
            className={confirming ? "!bg-danger !shadow-none" : ""}
            title={t("profile.resetConfirm")}
          >
            <RotateCcw className="h-4 w-4" />
            {confirming ? t("profile.resetConfirm") : t("profile.reset")}
          </Button>
        )}
      </div>

      {!hasActivity ? (
        <EmptyState />
      ) : (
        <>
          {/* Rank hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card glass className="relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-40 w-[500px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
              />
              <CardBody className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-center">
                {/* Rank ring */}
                <RadialProgress value={rankProgress} size={140} strokeWidth={11}>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold leading-none text-gradient">
                      {rank.level}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">
                      {t("profile.rank")}
                    </p>
                  </div>
                </RadialProgress>

                <div className="flex-1 text-center sm:text-start">
                  <Pill tone="primary" className="mb-2">
                    <Crown className="h-3 w-3" />
                    {t("profile.rank")}
                  </Pill>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {tc(rank.title)}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {formatNumber(progress.totalXp, language)} {t("common.xp")}
                  </p>

                  <div className="mt-4 max-w-md">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
                      <span>{tc(rank.title)}</span>
                      {nextRank ? (
                        <span>{tc(nextRank.title)}</span>
                      ) : (
                        <span>{t("profile.maxRank")}</span>
                      )}
                    </div>
                    <ProgressBar value={rankProgress} />
                    {nextRank && (
                      <p className="mt-1.5 text-xs text-muted">
                        {formatNumber(nextRank.minXp - progress.totalXp, language)}{" "}
                        {t("profile.toGo")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Accuracy ring */}
                <div className="flex flex-col items-center">
                  <RadialProgress
                    value={stats.accuracy / 100}
                    size={104}
                    strokeWidth={9}
                  >
                    <div className="text-center">
                      <p className="text-xl font-bold tabular-nums">
                        {stats.accuracy}%
                      </p>
                    </div>
                  </RadialProgress>
                  <p className="mt-2 text-xs text-muted">
                    {t("profile.accuracy")}
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Overview stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="Zap"
              label={t("profile.totalXp")}
              value={formatNumber(stats.totalXp, language)}
            />
            <StatCard
              icon="Flame"
              label={t("profile.streak")}
              value={stats.streak}
            />
            <StatCard
              icon="Award"
              label={t("profile.badges")}
              value={`${stats.badgesEarned}/${BADGES.length}`}
            />
            <StatCard
              icon="Crown"
              label={t("profile.completedTracks")}
              value={`${stats.completedTracks}/${stats.totalLanguages}`}
            />
            <StatCard
              icon="GraduationCap"
              label={t("profile.completedLanguages")}
              value={`${stats.completedLanguages}/${stats.totalLanguages}`}
            />
            <StatCard
              icon="Layers"
              label={t("profile.completedLevels")}
              value={stats.completedLevels}
            />
            <StatCard
              icon="Target"
              label={t("profile.accuracy")}
              value={`${stats.accuracy}%`}
            />
            <StatCard
              icon="Trophy"
              label={t("profile.quizzes")}
              value={stats.quizzesCompleted}
            />
          </div>

          {/* Strongest / weakest */}
          {(stats.strongest || stats.weakest) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <HighlightCard
                tone="strong"
                labelKey="profile.strongest"
                skill={stats.strongest}
              />
              <HighlightCard
                tone="weak"
                labelKey="profile.weakest"
                skill={stats.weakest}
              />
            </div>
          )}

          {/* Language progress */}
          <section className="mt-12">
            <SectionHeading
              title={t("profile.skillsTitle")}
              subtitle={t("profile.skillsSubtitle")}
              align="start"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.skills.map((skill, i) => (
                <SkillCard key={skill.track.id} skill={skill} index={i} />
              ))}
            </div>
          </section>

          {/* Badges */}
          <section className="mt-12">
            <SectionHeading
              title={t("profile.badgesTitle")}
              subtitle={t("profile.badgesSubtitle")}
              align="start"
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {BADGES.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  unlocked={unlockedSet.has(badge.id)}
                />
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section className="mt-12">
            <Card glass>
              <CardHeader>
                <CardTitle>{t("profile.recentActivity")}</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="divide-y divide-line">
                  {progress.history.slice(0, 12).map((r, i) => {
                    const track = getTrack(r.trackId);
                    const percent =
                      r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
                    return (
                      <motion.li
                        key={`${r.completedAt}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <div className="flex items-center gap-3">
                          {track && (
                            <span
                              className={cn(
                                "grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-white",
                                track.gradient,
                              )}
                            >
                              <Icon name={track.icon} className="h-4 w-4" />
                            </span>
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {track ? tc(track.title) : r.trackId}
                            </p>
                            <p className="text-xs text-muted">
                              {t(`common.${r.level}` as TranslationKey)} ·{" "}
                              {percent}%
                            </p>
                          </div>
                        </div>
                        <Pill tone={r.xpEarned >= 0 ? "primary" : "neutral"}>
                          {r.xpEarned >= 0 ? "+" : ""}
                          {r.xpEarned} {t("common.xp")}
                        </Pill>
                      </motion.li>
                    );
                  })}
                </ul>
              </CardBody>
            </Card>
          </section>
        </>
      )}
    </Container>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function HighlightCard({
  tone,
  labelKey,
  skill,
}: {
  tone: "strong" | "weak";
  labelKey: TranslationKey;
  skill: SkillStat | null;
}) {
  const { t, tc, language } = useLanguage();
  const Trend = tone === "strong" ? TrendingUp : TrendingDown;
  const accent =
    tone === "strong" ? "text-success" : "text-warning";

  return (
    <Card glass className="p-5">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Trend className={cn("h-4 w-4", accent)} />
        {t(labelKey)}
      </div>
      {skill ? (
        <div className="mt-3 flex items-center gap-3">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
              skill.track.gradient,
            )}
          >
            <Icon name={skill.track.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{tc(skill.track.title)}</p>
            <div className="mt-1.5">
              <ProgressBar value={skill.completion} />
            </div>
          </div>
          <span className="text-lg font-bold tabular-nums">
            {Math.round(skill.completion * 100)}%
          </span>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">{t("profile.noSkill")}</p>
      )}
    </Card>
  );
}

function EmptyState() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <Card glass className="relative overflow-hidden p-12 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-[500px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
        />
        <div className="relative">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
            <Sparkles className="h-10 w-10" />
          </span>
          <h2 className="mt-6 text-2xl font-bold">{t("profile.empty.title")}</h2>
          <p className="mx-auto mt-2 max-w-sm text-muted">
            {t("profile.empty.body")}
          </p>
          <Link href="/tracks" className="mt-8 inline-block">
            <Button size="lg">
              {t("profile.empty.cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
