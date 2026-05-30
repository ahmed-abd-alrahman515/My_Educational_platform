"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** CSS color used for the hover glow (e.g. a track accent). */
  glowColor?: string;
}

/**
 * Glassmorphic card with an animated gradient glow on hover. Used for the
 * track cards and feature cards on the landing page. The glow is a blurred
 * radial pseudo-layer behind the content so it reads as "lit from within".
 */
export function GlowCard({
  children,
  className,
  glowColor = "rgb(var(--primary))",
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line glass p-6",
        "transition-shadow duration-300",
        className,
      )}
    >
      {/* Glow layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${glowColor}22, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
