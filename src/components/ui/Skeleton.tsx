import { cn } from "@/lib/utils";

/**
 * Shimmering placeholder block for loading states. Compose several to mirror
 * the shape of the content being loaded (avoids layout shift + feels premium).
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-lg bg-surface-2",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-foreground/5 after:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

/** A ready-made card skeleton matching the TrackCard / SkillCard footprint. */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-6", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="mt-5 h-2.5 w-full rounded-full" />
      <Skeleton className="mt-3 h-2.5 w-full rounded-full" />
    </div>
  );
}
