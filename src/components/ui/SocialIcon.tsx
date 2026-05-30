import { Icon } from "./Icon";
import type { SocialLink } from "@/lib/social";

/** Renders the correct icon for a social link (lucide or custom brand SVG). */
export function SocialIcon({
  link,
  className = "h-5 w-5",
}: {
  link: SocialLink;
  className?: string;
}) {
  if (link.custom === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden
      >
        <path d="M16.5 3a5.4 5.4 0 0 0 4.5 4.5v3a8.4 8.4 0 0 1-4.5-1.32V15a6 6 0 1 1-6-6c.34 0 .67.03 1 .08v3.16a2.9 2.9 0 1 0 2 2.76V3h3z" />
      </svg>
    );
  }
  return <Icon name={link.icon ?? "Link"} className={className} />;
}
