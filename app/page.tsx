import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, Stethoscope, GraduationCap, ShieldPlus, Users, ArrowRight, Flame } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import SevaMark from "@/components/SevaMark";
import ProgramCard from "@/components/ProgramCard";
import FounderStory from "@/components/FounderStory";
import PhotoCarousel from "@/components/PhotoCarousel";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import { foundationProgramPhotos } from "@/lib/foundationPhotos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

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

const IMPACT_AREAS = [
  {
    title: "Education",
    href: "/education",
    src: foundationProgramPhotos.education[0].src,
    alt: foundationProgramPhotos.education[0].alt,
    description: "School support, Free tutions, learning continuity and educational activity in community settings.",
  },
  {
    title: "Healthcare",
    href: "/healthcare",
    src: foundationProgramPhotos.healthcare[0].src,
    alt: foundationProgramPhotos.healthcare[0].alt,
    description: "Health camps and outreach activities that bring care to underserved communities.",
  },
  {
    title: "Annadanam",
    href: "/annadanam",
    src: foundationProgramPhotos.annadanam[0].src,
    alt: foundationProgramPhotos.annadanam[0].alt,
    description: "Food distribution and hunger relief support offered with practical community care.",
  },
  {
    title: "Child Welfare",
    href: "/child-welfare",
    src: foundationProgramPhotos.childWelfare[0].src,
    alt: foundationProgramPhotos.childWelfare[0].alt,
    description: "Child-focused support, awareness, and community care rooted in dignity and safety.",
  },
];

