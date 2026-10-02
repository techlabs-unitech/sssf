import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Award, ShieldCheck, FileCheck2, Landmark, BadgeCheck, ArrowRight } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMetadata("/awards");

const RECOGNITIONS = [
  {
    icon: Landmark,
    title: "Section 8 Incorporation",
    detail: "Incorporated as a Section 8 non-profit company under the Companies Act, 2013, on 09 January 2021.",
    tag: "CIN: U85300KA2021NPL143003",
  },
  {
    icon: ShieldCheck,
    title: "CSR-1 Registration",
    detail: "Registered with the Ministry of Corporate Affairs, Registrar of Companies (Bangalore), for undertaking CSR activities.",
    tag: "CSR Registration No: CSR00102529",
  },
  {
    icon: FileCheck2,
    title: "12A Registration",
    detail: "Registered under Section 12A of the Income Tax Act, recognizing the foundation as a charitable organization.",
    tag: "ABFCS2398GE20218",
  },
  {
    icon: BadgeCheck,
    title: "80G Tax Exemption",
    detail: "Approved under Section 80G, allowing donors to claim tax deductions on contributions made to the foundation.",
    tag: "Form 10AC · AY 2026-27 to 2028-29",
  },
  {
    icon: Award,
    title: "NGO Darpan Registration",
    detail: "Registered with NITI Aayog's NGO Darpan portal, the Government of India's registry of voluntary organizations.",
    tag: "Unique ID: KA/2021/0278307",
  },
  {
    icon: ShieldCheck,
    title: "PAN & Statutory Compliance",
    detail: "Holds a valid organizational PAN and maintains statutory filings including professional tax enrolment and income tax returns.",
    tag: "PAN: ABFCS2398G",
  },
];

export default function AwardsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Awards & Recognition</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Trusted, registered, and accountable.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            While the foundation continues to grow its community reach, here is the verified recognition, registration and compliance status that supports our credibility as a Section 8 non-profit. As new awards or recognitions are received, they will be published here.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/legal" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]">
              View legal & compliance
            </Link>
            <Link href="/annual-reports" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              Annual reports
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
            {RECOGNITIONS.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full rounded-[1.75rem] border border-maroon/10 bg-white/60 p-7 shadow-[0_12px_24px_rgba(11,15,140,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_18px_32px_rgba(11,15,140,0.1)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marigold/15 text-maroon">
                    <item.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-maroon">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">{item.detail}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-marigold-dark">{item.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8 md:p-12">
            <span className="eyebrow">Recognized on public registries</span>
            <h2 className="mt-4 font-display text-2xl md:text-3xl text-maroon">
              Verified by government registration systems, not self-declared claims.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sandalwood">
              Every recognition on this page is backed by an official registration number that can be independently checked against the issuing authority — the Registrar of Companies, the Income Tax Department, or NITI Aayog&rsquo;s NGO Darpan portal.
            </p>
            <Link href="/legal" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-maroon">
              See full legal & compliance records
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
