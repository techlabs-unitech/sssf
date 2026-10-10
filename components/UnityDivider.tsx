type UnityDividerProps = {
  className?: string;
};

export default function UnityDivider({ className = "" }: UnityDividerProps) {
  return (
    <div className={`unity-divider flex items-center justify-center gap-3 ${className}`} role="presentation" aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-15" />
      <span className="flex items-center gap-2 shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-marigold-dark" />
        <span className="h-2 w-2 rounded-full bg-marigold" />
        <span className="h-1.5 w-1.5 rounded-full bg-marigold-light" />
      </span>
      <span className="h-px flex-1 bg-current opacity-15" />
    </div>
  );
}
