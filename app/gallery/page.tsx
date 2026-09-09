import Image from "next/image";
import type { Metadata } from "next";
import UnityDivider from "@/components/UnityDivider";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Sri Sai Swamy Seva Foundation's health camps, food drives, education programs and community events.",
};

// Always fetch fresh from Supabase so a new admin upload shows up on the
// very next page load — no rebuild or cache to bust.
export const dynamic = "force-dynamic";

type Photo = { src: string; alt: string; span: string };

const FALLBACK_PHOTOS: Photo[] = [
  { src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=900&auto=format&fit=crop", alt: "Volunteers distributing food supplies", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=900&auto=format&fit=crop", alt: "A doctor examining a patient at a health camp", span: "" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop", alt: "Children with school supplies", span: "" },
  { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=900&auto=format&fit=crop", alt: "Women in a vocational training session", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=900&auto=format&fit=crop", alt: "A community puja gathering", span: "" },
  { src: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=900&auto=format&fit=crop", alt: "Volunteers preparing disaster relief kits", span: "" },
  { src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=900&auto=format&fit=crop", alt: "Volunteers packing supplies", span: "" },
  { src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=900&auto=format&fit=crop", alt: "A health camp underway in a village", span: "row-span-2" },
];

// Repeats the same 4-across masonry rhythm the original placeholder grid
// used (every 1st and 4th tile in each group of 5 spans two rows).
function spanForIndex(i: number): string {
  const pos = i % 5;
  return pos === 0 || pos === 3 ? "row-span-2" : "";
}

async function getGalleryPhotos(): Promise<Photo[]> {
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("url, alt")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("gallery fetch error:", error);
    return FALLBACK_PHOTOS;
  }

  if (!data || data.length === 0) {
    return FALLBACK_PHOTOS;
  }

  return data.map((row, i) => ({
    src: row.url,
    alt: row.alt || "Photo from Sri Sai Swamy Seva Foundation",
    span: spanForIndex(i),
  }));
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            Moments from the field.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            A glimpse of the camps, drives and gatherings that make up our
            everyday work.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-4">
            {photos.map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${photo.span}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 300px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
