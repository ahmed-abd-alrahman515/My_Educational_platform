"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

const NAV_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/tracks", key: "nav.tracks" },
  { href: "/profile", key: "nav.profile" },
  { href: "/about", key: "nav.about" },
];

/** Sticky glass navbar with brand, links, theme/language toggles, and CTA. */
export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 glass">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
            <Gamepad2 className="h-5 w-5" />
          </span>
          <span className="text-gradient text-lg">{t("brand.name")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/tracks" className="hidden sm:block">
            <Button size="sm">{t("nav.startLearning")}</Button>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
