interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  /** Optional id for the <h2>, so a wrapping <section> can aria-labelledby it. */
  id?: string;
}

/** Consistent heading + subtitle block for page sections. */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-start"
      }
    >
      <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}
