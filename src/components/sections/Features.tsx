"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Globe, Moon, BarChart3, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { LocalizedText } from "@/types";

const FEATURES: {
  icon: typeof Trophy;
  title: LocalizedText;
  desc: LocalizedText;
}[] = [
  {
    icon: Zap,
    title: { en: "XP & Levels", ar: "نقاط الخبرة والمستويات" },
    desc: {
      en: "Earn experience for every correct answer and climb the ranks.",
      ar: "اكسب الخبرة عن كل إجابة صحيحة وتسلّق المراتب.",
    },
  },
  {
    icon: Trophy,
    title: { en: "Badges", ar: "الأوسمة" },
    desc: {
      en: "Unlock achievements as you master tracks and keep streaks.",
      ar: "افتح الإنجازات بإتقان المسارات والحفاظ على السلاسل.",
    },
  },
  {
    icon: Globe,
    title: { en: "Bilingual", ar: "ثنائي اللغة" },
    desc: {
      en: "Full Arabic & English support with right-to-left layouts.",
      ar: "دعم كامل للعربية والإنجليزية مع تخطيطات من اليمين لليسار.",
    },
  },
  {
    icon: Moon,
    title: { en: "Dark & Light", ar: "داكن وفاتح" },
    desc: {
      en: "A premium theme that adapts to your system or your mood.",
      ar: "مظهر مميّز يتكيّف مع نظامك أو مزاجك.",
    },
  },
  {
    icon: BarChart3,
    title: { en: "Progress Tracking", ar: "تتبّع التقدّم" },
    desc: {
      en: "Your XP, history, and badges are saved right in your browser.",
      ar: "تُحفظ خبرتك وسجلّك وأوسمتك مباشرة في متصفحك.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "13 Tracks", ar: "13 مسارًا" },
    desc: {
      en: "From HTML to Authentication across frontend and backend.",
      ar: "من HTML إلى المصادقة عبر الواجهتين الأمامية والخلفية.",
    },
  },
];

/** Grid of platform feature cards. */
export function Features() {
  const { t, tc } = useLanguage();

  return (
    <Container className="py-20">
      <SectionHeading title={t("home.features.title")} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const FIcon = f.icon;
          return (
            <motion.div
              key={f.title.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlowCard className="h-full">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{tc(f.title)}</h3>
                <p className="mt-2 text-sm text-muted">{tc(f.desc)}</p>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
