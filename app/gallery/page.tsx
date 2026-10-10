import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import UnityDivider from "@/components/UnityDivider";
import FilteredGallery from "@/components/FilteredGallery";
import { foundationPhotoCatalog } from "@/lib/foundationPhotos";
import { getSupabaseAdmin, MissingSupabaseConfigurationError } from "@/lib/supabaseAdmin";

export const metadata: Metadata = pageMetadata("/gallery");

// Always fetch fresh from Supabase so a new admin upload shows up on the
// very next page load — no rebuild or cache to bust.
export const dynamic = "force-dynamic";

type RemotePhoto = { src: string; alt: string; category: "Foundation Activities" };

async function getGalleryPhotos(): Promise<{ photos: RemotePhoto[]; unavailable: boolean }> {
  let client;
  try {
    client = getSupabaseAdmin();
  } catch (error) {
    if (error instanceof MissingSupabaseConfigurationError) {
      console.error("Remote gallery photos are unavailable:", error.message);
      return { photos: [], unavailable: true };
    }
    throw error;
  }

  const { data, error } = await client
    .from("gallery_images")
    .select("url, alt")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("gallery fetch error:", error);
    return { photos: [], unavailable: true };
  }

  if (!data || data.length === 0) {
    return { photos: [], unavailable: false };
  }

  return {
    photos: data.map((row) => ({
      src: row.url,
      alt: row.alt || "Photo from Sri Sai Swamy Seva Foundation",
      category: "Foundation Activities" as const,
    })),
    unavailable: false,
  };
}

export default async function GalleryPage() {
  const { photos, unavailable } = await getGalleryPhotos();

  return (
    <>
      <section className="page-intro container-seva">
        <div className="max-w-2xl">
          <span className="eyebrow">Gallery</span>
          <h1 className="page-heading">
            Moments from the field.
          </h1>
          <p className="page-summary">
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
          {unavailable ? (
            <p className="mb-6 rounded-md border border-marigold/30 bg-white px-5 py-4 text-sm text-sandalwood" role="status">
              Additional gallery photos are temporarily unavailable. Showing the foundation photo collection.
            </p>
          ) : null}
          <FilteredGallery localPhotos={foundationPhotoCatalog} remotePhotos={photos} />
        </div>
      </section>
    </>
  );
}
