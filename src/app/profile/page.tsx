import type { Metadata } from "next";
import { ProfileView } from "./ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your CodeQuest profile: XP, rank, badges, accuracy, streak, and per-language progress — all stored privately in your browser.",
  // Personal, localStorage-driven dashboard: nothing for crawlers to index.
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return <ProfileView />;
}
