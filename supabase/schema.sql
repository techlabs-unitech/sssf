-- Run this once in your Supabase project's SQL editor (Project -> SQL Editor -> New query).

-- Sequence used to allocate sequential, gap-free receipt numbers.
-- Starting value mirrors the sample receipt (123456789) — change if you'd
-- rather start from 1, 1001, etc.
create sequence if not exists receipt_number_seq
  start with 123456790
  increment by 1;

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  paid_at timestamptz,

  -- Donor-supplied details (used verbatim on the receipt)
  donor_name text not null,
  donor_email text not null,
  donor_address text not null default '',
  donor_pan text,

  -- Donation details
  amount numeric(12, 2) not null check (amount > 0),
  frequency text not null default 'once' check (frequency in ('once', 'monthly')),
  purpose text not null default 'General',

  -- Razorpay identifiers
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  razorpay_signature text,

  -- Lifecycle
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),

  -- Receipt
  receipt_number bigint unique,
  receipt_sent boolean not null default false,
  receipt_sent_at timestamptz
);

create index if not exists donations_status_idx on donations (status);
create index if not exists donations_email_idx on donations (donor_email);

-- Row Level Security: enabled with NO policies, so the anon/public key
-- cannot read or write this table at all. All access happens exclusively
-- from server-side API routes using the SUPABASE_SERVICE_ROLE_KEY, which
-- bypasses RLS by design. This keeps donor PII and payment data private.
alter table donations enable row level security;

-- Atomically allocate the next receipt number. Called from the server
-- after a payment is verified, so numbers are gap-free and never reused
-- even under concurrent requests.
create or replace function next_receipt_number()
returns bigint
language sql
security definer
as $$
  select nextval('receipt_number_seq');
$$;

-- ---------------------------------------------------------------------------
-- Reviews / testimonials from friends & wellwishers
-- ---------------------------------------------------------------------------
-- Anyone can submit a review from the /reviews page. It lands here with
-- status = 'pending' and stays invisible on the site until a team member
-- reviews it in the Supabase Table Editor and flips status to 'approved'.
-- Only 'approved' rows are ever read by the homepage.

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Submitter details
  name text not null,
  email text,
  relationship text not null default 'Wellwisher',

  -- The review itself
  message text not null,
  rating smallint check (rating between 1 and 5),

  -- Moderation
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_at timestamptz
);

create index if not exists reviews_status_idx on reviews (status);
create index if not exists reviews_created_at_idx on reviews (created_at desc);

-- Row Level Security: enabled with NO policies, same approach as `donations`.
-- The anon/public key can neither read nor write this table directly — all
-- access happens from server-side code (the /api/reviews route for
-- submissions, and server components for reading approved reviews) using
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS by design. This keeps
-- pending/rejected reviews and submitter emails private, and prevents
-- anyone from approving their own review from the browser.
alter table reviews enable row level security;

-- ---------------------------------------------------------------------------
-- Gallery — photos managed from the /admin/gallery portal
-- ---------------------------------------------------------------------------
-- The admin uploads a photo at /admin/gallery. The server route stores the
-- file in the `gallery` storage bucket and records a row here; the public
-- /gallery page reads this table fresh on every request, so a new upload
-- shows up immediately with no rebuild or cache to bust.

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  url text not null,
  storage_path text not null,
  alt text not null default '',
  sort_order integer not null default 0
);

create index if not exists gallery_images_order_idx
  on gallery_images (sort_order, created_at);

-- Row Level Security: enabled with NO policies, same pattern as `donations`
-- and `reviews`. Only server-side code using SUPABASE_SERVICE_ROLE_KEY
-- (the /api/admin/gallery routes and the /gallery page) can read or write
-- this table.
alter table gallery_images enable row level security;

-- Storage bucket that holds the actual image files. Marked `public` so the
-- uploaded photos can be served directly via their public URL on the
-- /gallery page without needing a storage RLS policy for downloads.
-- Uploads/deletes still only ever happen server-side via the service role
-- key (see app/api/admin/gallery/route.ts), never from the browser.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;
