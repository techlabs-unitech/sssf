# Donations, receipts & the floating donate button — setup guide

This adds a real donation flow to the site:

- A floating **Donate** button on every page (bottom-right), linking to `/donate`.
- The donate form now takes a real payment via **Razorpay** (UPI, cards, netbanking).
- On successful payment, the server verifies it, saves the donation in **Supabase**,
  generates a PDF receipt that matches your uploaded template exactly, and emails
  it to the donor via your **Hostinger** mailbox (SMTP).

## 1. Install the new dependencies

```bash
npm install
```

(This pulls in `@supabase/supabase-js`, `razorpay`, `@react-pdf/renderer`, `nodemailer`.)

## 2. Set up Supabase

1. Create a project at https://supabase.com if you don't have one.
2. Go to **SQL Editor -> New query**, paste the contents of `supabase/schema.sql`,
   and run it. This creates the `donations` table plus a sequence that hands out
   gap-free receipt numbers (starting at 123456790, right after your sample receipt).
3. Go to **Project Settings -> API** and copy:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (NOT the `anon` key) -> `SUPABASE_SERVICE_ROLE_KEY`

   The service role key is only ever used server-side (API routes), and the
   `donations` table has Row Level Security turned on with no public policies —
   so the browser can never read or write donor data directly.

## 3. Set up Razorpay

1. Sign up at https://razorpay.com and complete KYC for your NGO (needed to accept
   live payments; test mode works immediately without KYC).
2. Go to **Settings -> API Keys** and generate a key pair.
3. Copy the Key ID and Key Secret into `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`.
4. Start in **Test Mode** (`rzp_test_...` keys) — you can pay with Razorpay's
   published test cards/UPI IDs to confirm the whole flow before going live.

> **Note on "Monthly" donations:** the form currently takes a monthly gift as a
> single one-time charge tagged "monthly" — it does not yet set up automatic
> recurring billing. True recurring donations need Razorpay's **Subscriptions**
> API (a separate integration with its own webhook flow). Happy to add that
> next if you want real auto-renewing monthly donations.

## 4. Set up Hostinger SMTP

1. In hPanel, go to **Emails -> Email Accounts** and note (or create) the mailbox
   you want donation receipts to be sent from, e.g. `donations@yourdomain.in`.
2. Hostinger's SMTP settings are normally:
   - Host: `smtp.hostinger.com`
   - Port: `465` (SSL) — or `587` (STARTTLS)
   - Username: the full mailbox address
   - Password: the mailbox password
3. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` accordingly.

## 5. Environment variables

Copy `.env.example` to `.env.local` and fill in everything from steps 2–4, plus
your organisation details (`ORG_*`) if they differ from what's already on your
sample receipt. Also set `ADMIN_API_SECRET` to any long random string.

When you deploy (Vercel, etc.), add the same variables in your host's
environment variable settings — never commit `.env.local`.

## 6. How it works, end to end

1. Donor fills the form on `/donate` and submits.
2. `POST /api/donations/create-order` creates a Razorpay order and inserts a
   `donations` row with `status = 'created'`.
3. Razorpay Checkout opens in a popup; the donor pays.
4. On success, the browser calls `POST /api/donations/verify`, which:
   - Verifies the payment signature (so a payment can't be faked from the browser).
   - Allocates the next receipt number via `next_receipt_number()`.
   - Marks the donation `status = 'paid'`.
   - Generates a PDF receipt matching your template (`lib/receiptPdf.tsx`) using
     the donor's name, address, PAN (if given), amount in words, UPI reference,
     and date.
   - Emails the PDF to the donor via Hostinger SMTP.
5. The donor sees a thank-you screen with their receipt number.

If an email ever fails to send after a successful payment (e.g. a transient SMTP
error), the payment is *not* rolled back — the error is logged server-side, and
you can resend the receipt manually:

```bash
curl -X POST https://yoursite.com/api/donations/resend-receipt \
  -H "x-admin-secret: <ADMIN_API_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"donationId": "<uuid from the donations table>"}'
```

## 7. Customizing the receipt

`lib/receiptPdf.tsx` reproduces your uploaded template layout (logo, org header,
receipt no./date, donor details, amount in words, UPI reference, signature line,
80G/PAN footer). It pulls the organisation's name/address/PAN/etc. from
`lib/orgConfig.ts` (env-driven), and the logo from `public/logo-emblem.png`.
Adjust styles/text there if you want to tweak spacing or wording.
