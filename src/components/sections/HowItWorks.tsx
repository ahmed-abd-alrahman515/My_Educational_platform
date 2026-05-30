"use client";

import { motion } from "framer-motion";
import { Compass, Languages, Unlock, ListChecks, Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

interface Step {
  icon: typeof Compass;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}

const STEPS: Step[] = [
  { icon: Compass, titleKey: "home.how.step1.title", descKey: "home.how.step1.desc" },
  { icon: Languages, titleKey: "home.how.step2.title", descKey: "home.how.step2.desc" },
  { icon: Unlock, titleKey: "home.how.step3.title", descKey: "home.how.step3.desc" },
  { icon: ListChecks, titleKey: "home.how.step4.title", descKey: "home.how.step4.desc" },
  { icon: Trophy, titleKey: "home.how.step5.title", descKey: "home.how.step5.desc" },
];

/** Five-step "how it works" timeline with connecting line and micro-animations. */
export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <Container className="py-20">
      <SectionHeading
        title={t("home.how.title")}
        subtitle={t("home.how.subtitle")}
      />

      <div className="relative mt-14">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block"
        />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {STEPS.map((step, i) => {
            const SIcon = step.icon;
            return (
              <motion.li
                key={step.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface text-primary shadow-card transition-transform duration-300 hover:scale-110">
                    <SIcon className="h-6 w-6" />
                  </span>
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold">{t(step.titleKey)}</h3>
                <p className="mt-1.5 text-sm text-muted">{t(step.descKey)}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Container>
  );
}
