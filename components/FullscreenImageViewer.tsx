"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type FullscreenImageViewerProps = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  className?: string;
};

export default function FullscreenImageViewer({
  src,
  alt,
  caption,
  sizes = "90vw",
  className = "",
}: FullscreenImageViewerProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const viewerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  function clearHoverTimer() {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openViewer() {
    clearHoverTimer();
    clearCloseTimer();
    setClosing(false);
    window.dispatchEvent(new CustomEvent("foundation-image-viewer-open", { detail: viewerId }));
    setOpen(true);
  }

  const closeViewer = useCallback(() => {
    clearCloseTimer();
    setClosing(false);
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  function scheduleClose() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    clearCloseTimer();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setClosing(false);
      setOpen(false);
    }, reduceMotion ? 0 : 220);
  }

  function handleMouseEnter() {
    if (
      !document.querySelector('[role="dialog"]') &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      clearHoverTimer();
      hoverTimerRef.current = window.setTimeout(openViewer, 220);
    }
  }

  useEffect(() => {
    function handleOtherViewer() {
      setOpen(false);
    }

    function handleViewerOpen(event: Event) {
      if ((event as CustomEvent<string>).detail !== viewerId) handleOtherViewer();
    }

    window.addEventListener("foundation-image-viewer-open", handleViewerOpen);
    return () => window.removeEventListener("foundation-image-viewer-open", handleViewerOpen);
  }, [viewerId]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeViewer();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      clearHoverTimer();
      clearCloseTimer();
    };
  }, [open, closeViewer]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    clearHoverTimer();
    clearCloseTimer();
    return () => {
      clearHoverTimer();
      clearCloseTimer();
    };
  }, []);

  const overlayVisible = mounted && (open || closing);
  const overlayTransitionClass = closing
    ? "opacity-0 scale-[0.985]"
    : "opacity-100 scale-100";
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`View larger image: ${alt}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={clearHoverTimer}
        onClick={openViewer}
        className={`group relative block h-full w-full cursor-zoom-in overflow-hidden text-left ${className}`}
      >
        <span className="relative block h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </span>
      </button>

      {overlayVisible
        ? createPortal(
            <div
              className={`fixed inset-0 z-[1000] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm transition-all duration-300 ease-out md:p-8 ${overlayTransitionClass} ${reduceMotion ? "duration-0" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={`Image viewer: ${alt}`}
              onPointerEnter={() => {
                clearCloseTimer();
                setClosing(false);
              }}
              onPointerLeave={() => {
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  scheduleClose();
                }
              }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeViewer();
              }}
            >
              <div className="relative z-10 flex max-h-[90vh] max-w-[92vw] flex-col items-center justify-center">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeViewer}
                  aria-label="Close image viewer"
                  className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/80 text-ivory shadow-lg transition-colors hover:border-marigold hover:text-marigold md:-right-4 md:-top-4"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-xl border border-ivory/15 bg-charcoal/25 shadow-2xl">
                  <Image
                    src={src}
                    alt={alt}
                    width={1600}
                    height={1200}
                    sizes="90vw"
                    priority
                    className="max-h-[85vh] w-auto max-w-[90vw] object-contain"
                  />
                </div>

                {caption && (
                  <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-ivory/85">{caption}</p>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}