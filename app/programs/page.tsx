import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import UnityDivider from "@/components/UnityDivider";
import { programsContent } from "@/lib/programsContent";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMetadata("/programs");

export default function ProgramsPage() {
  return (
    <>
      <section className="container-seva py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">Our Programs</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Seva, in practice.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            Education, health, rural development, women empowerment, environment protection, and disability & elderly care — ten areas of ongoing work, each shaped by what the communities we serve have told us they need most.
          </p>
          <div className="mt-8">
            <Link href="/impact" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              See Our Impact →
            </Link>
          </div>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programsContent.map((program) => (
              <Reveal key={program.slug}>
                <ProgramCard
                  icon={program.icon}
                  title={program.title}
                  description={program.shortIntro}
                  accent={program.accent}
                  slug={program.slug}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
