# Gallery admin portal — setup guide

This adds a password-protected admin portal at **`/admin/gallery`** where you
can upload photos. Each upload is stored in **Supabase Storage** and recorded
in a `gallery_images` table; the public **`/gallery`** page reads that table
fresh on every visit, so a new photo appears immediately — no rebuild, no
cache to bust, no redeploy.

Until you've uploaded anything, `/gallery` keeps showing the existing
placeholder Unsplash photos, so the site never looks broken.

## How it works

1. You sign in at `/admin/login` with a single shared admin password.
2. At `/admin/gallery` you pick an image file (JPG/PNG/WEBP/GIF, up to 8MB)
   and an optional description, and click **Upload image**.
3. The server (`/api/admin/gallery`) uploads the file to a `gallery` bucket
   in Supabase Storage, gets its public URL, and inserts a row into the
   `gallery_images` table.
4. The public `/gallery` page queries `gallery_images` directly from
   Supabase on every page load and renders whatever's there, newest last.
5. You can remove a photo any time from the same admin page — it deletes
   both the storage file and the table row.

This reuses the exact same access pattern as `donations` and `reviews`:
**Row Level Security is on with no public policies** on `gallery_images`, so
the browser can never read or write it directly — every read/write goes
through server code using `SUPABASE_SERVICE_ROLE_KEY`. The `gallery` storage
bucket is marked **public** so uploaded photos can be served directly via
their public URL, but uploading/deleting files still only ever happens
server-side with the service role key.

Admin authentication is a single shared password, not Supabase Auth or user
accounts — there's one admin, so a signed, httpOnly session cookie is enough.
Nobody can read or forge a valid session without your `ADMIN_SESSION_SECRET`.

## 1. Run the migration

In Supabase: **SQL Editor → New query**, paste the new "Gallery" section at
the bottom of `supabase/schema.sql`, and run it. (If you haven't set up
Supabase at all yet, run the whole file — see `DONATIONS_SETUP.md` for the
full walkthrough of creating a project and getting your keys.)

This creates the `gallery_images` table and the `gallery` storage bucket
(marked public) in one go.

## 2. Set your admin password and session secret

Add two new environment variables (same place as your existing
`NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — `.env.local` for
local dev, your host's environment variables panel for production):

```bash
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
```

- `ADMIN_PASSWORD` is what you type in at `/admin/login`. Pick something
  strong — this is the only thing standing between the public internet and
  your gallery uploads.
- `ADMIN_SESSION_SECRET` signs the login session cookie so it can't be
  forged. Generate one with:

  ```bash
  openssl rand -hex 32
  ```

No new Supabase keys are needed — this reuses `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` from your donations setup.

## 3. Use it

1. Visit `/admin/login` and sign in with `ADMIN_PASSWORD`.
2. On `/admin/gallery`, upload a photo and a short description (used as the
   image's alt text for accessibility).
3. Open `/gallery` in another tab — your new photo is already there.
4. To remove a photo, hover it in the admin grid and click the trash icon.

There's no link to `/admin/login` anywhere in the public site nav — visit it
directly by URL.

## What's included

- `supabase/schema.sql` — adds the `gallery_images` table (RLS on, no
  policies) and creates the public `gallery` storage bucket.
- `lib/adminAuth.ts` — password check + signed session cookie helpers.
- `app/admin/login/page.tsx` — the login form.
- `app/admin/gallery/page.tsx` — the protected upload/manage page.
- `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts` — session
  cookie set/clear.
- `app/api/admin/gallery/route.ts` — handles uploads (storage + table insert).
- `app/api/admin/gallery/[id]/route.ts` — handles deletes (storage + table row).
- `components/admin/GalleryUploader.tsx`, `GalleryManagerList.tsx`,
  `LogoutButton.tsx` — the admin UI.
- `app/gallery/page.tsx` — now reads photos from Supabase, falling back to
  the original placeholder photos when the table is empty.
- `next.config.js` — allows `next/image` to load photos from your Supabase
  project's storage domain.

## Notes for later

- Photos currently render in the order they were uploaded (oldest first).
  There's a `sort_order` column on `gallery_images` ready for drag-to-reorder
  if you want to add that later — right now it's always `0`, so upload order
  wins.
- Everything is a single shared admin login. If you ever need multiple admins
  with individual accounts, that's a bigger change (Supabase Auth) rather
  than an extension of this password.
