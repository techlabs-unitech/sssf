type UnityDividerProps = {
  className?: string;
};

/**
 * A slim divider carrying the emblem's three figure-colors (sky, magenta,
 * leaf) — the site's signature section break, standing in for the trio of
 * rising figures at the center of the logo.
 */
export default function UnityDivider({ className = "" }: UnityDividerProps) {
  return (
    <div className={`unity-divider flex items-center justify-center gap-3 ${className}`} role="presentation" aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-15" />
      <span className="flex items-center gap-2 shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
        <span className="h-2 w-2 rounded-full bg-magenta" />
        <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
      </span>
      <span className="h-px flex-1 bg-current opacity-15" />
    </div>
  );
}
