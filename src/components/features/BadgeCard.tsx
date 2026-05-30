"use client";

import type { Badge, BadgeTier } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  badge: Badge;
  unlocked: boolean;
}

const tierStyles: Record<BadgeTier, string> = {
  bronze: "from-amber-600 to-orange-700",
  silver: "from-slate-300 to-slate-500",
  gold: "from-yellow-400 to-amber-500",
  platinum: "from-cyan-300 to-indigo-400",
};

/** Achievement badge tile. Greyed out + locked label when not yet earned. */
export function BadgeCard({ badge, unlocked }: BadgeCardProps) {
  const { tc, t } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-2xl border border-line p-4 text-center transition-all",
        unlocked ? "bg-surface" : "bg-surface/40 opacity-60 grayscale",
      )}
    >
      <span
        className={cn(
          "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
          tierStyles[badge.tier],
        )}
      >
        <Icon name={badge.icon} className="h-7 w-7" />
      </span>
      <p className="text-sm font-semibold leading-tight">{tc(badge.title)}</p>
      <p className="text-xs text-muted">{tc(badge.description)}</p>
      {!unlocked && (
        <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted">
          {t("dashboard.locked")}
        </span>
      )}
    </div>
  );
}
