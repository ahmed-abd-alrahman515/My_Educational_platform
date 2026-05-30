import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  accent?: string;
}

/** Compact metric tile used on the dashboard and stats strip. */
export function StatCard({ icon, label, value, accent }: StatCardProps) {
  return (
    <Card
      glass
      className="group flex items-center gap-4 p-5 transition-colors hover:border-primary/30"
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110"
        style={accent ? { color: accent, backgroundColor: `${accent}1a` } : undefined}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-2xl font-bold tabular-nums">{value}</p>
        <p className="truncate text-sm text-muted">{label}</p>
      </div>
    </Card>
  );
}
