import type { Metadata } from "next";
import { TracksView } from "./TracksView";

export const metadata: Metadata = {
  title: "Tracks",
  description:
    "Browse all 13 frontend and backend programming tracks on CodeQuest.",
};

export default function TracksPage() {
  return <TracksView />;
}
