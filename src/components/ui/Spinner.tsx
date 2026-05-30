import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  /** Diameter in px. */
  size?: number;
  label?: string;
}

/** Accessible branded loading spinner (gradient conic ring). */
export function Spinner({ className, size = 40, label }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex flex-col items-center gap-3", className)}
    >
      <span
        className="block animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "conic-gradient(from 0deg, transparent 0%, rgb(var(--primary)) 70%, rgb(var(--accent)) 100%)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
        }}
      />
      {label ? (
        <span className="text-sm text-muted">{label}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
}
