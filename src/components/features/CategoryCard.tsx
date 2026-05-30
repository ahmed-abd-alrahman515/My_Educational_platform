"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CategoryMeta } from "@/data/categories";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getTracksByCategory } from "@/data/tracks";
import { getTrackStatus } from "@/lib/track-status";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: CategoryMeta;
  index?: number;
}

/**
 * Large gradient-bordered card for a whole category (Frontend / Backend),
 * shown on /tracks. Displays mini track icons + aggregate progress and links
 * to the category page.
 */
export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const { t, tc } = useLanguage();
  const { progress } = useProgress();

  const tracks = getTracksByCategory(category.id);

  // Aggregate completion across the category's tracks.
  const ratios = tracks.map(
    (track) => getTrackStatus(track, progress.tracks[track.id]).progress,
  );
  const avg =
    ratios.length > 0 ? ratios.reduce((a, b) => a + b, 0) / ratios.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/tracks/${category.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative h-full rounded-3xl bg-gradient-to-br p-px transition-transform duration-300 group-hover:-translate-y-1",
            category.gradient,
          )}
        >
          <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(500px circle at 50% 0%, ${category.glow}22, transparent 70%)`,
              }}
            />

            <div className="relative">
              <span
                className={cn(
                  "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  category.gradient,
                )}
              >
                <Icon name={category.icon} className="h-7 w-7" />
              </span>

              <h3 className="mt-6 text-2xl font-bold">{t(category.labelKey)}</h3>
              <p className="mt-2 text-muted">{t(category.descKey)}</p>

              {/* Mini track icons */}
              <div className="mt-6 flex flex-wrap gap-2">
                {tracks.map((track) => (
                  <span
                    key={track.id}
                    title={tc(track.title)}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-200 hover:scale-110",
                      track.gradient,
                    )}
                  >
                    <Icon name={track.icon} className="h-5 w-5" />
                  </span>
                ))}
              </div>

              {/* Aggregate progress */}
              <div className="mt-6">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted">{t("tracks.progress")}</span>
                  <span className="font-medium tabular-nums">
                    {Math.round(avg * 100)}%
                  </span>
                </div>
                <ProgressBar value={avg} />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-muted">
                  {tracks.length} {t("tracks.skillsCount")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {t("tracks.browse")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
