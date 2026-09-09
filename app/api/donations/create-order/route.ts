import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 1000000; // sanity ceiling, adjust as needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, address, pan, amount, frequency, purpose } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < MIN_AMOUNT || numericAmount > MAX_AMOUNT) {
      return NextResponse.json({ error: "Enter a valid donation amount." }, { status: 400 });
    }
    const donationFrequency = frequency === "monthly" ? "monthly" : "once";

    // Razorpay expects the amount in the smallest currency unit (paise).
    const amountInPaise = Math.round(numericAmount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `sssf_${Date.now()}`,
      notes: { donor_name: name, donor_email: email },
    });

    const { data: donation, error } = await supabaseAdmin
      .from("donations")
      .insert({
        donor_name: name.trim(),
        donor_email: email.trim().toLowerCase(),
        donor_address: (address || "").trim(),
        donor_pan: pan ? String(pan).trim().toUpperCase() : null,
        amount: numericAmount,
        frequency: donationFrequency,
        purpose: purpose && String(purpose).trim() ? String(purpose).trim() : "General",
        razorpay_order_id: order.id,
        status: "created",
      })
      .select("id")
      .single();

    if (error || !donation) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Could not start the donation. Please try again." }, { status: 500 });
    }

    return NextResponse.json({
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
      donationId: donation.id,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
