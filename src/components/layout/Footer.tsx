"use client";

import Link from "next/link";
import { Gamepad2, Github } from "lucide-react";
import { Container } from "./Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Site footer with brand, tagline, and credits. */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Gamepad2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-gradient">
              {t("brand.name")}
            </p>
            <p className="text-xs text-muted">{t("brand.tagline")}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-end">
          <p className="text-xs text-muted">{t("footer.builtWith")}</p>
          <p className="text-xs text-muted">
            © {year} {t("brand.name")}. {t("footer.rights")}
          </p>
        </div>

        <Link
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted transition-colors hover:text-foreground"
        >
          <Github className="h-5 w-5" />
        </Link>
      </Container>
    </footer>
  );
}
