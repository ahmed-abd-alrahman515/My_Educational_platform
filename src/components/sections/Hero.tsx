"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, LayoutGrid, Zap, Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Floating programming icons scattered around the hero. */
const FLOATERS = [
  { icon: "Braces", x: "8%", y: "22%", delay: 0, color: "#eab308" },
  { icon: "Atom", x: "84%", y: "18%", delay: 0.6, color: "#22d3ee" },
  { icon: "Database", x: "12%", y: "70%", delay: 1.1, color: "#2dd4bf" },
  { icon: "Flame", x: "88%", y: "66%", delay: 0.3, color: "#ef4444" },
  { icon: "FileCode2", x: "78%", y: "44%", delay: 0.9, color: "#f97316" },
  { icon: "Triangle", x: "18%", y: "44%", delay: 1.4, color: "#a1a1aa" },
];

/** Landing hero: animated headline, code card, floating icons, glow + grid. */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background: grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      {/* Background: dual radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[30%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />

      {/* Floating icons (hidden on small screens to avoid clutter) */}
      {FLOATERS.map((f) => (
        <motion.div
          key={f.icon}
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{ left: f.x, top: f.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: f.delay },
            scale: { duration: 0.6, delay: f.delay },
            y: {
              duration: 6,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl border border-line glass shadow-card"
            style={{ color: f.color }}
          >
            <Icon name={f.icon} className="h-6 w-6" />
          </span>
        </motion.div>
      ))}

      <Container className="relative z-10 grid items-center gap-12 py-24 sm:py-28 lg:grid-cols-2 lg:py-32">
        {/* Left: copy */}
        <div className="text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Pill tone="primary" className="mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {t("home.hero.badge")}
            </Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
          >
            <span className="text-gradient">{t("home.hero.title")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted lg:mx-0"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link href="/tracks">
              <Button size="lg">
                {t("home.hero.cta")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                <LayoutGrid className="h-4 w-4" />
                {t("home.hero.secondary")}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right: animated code card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md [perspective:1000px]"
        >
          <CodeCard />
          <XpBubble />
          <BadgeBubble />
        </motion.div>
      </Container>
    </section>
  );
}

/** Faux editor window with a typed-out, syntax-highlighted snippet. */
function CodeCard() {
  const lines: { text: string; cls: string }[] = [
    { text: "const player = {", cls: "text-foreground" },
    { text: '  name: "you",', cls: "text-success" },
    { text: "  level: 7,", cls: "text-warning" },
    { text: "  xp: 6_240,", cls: "text-primary" },
    { text: "  badges: 12,", cls: "text-accent" },
    { text: "};", cls: "text-foreground" },
    { text: "", cls: "" },
    { text: "quest.start(player);", cls: "text-muted" },
  ];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative overflow-hidden rounded-2xl border border-line glass shadow-card"
    >
      {/* gradient border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-danger/80" />
        <span className="h-3 w-3 rounded-full bg-warning/80" />
        <span className="h-3 w-3 rounded-full bg-success/80" />
        <span className="ms-3 font-mono text-xs text-muted">player.ts</span>
      </div>
      {/* code */}
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
              className="block"
            >
              <span className="me-4 select-none text-muted/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={line.cls}>{line.text || " "}</span>
            </motion.span>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}

/** Floating XP chip overlapping the code card. */
function XpBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: 1.2, duration: 0.4 },
        scale: { delay: 1.2, duration: 0.4 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute -left-4 top-10 flex items-center gap-2 rounded-xl border border-line glass px-3 py-2 shadow-card rtl:-right-4 rtl:left-auto"
    >
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Zap className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold">+250 XP</span>
    </motion.div>
  );
}

/** Floating badge chip overlapping the code card. */
function BadgeBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
      transition={{
        opacity: { delay: 1.4, duration: 0.4 },
        scale: { delay: 1.4, duration: 0.4 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-xl border border-line glass px-3 py-2 shadow-card rtl:-left-3 rtl:right-auto"
    >
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-white">
        <Trophy className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold">Badge unlocked</span>
    </motion.div>
  );
}
