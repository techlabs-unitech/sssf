import SevaMark from "./SevaMark";

type ImpactStatProps = {
  value: string;
  label: string;
};

export default function ImpactStat({ value, label }: ImpactStatProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 px-4">
      <SevaMark size={30} />
      <span className="font-display text-3xl md:text-4xl text-maroon dark:text-marigold">{value}</span>
      <span className="text-xs tracking-wide uppercase text-sandalwood dark:text-ivory-soft/60">{label}</span>
    </div>
  );
}