export default async function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute inset-0 bg-flame-glow opacity-45" />
        <Image
          src="/images/watermark-seal.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={432}
          className="pointer-events-none absolute -right-16 -top-16 z-0 hidden h-[380px] w-[380px] opacity-[0.07] md:block lg:-right-10 lg:top-1/2 lg:h-[460px] lg:w-[460px] lg:-translate-y-1/2"
        />
        <div className="container-seva relative z-10 grid items-center gap-8 py-8 sm:gap-10 sm:py-11 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-12 xl:gap-14 xl:py-14">
          <div className="animate-rise max-w-2xl lg:py-2">
            <span className="eyebrow">NGO in Chintamani, Chikkaballapura · Since 2021</span>
            <h1 className="hero-heading mt-5">
              Hope, dignity, and
              <span className="block italic text-marigold-dark">brighter futures.</span>
            </h1>
            <p className="mt-5 max-w-[38rem] text-[0.9375rem] leading-7 text-sandalwood sm:mt-6 sm:text-base sm:leading-7">
              Dr. N.R. Malluraja, known to the community as Sai Swamy, founded Sri Sai Swamy Seva Foundation in 2021 in Chintamani, Chikkaballapura district. He leads the foundation&apos;s grassroots-to-policy work across health, education, socio-economic empowerment, and community welfare.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/donate"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-maroon px-5 py-3 text-sm font-semibold text-ivory shadow-[0_10px_24px_rgba(16,42,67,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-maroon-light hover:shadow-[0_14px_30px_rgba(16,42,67,0.2)] sm:px-6"
              >
                Donate Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex min-h-11 items-center rounded-md px-5 py-3 text-sm font-semibold text-maroon transition-colors duration-200 hover:bg-maroon/5 sm:px-6"
              >
                Volunteer with us
              </Link>
            </div>
            <div className="mt-5">
              <a
                href="/Srisai-Swamy-Seva-Foundation.pdf"
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-sandalwood underline decoration-marigold/50 underline-offset-4 transition-colors hover:text-maroon"
              >
                📄 Download Foundation Profile
              </a>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(16,42,67,0.17)] sm:aspect-[4/3]">
              <HeroVideo />
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-[#0b1e30]/85 via-[#0b1e30]/50 to-transparent px-4 pb-4 pt-12 text-white sm:px-5 sm:pb-5">
              <SevaMark size={30} />
              <div>
                <p className="font-display text-base leading-none">SSSF Foundation</p>
                <p className="mt-1 text-[11px] text-white/75">Srisai Swamy Seva Foundation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-maroon/40">
          <UnityDivider />
        </div>
      </section>

      <div className="bg-gradient-to-b from-white via-ivory to-ivory-soft">
        <FounderStory />
      </div>

      <section className="section-band py-16 md:py-24">
        <div className="container-seva">
          <Reveal className="max-w-4xl">
            <span className="eyebrow">OUR IMPACT</span>
            <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight tracking-tight text-maroon md:text-4xl">
              Service expressed through education, healthcare, food support and community development.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-sandalwood md:text-base md:leading-8">
              What has the Foundation actually been working on? The clearest answer is found in the program areas, images and documented activity records that show how services are being carried forward in real communities.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {IMPACT_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={index * 70}>
                <Link href={area.href} className="group block overflow-hidden rounded-xl border border-maroon/10 bg-white/80 shadow-[0_10px_28px_rgba(23,47,64,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_18px_36px_rgba(23,47,64,0.12)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={area.src}
                      alt={area.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl text-maroon">{area.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-sandalwood">{area.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-maroon">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/impact"
              className="rounded-md bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory shadow-[0_8px_22px_rgba(16,42,67,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-maroon-light hover:shadow-[0_12px_28px_rgba(16,42,67,0.2)]"
            >
              SEE OUR IMPACT
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-maroon/10 bg-white/70 py-16 md:py-20">
      <Reveal className="container-seva">
        <div className="max-w-xl">
          <span className="eyebrow">A glimpse of our seva</span>
          <h2 className="mt-4 font-display text-3xl text-maroon md:text-4xl">
            Gallery
          </h2>
        </div>
        <div className="mt-8 -mx-4 sm:-mx-6 md:mx-0">
          <PhotoCarousel slides={HOME_CAROUSEL_SLIDES} />
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-md bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory shadow-[0_8px_22px_rgba(16,42,67,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-maroon-light hover:shadow-[0_12px_28px_rgba(16,42,67,0.2)]"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      </section>

      

      {/* Programs preview */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-seva">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-maroon">
              Our seva, at a glance.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <ProgramCard
              accent="sky"
              icon={Stethoscope}
              slug="healthcare"
              title="Rural Health Camps"
              description="Free diagnostic and treatment camps bringing doctors, medicines and screenings to villages with little access to care."
            />
            <ProgramCard
              accent="rust"
              icon={HeartHandshake}
              slug="annadanam"
              title="Annadanam & Food Relief"
              description="Weekly meal distribution and dry-ration drives for families facing hunger, plus emergency supplies during crises."
            />
            <ProgramCard
              accent="magenta"
              icon={GraduationCap}
              slug="education"
              title="Education support"
              description="School supplies, fee assistance and tuition support so no child's education ends for want of means."
            />
            <ProgramCard
              accent="leaf"
              icon={ShieldPlus}
              title="Disaster Relief"
              description="Rapid relief kits, shelter support and coordination with local authorities when floods, cyclones or crises strike."
            />
            <ProgramCard
              accent="magenta"
              icon={Users}
              slug="women-empowerment"
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
      <section className="relative isolate overflow-hidden bg-maroon py-20 md:py-24">
        <div className="absolute inset-0 bg-flame-glow opacity-25" />
        <Reveal className="container-seva relative text-center">
          <SevaMark size={40} className="mx-auto" />
          <blockquote className="mt-6 mx-auto max-w-2xl font-display text-2xl md:text-3xl italic text-ivory leading-snug">
            &ldquo;Service, offered with love &mdash; that is our seva.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm tracking-widest uppercase text-marigold">Our founding belief</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section-band border-t border-marigold/15 py-20 md:py-24">
        <div className="container-seva">
          <Reveal className="rounded-xl border border-marigold/35 bg-white px-6 py-12 text-center shadow-[0_18px_48px_rgba(23,47,64,0.07)] sm:px-8 md:px-16 md:py-14">
            <h2 className="font-display text-3xl md:text-4xl text-maroon">
              Join us in this offering.
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm md:text-base text-sandalwood">
              Whether through a donation, your time, or your skills — every
              act of seva sustains someone who needs it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/volunteer"
                className="rounded-md border border-maroon/25 px-7 py-3.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon/5"
              >
                Volunteer with us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
