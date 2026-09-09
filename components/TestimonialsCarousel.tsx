"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  name: string;
  relationship: string;
  message: string;
  rating: number | null;
};

type TestimonialsCarouselProps = {
  reviews: Review[];
  autoPlayMs?: number;
};

export default function TestimonialsCarousel({ reviews, autoPlayMs = 6000 }: TestimonialsCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + reviews.length) % reviews.length;
      setActive(next);
    },
    [reviews.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % reviews.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [isPaused, reviews.length, autoPlayMs]);

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
      className="relative mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full shrink-0 px-1">
              <figure className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-maroon/10 dark:border-marigold/15 bg-white/60 dark:bg-charcoal/60 p-8 text-center md:p-10">
                <Quote className="h-7 w-7 text-marigold/60" strokeWidth={1.75} />
                <blockquote className="mt-5 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/80 md:text-lg">
                  &ldquo;{review.message}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-lg text-maroon dark:text-marigold">{review.name}</p>
                  <p className="mt-1 text-xs tracking-wide uppercase text-sandalwood dark:text-ivory-soft/60">
                    {review.relationship}
                  </p>
                  {review.rating ? (
                    <div
                      className="mt-3 flex items-center justify-center gap-0.5"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating!
                              ? "fill-marigold text-marigold"
                              : "text-maroon/15 dark:text-marigold/20"
                          }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  ) : null}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {reviews.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-2 text-maroon shadow-md backdrop-blur transition hover:bg-ivory dark:bg-charcoal/70 dark:text-marigold dark:hover:bg-charcoal md:-left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-ivory/80 p-2 text-maroon shadow-md backdrop-blur transition hover:bg-ivory dark:bg-charcoal/70 dark:text-marigold dark:hover:bg-charcoal md:-right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to review ${index + 1}`}
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
