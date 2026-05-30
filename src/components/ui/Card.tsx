import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use the frosted-glass surface treatment. */
  glass?: boolean;
  /** Add an interactive hover lift + glow (for clickable cards). */
  hover?: boolean;
}

/**
 * Base surface container. Rounded, bordered, with optional glassmorphism.
 * Compose with the section helpers below for consistent padding.
 */
export function Card({ glass, hover, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line shadow-card transition-all duration-300",
        glass ? "glass" : "bg-surface",
        hover &&
          "hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-3", className)} {...props} />;
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}
