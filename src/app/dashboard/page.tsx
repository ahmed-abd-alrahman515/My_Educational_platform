import type { Metadata } from "next";
import { DashboardView } from "./DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your XP, rank, badges, and quiz history on CodeQuest.",
  // Personal, localStorage-driven page: keep it out of the index.
  robots: { index: false, follow: true },
};

export default function DashboardPage() {
  return <DashboardView />;
}
