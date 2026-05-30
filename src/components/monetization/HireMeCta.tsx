"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PORTFOLIO_URL, WHATSAPP_URL } from "@/lib/monetization";
import { cn } from "@/lib/utils";

interface HireMeCtaProps {
  className?: string;
  /** Compact variant for tight spaces (e.g. after a level screen). */
  compact?: boolean;
}

/**
 * Primary monetization funnel: a premium "Hire Me" banner steering visitors to
 * the portfolio and WhatsApp. Designed to feel like part of the product, not an
 * ad — gradient frame, soft glow, clear CTAs.
 */
export function HireMeCta({ className, compact }: HireMeCtaProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      aria-labelledby="hire-me-title"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-line p-px",
        className,
      )}
    >
      {/* gradient frame */}
      <div
        className={cn(
          "relative rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-primary/10 via-surface to-accent/10",
          compact ? "p-6" : "p-8 sm:p-10",
        )}
      >
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
        />

        <div
          className={cn(
            "relative flex flex-col gap-6",
            !compact && "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("hire.eyebrow")}
            </span>

            <h2
              id="hire-me-title"
              className={cn(
                "mt-4 font-bold tracking-tight",
                compact ? "text-xl" : "text-2xl sm:text-3xl",
              )}
            >
              {t("hire.title")}
            </h2>
            <p className="mt-2 text-muted">{t("hire.subtitle")}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                <Briefcase className="h-4 w-4" />
                {t("hire.portfolio")}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4" />
                {t("hire.whatsapp")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
