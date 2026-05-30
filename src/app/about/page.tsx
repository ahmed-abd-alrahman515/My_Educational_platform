import type { Metadata } from "next";
import { AboutView } from "./AboutView";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "CodeQuest is a free, frontend-only, bilingual (Arabic/English) gamified learning platform that turns programming practice into a game — 13 tracks, 520+ questions, XP, badges, and no account required.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutView />
    </>
  );
}
