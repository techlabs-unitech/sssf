import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, FileText, MapPin, CalendarDays, ClipboardList } from "lucide-react";
import PendingContentState from "@/components/PendingContentState";
import { caseStudiesContent, caseStudiesStatus } from "@/lib/caseStudiesContent";

export const metadata: Metadata = pageMetadata("/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Project Stories</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            A case study looks closely at one Foundation project.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            A case study looks closely at one Foundation project — the challenge, the work carried out, the resources involved and the result. It is a detailed way to understand what happened, why it mattered and how the Foundation responded.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/programs" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-[1.02]">
              Explore Our Programs
            </Link>
            <Link href="/gallery" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          {caseStudiesContent.length === 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <PendingContentState
                icon={FileText}
                title="Case studies coming soon"
                description={caseStudiesStatus}
                status="Content being prepared"
                ctaLabel="Explore Programs"
                ctaHref="/programs"
              />

              <div className="rounded-[2rem] border border-maroon/10 bg-white/60 p-8">
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-marigold" />
                  <h3 className="font-display text-2xl text-maroon">What each case study will include</h3>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sandalwood">
                  <li>• Before → Challenge</li>
                  <li>• Foundation’s Work → Resources</li>
                  <li>• After → Community Voice</li>
                  <li>• Impact → Verified project outcomes</li>
                </ul>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-maroon">
                  <ArrowRight className="h-4 w-4" />
                  Published only after verification and supporting records are complete
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {caseStudiesContent.map((study) => (
                <article key={study.id} className="rounded-2xl border border-maroon/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-display text-xl text-maroon">{study.title}</span>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-sandalwood">
                        {study.program ? <span>{study.program}</span> : null}
                        {study.year ? <><span className="mx-1">●</span><span>{study.year}</span></> : null}
                      </div>
                    </div>
                    <span className="rounded-full border border-maroon/10 px-4 py-2 text-[11px] font-semibold text-maroon">
                      {study.published ? "Published" : "Publication pending"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-sandalwood">
                        <MapPin className="h-4 w-4 text-marigold" />
                        <span>{study.location || "Location pending"}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-sandalwood">
                        <CalendarDays className="h-4 w-4 text-marigold" />
                        <span>{study.year || "Year pending"}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                        <strong className="text-maroon">Problem:</strong> {study.problem}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-maroon/10 p-4">
                      <p className="text-sm leading-relaxed text-sandalwood">
                        <strong className="text-maroon">Intervention:</strong> {study.intervention}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
