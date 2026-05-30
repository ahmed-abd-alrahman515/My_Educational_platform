"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Layers, Code2, BarChart3, HelpCircle, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRACKS } from "@/data/tracks";
import { QUESTION_BANK } from "@/data/questions";
import { LEVELS } from "@/data/levels";
import { formatNumber } from "@/lib/utils";

/** A single count-up stat that animates when scrolled into view. */
function CountStat({
  icon: StatIcon,
  value,
  label,
  suffix = "+",
}: {
  icon: typeof Layers;
  value: number;
  label: string;
  suffix?: string;
}) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <StatIcon className="h-5 w-5" />
      </span>
      <p className="text-3xl font-bold text-gradient sm:text-4xl">
        {formatNumber(display, language)}
        {suffix}
      </p>
      <p className="text-xs text-muted sm:text-sm">{label}</p>
    </div>
  );
}

/** Platform metrics: tracks, languages, levels, questions, XP. */
export function StatsStrip() {
  const { t } = useLanguage();

  const totalQuestions = Object.values(QUESTION_BANK).reduce(
    (sum, qs) => sum + (qs?.length ?? 0),
    0,
  );

  const stats = [
    { icon: Layers, value: TRACKS.length, label: t("home.stats.tracks") },
    { icon: Code2, value: 2, label: t("home.stats.languages"), suffix: "" },
    { icon: BarChart3, value: LEVELS.length, label: t("home.stats.levels"), suffix: "" },
    { icon: HelpCircle, value: totalQuestions, label: t("home.stats.questions") },
    { icon: Zap, value: 9000, label: t("home.stats.xp") },
  ];

  return (
    <Container className="relative z-10 -mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-6 rounded-3xl border border-line glass p-8 shadow-card sm:grid-cols-3 lg:grid-cols-5"
      >
        {stats.map((s) => (
          <CountStat
            key={s.label}
            icon={s.icon}
            value={s.value}
            label={s.label}
            suffix={s.suffix}
          />
        ))}
      </motion.div>
    </Container>
  );
}
