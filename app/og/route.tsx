import { ImageResponse } from "next/og";
import { OG_LOGO_DATA_URI } from "@/lib/ogLogo";
import { PAGE_SEO, SITE_NAME, SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Branded 1200×630 social-share image (WhatsApp, Facebook, LinkedIn, X, Google Discover).
 *
 *   /og?p=/donate   → card built from PAGE_SEO["/donate"]
 *
 * The page key is looked up in PAGE_SEO — arbitrary text is never rendered, so the
 * endpoint can't be abused to make fake "official" cards on your domain.
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("p") ?? "/";
  const seo = PAGE_SEO[key] ?? PAGE_SEO["/"];

  const headline = seo.ogHeadline ?? seo.title;
  const sub = seo.ogSub ?? "NGO in Chintamani, Chikkaballapura · Karnataka";
  const host = SITE_URL.replace(/^https?:\/\//, "");
  const headlineSize = headline.length > 44 ? 58 : headline.length > 30 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "60px 72px 66px",
          background: "linear-gradient(135deg, #0B0F8C 0%, #07082E 100%)",
          color: "#FFFBF0",
        }}
      >
        {/* soft glow, echoing the site's hero */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -200,
            width: 640,
            height: 640,
            borderRadius: 640,
            background: "rgba(11,132,243,0.28)",
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 116,
              height: 116,
              borderRadius: 116,
              background: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={OG_LOGO_DATA_URI} width={104} height={104} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 28 }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 0.5 }}>{SITE_NAME}</div>
            <div style={{ fontSize: 24, color: "#4DA8F7", marginTop: 6 }}>Hope · Dignity · Brighter Futures</div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: headlineSize,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 820,
            }}
          >
            {headline}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#4DA8F7", marginTop: 22 }}>{sub}</div>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,251,240,0.85)" }}>{host}</div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,251,240,0.85)" }}>
            Section 8 · 80G · 12A · NGO Darpan
          </div>
        </div>

        {/* logo-colour accent bar */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 12, display: "flex" }}>
          <div style={{ flex: 1, background: "#0B84F3" }} />
          <div style={{ flex: 1, background: "#C61FBB" }} />
          <div style={{ flex: 1, background: "#2ECC5F" }} />
          <div style={{ flex: 1, background: "#CC3403" }} />
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    },
  );
}
