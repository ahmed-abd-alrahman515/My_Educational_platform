import { SOCIAL_LINKS } from "./social";

/**
 * Monetization configuration.
 *
 * Strategy: portfolio leads first, ads second. The "Hire Me" CTA is the
 * primary funnel; ad slots are optional, unobtrusive placeholders.
 *
 * `ADS_ENABLED` is a single switch for every AdSlot on the platform — flip it
 * to false to hide all ad areas instantly (e.g. before a real ad network is
 * wired up, or for ad-free deployments). Placeholders render only in
 * development-friendly, clearly-labeled form until real ad code is added.
 */
export const ADS_ENABLED = true;

/** Primary lead links, sourced from the shared social config (no duplication). */
const portfolio = SOCIAL_LINKS.find((l) => l.id === "portfolio");
const whatsapp = SOCIAL_LINKS.find((l) => l.id === "whatsapp");

export const PORTFOLIO_URL = portfolio?.href ?? "#";
export const WHATSAPP_URL = whatsapp?.href ?? "#";
