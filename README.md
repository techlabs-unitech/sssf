# Sri Sai Swamy Seva Foundation — Website

A Next.js 14 (App Router) + TypeScript + Tailwind CSS website for Sri Sai
Swamy Seva Foundation, with a light/dark theme toggle.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Structure

- `app/` — one folder per page (Home, About, Programs, Gallery, Events, Donate, Contact), each using the App Router.
- `components/` — Header, Footer, ThemeToggle, DonateForm, ContactForm, and the shared visual motifs (`ToranDivider`, `Diya`, `ProgramCard`, `ImpactStat`).
- `public/` — logo files and static assets.

## Your logo

Your actual logo is already wired in:

- `public/logo-emblem.png` — the circular badge only (background removed), used in the header and footer.
- `public/logo-full.png` — the full lockup with the "Hope, Dignity, and Brighter Futures." ribbon, available if you want it for print materials, email signatures, etc.
- `app/icon.png` / `app/apple-icon.png` — favicon and home-screen icon, generated from your emblem (Next.js picks these up automatically, no extra config needed).

To swap in an updated logo later, replace `public/logo-emblem.png` (and `public/logo-full.png` if relevant) with the same filenames.

## Colors & type

The palette is sampled directly from your logo (navy ring, sky-blue /
magenta / leaf-green rising figures, rust-orange disc, pale-yellow
supporting hand) and defined as design tokens in `tailwind.config.ts` →
`theme.extend.colors`. The token names (`maroon`, `marigold`,
`vermillion`, `ivory`, `charcoal`, `sandalwood`) are historical internal
names — see the comment above the color block for what each now maps to:

- `maroon` → brand navy (`#0B0F8C`) — primary text, header/footer, nav
- `marigold` → sky blue (`#0B84F3`) — primary CTA and accent color
- `vermillion` → rust/terracotta (`#CC3403`) — warm secondary accent
- `magenta` / `leaf` → the magenta and green figure colors, used sparingly for icon accents
- `ivory` / `charcoal` → light/dark mode backgrounds
- `sandalwood` → muted body text

Fonts: `app/layout.tsx` loads **Fraunces** (display/headings) and **Work
Sans** (body) via `next/font/google`.

## Placeholder content to replace

- **Trustee names** in `app/about/page.tsx` (`TRUSTEES` array) — currently placeholders.
- **Phone/email/address** in `components/Footer.tsx` and `app/contact/page.tsx`.
- **Gallery photos** in `app/gallery/page.tsx` and hero/section images across pages — currently stock photos from Unsplash; swap in your own event photography.
- **Events** in `app/events/page.tsx` — sample upcoming/past events.
- **Social links** in `components/Footer.tsx` (`#` placeholders).
- **Donate & Contact forms** (`components/DonateForm.tsx`, `components/ContactForm.tsx`) are functional UI but not wired to a backend — connect the donate form to a payment gateway (e.g. Razorpay/Instamojo for India) and the contact form to an email service or API route.

## Deploying

The site deploys cleanly to [Vercel](https://vercel.com) (recommended for
Next.js), or any Node hosting that supports Next.js. Set your domain
(`srisaiswamysevafoundation.org`) in your hosting provider once deployed.
