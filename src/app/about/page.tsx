import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CodeQuest, the bilingual gamified quiz platform.",
};

export default function AboutPage() {
  return <AboutView />;
}
