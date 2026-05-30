import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "./CategoryView";
import { CATEGORIES, getCategory } from "@/data/categories";

interface PageProps {
  params: { category: string };
}

/** Pre-render /tracks/frontend and /tracks/backend. */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.category);
  if (!category) return { title: "Track not found" };
  const label = category.id === "frontend" ? "Frontend" : "Backend";
  return {
    title: `${label} Tracks`,
    description:
      category.id === "frontend"
        ? "Master frontend skills: HTML, CSS, JavaScript, TypeScript, React, and Next.js."
        : "Master backend skills: PHP, Laravel, Node.js, Express, SQL, REST API, and Authentication.",
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategory(params.category);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
