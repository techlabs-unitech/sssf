import Image from "next/image";
import type { Metadata } from "next";
import UnityDivider from "@/components/UnityDivider";
import SevaMark from "@/components/SevaMark";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sri Sai Swamy Seva Foundation's mission, history, and the trustees guiding our healthcare, education and relief work across India.",
};

const VALUES = [
  {
    title: "Seva as worship",
    body: "We treat every act of service as an offering — the same devotion given in prayer, given in practice.",
  },
  {
    title: "Dignity first",
    body: "Aid is delivered in a way that respects the person receiving it — never as charity handed down, but as support offered in kinship.",
  },
  {
    title: "Community-led",
    body: "We work through local volunteers and partners who understand each community's needs best.",
  },
  {
    title: "Transparency",
    body: "Every rupee received is tracked, reported, and directed toward the programs our donors intended.",
  },
];

const TRUSTEES = [
  { name: "Trustee Name", role: "Founder & Managing Trustee" },
  { name: "Trustee Name", role: "Trustee — Health Programs" },
  { name: "Trustee Name", role: "Trustee — Education Programs" },
  { name: "Trustee Name", role: "Trustee — Finance & Governance" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">About us</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            A foundation built on one belief: service is sacred.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Sri Sai Swamy Seva Foundation was formed by a small group of
            volunteers who saw need in their own communities and chose to
            respond — with food, with medicine, with time. What started as
            informal relief drives has grown into structured programs across
            healthcare, education, disaster response and women&rsquo;s
            empowerment, all still carried out in that same spirit of
            devotion.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop"
              alt="Volunteers preparing supplies for distribution"
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-3xl text-maroon dark:text-ivory">
              From a handful of volunteers to a foundation reaching thousands.
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
              Our earliest work was local and personal — dry rations for
              families who had lost income, tutoring for children falling
              behind in school. As word spread and more hands joined, we
              organized into a registered charitable trust so the same care
              could reach further, more reliably.
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
              During public health emergencies, we mobilized to supply PPE
              kits, masks and dry rations to frontline workers and vulnerable
              families. That same readiness now underpins our disaster
              response work — because need rarely waits for convenient
              timing.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory-soft dark:bg-charcoal-soft py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">What guides us</span>
          <h2 className="mt-4 font-display text-3xl text-maroon dark:text-ivory">Our values</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4">
                <SevaMark size={26} className="mt-1 shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-maroon dark:text-marigold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sandalwood dark:text-ivory-soft/70">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustees */}
      <section className="py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">Leadership</span>
          <h2 className="mt-4 font-display text-3xl text-maroon dark:text-ivory">Our trustees</h2>
          <p className="mt-3 max-w-lg text-sm text-sandalwood dark:text-ivory-soft/70">
            A small board overseeing governance, finance and program direction
            — replace with your trust&rsquo;s actual trustee names and roles.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUSTEES.map((t) => (
              <div key={t.role} className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-6 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-marigold/20 flex items-center justify-center">
                  <span className="font-display text-xl text-maroon dark:text-marigold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <p className="mt-4 font-display text-base text-maroon dark:text-ivory">{t.name}</p>
                <p className="mt-1 text-xs text-sandalwood dark:text-ivory-soft/60">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
