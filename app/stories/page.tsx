import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { UserRound, MapPin, FileText, ArrowRight, HeartHandshake } from "lucide-react";
import PendingContentState from "@/components/PendingContentState";
import { beneficiaryStoriesContent, beneficiaryStoriesStatus } from "@/lib/beneficiaryStoriesContent";

export const metadata: Metadata = pageMetadata("/stories");

export default function StoriesPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Stories from the Community</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Behind every program are people and communities.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            We share beneficiary stories only when the information has been verified and appropriate consent has been obtained. These stories are different from project stories: they focus on the people and communities behind the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/programs" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory">
              Explore Our Programs
            </Link>
            <Link href="/impact" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              View Our Impact
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
            {beneficiaryStoriesContent.length === 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <PendingContentState
                  icon={HeartHandshake}
                  title="Real stories will be shared here as they are verified and published."
                  description={beneficiaryStoriesStatus}
                  status="Verification pending"
                  ctaLabel="Explore Our Programs"
                  ctaHref="/programs"
                />

                <div className="rounded-[2rem] border border-maroon/10 bg-white/60 p-8">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-marigold" />
                    <h3 className="font-display text-2xl text-maroon">Story structure preview</h3>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sandalwood">
                    <li>• The Person</li>
                    <li>• The Challenge</li>
                    <li>• Support Received</li>
                    <li>• The Result</li>
                    <li>• Their Voice</li>
                  </ul>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-maroon">
                    <ArrowRight className="h-4 w-4" />
                    Community stories will be shared here as they are verified and published.
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {beneficiaryStoriesContent.map((story) => (
                  <article key={story.id} className="rounded-2xl border border-maroon/10 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="font-display text-lg text-maroon">
                          {story.firstName || "Beneficiary story"}
                        </span>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-sandalwood">
                          {story.program ? <span>{story.program}</span> : null}
                          {story.year ? <span className="mx-1">●</span> : null}
                          {story.year ? <span>{story.year}</span> : null}
                        </div>
                      </div>
                      <span className={`rounded-full px-4 py-2 text-[11px] font-semibold ${story.consentStatus === "verified" ? "bg-emerald-50 text-emerald-700" : "bg-sand/20 text-sandalwood"}`}>Consent: {story.consentStatus || "pending"}</span>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-sandalwood">
                          <MapPin className="h-4 w-4 text-marigold" />
                          <span>{story.location || "Location pending"}</span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                          <strong className="text-maroon">Challenge:</strong> {story.challenge}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-sandalwood">
                          <strong className="text-maroon">Assistance:</strong> {story.assistance}
                        </p>
                        {story.outcome ? (
                          <p className="mt-3 text-sm leading-relaxed text-sandalwood">
                            <strong className="text-maroon">Outcome:</strong> {story.outcome}
                          </p>
                        ) : null}
                      </div>
                      <div className="rounded-2xl border border-maroon/10 p-4">
                        <UserRound className="h-5 w-5 text-marigold" />
                        <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                          {story.quote || "Verified story quote will be published when consented and verified."}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
