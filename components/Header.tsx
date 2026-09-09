"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-maroon/10 dark:border-marigold/10 bg-ivory/90 dark:bg-charcoal/90 backdrop-blur">
      <div className="container-seva flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo-full.png"
            alt="Sri Sai Swamy Seva Foundation"
            width={112}
            height={112}
            priority
            className="h-12 w-12 shrink-0"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-base text-maroon dark:text-ivory">Sri Sai Swamy Seva</span>
            <span className="mt-1 text-[10px] tracking-[0.2em] text-marigold-dark dark:text-marigold">FOUNDATION</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  active
                    ? "text-maroon dark:text-marigold font-semibold"
                    : "text-sandalwood dark:text-ivory-soft/80 hover:text-maroon dark:hover:text-marigold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/donate"
            className="rounded-full bg-maroon dark:bg-marigold px-5 py-2.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.03] hover:bg-maroon-light dark:hover:bg-marigold-light"
          >
            Donate
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-maroon/20 dark:border-marigold/30"
          >
            {open ? <X className="h-5 w-5 text-maroon dark:text-marigold" /> : <Menu className="h-5 w-5 text-maroon dark:text-marigold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-maroon/10 dark:border-marigold/10 bg-ivory dark:bg-charcoal">
          <nav className="container-seva flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm border-b border-maroon/5 dark:border-marigold/10 text-sandalwood dark:text-ivory-soft/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-maroon dark:bg-marigold px-5 py-3 text-center text-sm font-semibold text-ivory dark:text-charcoal"
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
