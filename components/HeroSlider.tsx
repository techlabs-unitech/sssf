"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SevaMark from "./SevaMark";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  /** Second line of the heading, shown in italic sky blue. */
  highlight?: string;
  body: string;
  cta?: { label: string; href: string; download?: boolean };
  media: { type: "video"; src: string } | { type: "image"; src: string; alt: string };
  /** Show the "SSSF Foundation" badge on the media frame. */
  badge?: boolean;
};

type Props = {
  slides: HeroSlide[];
  autoPlayMs?: number;
};

const SWIPE_THRESHOLD = 60; // px of drag needed to change slide

export default function HeroSlider({ slides, autoPlayMs = 6500 }: Props) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);
  const goTo = useCallback((i: number) => setActive(wrap(i)), [wrap]);
  // Functional updates so rapid clicks/swipes each move one slide.
  const next = useCallback(() => setActive((a) => wrap(a + 1)), [wrap]);
  const prev = useCallback(() => setActive((a) => wrap(a - 1)), [wrap]);

  // Respect "reduce motion": no autoplay, no slide animation.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Autoplay — paused on hover, focus, drag, hidden tab, or reduced motion.
  useEffect(() => {
    if (count <= 1 || paused || dragging || reducedMotion) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % count);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [count, paused, dragging, reducedMotion, autoPlayMs, active]);

  // Keep off-screen slides out of the tab order and away from screen readers.
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    });
  }, [active]);

  // ---- drag / swipe (mouse, touch and pen) ----
  const onPointerDown = (e: React.PointerEvent) => {
    if (count <= 1 || (e.pointerType === "mouse" && e.button !== 0)) return;
    startX.current = e.clientX;
    moved.current = false;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (!moved.current && Math.abs(dx) > 6) {
      moved.current = true;
      viewportRef.current?.setPointerCapture(e.pointerId);
    }
    if (moved.current) setDragX(dx);
  };

  const endDrag = () => {
    if (startX.current === null) return;
    if (dragX <= -SWIPE_THRESHOLD) next();
    else if (dragX >= SWIPE_THRESHOLD) prev();
    startX.current = null;
    setDragX(0);
    setDragging(false);
  };

  // A drag shouldn't also count as a click on a link/button inside the slide.
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const width = viewportRef.current?.offsetWidth || 1;
  const offsetPct = -active * 100 + (dragX / width) * 100;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div
        ref={viewportRef}
        className={`overflow-hidden select-none touch-pan-y ${count > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => dragging && endDrag()}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(${offsetPct}%, 0, 0)`,
            transition: dragging || reducedMotion ? "none" : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((slide, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                className="w-full shrink-0"
              >
                <div className="container-seva grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
                  {/* text */}
                  <div
                    className={`transition-all duration-700 ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    } ${reducedMotion ? "!transition-none" : ""}`}
                  >
                    <span className="eyebrow">{slide.eyebrow}</span>
                    <Heading className="mt-4 font-display text-4xl leading-[1.1] text-maroon md:text-5xl lg:text-[3.2rem]">
                      {slide.title}
                      {slide.highlight && (
                        <>
                          <br />
                          <span className="italic text-marigold">{slide.highlight}</span>
                        </>
                      )}
                    </Heading>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-sandalwood">{slide.body}</p>
                    {slide.cta && (
                      <div className="mt-9">
                        {slide.cta.download ? (
                          <a
                            href={slide.cta.href}
                            download
                            className="inline-flex rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
                          >
                            {slide.cta.label}
                          </a>
                        ) : (
                          <Link
                            href={slide.cta.href}
                            className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
                          >
                            {slide.cta.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* media */}
                  <div className="relative">
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-marigold/30 bg-ivory-soft shadow-[0_20px_45px_rgba(11,15,140,0.10)] lg:max-w-[26rem]">
                      {slide.media.type === "video" ? (
                        <video
                          src={slide.media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={slide.media.src}
                          alt={slide.media.alt}
                          fill
                          sizes="(max-width: 1024px) 90vw, 420px"
                          className="object-cover"
                          draggable={false}
                          priority={i <= 1}
                          loading={i <= 1 ? undefined : "eager"}
                        />
                      )}
                    </div>
                    {slide.badge && (
                      <div className="absolute -bottom-6 left-0 hidden items-center gap-3 rounded-2xl border border-marigold/30 bg-ivory px-5 py-4 shadow-xl md:flex lg:-left-2">
                        <SevaMark size={30} />
                        <div>
                          <p className="font-display text-lg leading-none text-maroon">SSSF Foundation</p>
                          <p className="mt-1 text-xs text-sandalwood">Srisai Swamy Seva Foundation</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          {/* arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-maroon/15 bg-ivory/90 text-maroon shadow-md backdrop-blur transition hover:bg-maroon hover:text-ivory md:flex xl:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-maroon/15 bg-ivory/90 text-maroon shadow-md backdrop-blur transition hover:bg-maroon hover:text-ivory md:flex xl:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-marigold" : "w-2 bg-maroon/25 hover:bg-maroon/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
