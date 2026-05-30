"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Global 404 page (bilingual). */
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-extrabold text-gradient">
        {t("notFound.code")}
      </p>
      <h1 className="mt-4 text-2xl font-bold">{t("notFound.title")}</h1>
      <p className="mt-2 text-muted">{t("notFound.body")}</p>
      <Link href="/" className="mt-8">
        <Button>{t("notFound.home")}</Button>
      </Link>
    </Container>
  );
}
