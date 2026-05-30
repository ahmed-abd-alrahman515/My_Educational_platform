"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Wraps page content and applies a brief opacity/translate fade whenever the
 * language switches. The actual text/direction swap happens at the midpoint of
 * the fade (coordinated by LanguageProvider) so the change feels smooth rather
 * than abrupt. Respects prefers-reduced-motion via the provider (which skips
 * the `switching` state entirely in that case).
 */
export function LanguageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { switching } = useLanguage();

  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
        switching ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      {children}
    </div>
  );
}
