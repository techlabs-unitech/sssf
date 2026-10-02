# Reviews / testimonials — setup & moderation guide

This adds a public **Reviews & Feedback** page (`/reviews`) where friends and
wellwishers can submit a testimonial, plus a **"Voices of our community"**
section on the homepage that shows the ones you've approved.

## How it works

1. Someone fills out the form at `/reviews` (name, optional email, how they
   know the Foundation, a star rating, and their message).
2. It's saved to a new `reviews` table in Supabase with `status = 'pending'`.
   Nothing pending is ever shown on the site.
3. You approve or reject it from the **Supabase Table Editor** — no admin
   panel needed.
4. The homepage reads only rows where `status = 'approved'` (newest 6 first)
   directly from Supabase on every page load, so an approval shows up the
   next time someone visits.

This uses the exact same access pattern as the existing `donations` table:
Row Level Security is on with **no public policies**, so the browser can
never read or write reviews directly. All reads/writes happen server-side
via `SUPABASE_SERVICE_ROLE_KEY` (in `/api/reviews` for submissions, and in
`components/Testimonials.tsx` for display) — reusing the same Supabase
project and env vars you already set up for donations.

## 1. Run the migration

In Supabase: **SQL Editor → New query**, paste the new `reviews` section at
the bottom of `supabase/schema.sql`, and run it. (If you haven't set up
Supabase at all yet, just run the whole file — see `DONATIONS_SETUP.md` for
the full walkthrough of creating a project and getting your keys.)

## 2. Moderate reviews

1. In Supabase, go to **Table Editor → reviews**.
2. Each new submission appears with `status = pending`.
3. To publish one, click the row and change `status` to `approved`. To hide
   or discard one, set it to `rejected` (or just leave it as `pending`).
4. The homepage shows the 6 most recent `approved` reviews. Refresh the
   homepage to see the change — there's no cache to bust.

No new environment variables are needed — this reuses
`NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from your
donations setup.

## What's included

- `supabase/schema.sql` — adds the `reviews` table (RLS on, no policies).
- `app/api/reviews/route.ts` — validates and inserts a submission as `pending`.
- `components/ReviewForm.tsx` — the submission form (name, email, relationship,
  star rating, message).
- `app/reviews/page.tsx` — the public `/reviews` page.
- `components/Testimonials.tsx` — server component that fetches `approved`
  reviews and renders the homepage section; renders nothing if there are
  none yet, so the homepage stays clean until your first approval.
- `components/Header.tsx` — added a "Reviews" link to the nav.
