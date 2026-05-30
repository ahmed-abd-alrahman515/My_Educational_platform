import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PathsPreview } from "@/components/sections/PathsPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { FeaturedLanguages } from "@/components/sections/FeaturedLanguages";
import { CallToAction } from "@/components/sections/CallToAction";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  // Home uses the default site title (no template prefix).
  description:
    "Master programming by playing. CodeQuest is a free, bilingual (Arabic/English) gamified quiz platform with 13 frontend & backend tracks, 520+ questions, XP, streaks, and badges.",
  path: "/",
});

/**
 * Landing page composition:
 * hero → stats → paths → how it works → features → languages → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <PathsPreview />
      <HowItWorks />
      <Features />
      <FeaturedLanguages />
      <CallToAction />
    </>
  );
}
