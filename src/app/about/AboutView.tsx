"use client";

import { Code2, Heart, Layers } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { LocalizedText } from "@/types";

const COPY: { heading: LocalizedText; body: LocalizedText } = {
  heading: { en: "About CodeQuest", ar: "حول كودكويست" },
  body: {
    en: "CodeQuest is a frontend-only, gamified learning platform that turns programming practice into a game. Pick a track, answer bilingual questions, earn XP, and unlock badges — all stored privately in your browser.",
    ar: "كودكويست منصة تعلّم تفاعلية تعمل على الواجهة الأمامية فقط، تحوّل ممارسة البرمجة إلى لعبة. اختر مسارًا، أجب عن أسئلة ثنائية اللغة، اكسب نقاط الخبرة، وافتح الأوسمة — كل ذلك محفوظ بخصوصية في متصفحك.",
  },
};

const POINTS: { icon: typeof Code2; text: LocalizedText }[] = [
  {
    icon: Layers,
    text: {
      en: "13 tracks across frontend and backend, each with three difficulty levels.",
      ar: "13 مسارًا عبر الواجهتين الأمامية والخلفية، لكل منها ثلاثة مستويات صعوبة.",
    },
  },
  {
    icon: Code2,
    text: {
      en: "Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
      ar: "مبني باستخدام Next.js و TypeScript و Tailwind CSS و Framer Motion.",
    },
  },
  {
    icon: Heart,
    text: {
      en: "No accounts, no tracking — your progress lives only on your device.",
      ar: "بلا حسابات ولا تتبّع — تقدّمك يبقى على جهازك فقط.",
    },
  },
];

/** Static informational page about the platform. */
export function AboutView() {
  const { tc } = useLanguage();

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{tc(COPY.heading)}</span>
        </h1>
        <p className="mt-5 text-lg text-muted">{tc(COPY.body)}</p>

        <div className="mt-10 space-y-4">
          {POINTS.map((p, i) => {
            const PIcon = p.icon;
            return (
              <Card key={i} glass className="flex items-start gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <PIcon className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  {tc(p.text)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
