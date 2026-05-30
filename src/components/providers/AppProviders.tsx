"use client";

import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageProvider";
import { ProgressProvider } from "./ProgressProvider";

/**
 * Composes all client-side context providers in one place so the root layout
 * stays clean. Order matters only if a provider depends on another — these are
 * independent, but Progress reads nothing from Theme/Language so any order is
 * safe.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
