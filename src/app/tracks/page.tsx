import type { Metadata } from "next";
import { TracksView } from "./TracksView";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Learning Tracks",
  description:
    "Browse all 13 programming tracks on CodeQuest — six frontend (HTML, CSS, JavaScript, TypeScript, React, Next.js) and seven backend (PHP, Laravel, Node.js, Express, SQL, REST API, Authentication). Pick a path and start your quest.",
  path: "/tracks",
  keywords: ["learning tracks", "frontend tracks", "backend tracks", "coding paths"],
});

export default function TracksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tracks", path: "/tracks" },
        ]}
      />
      <TracksView />
    </>
  );
}
