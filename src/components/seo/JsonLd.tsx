import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Server-rendered JSON-LD structured data. Emitting it as a plain <script>
 * (not next/script) keeps it in the initial HTML for crawlers. This is a
 * server component — no client JS shipped.
 */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static & trusted; safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide WebSite + Organization graph, rendered once in the root layout. */
export function SiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
    ],
  };
  return <JsonLdScript data={graph} />;
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD for a page's position in the site hierarchy. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
  return <JsonLdScript data={data} />;
}

/**
 * Course JSON-LD for a language track — helps search engines surface the
 * track as a learning resource.
 */
export function CourseJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: ["en", "ar"],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isAccessibleForFree: true,
  };
  return <JsonLdScript data={data} />;
}
