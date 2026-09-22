import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import UnityDivider from "./UnityDivider";
import { ORG } from "@/lib/orgConfig";



export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon text-ivory/90 pt-2">
      <Image
        src="/images/watermark-seal.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={432}
        className="pointer-events-none absolute -right-20 -top-10 -z-10 hidden h-[420px] w-[420px] opacity-[0.05] md:block"
      />
      <div className="text-marigold/60">
        <UnityDivider />
      </div>

      <div className="container-seva grid gap-10 py-14 md:grid-cols-4">
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
              Sri Sai Swamy Seva Foundation
            </span>
          </div>

          <p className="mt-4 text-sm font-medium tracking-wide text-marigold">
            Hope, Dignity, and Brighter Futures.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-ivory/70">
            Bringing food, healthcare, education and disaster relief to
            families across India — service offered with love.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href={ORG.facebook}
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Facebook className="h-4 w-4" />
            </a>

            <a
              href={ORG.instagram}
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href={ORG.linkedin}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-marigold hover:text-marigold"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow !text-marigold">Explore</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="footer-link transition-colors hover:text-marigold">
                About us
              </Link>
            </li>
            <li>
              <Link href="/programs" className="footer-link transition-colors hover:text-marigold">
                Our Programs
              </Link>
            </li>
            <li>
              <Link href="/impact" className="footer-link transition-colors hover:text-marigold">
                Impact
              </Link>
            </li>
            <li>
              <Link href="/stories" className="footer-link transition-colors hover:text-marigold">
                Beneficiary Stories
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="footer-link transition-colors hover:text-marigold">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="footer-link transition-colors hover:text-marigold">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/events" className="footer-link transition-colors hover:text-marigold">
                Events
              </Link>
            </li>
            <li>
              <Link href="/transparency" className="footer-link transition-colors hover:text-marigold">
                Transparency
              </Link>
            </li>
            <li>
              <Link href="/financial-transparency" className="footer-link transition-colors hover:text-marigold">
                Financial Transparency
              </Link>
            </li>
            <li>
              <Link href="/legal" className="footer-link transition-colors hover:text-marigold">
                Legal & Compliance
              </Link>
            </li>
            <li>
              <Link href="/awards" className="footer-link transition-colors hover:text-marigold">
                Awards & Recognition
              </Link>
            </li>
            <li>
              <Link href="/annual-reports" className="footer-link transition-colors hover:text-marigold">
                Annual Reports
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow !text-marigold">Involved</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/donate" className="footer-link transition-colors hover:text-marigold">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="footer-link transition-colors hover:text-marigold">
                Volunteer with us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link transition-colors hover:text-marigold">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/legal" className="footer-link transition-colors hover:text-marigold">
                Legal & Compliance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow !text-marigold">Reach us</h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
              <span>{ORG.addressLine}</span>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-marigold" />
              <a href={`tel:${ORG.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-marigold">
                {ORG.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-marigold" />
              <a href={`mailto:${ORG.email}`} className="break-all transition-colors hover:text-marigold">
                {ORG.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10 bg-charcoal/20">
        <div className="container-seva py-10">
          <h3 className="eyebrow !text-marigold">Find us</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-ivory/15">
            <iframe
              title="Sri Sai Swamy Seva Foundation location map"
              src={ORG.mapEmbedSrc}
              className="h-64 w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-seva flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/50 md:flex-row">
          <p className="text-center md:text-left">
            All rights reserved © {new Date().getFullYear()} Sri Sai Swamy Seva Foundation. Powered by{" "}
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
            Registration, compliance, and related documentation status is shown on the legal page.
          </p>
        </div>
      </div>
    </footer>
  );
}
