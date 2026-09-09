import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming health camps, food drives and community gatherings hosted by Sri Sai Swamy Seva Foundation.",
};

const UPCOMING = [
  {
    date: "12 Sep 2026",
    title: "Free Health & Eye Camp",
    location: "Community Hall, Nizamabad",
    description: "General health checkups, eye screening and free medicine distribution for all ages.",
  },
  {
    date: "28 Sep 2026",
    title: "Annadanam Drive",
    location: "Multiple sites, Hyderabad",
    description: "Weekly hot-meal distribution expanding to three new neighborhoods this month.",
  },
  {
    date: "10 Oct 2026",
    title: "Back-to-School Supply Drive",
    location: "Govt. Primary School, Warangal",
    description: "Distributing uniforms, books and school bags to 200 children ahead of the new term.",
  },
];

const PAST = [
  { date: "Aug 2026", title: "Women's Vocational Training Workshop", location: "Secunderabad" },
  { date: "Jul 2026", title: "Flood Relief Kit Distribution", location: "Godavari District" },
  { date: "May 2026", title: "Community Satsang & Bhajan Evening", location: "Foundation Campus" },
];

export default function EventsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Events</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            Where we&rsquo;ll be next.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Join a camp, a drive, or a gathering — every event welcomes both
            volunteers and visitors.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      {/* Upcoming */}
      <section className="py-16 md:py-20">
        <div className="container-seva">
          <h2 className="font-display text-2xl text-maroon dark:text-ivory">Upcoming events</h2>
          <div className="mt-8 divide-y divide-maroon/10 dark:divide-marigold/10 border-t border-b border-maroon/10 dark:border-marigold/10">
            {UPCOMING.map((event) => (
              <div key={event.title} className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-marigold/15 px-3.5 py-2 text-maroon dark:text-marigold shrink-0">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wide uppercase text-marigold-dark dark:text-marigold">{event.date}</p>
                    <h3 className="mt-1 font-display text-lg text-maroon dark:text-ivory">{event.title}</h3>
                    <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-sandalwood dark:text-ivory-soft/60 md:pl-4">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      <section className="bg-ivory-soft dark:bg-charcoal-soft py-16 md:py-20">
        <div className="container-seva">
          <h2 className="font-display text-2xl text-maroon dark:text-ivory">Recent events</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {PAST.map((event) => (
              <div key={event.title} className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-6">
                <p className="text-xs tracking-wide uppercase text-marigold-dark dark:text-marigold">{event.date}</p>
                <h3 className="mt-2 font-display text-base text-maroon dark:text-ivory">{event.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-sandalwood dark:text-ivory-soft/60">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
