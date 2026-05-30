"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTracksByCategory } from "@/data/tracks";
import { cn } from "@/lib/utils";

/** Hero band for a category page (frontend / backend) with breadcrumb + count. */
export function CategoryHero({ category }: { category: CategoryMeta }) {
  const { t, tc } = useLanguage();
  const tracks = getTracksByCategory(category.id);

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] h-72 w-[600px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${category.glow}26` }}
      />

      <Container className="relative z-10 py-14">
        <Link
          href="/tracks"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("tracks.allTracks")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-center"
        >
          <span
            className={cn(
              "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
              category.gradient,
            )}
          >
            <Icon name={category.icon} className="h-8 w-8" />
          </span>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="text-gradient">{t(category.labelKey)}</span>
              </h1>
              <Pill tone="primary">
                <Layers className="h-3 w-3" />
                {tracks.length} {t("tracks.skillsCount")}
              </Pill>
            </div>
            <p className="mt-2 max-w-xl text-muted">{tc(category.tagline)}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
