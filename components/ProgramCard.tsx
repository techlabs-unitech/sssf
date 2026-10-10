import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Accent = "sky" | "magenta" | "leaf" | "rust";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: Accent;
  slug?: string;
};

const ACCENT_CLASSES: Record<Accent, string> = {
  sky: "bg-marigold/15 text-marigold-dark group-hover:bg-marigold/25",
  magenta: "bg-marigold/15 text-marigold-dark group-hover:bg-marigold/25",
  leaf: "bg-marigold/15 text-marigold-dark group-hover:bg-marigold/25",
  rust: "bg-marigold/15 text-marigold-dark group-hover:bg-marigold/25",
};

export default function ProgramCard({ icon: Icon, title, description, accent = "sky", slug }: ProgramCardProps) {
  const href = slug ? `/${slug}` : "/programs";

  return (
    <Link href={href} className="group flex min-h-[230px] flex-col rounded-xl border border-maroon/10 bg-white/75 p-6 shadow-[0_10px_28px_rgba(23,47,64,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_14px_34px_rgba(23,47,64,0.10)] sm:p-7">
      <div className={`flex h-12 w-12 items-center justify-center rounded-md transition-all duration-300 group-hover:scale-105 ${ACCENT_CLASSES[accent]}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-xl text-maroon">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-sandalwood">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-maroon">Explore <span className="transition-transform duration-200 group-hover:translate-x-1">→</span></span>
    </Link>
  );
}
