import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import UnityDivider from "@/components/UnityDivider";
import FilteredGallery from "@/components/FilteredGallery";
import { foundationPhotoCatalog } from "@/lib/foundationPhotos";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata: Metadata = pageMetadata("/gallery");

// Always fetch fresh from Supabase so a new admin upload shows up on the
// very next page load — no rebuild or cache to bust.
export const dynamic = "force-dynamic";

type RemotePhoto = { src: string; alt: string; category: "Foundation Activities" };

async function getGalleryPhotos(): Promise<RemotePhoto[]> {
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("url, alt")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("gallery fetch error:", error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map((row) => ({
    src: row.url,
    alt: row.alt || "Photo from Sri Sai Swamy Seva Foundation",
    category: "Foundation Activities" as const,
  }));
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Moments from the field.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            A glimpse of the camps, drives and gatherings that make up our
            everyday work.
          </p>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <FilteredGallery localPhotos={foundationPhotoCatalog} remotePhotos={photos} />
        </div>
      </section>
    </>
  );
}
