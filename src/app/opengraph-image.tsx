import { ImageResponse } from "next/og";

/**
 * Dynamic default Open Graph / Twitter image (1200×630), generated at build
 * time. Mirrors the app's dark, glowing brand so social shares look premium.
 * Applies to every route that doesn't define its own OG image.
 */
export const alt = "CodeQuest — Gamified Programming Quizzes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 20% 0%, rgba(99,102,241,0.45) 0%, transparent 60%), radial-gradient(50% 60% at 100% 20%, rgba(34,211,238,0.30) 0%, transparent 55%), radial-gradient(60% 60% at 80% 100%, rgba(168,85,247,0.35) 0%, transparent 60%)",
          backgroundColor: "#060812",
          color: "#eaecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              fontSize: 48,
            }}
          >
            🎮
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            CodeQuest
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 880,
            lineHeight: 1.3,
          }}
        >
          Master programming by playing
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#969cb4",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Bilingual AR / EN · 13 tracks · 520+ questions · XP &amp; badges
        </div>
      </div>
    ),
    { ...size },
  );
}
