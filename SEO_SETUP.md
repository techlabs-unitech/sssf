# SEO setup — srisaiswamysevafoundation.com

All on-site SEO lives in **`lib/seo.ts`**. Edit titles/descriptions there; every page picks them up.

## What the audit found (live site, Sept 2026)

| Problem | Effect |
|---|---|
| `metadataBase` / `og:url` pointed at `www.srisaiswamysevafoundation.org` (a different domain) | Told Google and social apps the "real" site is the .org |
| Home `<title>` was just the brand name; no location or what-we-do keywords | Nothing to rank on beyond the name |
| No canonical tags, no `robots.txt`, no `sitemap.xml` | Slow/ambiguous indexing, duplicate-domain confusion |
| Twitter card = `summary`, no OG image anywhere | Bare share links on WhatsApp/Facebook/X |
| Brand repeated inside page titles while the layout template also appended it | Wasted title space |
| No structured data | No site-name / knowledge-panel signals |
| Empty pages (events, stories, case studies) and "not yet documented" pages (disaster-relief, spiritual-seva) were indexable | Thin content dilutes the site |
| Home "What we do" cards had mismatched titles and didn't link to program pages | Weak internal linking |
| `<main>` nested inside `<main>` (program + impact pages) | Invalid HTML |

## What changed

- `lib/seo.ts` (new): canonical site URL, unique title + description + keywords for all 27 pages, OG/Twitter builder, JSON-LD builders
- `app/layout.tsx`: new metadata (title template, robots/googleBot, OG, large Twitter card, theme-color), `lang="en-IN"`, **NGO + WebSite JSON-LD** (site name, alternate spellings, address, founder, social profiles)
- `app/og/route.tsx` + `lib/ogLogo.ts` (new): branded 1200×630 share image per page (`/og?p=/donate`). Only pages listed in `PAGE_SEO` render, so it can't be abused to show arbitrary text
- `app/robots.ts`, `app/sitemap.ts` (new): sitemap lists only indexable pages; events/stories/case studies are added automatically once published
- Every `page.tsx`: now `pageMetadata("/route")` (canonical + OG + Twitter)
- Detail pages (`events|stories|case-studies/[slug]`): `generateMetadata`
- `noindex` (lifted automatically when real content exists): `/events`, `/stories`, `/case-studies`, `/disaster-relief`, `/spiritual-seva`, `/admin/*`
- `next.config.js`: permanent redirects from `www` / `.org` / `.in` hostnames to `https://srisaiswamysevafoundation.com`
- `components/ProgramDetailPage.tsx`: breadcrumb JSON-LD and nested `<main>` fixed; same fix in `app/impact/page.tsx`
- `app/page.tsx`: keyword eyebrow ("NGO in Chintamani, Chikkaballapura · Since 2021"), corrected "What we do" card titles, cards now link to their program pages
- `lib/orgConfig.ts`: default website `.in` → `.com` (used in receipts and emails)

## After you deploy

1. **Search Console** → Sitemaps → submit `https://srisaiswamysevafoundation.com/sitemap.xml`. Then URL Inspection → *Request indexing* for `/`, `/about`, `/programs`, `/donate`, `/contact`.
2. **Old domains (biggest brand-search fix).** Search results show older sites at `srisaiswamysevafoundation.org` and `.in`. If you control them, 301-redirect every URL to the matching `.com` URL at their host/DNS. The redirects in `next.config.js` only fire if those domains point at *this* deployment. Keep them redirecting for at least a year.
3. **Env vars.** If `ORG_WEBSITE` is set in production, change it to `srisaiswamysevafoundation.com`. Optionally set `NEXT_PUBLIC_SITE_URL`.
4. **Google Business Profile.** Claim/verify "Sri Sai Swamy Seva Foundation, Guttapalya, Chintamani" and set the website to the `.com`. This is what puts you in the map pack for "NGO in Chintamani".
5. **Same name/address/phone everywhere**: GBP, Facebook, Instagram, LinkedIn, NGO Darpan, GuideStar India, all linking to the `.com`.
6. **Verify:** Google Rich Results Test on `/`; Facebook Sharing Debugger (re-scrape) for OG images. WhatsApp caches previews, so old links may keep the old card for a while.

## What actually moves rankings from here

Titles and descriptions get you indexed correctly and improve click-through. Ranking above another site is mostly earned by: (a) real content (publish events, stories, case studies and impact numbers; they enter the sitemap automatically), (b) links from other sites (directories, local news, partner NGOs, social profiles), (c) a verified Google Business Profile, and (d) time. Expect weeks, not days, and nobody can guarantee position #1.

Google ignores the `meta keywords` tag. It is populated for Bing and directories, but don't expect ranking from it.
