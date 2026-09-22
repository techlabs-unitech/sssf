import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ClipboardCheck, MapPin, BarChart3 } from "lucide-react";
import PendingContentState from "@/components/PendingContentState";
import Reveal from "@/components/Reveal";
import { caseStudiesContent } from "@/lib/caseStudiesContent";
import { beneficiaryStoriesContent } from "@/lib/beneficiaryStoriesContent";
import { foundationProgramPhotos } from "@/lib/foundationPhotos";
import { programsContent } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/impact");

const IMPACT_PHOTOS = [
  foundationProgramPhotos.education[0],
  foundationProgramPhotos.healthcare[0],
  foundationProgramPhotos.annadanam[0],
  foundationProgramPhotos.childWelfare[0],
];

export default function ImpactPage() {
  return (
    <div className="container-seva py-16 md:py-20">
      <section className="max-w-3xl">
        <span className="eyebrow">Impact</span>
        <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
          What the Foundation is working on.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-sandalwood">
          The Foundation’s work is best understood through the programs it carries forward, the evidence it documents, and the stories that connect those efforts to real communities. Impact figures will be published only when reporting periods, source records, and verification details are available.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <PendingContentState
          icon={BarChart3}
          title="Verified Impact"
          description="Verified figure pending. Impact metrics will be published with their reporting period, program context and supporting records once they are ready for public review."
          status="Verified figure pending"
        />

        <PendingContentState
          icon={MapPin}
          title="Areas of Work"
          description="Education, healthcare, annadanam, women empowerment, child welfare, disaster relief and spiritual seva are the Foundation’s current service areas under active documentation."
          status="Program areas"
        />

        <PendingContentState
          icon={ClipboardCheck}
          title="Evidence Path"
          description="The Foundation’s public records connect programs to project stories, beneficiary stories and gallery evidence as they are verified."
          status="Documentation in progress"
        />
      </section>

      <section className="mt-16">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="eyebrow">Areas of work</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">Service areas and program links</h2>
          </div>
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon">
            Explore programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programsContent.map((program) => (
            <Reveal key={program.slug}>
              <Link href={`/${program.slug}`} className="group block overflow-hidden rounded-[1.5rem] border border-maroon/10 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_16px_30px_rgba(92,57,19,0.06)]">
                {program.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold/15 text-marigold">
                      <program.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl text-maroon">{program.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">{program.shortIntro}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="eyebrow">Project stories</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">Project stories and detailed work</h2>
          </div>
          <div className="flex gap-3">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon">
              Project stories <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon">
              Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-8 rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
          {caseStudiesContent.length === 0 ? (
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-sandalwood">
                Project stories are being documented. Detailed case studies will be published as individual Foundation projects are verified and documented.
              </p>
              <div className="rounded-2xl border border-maroon/10 bg-ivory-soft/60 p-5">
                <h3 className="font-display text-xl text-maroon">A case study looks closely at one Foundation project</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-sandalwood">
                  <li>• Challenge</li>
                  <li>• Foundation’s Work</li>
                  <li>• Resources</li>
                  <li>• Before → After</li>
                  <li>• Community Voice</li>
                  <li>• Impact</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {caseStudiesContent.map((study) => (
                <article key={study.title} className="rounded-2xl border border-maroon/10 p-5">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-maroon">{study.title}</span>
                    <span className="text-xs uppercase tracking-[0.16em] text-sandalwood">{study.program || "Program pending"}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">
                    {study.location || "Location pending"} · {study.year || "Year pending"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="eyebrow">Community stories</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">People and communities behind the work</h2>
          </div>
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon">
            Community stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
          {beneficiaryStoriesContent.length === 0 ? (
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-sandalwood">
                Community stories will be shared here as they are verified and published.
              </p>
              <div className="rounded-2xl border border-maroon/10 bg-ivory-soft/60 p-5">
                <h3 className="font-display text-xl text-maroon">The story structure</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-sandalwood">
                  <li>• The Person</li>
                  <li>• The Challenge</li>
                  <li>• Support Received</li>
                  <li>• The Result</li>
                  <li>• Their Voice</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {beneficiaryStoriesContent.map((story) => (
                <article key={story.id} className="rounded-2xl border border-maroon/10 p-5">
                  <span className="font-display text-lg text-maroon">{story.firstName}</span>
                  <p className="mt-2 text-sm leading-relaxed text-sandalwood">
                    {story.location || "Location pending"} · {story.outcome || "Outcome pending"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6">
          <span className="eyebrow">Photo evidence</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">Visual evidence from our work</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {IMPACT_PHOTOS.map((photo) => (
            <div key={photo.src} className="overflow-hidden rounded-[1.5rem] border border-maroon/10 bg-white/60">
              <div className="relative aspect-[4/3]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 25vw" className="object-cover" />
              </div>
              <p className="p-4 text-sm leading-relaxed text-sandalwood">{photo.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-[2rem] border border-maroon/10 bg-white/60 p-8">
          <span className="eyebrow">How to help</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">Support the work behind the evidence</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/donate" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory">Donate</Link>
            <Link href="/volunteer" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">Volunteer</Link>
            <Link href="/contact" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
