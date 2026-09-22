import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { videosContent, videoShowcaseStatus } from "@/lib/videoContent";

export default function VideoSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-seva">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Watch our work</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">Videos</h2>
          </div>
          <Link href="/contact" className="text-sm font-semibold text-maroon">
            Share a verified video
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videosContent.length === 0 ? (
            <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-4">
                <PlayCircle className="h-8 w-8 text-marigold" />
                <p className="text-sm leading-relaxed text-sandalwood">{videoShowcaseStatus}</p>
              </div>
            </div>
          ) : (
            videosContent.map((video) => (
              <article key={video.title} className="group overflow-hidden rounded-[2rem] border border-maroon/10 bg-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-lg">
                <div className="relative aspect-video bg-maroon/10">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <PlayCircle className="h-10 w-10 text-marigold" />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-[0.14em] text-marigold">{video.category}</span>
                  <h3 className="mt-3 font-display text-lg text-maroon">{video.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sandalwood">{video.description}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-sandalwood">{video.status}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
