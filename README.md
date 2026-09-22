# Sri Sai Swamy Seva Foundation — Current Project Setup

This repository is a Next.js 14 project using the App Router, TypeScript, Tailwind CSS, Supabase, Razorpay, and an SMTP-based receipt email/PDF system for the Sri Sai Swamy Seva Foundation website.

The project is a full charitable organization website with:

- Public pages for Home, About, Programs, Gallery, Reviews, Events, Donate, and Contact.
- Donation flow with Razorpay order creation and payment verification.
- PDF receipt generation and email sending.
- Admin protected gallery upload/delete portal.
- Supabase-backed database and storage for donations, reviews, and gallery images.

---

## 1. What this repository is

This repository is the source code and configuration for the official website of Sri Sai Swamy Seva Foundation.

The main idea is to present the organization publicly and also support a functioning online donation and admin workflow.

The website uses:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres tables and storage
- Razorpay for donations
- Nodemailer for receipt delivery
- @react-pdf/renderer for receipt PDF generation
- Next.js image and route structure

---

## 2. Project structure

The following folders and files explain the current setup:

### app/

This folder contains the Next.js App Router page routes and API routes.

It is the main public website structure:

- `app/page.tsx` — Homepage with hero, carousel, organization messaging, program highlights, etc.
- `app/about/page.tsx` — About page content.
- `app/programs/page.tsx` — Programs listing.
- `app/gallery/page.tsx` — Public photo gallery page that reads from Supabase.
- `app/events/page.tsx` — Events and initiatives page.
- `app/donate/page.tsx` — Donation page with the donation form.
- `app/contact/page.tsx` — Contact information and contact form UI.
- `app/reviews/page.tsx` — Reviews/testimonials submission page.
- `app/admin/page.tsx` — Admin dashboard page for gallery manager and login/logout UI.
- `app/admin/gallery/page.tsx` — Gallery management screen.
- `app/admin/login/page.tsx` — Admin login page.

The folder also contains route handlers under `app/api/`:

- `app/api/admin/gallery/route.ts` — Upload gallery image.
- `app/api/admin/gallery/[id]/route.ts` — Delete gallery image by ID.
- `app/api/admin/login/route.ts` — Admin login API.
- `app/api/admin/logout/route.ts` — Admin logout API.
- `app/api/donations/create-order/route.ts` — Create Razorpay order and save donation record.
- `app/api/donations/verify/route.ts` — Verify Razorpay signature, create receipt number, update donation status, generate PDF, and send email.
- `app/api/donations/resend-receipt/route.ts` — Admin-only fallback route to resend receipt.
- `app/api/reviews/route.ts` — Public review/testimonial submission API.

### components/

This folder contains reusable UI components that are shared across the website pages.

Key files:

- `components/Header.tsx` — Top navigation and layout header.
- `components/Footer.tsx` — Footer, organization info, social links, and contact details.
- `components/FloatingDonateButton.tsx` — Floating donation CTA.
- `components/ProgramCard.tsx` — Program cards shown on program and homepage sections.
- `components/ImpactStat.tsx` — Organization impact statistics UI.
- `components/PhotoCarousel.tsx` — Photo carousel used on the site.
- `components/Testimonials.tsx` — Displays approved reviews/testimonials.
- `components/TestimonialsCarousel.tsx` — Carousel version of testimonials.
- `components/ReviewForm.tsx` — Public review submission form.
- `components/DonateForm.tsx` — Donation request form and payment UI integration.
- `components/ContactForm.tsx` — Contact form UI.
- `components/SevaMark.tsx` — Visual organization symbol / logo motif.
- `components/UnityDivider.tsx` — Decorative divider component.
- `components/admin/GalleryManagerList.tsx` — Gallery item listing used in admin UI.
- `components/admin/GalleryUploader.tsx` — Image upload UI for admin gallery management.
- `components/admin/LogoutButton.tsx` — Admin logout button.

### lib/

This folder contains server-side business logic and external service integrations.

Key files:

