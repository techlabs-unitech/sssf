import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowDown, FileText, Landmark, Scale, HandCoins } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import { transparencyOverview, fundUtilizationCategories, howFundsMayBeUsed, verificationLabels } from "@/lib/transparencyContent";

export const metadata: Metadata = pageMetadata("/transparency");

export default function TransparencyPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Transparency</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            {transparencyOverview.heroTitle}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            {transparencyOverview.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/financial-transparency" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              Financial transparency
            </Link>
            <Link href="/donate" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory">
              Support programs
            </Link>
          </div>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <span className="eyebrow">Where donations support our work</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">
                {transparencyOverview.whereDonationsSupportTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                {transparencyOverview.whereDonationsSupportDescription}
              </p>
              <div className="mt-7 grid gap-3">
                {fundUtilizationCategories.map((category) => (
                  <div key={category.title} className="flex items-center gap-3 rounded-xl border border-maroon/10 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-marigold" />
                    <span className="font-display text-sm text-maroon">{category.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <span className="eyebrow">How funds may be used</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">
                {transparencyOverview.howFundsMayBeUsedTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                {transparencyOverview.howFundsMayBeUsedDescription}
              </p>
              <div className="mt-7 grid gap-3">
                {howFundsMayBeUsed.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-maroon/10 px-4 py-3">
                    <FileText className="h-4 w-4 text-marigold" />
                    <span className="text-sm text-sandalwood">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <span className="eyebrow">Program vs administrative spending</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">
                {transparencyOverview.allocationTitle}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-maroon/10 p-5">
                  <div className="flex items-center gap-3">
                    <Landmark className="h-5 w-5 text-marigold" />
                    <span className="font-display text-lg text-maroon">Program Spending</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                    Education, healthcare, food distribution, welfare and other service activities.
                  </p>
                </div>
                <div className="rounded-2xl border border-maroon/10 p-5">
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-marigold" />
                    <span className="font-display text-lg text-maroon">Administrative &amp; Operational Spending</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                    Necessary organizational and operational expenses that support delivery of services.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-sandalwood">
                These categories describe where expenditure can be reported. Verified financial allocation figures will be published here after verification.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Landmark className="h-5 w-5 text-marigold" />
                <span className="text-sm font-semibold text-maroon">{transparencyOverview.allocationPending}</span>
              </div>
              <div className="mt-7">
                <Link href="/financial-transparency" className="rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon">
                  Explore financial documents
                </Link>
              </div>
            </article>

            <article className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <span className="eyebrow">Verified Cost Examples</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">
                {transparencyOverview.costExamplesTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                {transparencyOverview.costExamplesDescription}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Scale className="h-5 w-5 text-marigold" />
                <span className="text-sm font-semibold text-maroon">{transparencyOverview.costExamplesPending}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="max-w-3xl">
            <span className="eyebrow">Donation utilization</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">{transparencyOverview.donationUtilizationTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              {transparencyOverview.donationUtilizationDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-5">
            {[
              "Donation received",
              "Allocated to intended program/project",
              "Activity delivered",
              "Supporting records",
              "Utilization reporting",
            ].map((step, index) => (
              <div key={step} className="rounded-[2rem] border border-maroon/10 bg-white/50 p-6">
                <div className="flex items-center justify-between">
                  <HandCoins className="h-5 w-5 text-marigold" />
                  {index < 4 ? <ArrowDown className="h-4 w-4 text-sandalwood" /> : null}
                </div>
                <p className="mt-4 text-sm font-medium text-sandalwood">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
            <span className="eyebrow">Annual targets</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">
              {transparencyOverview.targetsTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              {transparencyOverview.targetsDescription}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Scale className="h-5 w-5 text-marigold" />
              <span className="text-sm font-semibold text-maroon">{transparencyOverview.targetsPending}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 p-8">
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex rounded-full border border-maroon/20 px-4 py-2 text-xs font-semibold text-maroon">{verificationLabels.verified}</span>
              <span className="inline-flex rounded-full border border-sandalwood/20 px-4 py-2 text-xs font-semibold text-sandalwood">{verificationLabels.pending}</span>
              <span className="inline-flex rounded-full border border-sandalwood/20 px-4 py-2 text-xs font-semibold text-sandalwood">{verificationLabels["not-published"]}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
