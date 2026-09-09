import type { LucideIcon } from "lucide-react";

type Accent = "sky" | "magenta" | "leaf" | "rust";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: Accent;
};

const ACCENT_CLASSES: Record<Accent, string> = {
  sky: "bg-marigold/15 text-marigold-dark dark:text-marigold group-hover:bg-marigold/25",
  magenta: "bg-magenta/15 text-magenta dark:text-magenta-light group-hover:bg-magenta/25",
  leaf: "bg-leaf/15 text-leaf-light dark:text-leaf group-hover:bg-leaf/25",
  rust: "bg-vermillion/15 text-vermillion dark:text-vermillion-light group-hover:bg-vermillion/25",
};

export default function ProgramCard({ icon: Icon, title, description, accent = "sky" }: ProgramCardProps) {
  return (
    <div className="group rounded-2xl border border-maroon/10 dark:border-marigold/15 bg-white/60 dark:bg-charcoal-soft/60 p-7 transition-all hover:border-marigold/50 hover:shadow-[0_8px_30px_rgba(11,15,140,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${ACCENT_CLASSES[accent]}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-xl text-maroon dark:text-marigold">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-sandalwood dark:text-ivory-soft/70">{description}</p>
    </div>
  );
}
