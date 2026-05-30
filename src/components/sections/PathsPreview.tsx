"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, ServerCog } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTracksByCategory } from "@/data/tracks";
import type { TranslationKey } from "@/i18n/translations";
import type { TrackCategory } from "@/types";

interface PathConfig {
  category: TrackCategory;
  icon: typeof LayoutDashboard;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  gradient: string;
  glow: string;
}

const PATHS: PathConfig[] = [
  {
    category: "frontend",
    icon: LayoutDashboard,
    titleKey: "home.paths.frontend.title",
    descKey: "home.paths.frontend.desc",
    gradient: "from-sky-500 via-indigo-500 to-purple-500",
    glow: "#6366f1",
  },
  {
    category: "backend",
    icon: ServerCog,
    titleKey: "home.paths.backend.title",
    descKey: "home.paths.backend.desc",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "#10b981",
  },
];

/** Two large gradient-bordered cards representing the frontend/backend paths. */
export function PathsPreview() {
  const { t, tc } = useLanguage();

  return (
    <Container className="py-20">
      <SectionHeading
        title={t("home.paths.title")}
        subtitle={t("home.paths.subtitle")}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {PATHS.map((path, i) => {
          const tracks = getTracksByCategory(path.category);
          const PIcon = path.icon;
          return (
            <motion.div
              key={path.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href="/tracks" className="group block h-full">
                {/* Gradient border wrapper */}
                <div
                  className={`relative h-full rounded-3xl bg-gradient-to-br p-px transition-transform duration-300 group-hover:-translate-y-1 ${path.gradient}`}
                >
                  <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-8">
                    {/* hover glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(500px circle at 50% 0%, ${path.glow}22, transparent 70%)`,
                      }}
                    />

                    <div className="relative">
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${path.gradient}`}
                      >
                        <PIcon className="h-7 w-7" />
                      </span>

                      <h3 className="mt-6 text-2xl font-bold">
                        {t(path.titleKey)}
                      </h3>
                      <p className="mt-2 text-muted">{t(path.descKey)}</p>

                      {/* mini track icons */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {tracks.map((track) => (
                          <span
                            key={track.id}
                            title={tc(track.title)}
                            className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-200 hover:scale-110 ${track.gradient}`}
                          >
                            <Icon name={track.icon} className="h-5 w-5" />
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-sm text-muted">
                          {tracks.length} {t("home.paths.skills")}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          {t("home.paths.explore")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
