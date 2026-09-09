import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateReceiptPdf } from "@/lib/receiptPdf";
import { sendReceiptEmail } from "@/lib/mailer";

export const runtime = "nodejs";

function formatReceiptDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " ");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    // 1. Verify the payment actually came from Razorpay and wasn't tampered with.
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    // 2. Look up the matching donation row.
    const { data: donation, error: fetchError } = await supabaseAdmin
      .from("donations")
      .select("*")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (fetchError || !donation) {
      return NextResponse.json({ error: "Donation record not found." }, { status: 404 });
    }

    // Idempotency: if this donation was already verified/paid (e.g. the
    // client retried), just return the existing receipt info.
    if (donation.status === "paid" && donation.receipt_number) {
      return NextResponse.json({
        success: true,
        receiptNumber: String(donation.receipt_number).padStart(9, "0"),
      });
    }

    // 3. Allocate a gap-free receipt number and mark the donation paid.
    const { data: receiptNumberRaw, error: rpcError } = await supabaseAdmin.rpc("next_receipt_number");
    if (rpcError || receiptNumberRaw == null) {
      console.error("next_receipt_number error:", rpcError);
      return NextResponse.json({ error: "Could not allocate a receipt number." }, { status: 500 });
    }
    const receiptNumber = String(receiptNumberRaw).padStart(9, "0");
    const paidAt = new Date();

    const { error: updateError } = await supabaseAdmin
      .from("donations")
      .update({
        status: "paid",
        razorpay_payment_id,
        razorpay_signature,
        receipt_number: receiptNumberRaw,
        paid_at: paidAt.toISOString(),
      })
      .eq("id", donation.id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json({ error: "Could not finalize the donation." }, { status: 500 });
    }

    // 4. Generate the PDF receipt and email it to the donor.
    try {
      const pdfBuffer = await generateReceiptPdf({
        receiptNumber,
        date: formatReceiptDate(paidAt),
        donorName: donation.donor_name,
        donorAddress: donation.donor_address,
        donorPan: donation.donor_pan,
        amount: Number(donation.amount),
        paymentMethod: "UPI",
        paymentRef: razorpay_payment_id,
        towards: donation.purpose,
      });

      await sendReceiptEmail({
        toEmail: donation.donor_email,
        toName: donation.donor_name,
        receiptNumber,
        amount: Number(donation.amount),
        pdfBuffer,
      });

      await supabaseAdmin
        .from("donations")
        .update({ receipt_sent: true, receipt_sent_at: new Date().toISOString() })
        .eq("id", donation.id);
    } catch (mailErr) {
      // Payment already succeeded — don't fail the response over an email
      // hiccup, but log it loudly so it can be resent manually.
      console.error("Receipt email failed for donation", donation.id, mailErr);
    }

    return NextResponse.json({ success: true, receiptNumber });
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ error: "Something went wrong verifying your payment." }, { status: 500 });
  }
}
