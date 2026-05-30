"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Final conversion banner before the footer. */
export function CallToAction() {
  const { t } = useLanguage();

  return (
    <Container className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-line p-px"
      >
        {/* gradient frame */}
        <div className="rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-primary/10 via-surface to-accent/10 px-8 py-16 text-center">
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="text-gradient">{t("home.cta.title")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/tracks">
                <Button size="lg">
                  {t("home.cta.button")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
