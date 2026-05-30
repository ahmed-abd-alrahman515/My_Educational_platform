"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ResolvedTheme, Theme } from "@/types";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = "codequest:theme";

/** Dark is the platform default when the user hasn't chosen yet. */
const DEFAULT_THEME: Theme = "dark";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolve(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

/**
 * Applies the `.dark` class to <html> and persists the user's choice. The
 * blocking inline script in layout.tsx prevents a flash of the wrong theme on
 * first paint; this provider keeps React state in sync afterwards.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    const initial = stored ?? DEFAULT_THEME;
    setThemeState(initial);
    setResolvedTheme(resolve(initial));
  }, []);

  // Apply theme to <html> whenever it changes.
  useEffect(() => {
    const r = resolve(theme);
    setResolvedTheme(r);
    document.documentElement.classList.toggle("dark", r === "dark");
  }, [theme]);

  // React to OS theme changes while in "system" mode.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const r = getSystemTheme();
      setResolvedTheme(r);
      document.documentElement.classList.toggle("dark", r === "dark");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
