import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Optional action (e.g. a Button wrapped in a Link). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable empty-state block: a glowing gradient icon, title, supporting copy,
 * and an optional CTA. Used for dashboards/lists with no data yet.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[420px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
      />
      <div className="relative">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
          <Icon className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-xl font-bold">{title}</h3>
        {description && (
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}
