import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import GalleryUploader from "@/components/admin/GalleryUploader";
import GalleryManagerList from "@/components/admin/GalleryManagerList";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Gallery admin",
  robots: { index: false, follow: false },
};

// Always hit Supabase fresh — this is an admin tool, never cache it.
export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  requireAdminSession();

  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("id, url, alt, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("admin gallery fetch error:", error);
  }

  return (
    <section className="container-seva py-16 md:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-4 font-display text-3xl md:text-4xl text-maroon dark:text-ivory">
            Gallery
          </h1>
          <p className="mt-3 max-w-xl text-sm text-sandalwood dark:text-ivory-soft/70">
            Upload photos below. They're saved to Supabase and appear on the
            public <span className="font-medium">/gallery</span> page immediately —
            no rebuild or cache to bust.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-10">
        <GalleryUploader />
      </div>

      <div className="mt-12">
        <GalleryManagerList images={data ?? []} />
      </div>
    </section>
  );
}
