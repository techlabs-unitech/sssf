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

// Flat, solid colours from the logo — a light tint for the card, the full
// colour for the icon tile, and a darker shade wherever it's used as text
// so it stays readable.
const ACCENTS: Record<Accent, { card: string; tile: string; text: string }> = {
  sky: {
    card: "bg-[#EEF6FE] border-[#CFE5FC] hover:border-marigold",
    tile: "bg-marigold",
    text: "text-marigold-dark",
  },
  magenta: {
    card: "bg-[#FBEFFA] border-[#F1D3EE] hover:border-magenta",
    tile: "bg-magenta",
    text: "text-[#A3189A]",
  },
  leaf: {
    card: "bg-[#EDF9F1] border-[#CDEED8] hover:border-[#22A44D]",
    tile: "bg-[#22A44D]",
    text: "text-[#1B7F3C]",
  },
  rust: {
    card: "bg-[#FCF1EC] border-[#F4D6C9] hover:border-vermillion",
    tile: "bg-vermillion",
    text: "text-vermillion",
  },
};

export default function ProgramCard({ icon: Icon, title, description, accent = "sky", slug }: ProgramCardProps) {
  const href = slug ? `/${slug}` : "/programs";
  const a = ACCENTS[accent];

  return (
    <Link
      href={href}
      className={`group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(11,15,140,0.08)] ${a.card}`}
    >
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:-rotate-6 ${a.tile}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      <h3 className="relative mt-5 font-display text-xl text-maroon">{title}</h3>
      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-sandalwood">{description}</p>
      <span
        className={`relative mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${a.text}`}
      >
        Explore <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
