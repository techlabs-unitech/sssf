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

const nextConfig = {
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
