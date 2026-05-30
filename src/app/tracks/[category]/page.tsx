import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "./CategoryView";
import { CATEGORIES, getCategory } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: { category: string };
}

/** Pre-render /tracks/frontend and /tracks/backend. */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  frontend: {
    title: "Frontend Tracks",
    description:
      "Master frontend development with interactive quizzes on HTML, CSS, JavaScript, TypeScript, React.js, and Next.js. Beginner to Boss Challenge — earn XP and build real interface skills.",
  },
  backend: {
    title: "Backend Tracks",
    description:
      "Master backend development with interactive quizzes on PHP, Laravel, Node.js, Express.js, SQL, REST API, and Authentication. Beginner to Boss Challenge — build APIs, model data, and secure your apps.",
  },
};

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.category);
  if (!category) return { title: "Track not found" };
  const seo = CATEGORY_SEO[category.slug];
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/tracks/${category.slug}`,
  });
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategory(params.category);
  if (!category) notFound();
  const label = category.id === "frontend" ? "Frontend" : "Backend";
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tracks", path: "/tracks" },
          { name: label, path: `/tracks/${category.slug}` },
        ]}
      />
      <CategoryView category={category} />
    </>
  );
}
