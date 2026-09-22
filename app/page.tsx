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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-flame-glow opacity-60 pointer-events-none" />
        <Image
          src="/images/watermark-seal.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={432}
          className="pointer-events-none absolute -right-16 -top-16 -z-10 hidden h-[380px] w-[380px] opacity-[0.07] md:block lg:-right-10 lg:top-1/2 lg:h-[460px] lg:w-[460px] lg:-translate-y-1/2"
        />
        <div className="container-seva relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="animate-rise">
            <span className="eyebrow">NGO in Chintamani, Chikkaballapura · Since 2021</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-maroon md:text-5xl lg:text-[3.2rem]">
              Hope, dignity, and
              <br />
              <span className="italic text-marigold">brighter futures.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-sandalwood">
              Dr. N.R. Malluraja, known to the community as Sai Swamy, founded Sri Sai Swamy Seva Foundation in 2021 in Chintamani, Chikkaballapura district. He leads the foundation&apos;s grassroots-to-policy work across health, education, socio-economic empowerment, and community welfare.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/Srisai-Swamy-Seva-Foundation.pdf"
                download
                className="rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
              >
                📄 Download Foundation Profile
              </a>
              
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-[2rem] border border-marigold/30">
              <video
                src="/edu.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-ivory border border-marigold/30 px-5 py-4 shadow-xl">
              <SevaMark size={30} />
              <div>
                <p className="font-display text-lg text-maroon leading-none">SSSF Foundation</p>
                <p className="text-xs text-sandalwood mt-1">Srisai Swamy Seva Foundation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-maroon/40">
          <UnityDivider />
        </div>
      </section>

      <FounderStory />

      <section className="py-20 md:py-24">
        <div className="container-seva">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">OUR IMPACT</span>
            <h2 className="mt-4 font-display text-3xl text-maroon md:text-4xl">
              Service expressed through education, healthcare, food support and community development.
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-sandalwood">
              What has the Foundation actually been working on? The clearest answer is found in the program areas, images and documented activity records that show how services are being carried forward in real communities.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {IMPACT_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={index * 70}>
                <Link href={area.href} className="group block overflow-hidden rounded-[1.75rem] border border-maroon/10 bg-white/60 shadow-[0_12px_24px_rgba(92,57,19,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-[0_18px_32px_rgba(92,57,19,0.08)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={area.src}
                      alt={area.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl text-maroon">{area.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-sandalwood">{area.description}</p>
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
              className="rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.02]"
            >
              SEE OUR IMPACT
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="container-seva pb-16 md:pb-20">
        <div className="max-w-xl">
          <span className="eyebrow">A glimpse of our seva</span>
          <h2 className="mt-4 font-display text-3xl text-maroon md:text-4xl">
            Gallery
          </h2>
        </div>
        <div className="mt-8 -mx-6 md:mx-0">
          <PhotoCarousel slides={HOME_CAROUSEL_SLIDES} />
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      

      {/* Programs preview */}
      <section className="py-20">
        <div className="container-seva">
          <Reveal className="max-w-xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-maroon">
              Our seva, at a glance.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative overflow-hidden bg-maroon py-24">
        <div className="absolute inset-0 bg-flame-glow opacity-30" />
        <Reveal className="container-seva relative text-center">
          <SevaMark size={40} className="mx-auto" />
          <blockquote className="mt-6 mx-auto max-w-2xl font-display text-2xl md:text-3xl italic text-ivory leading-snug">
            &ldquo;Service, offered with love &mdash; that is our seva.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm tracking-widest uppercase text-marigold">Our founding belief</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-seva">
          <Reveal className="rounded-[2rem] border border-marigold/30 bg-ivory-soft px-8 py-14 text-center md:px-16">
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
                className="rounded-full border border-maroon px-7 py-3.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon/5"
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
