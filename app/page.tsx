import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, Stethoscope, GraduationCap, ShieldPlus, Users, ArrowRight, Flame } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import SevaMark from "@/components/SevaMark";
import ImpactStat from "@/components/ImpactStat";
import ProgramCard from "@/components/ProgramCard";
import PhotoCarousel from "@/components/PhotoCarousel";
import Testimonials from "@/components/Testimonials";

// Reviews are read fresh from Supabase on every request so a newly-approved
// review shows up the next time someone loads the homepage.
export const revalidate = 0;

const HOME_CAROUSEL_SLIDES = [
  {
    src: "/images/WhatsApp-Image4.jpeg",
    alt: "Volunteers distributing food supplies",
    caption: "Annadanam drives reaching families across our communities",
  },
  {
    src: "/images/WhatsApp-Image3.jpeg",
    alt: "A doctor examining a patient at a health camp",
    caption: "Free health camps bringing care to underserved villages",
  },
  {
    src: "/images/WhatsApp-Image.jpeg",
    alt: "Children with school supplies",
    caption: "Education support so no child is left behind",
  },
  {
    src: "/images/WhatsApp-Image2.jpeg",
    alt: "Women in a vocational training session",
    caption: "Vocational training that builds lasting livelihoods",
  },
];

export default async function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-flame-glow opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="container-seva relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="animate-rise">
            <span className="eyebrow">Seva · Since our founding</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-maroon dark:text-ivory md:text-5xl lg:text-[3.2rem]">
              Hope, dignity, and
              <br />
              <span className="italic text-marigold">brighter futures.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
              Sri Sai Swamy Seva Foundation is a spiritual and charitable organization inspired by the teachings of Shirdi Sai Baba, dedicated to serving humanity through education, healthcare, social welfare, and spiritual guidance. Its mission is rooted in the principle “Maanava Sevaye Sadguru Seva” — service to humanity as service to the divine.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/Srisai-Swamy-Seva-Foundation.pdf"
                download
                className="rounded-full bg-maroon dark:bg-marigold px-7 py-3.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.03]"
              >
                📄 Download Foundation Profile
              </a>
              <Link
                href="/programs"
                className="group flex items-center gap-2 text-sm font-semibold text-maroon dark:text-marigold"
              >
                See our programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[2rem] border border-marigold/30">
              <video
                src="/edu.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-ivory dark:bg-charcoal-soft border border-marigold/30 px-5 py-4 shadow-xl">
              <SevaMark size={30} />
              <div>
                <p className="font-display text-lg text-maroon dark:text-marigold leading-none">Vidyādānam</p>
                <p className="text-xs text-sandalwood dark:text-ivory-soft/60 mt-1">Education support, every week</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-maroon/40 dark:text-marigold/30">
          <UnityDivider />
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-16 md:py-20">
        <div className="container-seva grid grid-cols-2 gap-y-10 md:grid-cols-4">
          <ImpactStat value="50,000+" label="Meals distributed" />
          <ImpactStat value="120+" label="Health camps held" />
          <ImpactStat value="3,000+" label="Children supported" />
          <ImpactStat value="15+" label="States reached" />
        </div>

        <div className="container-seva mt-14 md:mt-16">
          <div className="max-w-xl">
            <span className="eyebrow">A glimpse of our seva</span>
            <h2 className="mt-4 font-display text-3xl text-maroon dark:text-ivory md:text-4xl">
              Gallery
            </h2>
          </div>
          <div className="mt-8 -mx-6 md:mx-0">
            <PhotoCarousel slides={HOME_CAROUSEL_SLIDES} />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-ivory-soft dark:bg-charcoal-soft py-20">
        <div className="container-seva grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <Image
              src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1200&auto=format&fit=crop"
              alt="A community health camp underway"
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">Our mission</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-maroon dark:text-ivory leading-tight">
              Rooted in devotion, working toward dignity.
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
              Building a sustainable society where in all the 
resources are shared, amenities are accessible, 
opportunities are opened for all different strata of 
the society and people live with dignity and respect. 
We strongly believe that the participatory method is 
the base for sustainable development.
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
              Every program sits alongside our spiritual activities — satsang,
              bhajans and community pujas — because for us, worship and welfare
              have never been separate acts.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-maroon dark:text-marigold"
            >
              Read our story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="py-20">
        <div className="container-seva">
          <div className="max-w-xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-maroon dark:text-ivory">
              Seva, in five parts.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              accent="sky"
              icon={Stethoscope}
              title="Rural Education"
              description="Free diagnostic and treatment camps bringing doctors, medicines and screenings to villages with little access to care."
            />
            <ProgramCard
              accent="rust"
              icon={HeartHandshake}
              title="Rural Health services"
              description="Weekly meal distribution and dry-ration drives for families facing hunger, plus emergency supplies during crises."
            />
            <ProgramCard
              accent="magenta"
              icon={GraduationCap}
              title="Education support"
              description="School supplies, fee assistance and tuition support so no child's education ends for want of means."
            />
            <ProgramCard
              accent="leaf"
              icon={ShieldPlus}
              title="Feeding Hunger"
              description="Rapid relief kits, shelter support and coordination with local authorities when floods, cyclones or crises strike."
            />
            <ProgramCard
              accent="magenta"
              icon={Users}
              title="Women & children"
              description="Vocational training and support programs that help women build sustainable livelihoods for their families."
            />
            <ProgramCard
              accent="sky"
              icon={Flame}
              title="Spiritual seva"
              description="Satsang, bhajans and community pujas that keep devotion at the centre of everything we build."
            />
          </div>
        </div>
      </section>

      {/* Testimonials — approved reviews from friends & wellwishers */}
      <Testimonials />

      {/* Quote */}
      <section className="relative py-24 bg-maroon dark:bg-charcoal-soft overflow-hidden">
        <div className="absolute inset-0 bg-flame-glow opacity-30" />
        <div className="container-seva relative text-center">
          <SevaMark size={40} className="mx-auto" />
          <blockquote className="mt-6 mx-auto max-w-2xl font-display text-2xl md:text-3xl italic text-ivory leading-snug">
            &ldquo;Service, offered with love &mdash; that is our seva.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm tracking-widest uppercase text-marigold">Our founding belief</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-seva">
          <div className="rounded-[2rem] border border-marigold/30 bg-ivory-soft dark:bg-charcoal-soft px-8 py-14 text-center md:px-16">
            <h2 className="font-display text-3xl md:text-4xl text-maroon dark:text-ivory">
              Join us in this offering.
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm md:text-base text-sandalwood dark:text-ivory-soft/70">
              Whether through a donation, your time, or your skills — every
              act of seva sustains someone who needs it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/donate"
                className="rounded-full bg-maroon dark:bg-marigold px-7 py-3.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.03]"
              >
                Donate now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-maroon dark:border-marigold px-7 py-3.5 text-sm font-semibold text-maroon dark:text-marigold transition-colors hover:bg-maroon/5 dark:hover:bg-marigold/10"
              >
                Volunteer with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
