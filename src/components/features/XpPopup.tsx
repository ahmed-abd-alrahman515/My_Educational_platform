"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface XpPopupProps {
  /** Signed XP delta to show; null hides the popup. */
  delta: number | null;
  /** A changing key so re-awarding the same value re-triggers the animation. */
  trigger: number;
}

/** Animated floating "+10 XP" / "-3 XP" that rises and fades after an answer. */
export function XpPopup({ delta, trigger }: XpPopupProps) {
  const positive = (delta ?? 0) >= 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 -top-2 z-40 flex justify-center">
      <AnimatePresence>
        {delta !== null && (
          <motion.div
            key={trigger}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-bold shadow-lg",
              positive
                ? "bg-success/15 text-success ring-1 ring-success/30"
                : "bg-danger/15 text-danger ring-1 ring-danger/30",
            )}
          >
            {positive ? "+" : ""}
            {delta} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
