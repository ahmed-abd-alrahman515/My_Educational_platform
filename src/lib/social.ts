/**
 * Social / external links shown in the footer.
 *
 * Replace the `href` values with your real profiles. Icons reference
 * lucide-react names where available; brand icons without a lucide equivalent
 * (TikTok) use a custom inline SVG keyed by `custom`.
 */
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** lucide-react icon name, or undefined when `custom` is set. */
  icon?: string;
  /** Key for a custom inline brand SVG (see SocialIcon). */
  custom?: "tiktok";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "https://your-portfolio.example",
    icon: "Globe",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/ahmed-abd-alrahman515",
    icon: "Github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    icon: "Linkedin",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@your-handle",
    custom: "tiktok",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/your-profile",
    icon: "Facebook",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/000000000000",
    icon: "MessageCircle",
  },
];
