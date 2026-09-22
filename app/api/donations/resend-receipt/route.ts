import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateReceiptPdf } from "@/lib/receiptPdf";
import { sendReceiptEmail } from "@/lib/mailer";

export const runtime = "nodejs";

function formatReceiptDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Manual fallback for the rare case a receipt email didn't go out (e.g. an
 * SMTP hiccup right after payment). Call with:
 *   POST /api/donations/resend-receipt
 *   headers: { "x-admin-secret": "<ADMIN_API_SECRET>" }
 *   body: { "donationId": "<uuid>" }  OR  { "razorpayPaymentId": "..." }
 */
export async function POST(req: NextRequest) {
  const adminSecret = process.env.ADMIN_API_SECRET;
  if (!adminSecret) {
    return NextResponse.json({ error: "ADMIN_API_SECRET is not configured on the server." }, { status: 500 });
  }
  if (req.headers.get("x-admin-secret") !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { donationId, razorpayPaymentId } = (await req.json().catch(() => ({}))) ?? {};
  if (!donationId && !razorpayPaymentId) {
    return NextResponse.json({ error: "Provide donationId or razorpayPaymentId." }, { status: 400 });
  }

  let query = supabaseAdmin.from("donations").select("*").eq("status", "paid");
  query = donationId ? query.eq("id", donationId) : query.eq("razorpay_payment_id", razorpayPaymentId);
  const { data: donation, error } = await query.single();

  if (error || !donation) {
    return NextResponse.json({ error: "Paid donation not found." }, { status: 404 });
  }

  const receiptNumber = String(donation.receipt_number).padStart(9, "0");
  const pdfBuffer = await generateReceiptPdf({
    receiptNumber,
    date: formatReceiptDate(donation.paid_at ? new Date(donation.paid_at) : new Date(donation.created_at)),
    donorName: donation.donor_name,
    donorAddress: donation.donor_address,
    donorPan: donation.donor_pan,
    amount: Number(donation.amount),
    paymentMethod: "UPI",
    paymentRef: donation.razorpay_payment_id,
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

  return NextResponse.json({ success: true, receiptNumber });
}
