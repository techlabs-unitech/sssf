import "server-only";
import type { HeroSlide } from "@/components/HeroSlider";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { programMap } from "@/lib/programsContent";

const MAX_PHOTO_SLIDES = 4;

/** First slide — the original hero (intro text + video). Always shown. */
const INTRO_SLIDE: HeroSlide = {
  id: "intro",
  eyebrow: "NGO in Chintamani, Chikkaballapura · Since 2021",
  title: "Hope, dignity, and",
  highlight: "brighter futures.",
  body:
    "Dr. N.R. Malluraja, known to the community as Sai Swamy, founded Sri Sai Swamy Seva Foundation in 2021 in Chintamani, Chikkaballapura district. He leads the foundation's grassroots-to-policy work across health, education, socio-economic empowerment, and community welfare.",
  cta: { label: "📄 Download Foundation Profile", href: "/Srisai-Swamy-Seva-Foundation.pdf", download: true },
  media: { type: "video", src: "/edu.mp4" },
  badge: true,
};

type SlideCopy = Omit<HeroSlide, "id" | "media" | "badge">;

/**
 * Copy for photos uploaded through /admin/gallery, matched on the photo's alt
 * text (case-insensitive). Body text reuses the site's existing program intros.
 * Any other upload gets the generic "From the field" copy.
 */
function copyFor(alt: string): SlideCopy {
  const key = alt.trim().toLowerCase();

  if (key.includes("health")) {
    return {
      eyebrow: "Healthcare",
      title: "Health camps that",
      highlight: "reach the village.",
      body: programMap.get("healthcare")?.shortIntro ?? "",
      cta: { label: "Explore healthcare", href: "/healthcare" },
    };
  }
  if (key.includes("rural")) {
    return {
      eyebrow: "Rural Development",
      title: "Stronger villages,",
      highlight: "built together.",
      body: programMap.get("rural-development")?.shortIntro ?? "",
      cta: { label: "Explore rural development", href: "/rural-development" },
    };
  }
  if (key.includes("founder")) {
    return {
      eyebrow: "Our founder",
      title: "Led by",
      highlight: "Sai Swamy.",
      body:
        "Dr. N.R. Malluraja founded the foundation in 2021 and leads its work across health, education, socio-economic empowerment, and community welfare.",
      cta: { label: "Read our story", href: "/about#story" },
    };
  }
  return {
    eyebrow: "From the field",
    title: alt.trim() || "Seva in action",
    body: "A glimpse of the camps, drives and gatherings that make up our everyday work.",
    cta: { label: "View the gallery", href: "/gallery" },
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("id, url, alt")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(MAX_PHOTO_SLIDES);

  if (error) {
    console.error("hero slides fetch error:", error);
    return [INTRO_SLIDE];
  }

  const photoSlides: HeroSlide[] = (data ?? []).map((row) => ({
    id: row.id,
    ...copyFor(row.alt ?? ""),
    media: { type: "image", src: row.url, alt: row.alt || "Photo from Sri Sai Swamy Seva Foundation" },
  }));

  return [INTRO_SLIDE, ...photoSlides];
}
