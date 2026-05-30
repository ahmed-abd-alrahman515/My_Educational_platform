"use client";

import { CheckCircle2, Circle, Loader, Lock } from "lucide-react";
import type { TrackStatus } from "@/lib/track-status";
import { Pill } from "@/components/ui/Pill";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const CONFIG: Record<
  TrackStatus,
  { tone: "neutral" | "warning" | "success"; icon: typeof Circle; key: TranslationKey }
> = {
  "not-started": {
    tone: "neutral",
    icon: Circle,
    key: "tracks.status.notStarted",
  },
  "in-progress": {
    tone: "warning",
    icon: Loader,
    key: "tracks.status.inProgress",
  },
  completed: {
    tone: "success",
    icon: CheckCircle2,
    key: "tracks.status.completed",
  },
  "coming-soon": {
    tone: "neutral",
    icon: Lock,
    key: "tracks.status.comingSoon",
  },
};

/** Bilingual status pill (not started / in progress / completed / coming soon). */
export function TrackStatusBadge({ status }: { status: TrackStatus }) {
  const { t } = useLanguage();
  const cfg = CONFIG[status];
  const StatusIcon = cfg.icon;

  return (
    <Pill tone={cfg.tone}>
      <StatusIcon className="h-3 w-3" />
      {t(cfg.key)}
    </Pill>
  );
}
