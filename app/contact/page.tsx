import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import ContactForm from "@/components/ContactForm";
import { ORG, ORG_CONTACT } from "@/lib/orgConfig";


export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            We&rsquo;d love to hear from you.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            Questions about a program, interested in volunteering, or want to partner with us? Reach out below and the team will respond with verified coordination details.
          </p>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon/10 p-7 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Visit us</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    {ORG_CONTACT.addressDisplay}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Call us</h3>
                  <p className="mt-1 text-sm text-sandalwood">{ORG_CONTACT.phoneDisplay}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Email us</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    {ORG_CONTACT.emailDisplay}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Office hours</h3>
                  <p className="mt-1 text-sm text-sandalwood">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-maroon/10">
              <iframe
                title="Sri Sai Swamy Seva Foundation location map"
                className="h-72 w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src={ORG.mapEmbedSrc}
              />
              <a
                href={ORG.mapLinkUrl}
                target="_blank"
                rel="noreferrer"
                className="block bg-ivory-soft px-4 py-3 text-center text-xs font-semibold text-maroon"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
