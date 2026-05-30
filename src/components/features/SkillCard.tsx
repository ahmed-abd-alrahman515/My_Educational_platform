"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, Crown } from "lucide-react";
import type { SkillStat } from "@/lib/profile-stats";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatNumber, cn } from "@/lib/utils";

interface SkillCardProps {
  skill: SkillStat;
  index?: number;
}

/** A per-language progress card for the profile's skills grid. */
export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const { t, tc, language } = useLanguage();
  const { track } = skill;
  const percent = Math.round(skill.completion * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        href={`/quiz/${track.category}/${track.id}`}
        className="group relative block overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
      >
        {/* mastered glow */}
        {skill.mastered && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px opacity-60"
            style={{
              background: `radial-gradient(300px circle at 50% 0%, ${track.accent}22, transparent 70%)`,
            }}
          />
        )}

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                  track.gradient,
                )}
              >
                <Icon name={track.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold leading-tight">{tc(track.title)}</p>
                <p className="text-xs text-muted">
                  {skill.completedLevels}/{skill.totalLevels}{" "}
                  {t("profile.levelsLabel")}
                </p>
              </div>
            </div>
            {skill.mastered ? (
              <Pill tone="success">
                <Crown className="h-3 w-3" />
                {t("profile.mastered")}
              </Pill>
            ) : (
              <ChevronRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            )}
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium tabular-nums">{percent}%</span>
              <span className="text-muted">
                {formatNumber(skill.totalXp, language)} {t("common.xp")}
              </span>
            </div>
            <ProgressBar
              value={skill.completion}
              fillClassName={cn("bg-gradient-to-r", track.gradient)}
            />
          </div>

          {/* level pips */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: skill.totalLevels }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "flex h-1.5 flex-1 items-center justify-center rounded-full",
                  i < skill.completedLevels ? "bg-success" : "bg-line",
                )}
              >
                {i < skill.completedLevels && (
                  <Check className="h-2 w-2 text-white" strokeWidth={4} />
                )}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
