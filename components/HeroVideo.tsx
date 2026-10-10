"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [userRequestedPlayback, setUserRequestedPlayback] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setUserRequestedPlayback(false);
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (userPaused || (reducedMotion && !userRequestedPlayback)) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    void video.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }, [reducedMotion, userPaused, userRequestedPlayback]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserPaused(false);
      setUserRequestedPlayback(true);
    } else {
      setUserPaused(true);
      setUserRequestedPlayback(false);
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src="/edu.mp4"
        poster="/images/founder-with-mural.jpeg"
        loop
        muted
        playsInline
        aria-hidden="true"
        className="h-full w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        className="absolute bottom-3 right-3 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-white/50 bg-charcoal/75 px-3 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-charcoal focus-visible:outline-white"
      >
        {isPlaying ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
        <span>{isPlaying ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}
