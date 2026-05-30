"use client";

import { motion } from "framer-motion";
import { clamp } from "@/lib/utils";

interface ProgressBarProps {
  /** 0–1 fill ratio. */
  value: number;
  className?: string;
  /** Optional gradient class override for the fill. */
  fillClassName?: string;
}

/** Animated, accessible progress bar driven by a 0–1 value. */
export function ProgressBar({
  value,
  className,
  fillClassName = "bg-gradient-to-r from-primary to-accent",
}: ProgressBarProps) {
  const pct = clamp(value, 0, 1) * 100;
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 w-full overflow-hidden rounded-full bg-surface-2 ${className ?? ""}`}
    >
      <motion.div
        className={`h-full rounded-full ${fillClassName}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
