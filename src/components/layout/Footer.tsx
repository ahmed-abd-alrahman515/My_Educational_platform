"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Container } from "./Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIAL_LINKS } from "@/lib/social";
import type { TranslationKey } from "@/i18n/translations";

const EXPLORE_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/tracks", key: "nav.tracks" },
  { href: "/profile", key: "nav.profile" },
  { href: "/about", key: "nav.about" },
];

/** Premium footer: brand, explore links, social grid, and copyright. */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[700px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl"
      />

      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <span className="text-gradient text-lg">{t("brand.name")}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">
            {t("brand.tagline")}
          </p>
          <p className="mt-2 max-w-xs text-xs text-muted">
            {t("footer.madeWith")}
          </p>
        </div>

        {/* Explore */}
        <nav aria-label={t("footer.explore")}>
          <h3 className="text-sm font-semibold">{t("footer.explore")}</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div>
          <h3 className="text-sm font-semibold">{t("footer.connect")}</h3>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:max-w-[180px]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-glow"
              >
                <SocialIcon link={link} />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted">{t("footer.builtWith")}</p>
        </Container>
      </div>
    </footer>
  );
}
