import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ShieldCheck, FileText, Landmark, BadgeCheck, Scale, BookOpen, Receipt, Building2 } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import { ORG } from "@/lib/orgConfig";
import { legalPageContent } from "@/lib/aboutContent";

export const metadata: Metadata = pageMetadata("/legal");

const iconMap = [
  ShieldCheck,
  FileText,
  Landmark,
  BadgeCheck,
  Scale,
  BookOpen,
  Receipt,
  Building2,
];

export default function LegalPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Legal & Compliance</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Documentation and compliance overview
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            {ORG.name} maintains a public information and trust-oriented approach. Where the repository does not contain verified documentation, the public record below is marked as “Documentation to be provided / verified.”
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/about" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              About the foundation
            </Link>
            <Link href="/transparency" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              Transparency & Accountability
            </Link>
            <Link href="/financial-transparency" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
              Financial Transparency
            </Link>
            <Link href="/donate" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory">
              Support the work
            </Link>
          </div>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="max-w-3xl">
            <span className="eyebrow">Compliance records</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">
              Documentation status
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              {legalPageContent.summary}
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {["Organization Registration", "Tax & Compliance", "Government/Portal Registration"].map((section) => {
              const sectionRecords = legalPageContent.records.filter((record) => record.section === section);
              return (
                <section key={section}>
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-maroon/10" />
                    <h3 className="font-display text-2xl text-maroon">{section}</h3>
                    <span className="h-px flex-1 bg-maroon/10" />
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {sectionRecords.map((record) => {
                      const recordIndex = legalPageContent.records.indexOf(record);
                      const Icon = iconMap[recordIndex % iconMap.length];
                      const isVerified = record.status.toLowerCase().includes("verified");
                      return (
                        <div key={record.category} className="rounded-2xl border border-maroon/10 p-6 bg-white/50">
                          <div className="flex items-start gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/10 text-maroon">
                              <Icon className="h-5 w-5" />
                            </span>
                            <div className="flex-1">
                              <h4 className="font-display text-lg text-maroon">{record.category}</h4>
                              <div className="mt-3">
                                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                                  isVerified
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-sand/20 text-sandalwood"
                                }`}>
                                  {record.status}
                                </span>
                              </div>
                              <p className="mt-4 text-sm leading-relaxed text-sandalwood">{record.detail}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-12">
            <div className="max-w-3xl">
              <span className="eyebrow">Public Documents</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">
                {legalPageContent.documentsHeading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                {legalPageContent.documentsIntro}
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {legalPageContent.publicDocuments.map((doc) => (
                <article key={doc.title} className="rounded-2xl border border-maroon/10 bg-white/60 p-6">
                  <span className="rounded-full bg-marigold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-maroon">
                    {doc.category}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-maroon">{doc.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">{doc.description}</p>
                  {doc.sourceFilenames?.length ? (
                    <p className="mt-3 text-[11px] leading-relaxed text-sandalwood/70">
                      Source: {doc.sourceFilenames.join(", ")}
                    </p>
                  ) : null}
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-full bg-maroon px-5 py-2 text-xs font-semibold text-ivory transition hover:bg-maroon/90"
                  >
                    View PDF →
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="max-w-3xl">
              <span className="eyebrow">Other Organization Documents</span>
              <h2 className="mt-4 font-display text-3xl text-maroon">Supporting documents</h2>
              <p className="mt-4 text-sm leading-relaxed text-sandalwood">
                These source files are shown under neutral titles where their specific legal or financial category is not established by the filename alone.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {legalPageContent.otherDocuments.map((doc) => (
                <article key={doc.href} className="rounded-2xl border border-maroon/10 bg-white/60 p-6">
                  <span className="rounded-full bg-marigold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-maroon">{doc.category}</span>
                  <h3 className="mt-4 font-display text-xl text-maroon">{doc.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">{doc.description}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-sandalwood/70">Source: {doc.sourceFilenames.join(", ")}</p>
                  <a href={doc.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-maroon px-5 py-2 text-xs font-semibold text-ivory transition hover:bg-maroon/90">
                    View PDF →
                  </a>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-2xl border border-maroon/20 bg-maroon/5 p-8">
            <h3 className="font-display text-2xl text-maroon">
              Document and verification note
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              Where certificates, registrations, exemptions, or government IDs are not available in the repository, this page intentionally uses neutral wording and does not create or repeat legal claims. A verified document can be added to the public repository and linked here when available.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
