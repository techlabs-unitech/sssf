"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

type PhotoCarouselProps = {
  slides: Slide[];
  autoPlayMs?: number;
};

export default function PhotoCarousel({ slides, autoPlayMs = 4500 }: PhotoCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + slides.length) % slides.length;
      setActive(next);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [isPaused, slides.length, autoPlayMs]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[85vh] min-h-[420px] w-full overflow-hidden border-0 md:aspect-[21/9] md:h-auto md:min-h-0 md:rounded-[1.5rem] md:border md:border-marigold/30"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              priority={index === 0}
              className="object-cover"
            />
            {slide.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent px-5 py-6 md:px-8 md:py-8">
                <p className="text-sm font-medium text-ivory md:text-base">{slide.caption}</p>
              </div>
            )}
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-2 text-maroon shadow-md backdrop-blur transition hover:bg-ivory dark:bg-charcoal/70 dark:text-marigold dark:hover:bg-charcoal"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-2 text-maroon shadow-md backdrop-blur transition hover:bg-ivory dark:bg-charcoal/70 dark:text-marigold dark:hover:bg-charcoal"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === active
                  ? "w-6 bg-maroon dark:bg-marigold"
                  : "w-2 bg-maroon/25 dark:bg-marigold/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
