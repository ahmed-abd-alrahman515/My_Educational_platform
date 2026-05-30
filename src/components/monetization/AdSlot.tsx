"use client";

import { Megaphone } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ADS_ENABLED } from "@/lib/monetization";
import { cn } from "@/lib/utils";

type AdFormat = "leaderboard" | "rectangle" | "sidebar";

interface AdSlotProps {
  /** Shape/size of the slot. Drives min-height + aspect. */
  format?: AdFormat;
  /** Stable id for the slot position (useful when wiring a real ad network). */
  slotId?: string;
  className?: string;
  /** Make a sidebar slot stick while the page scrolls. */
  sticky?: boolean;
}

const FORMAT_CLASSES: Record<AdFormat, string> = {
  // Wide, short banner (e.g. 728x90 / responsive).
  leaderboard: "min-h-[90px] w-full",
  // Medium rectangle (e.g. 336x280).
  rectangle: "min-h-[250px] w-full",
  // Tall vertical unit for desktop sidebars (e.g. 300x600).
  sidebar: "min-h-[600px] w-full",
};

/**
 * Reusable, network-agnostic ad placeholder.
 *
 * Deliberately understated so it reads as "optional space" rather than a cheap
 * banner: a dashed, glassy panel with a small "Advertisement" label. When a
 * real ad network is added later, render its <ins> markup inside the inner
 * container guarded by `ADS_ENABLED` — the layout/spacing stays identical.
 *
 * Renders nothing when ads are globally disabled, so it never reserves dead
 * space or blocks the experience.
 */
export function AdSlot({
  format = "rectangle",
  slotId,
  className,
  sticky,
}: AdSlotProps) {
  const { t } = useLanguage();

  if (!ADS_ENABLED) return null;

  return (
    <aside
      // Not part of the main content flow for assistive tech.
      role="complementary"
      aria-label={t("ad.label")}
      data-ad-slot={slotId}
      className={cn(sticky && "lg:sticky lg:top-24", className)}
    >
      <div
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-line/80 bg-surface/40 p-4 text-center backdrop-blur-sm",
          FORMAT_CLASSES[format],
        )}
      >
        {/* tiny disclosure label, top-start */}
        <span className="absolute start-3 top-2 text-[10px] font-medium uppercase tracking-wider text-muted/70">
          {t("ad.label")}
        </span>

        <Megaphone className="h-5 w-5 text-muted/50" aria-hidden />
        <p className="text-xs text-muted/70">{t("ad.placeholder")}</p>

        {/*
          Real ad markup goes here later, e.g.:
          <ins className="adsbygoogle" data-ad-slot={slotId} ... />
        */}
      </div>
    </aside>
  );
}
