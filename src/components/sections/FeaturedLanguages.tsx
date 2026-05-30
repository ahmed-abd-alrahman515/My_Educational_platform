"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRACKS_BY_ID } from "@/data/tracks";
import type { TrackId } from "@/types";

/** Highlighted subset of tracks shown as a language/framework marquee grid. */
const FEATURED_IDS: TrackId[] = [
  "html",
  "css",
  "javascript",
  "react",
  "nextjs",
  "laravel",
  "sql",
];

export function FeaturedLanguages() {
  const { t, tc } = useLanguage();
  const featured = FEATURED_IDS.map((id) => TRACKS_BY_ID[id]).filter(Boolean);

  return (
    <Container className="py-20">
      <SectionHeading
        title={t("home.languages.title")}
        subtitle={t("home.languages.subtitle")}
      />

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {featured.map((track, i) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Link
              href={`/quiz/${track.id}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm ${track.gradient}`}
              >
                <Icon name={track.icon} className="h-5 w-5" />
              </span>
              <span className="font-semibold">{tc(track.title)}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
