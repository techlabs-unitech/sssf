"use client";

import { useState } from "react";
import { Check, Copy, Landmark } from "lucide-react";
import { ORG_BANK } from "@/lib/orgConfig";

const ROWS: Array<{ label: string; value: string; copy?: boolean; mono?: boolean }> = [
  { label: "Account name", value: ORG_BANK.accountName, copy: true },
  { label: "Bank", value: `${ORG_BANK.bankName}, ${ORG_BANK.branch} branch` },
  { label: "Account number", value: ORG_BANK.accountNumber, copy: true, mono: true },
  { label: "IFSC", value: ORG_BANK.ifsc, copy: true, mono: true },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS or permissions); the value is still visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-maroon/15 px-2.5 py-1 text-[11px] font-semibold text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function BankDetails() {
  return (
    <div className="rounded-2xl border border-maroon/10 p-7">
      <div className="flex items-start gap-4">
        <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-maroon" strokeWidth={1.75} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base text-maroon">Bank details</h3>
          <p className="mt-1 text-sm text-sandalwood">For donations by bank transfer (NEFT / RTGS / IMPS).</p>

          <dl className="mt-4 divide-y divide-maroon/10 rounded-xl border border-maroon/10 bg-white/50">
            {ROWS.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sandalwood/80">{row.label}</dt>
                  <dd
                    className={`mt-0.5 break-words text-sm text-maroon ${
                      row.mono ? "font-mono text-[15px] tracking-wide" : "font-medium"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
                {row.copy ? <CopyButton value={row.value} label={row.label} /> : null}
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs leading-relaxed text-sandalwood">
            After transferring, please email us your name, amount and transaction reference so we can acknowledge your
            donation.
          </p>
        </div>
      </div>
    </div>
  );
}
