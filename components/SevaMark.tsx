type SevaMarkProps = {
  className?: string;
  size?: number;
};

/**
 * A simplified rendering of the emblem's central motif — three figures
 * rising together, lifted by a supporting hand — used as a recurring
 * mark for milestones, values, and section accents.
 */
export default function SevaMark({ className = "", size = 32 }: SevaMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 40"
      fill="none"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      {/* supporting hand */}
      <path
        d="M3 30c5-1 8-4 10-7 3 4 6 5 9 5s6-1 9-5c2 3 5 6 10 7-3 4-8 6-19 6S6 34 3 30Z"
        className="fill-vermillion/25"
      />
      {/* left figure — sky */}
      <path
        d="M13 12c1.8 2.4 2.7 4.4 2.7 6.2 0 2-1.2 3.3-2.7 3.3s-2.7-1.3-2.7-3.3c0-1.8.9-3.8 2.7-6.2Z"
        className="fill-marigold"
      />
      {/* center figure — magenta, tallest */}
      <path
        d="M22 6c2.1 2.9 3.2 5.4 3.2 7.6 0 2.4-1.4 4-3.2 4s-3.2-1.6-3.2-4c0-2.2 1.1-4.7 3.2-7.6Z"
        className="fill-magenta"
      />
      {/* right figure — leaf green */}
      <path
        d="M31 12c1.8 2.4 2.7 4.4 2.7 6.2 0 2-1.2 3.3-2.7 3.3s-2.7-1.3-2.7-3.3c0-1.8.9-3.8 2.7-6.2Z"
        className="fill-leaf"
      />
    </svg>
  );
}
