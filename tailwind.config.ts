import type { Config } from "tailwindcss";

/**
 * Theme tokens are driven by CSS variables (see src/app/globals.css) so the
 * same Tailwind class set works in both light and dark mode. We map the
 * variables here to keep utility classes ergonomic (e.g. `bg-surface`,
 * `text-muted`, `border-line`).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        "13": "3.25rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--primary) / 0.2), 0 0 40px -8px rgb(var(--primary) / 0.45)",
        "glow-accent":
          "0 0 0 1px rgb(var(--accent) / 0.2), 0 0 40px -8px rgb(var(--accent) / 0.45)",
        "glow-sm": "0 0 24px -10px rgb(var(--primary) / 0.4)",
        card: "0 1px 2px rgb(0 0 0 / 0.06), 0 8px 30px -12px rgb(0 0 0 / 0.25)",
        "card-hover": "0 2px 4px rgb(0 0 0 / 0.08), 0 16px 48px -16px rgb(0 0 0 / 0.35)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgb(var(--line) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.4) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgb(var(--primary) / 0.18) 0%, transparent 70%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        shimmer: "shimmer 1.8s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scale-in": "scale-in 0.35s ease-out both",
        "slide-up": "slide-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
