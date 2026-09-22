/** @type {import('next').NextConfig} */

const remotePatterns = [{ protocol: "https", hostname: "images.unsplash.com" }];

// Allow next/image to load photos uploaded to Supabase Storage. Read
// straight from process.env here (next.config.js runs in Node at build/boot
// time), so this picks up whichever Supabase project is configured without
// needing to hardcode a project ref.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    remotePatterns.push({
      protocol: "https",
      hostname: new URL(supabaseUrl).hostname,
      pathname: "/storage/v1/object/public/**",
    });
  } catch {
    // Invalid/missing URL — Supabase-hosted images just won't load until it's fixed.
  }
}

// One host per site. Any alternate hostname that reaches this app is 301-redirected
// to the canonical https://srisaiswamysevafoundation.com so Google consolidates
// ranking signals on a single domain. (Old domains hosted elsewhere need the same
// 301 configured at their own host/DNS — see SEO_SETUP.md.)
const CANONICAL_ORIGIN = "https://srisaiswamysevafoundation.com";
const ALTERNATE_HOSTS = [
  "www.srisaiswamysevafoundation.com",
  "srisaiswamysevafoundation.org",
  "www.srisaiswamysevafoundation.org",
  "srisaiswamysevafoundation.in",
  "www.srisaiswamysevafoundation.in",
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns,
  },
  async redirects() {
    return ALTERNATE_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
