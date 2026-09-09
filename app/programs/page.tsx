import Image from "next/image";
import type { Metadata } from "next";
import { Stethoscope, HeartHandshake, GraduationCap, ShieldPlus, Users, Flame } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";

export const metadata: Metadata = {
  title: "Programs & Seva Activities",
  description:
    "Explore Sri Sai Swamy Seva Foundation's programs: health camps, annadanam and food relief, education support, disaster response, women's empowerment, and spiritual seva.",
};

const ACCENT_CLASSES: Record<string, string> = {
  sky: "bg-marigold/15 text-marigold-dark dark:text-marigold",
  magenta: "bg-magenta/15 text-magenta dark:text-magenta-light",
  leaf: "bg-leaf/15 text-leaf-light dark:text-leaf",
  rust: "bg-vermillion/15 text-vermillion dark:text-vermillion-light",
};

const PROGRAMS = [
  {
    icon: Stethoscope,
    title: "Rural Education",
    tag: "Health",
    accent: "sky",
    description:
      "Free diagnostic and treatment camps bring doctors, essential medicines and screenings directly to villages and urban slums with little access to care. Camps focus on general health, eye care, and maternal & child health.",
    image: "/images/cdc-vt7iAyiwpf0-unsplash.jpg",  },
  {
    icon: HeartHandshake,
    title: "Rural Health services",
    tag: "Nutrition",
    accent: "rust",
    description:
      "Weekly hot-meal and dry-ration distribution for families facing hunger, scaled up during floods, cyclones and public health emergencies to reach displaced and frontline communities.",
image: "/images/annadanam.jpg",  },
  {
    icon: GraduationCap,
    title: "Education support",
    tag: "Education",
    accent: "magenta",
    description:
      "School supplies, uniforms, fee assistance and after-school tuition help so a child's education never depends on a family's ability to pay.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: ShieldPlus,
    title: "Feeding Hunger",
    tag: "Relief",
    accent: "leaf",
    description:
      "Rapid-response relief kits, temporary shelter support and on-ground coordination with local authorities whenever floods, cyclones or other crises strike a community we serve.",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Women & children's empowerment",
    tag: "Empowerment",
    accent: "magenta",
    description:
      "Vocational training, skill-building workshops and mentorship help women build sustainable livelihoods, while dedicated programs support the health and education of children in the same households.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: Flame,
    title: "Spiritual seva",
    tag: "Devotion",
    accent: "sky",
    description:
      "Satsang, bhajans and community pujas held throughout the year — spaces for reflection and togetherness that sit alongside, and give meaning to, our charitable work.",
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Programs</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            Seva, in practice.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Six areas of ongoing work, each shaped by what the communities we
            serve have told us they need most.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva space-y-16 md:space-y-24">
          {PROGRAMS.map((program, i) => (
            <div
              key={program.title}
              className={`grid gap-10 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:[direction:ltr]">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="md:[direction:ltr]">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${ACCENT_CLASSES[program.accent]}`}>
                    <program.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="eyebrow">{program.tag}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-3xl text-maroon dark:text-ivory">
                  {program.title}
                </h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
