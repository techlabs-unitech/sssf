import "server-only";
import nodemailer from "nodemailer";
import { ORG } from "./orgConfig";

const host = process.env.SMTP_HOST; // e.g. smtp.hostinger.com
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER; // e.g. donations@srisaiswamysevafoundation.in
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || user;

if (!host || !user || !pass) {
  throw new Error("Missing SMTP_HOST, SMTP_USER or SMTP_PASS environment variables.");
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS) — both work with Hostinger
  auth: { user, pass },
});

export async function sendReceiptEmail(opts: {
  toEmail: string;
  toName: string;
  receiptNumber: string;
  amount: number;
  pdfBuffer: Buffer;
}) {
  const { toEmail, toName, receiptNumber, amount, pdfBuffer } = opts;

  await transporter.sendMail({
    from: `"${ORG.name.replace(" (Regd)", "")}" <${from}>`,
    to: `"${toName}" <${toEmail}>`,
    subject: `Your donation receipt — #${receiptNumber}`,
    text:
      `Dear ${toName},\n\n` +
      `Thank you for your generous donation of Rs. ${amount.toLocaleString("en-IN")} to ${ORG.name}.\n` +
      `Your official 80G receipt (#${receiptNumber}) is attached to this email as a PDF.\n\n` +
      `With gratitude,\n${ORG.name}\n${ORG.website}`,
    html:
      `<p>Dear ${toName},</p>` +
      `<p>Thank you for your generous donation of <strong>&#8377;${amount.toLocaleString("en-IN")}</strong> to ${ORG.name}.</p>` +
      `<p>Your official 80G receipt (<strong>#${receiptNumber}</strong>) is attached to this email as a PDF.</p>` +
      `<p>With gratitude,<br/>${ORG.name}<br/><a href="https://${ORG.website}">${ORG.website}</a></p>`,
    attachments: [
      {
        filename: `Receipt_${receiptNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
