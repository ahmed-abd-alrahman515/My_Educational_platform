import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "success" | "warning" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  neutral: "bg-surface-2 text-muted border-line",
};

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/** Small rounded label/tag used for levels, categories, and status. */
export function Pill({ tone = "neutral", className, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
