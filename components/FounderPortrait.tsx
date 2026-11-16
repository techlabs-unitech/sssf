import Image from "next/image";
import { Sparkle } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Circular founder portrait framed in the foundation's brand palette:
 * a navy → sky-blue ring with two thin outer rings and a soft glow behind.
 */
export default function FounderPortrait({ src, alt, className = "", priority }: Props) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* soft glow behind */}
      <div className="absolute -inset-10 rounded-full bg-flame-glow opacity-70" aria-hidden />

      {/* outer rings */}
      <div className="absolute -inset-7 rounded-full border border-dashed border-maroon/20" aria-hidden />
      <div className="absolute -inset-3 rounded-full border border-maroon/10" aria-hidden />

      {/* brand ring + photo */}
      <div className="relative h-full w-full rounded-full bg-gradient-to-br from-maroon via-marigold to-maroon p-[3px] shadow-[0_18px_40px_rgba(11,15,140,0.18)]">
        <div className="h-full w-full rounded-full bg-ivory p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Faint corner accents for the panel holding the portrait. */
export function PortraitCornerAccents() {
  const base = "absolute h-4 w-4";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Sparkle className={`${base} left-6 top-6 text-marigold/40`} strokeWidth={1.5} />
      <Sparkle className={`${base} right-6 top-6 text-magenta/35`} strokeWidth={1.5} />
      <Sparkle className={`${base} bottom-6 left-6 text-leaf/40`} strokeWidth={1.5} />
      <Sparkle className={`${base} bottom-6 right-6 text-vermillion/35`} strokeWidth={1.5} />
    </div>
  );
}
