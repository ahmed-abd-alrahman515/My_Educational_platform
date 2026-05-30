import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PathsPreview } from "@/components/sections/PathsPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { FeaturedLanguages } from "@/components/sections/FeaturedLanguages";
import { CallToAction } from "@/components/sections/CallToAction";

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
