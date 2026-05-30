"use client";

import { Zap, Trophy, Flame, Award, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/ui/Spinner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Pill } from "@/components/ui/Pill";
import { StatCard } from "@/components/features/StatCard";
import { BadgeCard } from "@/components/features/BadgeCard";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { BADGES } from "@/data/badges";
import { getTrack } from "@/data/tracks";
import { getRank, getNextRank, getRankProgress } from "@/lib/xp";
import { formatNumber } from "@/lib/utils";

/** Player dashboard: rank, XP, streak, badges, and recent activity. */
export function DashboardView() {
  const { t, tc, language } = useLanguage();
  const { progress, hydrated } = useProgress();

  if (!hydrated) {
    return (
      <Container className="py-24">
        <div className="flex justify-center">
          <Spinner size={44} />
        </div>
      </Container>
    );
  }

  const rank = getRank(progress.totalXp);
  const nextRank = getNextRank(progress.totalXp);
  const rankProgress = getRankProgress(progress.totalXp);
  const unlockedSet = new Set(progress.unlockedBadgeIds);

  return (
    <Container className="py-12">
      <SectionHeading
        title={t("dashboard.title")}
        subtitle={t("dashboard.subtitle")}
        align="start"
      />

      {/* Rank hero */}
      <Card glass className="mt-10 overflow-hidden">
        <CardBody className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-glow">
              {rank.level}
            </span>
            <div>
              <p className="text-sm text-muted">{t("dashboard.rank")}</p>
              <p className="text-xl font-bold">{tc(rank.title)}</p>
            </div>
          </div>
          <div className="min-w-0 flex-1 sm:max-w-sm">
            <div className="mb-2 flex items-center justify-between text-xs text-muted">
              <span>
                {formatNumber(progress.totalXp, language)} {t("common.xp")}
              </span>
              {nextRank && (
                <span>
                  {formatNumber(nextRank.minXp, language)} {t("common.xp")}
                </span>
              )}
            </div>
            <ProgressBar value={rankProgress} />
          </div>
        </CardBody>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="Zap"
          label={t("dashboard.totalXp")}
          value={formatNumber(progress.totalXp, language)}
        />
        <StatCard
          icon="Flame"
          label={t("dashboard.streak")}
          value={progress.streak}
        />
        <StatCard
          icon="Award"
          label={t("dashboard.badges")}
          value={`${progress.unlockedBadgeIds.length}/${BADGES.length}`}
        />
        <StatCard
          icon="CheckCircle2"
          label={t("dashboard.completed")}
          value={progress.history.length}
        />
      </div>

      {/* Badges */}
      <div className="mt-12">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
          <Trophy className="h-5 w-5 text-primary" />
          {t("dashboard.badges")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              unlocked={unlockedSet.has(badge.id)}
            />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-12">
        <Card glass>
          <CardHeader>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
          </CardHeader>
          <CardBody>
            {progress.history.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">
                {t("dashboard.noActivity")}
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {progress.history.slice(0, 10).map((r, i) => {
                  const track = getTrack(r.trackId);
                  const percent =
                    r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
                  return (
                    <li
                      key={`${r.completedAt}-${i}`}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        {track && (
                          <span
                            className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${track.gradient} text-white`}
                          >
                            <Icon name={track.icon} className="h-4 w-4" />
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {track ? tc(track.title) : r.trackId}
                          </p>
                          <p className="text-xs text-muted">
                            {t(`common.${r.level}` as never)} · {percent}%
                          </p>
                        </div>
                      </div>
                      <Pill tone="primary">
                        +{r.xpEarned} {t("common.xp")}
                      </Pill>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
