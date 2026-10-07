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
    <header className="sticky top-0 z-50 border-b border-maroon/10 bg-ivory/95 shadow-[0_1px_0_rgba(11,15,140,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-24 w-full max-w-[1600px] items-center justify-between px-6 md:px-10 xl:px-14">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo-full.png"
            alt="Sri Sai Swamy Seva Foundation"
            width={112}
            height={112}
            priority
            className="h-14 w-14 shrink-0"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg text-maroon">Sri Sai Swamy Seva</span>
            <span className="mt-1 text-[11px] tracking-[0.2em] text-marigold-dark">FOUNDATION</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 ml-auto lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.dropdown && link.dropdown.some((d) => pathname === d.href.split("#")[0]));
            const isDropdownOpen = desktopDropdown === link.href;
            return (
              <div
                key={link.href}
                className="relative shrink-0"
                onMouseEnter={() => link.dropdown && openDropdown(link.href)}
                onMouseLeave={() => link.dropdown && scheduleClose()}
              >
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 whitespace-nowrap py-2 text-[15px] font-medium tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-marigold after:transition-transform hover:after:scale-x-100 ${
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
                    className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      isDropdownOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-maroon/10 bg-ivory shadow-[0_18px_38px_rgba(11,15,140,0.12)]">
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

        <div className="hidden lg:flex items-center shrink-0 pl-8">
          <Link
            href="/donate"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
          >
            <Heart className="h-4 w-4" strokeWidth={2} /> Donate Now
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/donate"
            className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-ivory"
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={2} /> Donate
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/20"
          >
            {open ? <X className="h-5 w-5 text-maroon" /> : <Menu className="h-5 w-5 text-maroon" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu lg:hidden ${open ? "mobile-menu-open" : ""}`}>
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
