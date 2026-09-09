"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

export default function FloatingDonateButton() {
  const pathname = usePathname();

  // No need to float the button on top of the donate form itself.
  if (pathname === "/donate") return null;

  return (
    <Link
      href="/donate"
      aria-label="Donate now"
      className="group fixed bottom-6 right-5 z-[60] flex items-center gap-2 rounded-full bg-maroon dark:bg-marigold pl-4 pr-5 py-3.5 text-sm font-semibold text-ivory dark:text-charcoal shadow-lg shadow-maroon/30 dark:shadow-black/40 transition-transform hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
    >
      <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
      <span>Donate</span>
    </Link>
  );
}
