import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FileText, Download, CalendarDays } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMetadata("/annual-reports");

const REPORTS = [
  {
    year: "2025 – 2026",
    title: "Annual Report & Audited Financial Statement",
    description: "Receipt & Payment Account, Income & Expenditure Account, and Balance Sheet for the year ending 30 March 2026.",
    href: "/reports/SSSF-Annual-Report-2025-26.pdf",
  },
  {
    year: "2021 – 2022",
    title: "Annual Report & Audited Financial Statement",
    description: "Receipt & Payment Account, Income & Expenditure Account, and Balance Sheet for the year ending 31 March 2022.",
    href: "/reports/SSSF-Annual-Report-2021-22.pdf",
  },
  {
    year: "2022",
    title: "CSR-1 Registration Letter",
    description: "Ministry of Corporate Affairs letter confirming registration for undertaking CSR activities.",
    href: "/reports/SSSF-CSR1-Registration.pdf",
  },
];

export default function AnnualReportsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Annual Reports</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Our financial transparency, documented.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            Audited receipts, payments, and financial statements are made available here for anyone who would like to review how the foundation manages its funds. Reports are added as each year&rsquo;s audit is finalized.
          </p>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((report, index) => (
              <Reveal key={report.href} delay={index * 60}>
                <div className="flex h-full flex-col rounded-[1.75rem] border border-maroon/10 bg-white/60 p-7 shadow-[0_12px_24px_rgba(11,15,140,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_18px_32px_rgba(11,15,140,0.1)]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-marigold-dark">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {report.year}
                  </div>
                  <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-marigold/15 text-maroon">
                    <FileText className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-maroon">{report.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-sandalwood">{report.description}</p>
                  <a
                    href={report.href}
                    download
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8 md:p-12">
            <span className="eyebrow">Looking for more detail?</span>
            <h2 className="mt-4 font-display text-2xl md:text-3xl text-maroon">
              Visit our Financial Transparency and Legal & Compliance pages
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sandalwood">
              Fund allocation, registration numbers, and supporting statutory documents are organized in more detail on our transparency pages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
