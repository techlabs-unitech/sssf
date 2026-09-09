import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import UnityDivider from "./UnityDivider";

export default function Footer() {
  return (
    <footer className="bg-maroon dark:bg-charcoal-soft text-ivory/90 dark:text-ivory-soft/80 pt-2">
      <div className="text-marigold/60 dark:text-marigold/40">
        <UnityDivider />
      </div>

      <div className="container-seva grid gap-10 py-14 md:grid-cols-4">
        {/* Foundation */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-full.png"
              alt="Sri Sai Swamy Seva Foundation"
              width={80}
              height={80}
              className="h-10 w-10 shrink-0"
            />

            <span className="font-display text-lg text-ivory">
              SriSai Swamy Seva Foundation
            </span>
          </div>

          <p className="mt-4 text-sm font-medium tracking-wide text-marigold">
            Hope, Dignity, and Brighter Futures.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-ivory/70 dark:text-ivory-soft/60">
            Bringing food, healthcare, education and disaster relief to
            families across India — service offered with love.
          </p>

          {/* Social Media */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/people/Srisai-swamy-seva-foundation/61594044470080"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Facebook className="h-4 w-4" />
            </a>

            <a
              href="https://www.instagram.com/sssf_foundation?igsi=ZGltdmd4bHYzM2Nr"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href="https://x.com/SevaSwamy"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="eyebrow !text-marigold">Explore</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-marigold"
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                href="/programs"
                className="transition-colors hover:text-marigold"
              >
                Our programs
              </Link>
            </li>

            <li>
              <Link
                href="/gallery"
                className="transition-colors hover:text-marigold"
              >
                Gallery
              </Link>
            </li>

            <li>
              <Link
                href="/events"
                className="transition-colors hover:text-marigold"
              >
                Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h3 className="eyebrow !text-marigold">Involved</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href="/donate"
                className="transition-colors hover:text-marigold"
              >
                Donate
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-marigold"
              >
                Volunteer with us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-marigold"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <h3 className="eyebrow !text-marigold">Reach us</h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
              <span>Kolar, Chikkaballapur, India</span>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-marigold" />
              <a
                href="tel:+919945216711"
                className="transition-colors hover:text-marigold"
              >
                +91 99452 16711
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-marigold" />
              <a
                href="mailto:contact@srisaiswamysevafoundation.com"
                className="break-all transition-colors hover:text-marigold"
              >
                contact@srisaiswamysevafoundation.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-seva flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/50 md:flex-row">
          <p className="text-center md:text-left">
            All rights reserved © {new Date().getFullYear()} Sri Sai Swamy
            Seva Foundation. Powered by{" "}
            <a
              href="https://unitechlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/70 transition-colors hover:text-marigold"
            >
              Unitechlabs
            </a>
            .
          </p>

          <p className="text-center">
            Approved by Ministry of Corporate Affairs · India
          </p>
        </div>
      </div>
    </footer>
  );
}
