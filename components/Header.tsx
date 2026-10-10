"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Download, Heart } from "lucide-react";

type DropdownLink = { href: string; label: string };

type NavItem = {
  href: string;
  label: string;
  dropdown?: DropdownLink[];
};

const ABOUT_DROPDOWN: DropdownLink[] = [
  { href: "/about#overview", label: "Overview" },
  { href: "/about#story", label: "Our Story" },
  { href: "/about#vision", label: "Vision" },
  { href: "/about#mission", label: "Mission & Values" },
];

const OUR_PROGRAMS_DROPDOWN: DropdownLink[] = [
  { href: "/education", label: "Education" },
  { href: "/healthcare", label: "Health" },
  { href: "/rural-development", label: "Rural Development" },
  { href: "/women-empowerment", label: "Women Empowerment" },
  { href: "/environment-protection", label: "Environment Protection" },
  { href: "/disability-elderly-care", label: "Disability & Elderly Care" },
];

const NAV_LINKS: NavItem[] = [
  { href: "/about", label: "About", dropdown: ABOUT_DROPDOWN },
  { href: "/programs", label: "Our Programs", dropdown: OUR_PROGRAMS_DROPDOWN },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/awards", label: "Awards & Recognition" },
  { href: "/annual-reports", label: "Annual Reports" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMobileSubOpen(null);
  }, [pathname]);

  const openDropdown = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdown(href);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopDropdown(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-maroon/10 bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1600px] items-center justify-between px-4 sm:h-[4.75rem] sm:px-6 lg:px-8 xl:px-10">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo-full.png"
            alt="Sri Sai Swamy Seva Foundation"
            width={112}
            height={112}
            priority
            className="h-12 w-12 shrink-0 sm:h-[3.25rem] sm:w-[3.25rem]"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-base text-maroon lg:text-[1.05rem]">Sri Sai Swamy Seva</span>
            <span className="mt-1 text-[10px] tracking-[0.19em] text-marigold-dark">FOUNDATION</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 xl:flex 2xl:gap-3">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.dropdown && link.dropdown.some((d) => pathname === d.href.split("#")[0]));
            const isDropdownOpen = desktopDropdown === link.href;
            return (
              <div
                key={link.href}
                className="relative shrink-0"
                onMouseEnter={() => link.dropdown && openDropdown(link.href)}
                onMouseLeave={() => link.dropdown && scheduleClose()}
                onFocus={() => link.dropdown && openDropdown(link.href)}
                onBlur={(event) => {
                  if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
                    scheduleClose();
                  }
                }}
              >
                <Link
                  href={link.href}
                  aria-expanded={link.dropdown ? isDropdownOpen : undefined}
                  aria-controls={link.dropdown ? `nav-dropdown-${link.href.slice(1)}` : undefined}
                  className={`relative flex items-center gap-1 whitespace-nowrap py-2 text-[11px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-marigold after:transition-transform hover:after:scale-x-100 2xl:text-xs ${
                    active
                      ? "font-semibold text-maroon after:scale-x-100"
                      : "text-sandalwood hover:text-maroon"
                  }`}
                >
                  {link.label}
                  {link.dropdown ? (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  ) : null}
                </Link>

                {link.dropdown ? (
                  <div
                    id={`nav-dropdown-${link.href.slice(1)}`}
                    className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      isDropdownOpen ? "visible pointer-events-auto opacity-100 translate-y-0" : "invisible pointer-events-none opacity-0 -translate-y-1"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-maroon/10 bg-ivory shadow-[0_18px_38px_rgba(23,47,64,0.14)]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-5 py-3 text-sm font-medium text-sandalwood transition-colors hover:bg-marigold/10 hover:text-maroon"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden shrink-0 pl-3 xl:flex">
          <Link
            href="/donate"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-maroon px-3 py-2.5 text-xs font-semibold text-ivory transition-colors hover:bg-maroon-light 2xl:gap-2 2xl:px-4 2xl:text-sm"
          >
            <Heart className="h-4 w-4" strokeWidth={2} /> Donate Now
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/donate"
            className="flex items-center gap-1.5 rounded-md bg-maroon px-3.5 py-2 text-xs font-semibold text-ivory"
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={2} /> Donate
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-maroon/20 bg-white/70"
          >
            {open ? <X className="h-5 w-5 text-maroon" /> : <Menu className="h-5 w-5 text-maroon" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu xl:hidden ${open ? "mobile-menu-open" : ""}`}>
        <nav className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4 md:px-10">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="border-b border-maroon/5">
              <div className="flex items-center justify-between">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 text-base font-medium text-sandalwood"
                >
                  {link.label}
                </Link>
                {link.dropdown ? (
                  <button
                    type="button"
                    aria-label={`Toggle ${link.label} submenu`}
                    onClick={() => setMobileSubOpen((v) => (v === link.href ? null : link.href))}
                    className="p-3 text-maroon"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileSubOpen === link.href ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : null}
              </div>
              {link.dropdown && mobileSubOpen === link.href ? (
                <div className="flex flex-col pb-3 pl-4">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-sandalwood/90"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <a
            href="/reports/SSSF-Annual-Report-2025-26.pdf"
            download
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-maroon px-5 py-3 text-center text-sm font-semibold text-maroon"
          >
            <Download className="h-4 w-4" /> Download Annual Report
          </a>
        </nav>
      </div>
    </header>
  );
}