- `lib/adminAuth.ts` — Password-gated admin session with signed cookies, cookie name, expire time, and admin session helper functions.
- `lib/supabaseAdmin.ts` — Supabase admin client configured with service role key for server-only access.
- `lib/razorpay.ts` — Creates the Razorpay SDK client using `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
- `lib/mailer.ts` — SMTP email transport for sending donation receipts.
- `lib/receiptPdf.tsx` — Generates the donation receipt PDF using @react-pdf/renderer.
- `lib/orgConfig.ts` — Central organization branding data such as name, address, phone, email, and website.
- `lib/amountToWords.ts` — Converts INR amount to words for receipt display and PDF.

### supabase/

This folder has the database structure and schema used by the project.

- `supabase/schema.sql` — SQL file that creates:
  - Donation table with status and receipt number sequence.
  - Review/testimonial table.
  - Gallery images table.
  - Storage bucket `gallery` for uploaded images.
  - SQL function `next_receipt_number()` for receipt numbering.

This schema is the database design backbone for the whole app.

### public/

This folder holds public static files such as images and media.

Examples:

- `public/images/` — project image assets.
- `public/logo-emblem.png` — logo emblem asset.
- `public/logo-full.png` — full logo lockup.
- `public/edu.mp4` — homepage educational video shown by the home page.

The site uses image and media references from this folder.

### Configuration files

- `package.json` — Dependencies and scripts.
- `next.config.js` — Next.js configuration, including remote image host patterns from Supabase storage.
- `tailwind.config.ts` — Tailwind theme configuration and brand colors.
- `tsconfig.json` — TypeScript settings.
- `postcss.config.js` — Tailwind/PostCSS configuration.

### Additional docs

A few setup explanation files already exist:

- `DONATIONS_SETUP.md` — Payment and receipt setup workflow.
- `GALLERY_SETUP.md` — Gallery upload and storage setup.
- `REVIEWS_SETUP.md` — Review moderation setup workflow.

These files explain how the different system integrations should be configured.

---

## 3. Main flows (how the site works)

### Public website pages

The pages under `app/` are mostly server components or Next.js route pages. Most of the content is directly coded into the page files and a few pages read data from Supabase.

### Donation flow

The donation flow is a real server-to-server payment workflow:

1. A donor enters data in the `DonateForm` component.
2. `POST /api/donations/create-order` receives the data.
3. The route validates the request and creates a Razorpay order.
4. The donation row is inserted into the `donations` table.
5. The client receives an `orderId`, amount, currency and `donationId`.
6. On successful Razorpay payment, the browser sends the payment data to `POST /api/donations/verify`.
7. The verify route checks the Razorpay signature, finds the donation row, allocates a receipt number, updates the donation as `paid`, creates a PDF receipt, and sends it by email.

### Receipt and email

The same payment flow triggers:

- `lib/receiptPdf.tsx` for PDF generation.
- `lib/mailer.ts` for email delivery.
- `lib/orgConfig.ts` for org identity text used in the receipt.

### Reviews flow

Visitors can submit a review on the public review page.

- The `ReviewForm` component sends a POST request to `app/api/reviews/route.ts`.
- The review row is inserted into the Supabase `reviews` table with status `pending`.
- Admin users or maintainers may approve the review in Supabase so it appears as a live testimonial.

### Gallery flow

Gallery images are uploaded from the admin panel.

- Admin uploads a file using the gallery upload route.
- The backend route checks a valid admin session.
- The file is placed inside the `gallery` Supabase storage bucket.
- A row is inserted in `gallery_images` with its public URL and `storage_path`.
- The public gallery page reads from Supabase and displays the images directly.

### Admin login and session

The admin system uses a shared secret password and a signed cookie session rather than a login provider.

The authentication model is handled in:

- `lib/adminAuth.ts`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`

This is minimal password-gated admin authentication designed for a single admin portal.

---

## 4. Tech stack summary

This repository combines:

- `Next.js` for routes, rendering, and UI server components.
- `Tailwind CSS` for styling and theming.
- `Supabase` for database tables and image storage.
- `Razorpay` for payment order creation and verification.
- `Nodemailer` and `@react-pdf/renderer` for receipts.
- `Lucide React` icon system.

---

## 5. Environment variables expected

The project expects the following environment variables in a local `.env.local` or deployed environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
ORG_NAME=
ORG_ADDRESS=
ORG_PHONE=
ORG_EMAIL=
ORG_WEBSITE=
ORG_PAN=
ADMIN_API_SECRET=
```

These values are needed for:

- Supabase database and storage access.
- Admin session signing and admin password protection.
- Razorpay donation payments.
- SMTP receipt email sending.
- Organization profile metadata that appears on receipts and public page content.

---

## 6. Development commands

Install:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

The local site usually runs at:

```text
http://localhost:3000
```

---

## 7. Important project notes

- The current project uses public-facing Supabase storage URLs for gallery images.
- The admin gallery route expects images inside a `gallery` storage bucket.
- The receipt number function `next_receipt_number()` is created in the database SQL.
- The donation flow stores payment order details and donor information in the Supabase `donations` table.
- The review system stores `pending`, `approved`, and `rejected` statuses for moderation.
- Image remote hosts are configured in `next.config.js` to allow Supabase image loading.

---

## 8. What needs to be done next

When a developer starts working on this repository, the first tasks are usually:

1. Add all required environment variables.
2. Run the `supabase/schema.sql` file in Supabase.
3. Create or confirm the `gallery` storage bucket in Supabase.
4. Configure SMTP credentials for receipt sending.
5. Configure Razorpay keys for live and test payment orders.
6. Check `ORG_*` values in the environment or default profile values.
7. Confirm the admin password is set and the admin session secret is secure.

---

## 9. File map for understanding the setup

- `app/` — page routes and API routes.
- `components/` — page UI blocks and UI forms.
- `lib/` — service clients and business logic.
- `supabase/` — database schema.
- `public/` — images and static media.
- `package.json` — scripts and dependencies.
- `tailwind.config.ts` — design system colors and fonts.
- `next.config.js` — Next image host configuration.

This repository is currently a production-style website with a real donation workflow, admin protected gallery management, and a Supabase-backed data model.
