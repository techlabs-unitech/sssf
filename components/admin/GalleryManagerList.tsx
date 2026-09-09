"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
  created_at: string;
};

export default function GalleryManagerList({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Remove this image from the gallery?")) return;

    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not delete image.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete image.");
    } finally {
      setDeletingId(null);
    }
  }

  if (images.length === 0) {
    return (
      <p className="text-sm text-sandalwood dark:text-ivory-soft/70">
        No images uploaded yet — the public gallery page is showing placeholder
        photos until you add some here.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl text-maroon dark:text-ivory">
        Uploaded photos ({images.length})
      </h2>

      {error && <p className="mt-3 text-sm text-vermillion">{error}</p>}

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden rounded-xl border border-maroon/10 dark:border-marigold/15"
          >
            <div className="relative h-32 w-full">
              <Image src={img.url} alt={img.alt || ""} fill sizes="200px" className="object-cover" />
            </div>
            <button
              onClick={() => handleDelete(img.id)}
              disabled={deletingId === img.id}
              aria-label="Delete image"
              className="absolute right-2 top-2 rounded-full bg-charcoal/70 p-2 text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
