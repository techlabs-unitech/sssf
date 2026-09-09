import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Sri Sai Swamy Seva Foundation — reach out to volunteer, partner, or ask about our programs.",
};

export default function ContactPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            We&rsquo;d love to hear from you.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Questions about a program, interested in volunteering, or want to
            partner with us? Reach out below.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Visit us</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Foundation Campus, Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Call us</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">+91 00000 00000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Email us</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    connect@srisaiswamysevafoundation.org
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Office hours</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-maroon/10 dark:border-marigold/15">
              <iframe
                title="Map"
                className="h-56 w-full grayscale contrast-125 dark:invert dark:hue-rotate-180"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.35%2C17.30%2C78.55%2C17.50&layer=mapnik"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
