import type { Metadata } from "next";
import { ShieldCheck, ReceiptText, HandCoins } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Sri Sai Swamy Seva Foundation's health, education and relief programs with a one-time or monthly donation.",
};

const IMPACT = [
  { amount: "₹500", impact: "Feeds a family of four for a week" },
  { amount: "₹1,500", impact: "Covers school supplies for one child, one term" },
  { amount: "₹5,000", impact: "Funds a health screening for 25 people" },
  { amount: "₹15,000", impact: "Stocks a disaster relief kit for 10 families" },
];

export default function DonatePage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Donate</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            Every offering reaches someone.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Your donation goes directly toward health camps, meals, school
            support and relief kits — no part of it is symbolic.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <DonateForm />

          <div className="space-y-8">
            <div className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7">
              <h2 className="font-display text-xl text-maroon dark:text-marigold">What your gift does</h2>
              <ul className="mt-5 space-y-4">
                {IMPACT.map((row) => (
                  <li key={row.amount} className="flex items-start gap-4">
                    <span className="shrink-0 rounded-full bg-marigold/15 px-3 py-1 text-sm font-semibold text-maroon dark:text-marigold">
                      {row.amount}
                    </span>
                    <span className="text-sm text-sandalwood dark:text-ivory-soft/70 pt-1">{row.impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3.5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Secure & transparent</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Payments are processed securely, and every rupee is tracked against the program it was given to.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <ReceiptText className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Tax-deductible</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Donations qualify for tax deduction under Section 80G. A receipt is emailed after every gift.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <HandCoins className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Other ways to give</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Bank transfer, in-kind donations, and corporate CSR partnerships — reach us via the contact page.
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
