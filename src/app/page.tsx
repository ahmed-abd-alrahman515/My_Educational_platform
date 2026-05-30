import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Features } from "@/components/sections/Features";
import { TracksShowcase } from "@/components/sections/TracksShowcase";

/** Landing page: hero → stats → tracks preview → features. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <TracksShowcase />
      <Features />
    </>
  );
}
