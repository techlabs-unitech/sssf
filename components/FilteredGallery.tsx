"use client";

import { useState } from "react";
import type { FoundationPhoto, FoundationPhotoCategory } from "@/lib/foundationPhotos";
import Reveal from "@/components/Reveal";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";

type RemotePhoto = {
  src: string;
  alt: string;
  category: "Foundation Activities";
};

const filters: Array<"All" | FoundationPhotoCategory> = [
  "All",
  "Education",
  "Healthcare",
  "Annadanam",
  "Child Welfare",
  "Spiritual / Community Seva",
  "Volunteers",
  "Events",
  "Foundation Activities",
];

export default function FilteredGallery({
  localPhotos,
  remotePhotos,
}: {
  localPhotos: FoundationPhoto[];
  remotePhotos: RemotePhoto[];
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const photos = [...localPhotos, ...remotePhotos];
  const visiblePhotos = activeFilter === "All"
    ? photos
    : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Gallery categories">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              activeFilter === filter
                ? "border-maroon bg-maroon text-ivory"
                : "border-maroon/15 text-maroon hover:border-maroon"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {visiblePhotos.map((photo, index) => (
          <Reveal key={`${photo.src}-${index}`} delay={Math.min(index * 25, 160)}>
            <figure className="group relative overflow-hidden rounded-xl bg-charcoal">
              <div className="relative aspect-[4/3]">
                <FullscreenImageViewer
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 768px) 45vw, 300px"
                  caption={"caption" in photo ? photo.caption : undefined}
                  className="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent px-3 pb-3 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs leading-relaxed text-ivory">{"caption" in photo ? photo.caption : "Foundation activity captured in the field."}</p>
                </div>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>

      {visiblePhotos.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-maroon/15 p-6 text-sm text-sandalwood">
          No verified photographs are available in this category yet.
        </p>
      )}
    </div>
  );
}