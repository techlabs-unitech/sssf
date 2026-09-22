import type { Metadata } from "next";
import { buildMetadata, truncate } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, UserRound, ShieldCheck, FileText } from "lucide-react";
import { beneficiaryStoriesContent } from "@/lib/beneficiaryStoriesContent";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const story = beneficiaryStoriesContent.find((item) => item.id === params.slug || item.slug === params.slug);
  if (!story || !story.published) return { title: "Story not found", robots: { index: false, follow: false } };

  return buildMetadata({
    path: `/stories/${params.slug}`,
    title: `${story.firstName ? `${story.firstName}'s Story` : "Beneficiary Story"}${story.program ? ` – ${story.program}` : ""}`,
    description: truncate(story.outcome || story.assistance || story.challenge),
  });
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = beneficiaryStoriesContent.find((item) => item.id === params.slug || item.slug === params.slug);

  if (!story) {
    notFound();
  }

  return (
    <section className="container-seva py-16 md:py-20">
      <div className="max-w-3xl">
        <span className="eyebrow">Beneficiary Story</span>
        <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
          {story.firstName || "Beneficiary story"}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-sandalwood">
          {story.year ? <span>{story.year}</span> : null}
          {story.program ? <><span className="mx-1">●</span><span>{story.program}</span></> : null}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <UserRound className="h-5 w-5 text-marigold" />
              <div>
                <span className="text-xs uppercase tracking-wide text-sandalwood">First name</span>
                <p className="mt-1 text-sm font-semibold text-maroon">{story.firstName || "Published with consent"}</p>
              </div>
            </div>

            {story.age ? (
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-marigold" />
                <div>
                  <span className="text-xs uppercase tracking-wide text-sandalwood">Age</span>
                  <p className="mt-1 text-sm font-semibold text-maroon">{story.age}</p>
                </div>
              </div>
            ) : null}

            {story.location ? (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-marigold" />
                <div>
                  <span className="text-xs uppercase tracking-wide text-sandalwood">Location</span>
                  <p className="mt-1 text-sm font-semibold text-maroon">{story.location}</p>
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-maroon/10 p-5">
              <span className="eyebrow">Challenge</span>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">{story.challenge}</p>
            </div>

            <div className="rounded-2xl border border-maroon/10 p-5">
              <span className="eyebrow">Assistance received</span>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">{story.assistance}</p>
            </div>

            {story.outcome ? (
              <div className="rounded-2xl border border-maroon/10 p-5">
                <span className="eyebrow">Outcome</span>
                <p className="mt-4 text-sm leading-relaxed text-sandalwood">{story.outcome}</p>
              </div>
            ) : null}

            {story.quote ? (
              <div className="rounded-2xl border border-maroon/10 p-5">
                <span className="eyebrow">Quote</span>
                <p className="mt-4 text-sm leading-relaxed text-sandalwood">“{story.quote}”</p>
              </div>
            ) : null}
          </div>
        </article>

        <aside className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
          <span className="eyebrow">Story record</span>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-marigold" />
              <span className="text-sm font-semibold text-maroon">Consent status: {story.consentStatus || "pending"}</span>
            </div>
            {story.image && story.consentStatus === "verified" ? (
              <div className="rounded-2xl border border-maroon/10 p-4">
                <FileText className="h-5 w-5 text-marigold" />
                <p className="mt-3 text-sm text-sandalwood">Published media will be shown when consented and verified.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-maroon/10 p-4">
                <FileText className="h-5 w-5 text-marigold" />
                <p className="mt-3 text-sm text-sandalwood">Media is withheld until consent and verification are complete.</p>
              </div>
            )}
            <Link href="/programs" className="block rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon text-center">
              Explore related programs
            </Link>
            <Link href="/stories" className="block rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon text-center">
              ← All beneficiary stories
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
