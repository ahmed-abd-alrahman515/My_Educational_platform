"use client";

import { icons, type LucideProps } from "lucide-react";
import { HelpCircle } from "lucide-react";

interface IconProps extends LucideProps {
  /** A lucide-react icon name, e.g. "Database", "ShieldCheck". */
  name: string;
}

/**
 * Resolves a lucide icon by name at render time. Data files (tracks, badges)
 * store icon names as strings; this component turns them into components,
 * falling back to a help-circle if the name is unknown.
 */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? HelpCircle;
  return <LucideIcon {...props} />;
}
