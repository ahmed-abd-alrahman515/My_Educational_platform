"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadialProgressProps {
  /** 0–1 fill ratio. */
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Center content (e.g. a percentage label or icon). */
  children?: React.ReactNode;
  /** Track (background) ring color class via currentColor; defaults to line. */
  trackClassName?: string;
}

/**
 * Animated circular progress ring drawn with pure SVG (no chart library). The
 * arc uses a gradient stroke and animates its dash offset on mount.
 */
export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  children,
  trackClassName = "text-line",
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 1);
  const offset = circumference * (1 - clamped);
  const gradientId = `rp-${Math.round(radius)}-${strokeWidth}`;

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--primary))" />
            <stop offset="100%" stopColor="rgb(var(--accent))" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClassName}
          stroke="currentColor"
        />
        {/* progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
