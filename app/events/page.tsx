import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CalendarDays, MapPin, FileText } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import FoundationPhotoGrid from "@/components/FoundationPhotoGrid";
import PendingContentState from "@/components/PendingContentState";
import { eventEmptyStates, pastEventsContent, eventCategoryLabels } from "@/lib/eventsContent";
import { foundationProgramPhotos } from "@/lib/foundationPhotos";

export const metadata: Metadata = pageMetadata("/events");

export default function EventsPage() {
  const past = pastEventsContent;

  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Events</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Community Events &amp; Seva Activities
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            A record of the seva events, camps and community gatherings the foundation has carried out, along with photos from the field.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/volunteer" className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory">Volunteer</Link>
            <Link href="/contact" className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">Contact the Foundation</Link>
          </div>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <FoundationPhotoGrid title="Community activity" photos={foundationProgramPhotos.events} />

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl text-maroon">Past Events</h2>
            <Link href="/programs" className="text-sm font-semibold text-maroon">Explore programs →</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {past.length === 0 ? (
              <div className="sm:col-span-3">
                <PendingContentState
                  icon={CalendarDays}
                  title="Past Events"
                  description={eventEmptyStates.past}
                  status="Records being compiled"
                  ctaLabel="Explore programs"
                  ctaHref="/programs"
                />
              </div>
            ) : (
              past.map((event) => (
                <article key={event.id} className="rounded-2xl border border-maroon/10 p-6">
                  <p className="text-xs tracking-wide uppercase text-marigold-dark">{event.date}</p>
                  <h3 className="mt-2 font-display text-base text-maroon">{event.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-sandalwood">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location || "Location pending"}
                  </p>
                  {event.category ? <span className="mt-4 inline-block rounded-full border border-maroon/10 px-3 py-1 text-[11px] uppercase tracking-wide text-sandalwood">{eventCategoryLabels[event.category]}</span> : null}
                  {event.galleryPhotos && event.galleryPhotos.length > 0 ? <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-maroon/10 px-3 py-1 text-[11px] uppercase tracking-wide text-sandalwood"><FileText className="h-3 w-3" /> Photos available</span> : null}
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
            <span className="eyebrow">Community engagement</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">Programs, events and volunteering together</h2>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              Community participation may include food distribution, medical camps, educational activities, school development, disaster relief, women empowerment, child welfare and spiritual/community seva. Participation is coordinated through verified foundation programs and activity updates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/volunteer" className="rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon">
                Volunteer with us
              </Link>
              <Link href="/programs" className="rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon">
                Explore programs
              </Link>
              <Link href="/gallery" className="rounded-full border border-maroon px-5 py-3 text-sm font-semibold text-maroon">
                Event gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
