import type { Metadata } from "next";
import { ProfileView } from "./ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your CodeQuest profile: XP, rank, badges, accuracy, streak, and per-language progress — all stored privately in your browser.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
