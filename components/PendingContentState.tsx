import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type PendingContentStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  status?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export default function PendingContentState({
  icon: Icon,
  title,
  description,
  status = "Verification Pending",
  ctaLabel,
  ctaHref,
  className = "",
}: PendingContentStateProps) {
  return (
    <div
      className={`rounded-[2rem] border border-maroon/10 bg-white/60 p-8 shadow-[0_10px_30px_rgba(92,57,19,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold/40 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-marigold/15 text-marigold">
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex rounded-full border border-maroon/10 bg-sand/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sandalwood">
          {status}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl text-maroon">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-sandalwood">{description}</p>

      {ctaLabel && ctaHref ? (
        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-ivory"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
