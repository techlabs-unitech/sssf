"use client";

import { useState } from "react";
import Script from "next/script";
import { Heart, Loader2 } from "lucide-react";

const AMOUNTS = [500, 1500, 5000, 15000];

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Status = "idle" | "processing" | "success" | "error";

export default function DonateForm() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(1500);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const selectedAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!scriptReady || typeof window === "undefined" || !window.Razorpay) {
      setErrorMsg("Payment is still loading — please try again in a moment.");
      return;
    }
    if (!selectedAmount || selectedAmount < 1) {
      setErrorMsg("Enter a valid donation amount.");
      return;
    }

    setStatus("processing");

    try {
      const orderRes = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, address, pan, amount: selectedAmount, frequency }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not start the donation.");

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Sri Sai Swamy Seva Foundation",
        description: frequency === "monthly" ? "Monthly donation" : "One-time donation",
        prefill: { name, email },
        theme: { color: "#0B0F8C" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/donations/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "We couldn't confirm your payment.");
            }
            setReceiptNumber(verifyData.receiptNumber);
            setStatus("success");
          } catch (err: any) {
            setErrorMsg(err.message || "Payment succeeded but confirmation failed. We'll follow up by email.");
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });

      razorpay.on("payment.failed", () => {
        setErrorMsg("Payment failed or was cancelled. Please try again.");
        setStatus("error");
      });

      razorpay.open();
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-marigold/40 bg-ivory-soft dark:bg-charcoal-soft p-10 text-center">
        <Heart className="mx-auto h-8 w-8 text-vermillion" fill="currentColor" strokeWidth={0} />
        <h2 className="mt-4 font-display text-2xl text-maroon dark:text-marigold">
          Thank you for your offering.
        </h2>
        <p className="mt-3 text-sm text-sandalwood dark:text-ivory-soft/70">
          Your ₹{selectedAmount.toLocaleString("en-IN")} {frequency === "monthly" ? "monthly " : ""}
          donation was received. Receipt #{receiptNumber} has been emailed to {email}.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
        strategy="afterInteractive"
      />
      <form onSubmit={handleSubmit} className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 md:p-9">
        <div className="flex rounded-full border border-maroon/20 dark:border-marigold/25 p-1 w-fit">
          <button
            type="button"
            onClick={() => setFrequency("once")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              frequency === "once"
                ? "bg-maroon dark:bg-marigold text-ivory dark:text-charcoal"
                : "text-sandalwood dark:text-ivory-soft/70"
            }`}
          >
            Give once
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              frequency === "monthly"
                ? "bg-maroon dark:bg-marigold text-ivory dark:text-charcoal"
                : "text-sandalwood dark:text-ivory-soft/70"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setCustomAmount("");
              }}
              className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
                !customAmount && amount === a
                  ? "border-marigold bg-marigold/15 text-maroon dark:text-marigold"
                  : "border-maroon/15 dark:border-marigold/20 text-sandalwood dark:text-ivory-soft/70 hover:border-marigold/50"
              }`}
            >
              ₹{a.toLocaleString("en-IN")}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="custom-amount" className="text-xs text-sandalwood dark:text-ivory-soft/60">
            Or enter a custom amount (₹)
          </label>
          <input
            id="custom-amount"
            type="number"
            min={1}
            inputMode="numeric"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="e.g. 2500"
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-xs text-sandalwood dark:text-ivory-soft/60">Full name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs text-sandalwood dark:text-ivory-soft/60">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-xs text-sandalwood dark:text-ivory-soft/60">Address (for your 80G receipt)</label>
          <input
            id="address"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House / street, city, PIN"
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="pan" className="text-xs text-sandalwood dark:text-ivory-soft/60">PAN (optional, for 80G tax deduction)</label>
          <input
            id="pan"
            type="text"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            placeholder="e.g. ABCDE1234F"
            maxLength={10}
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold uppercase"
          />
        </div>

        {errorMsg && (
          <p className="mt-4 text-sm text-vermillion">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "processing"}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-maroon dark:bg-marigold py-3.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "processing" && <Loader2 className="h-4 w-4 animate-spin" />}
          Donate ₹{selectedAmount ? selectedAmount.toLocaleString("en-IN") : "0"}
          {frequency === "monthly" ? " / month" : ""}
        </button>
      </form>
    </>
  );
}
