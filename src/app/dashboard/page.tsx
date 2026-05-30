import type { Metadata } from "next";
import { DashboardView } from "./DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your XP, rank, badges, and quiz history on CodeQuest.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
