import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ShieldCheck, FileCheck2, BadgeCheck, WalletCards } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = pageMetadata("/donate");

const IMPACT = [
  { label: "Verified cost examples", detail: "Verified cost examples will be published here as supporting records become available." },
  { label: "Program spending", detail: "Donation allocation by program area will be shared once verified financial records are ready for publication." },
  { label: "Administrative spending", detail: "Operational support and non-program costs will be disclosed with the official reporting framework when available." },
  { label: "Donation utilization", detail: "Utilization narratives and reporting periods will be published as verified records are finalized." },
];

export default function DonatePage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Donate</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Every offering reaches someone.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            Your donation goes directly toward health camps, meals, school
            support and relief kits — no part of it is symbolic.
          </p>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <DonateForm />

          <div className="space-y-8">
            <div className="rounded-2xl border border-maroon/10 p-7">
              <h2 className="font-display text-xl text-maroon">Where donations go</h2>
              <ul className="mt-5 space-y-4">
                {IMPACT.map((row) => (
                  <li key={row.label} className="flex items-start gap-4 rounded-xl border border-maroon/10 bg-ivory-soft p-4">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-marigold/15 text-marigold">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-sandalwood">
                      <span className="mb-1 block font-semibold text-maroon">{row.label}</span>
                      {row.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3.5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Secure & transparent</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    Payments are processed securely, and every rupee is tracked against the program it was given to.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <FileCheck2 className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Receipt after payment</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    A donation receipt is generated and emailed after successful payment verification.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <WalletCards className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Verified data will be published here</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    Annual targets, program spending, and utilization summaries will be shared when official records are confirmed for publication.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <FileCheck2 className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">See how we approach financial transparency</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    <a href="/transparency" className="font-semibold text-maroon underline decoration-marigold/60 underline-offset-4">
                      Transparency & Accountability
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
