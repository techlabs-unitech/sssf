import type { FoundationPhoto } from "@/lib/foundationPhotos";
import Reveal from "@/components/Reveal";
import FullscreenImageViewer from "@/components/FullscreenImageViewer";

export default function FoundationPhotoGrid({
  title,
  photos,
}: {
  title: string;
  photos: FoundationPhoto[];
}) {
  return (
    <section className="section-band py-16 md:py-20">
      <div className="container-seva">
        <Reveal>
          <span className="eyebrow">Photographs</span>
          <div className="editorial-rule mt-4" />
          <h2 className="mt-5 font-display text-3xl text-maroon">{title}</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={Math.min(index * 45, 180)}>
              <figure className="group overflow-hidden rounded-xl bg-white/60 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FullscreenImageViewer
                    src={photo.src}
                    alt={photo.alt}
                    caption={photo.caption}
                    sizes="(max-width: 768px) 45vw, 360px"
                    className="h-full w-full"
                  />
                </div>
                <figcaption className="p-3 text-xs leading-relaxed text-sandalwood">{photo.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}