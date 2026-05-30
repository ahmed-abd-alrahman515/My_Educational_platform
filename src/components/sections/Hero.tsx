"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, LayoutGrid } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Landing hero with animated headline, glowing background, and CTAs. */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background: grid + radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl"
      />

      <Container className="relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Pill tone="primary" className="mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {t("home.hero.badge")}
          </Pill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
        >
          <span className="text-gradient">{t("home.hero.title")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-xl text-balance text-lg text-muted"
        >
          {t("home.hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/tracks">
            <Button size="lg">
              {t("home.hero.cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              <LayoutGrid className="h-4 w-4" />
              {t("home.hero.secondary")}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
