import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, Landmark, MapPin, Users, ScrollText, BadgeCheck, UserRound, Building2 } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import SevaMark from "@/components/SevaMark";
import { ORG } from "@/lib/orgConfig";
import { aboutPageContent } from "@/lib/aboutContent";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <section id="overview" className="container-seva relative overflow-hidden py-16 md:py-20 scroll-mt-28">
        <Image
          src="/images/watermark-seal.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={432}
          className="pointer-events-none absolute -right-20 -top-16 -z-10 hidden h-[360px] w-[360px] opacity-[0.06] md:block"
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div className="max-w-3xl">
            <span className="eyebrow">{aboutPageContent.hero.eyebrow}</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
              {aboutPageContent.hero.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-sandalwood">
              {aboutPageContent.hero.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={aboutPageContent.hero.ctaPrimary.href} className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03]">
                {aboutPageContent.hero.ctaPrimary.label}
              </Link>
              <Link href={aboutPageContent.hero.ctaSecondary.href} className="rounded-full border border-maroon px-6 py-3 text-sm font-semibold text-maroon">
                {aboutPageContent.hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-maroon/10 bg-ivory-soft p-8">
            <div className="flex items-center gap-3">
              <SevaMark size={42} />
              <div>
                <p className="font-display text-2xl text-maroon">{ORG.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-sandalwood">Community welfare</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-5 w-5 text-marigold" />
                <span className="text-sm text-sandalwood">Care, dignity, and practical support</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-marigold" />
                <span className="text-sm text-sandalwood">Community-centered service</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-marigold" />
                <span className="text-sm text-sandalwood">Service geography to be verified and updated with documented locations.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.whoWeAre.title}</h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-sandalwood">
              {aboutPageContent.whoWeAre.body}
            </p>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-sandalwood">
              {aboutPageContent.whoWeAre.communityWork}
            </p>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-sandalwood">
              {aboutPageContent.whoWeAre.communities}
            </p>
          </div>
          <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
            <div className="grid gap-4">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/10 text-maroon"><HeartHandshake className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-lg text-maroon">Care Delivery</h3>
                  <p className="mt-1 text-sm text-sandalwood">Food, healthcare, education, relief and community support.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/10 text-maroon"><Users className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-lg text-maroon">Volunteer Ecosystem</h3>
                  <p className="mt-1 text-sm text-sandalwood">Local engagement and service participation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/10 text-maroon"><MapPin className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display text-lg text-maroon">Service Geography</h3>
                  <p className="mt-1 text-sm text-sandalwood">{aboutPageContent.areasWeServe.verifiedAreas}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="bg-ivory-soft py-16 md:py-20 scroll-mt-28">
        <div className="container-seva">
          <div className="max-w-3xl">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.story.title}</h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <div className="flex items-center gap-3">
                <ScrollText className="h-6 w-6 text-marigold" />
                <span className="font-display text-lg text-maroon">Foundation history</span>
              </div>
              <div className="mt-6 border-l border-maroon/20 pl-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sandalwood">Founding year</p>
                  <p className="mt-2 font-display text-xl text-maroon">{aboutPageContent.story.foundingYear}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sandalwood">Founding story</p>
                  <p className="mt-2 text-sm leading-relaxed text-sandalwood">{aboutPageContent.story.foundingStory}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8">
              <div className="flex items-center gap-3">
                <Landmark className="h-6 w-6 text-marigold" />
                <span className="font-display text-lg text-maroon">Major milestones</span>
              </div>
              <div className="mt-6 space-y-5">
                {aboutPageContent.story.milestones.map((milestone) => (
                  <div key={milestone.title} className="border-b border-maroon/10 pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-marigold">{milestone.year}</span>
                      <span className="font-display text-sm text-maroon">{milestone.title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-sandalwood">{milestone.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 md:grid-cols-2">
          <div id="vision" className="scroll-mt-28">
            <span className="eyebrow">Vision</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.vision.title}</h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-sandalwood">{aboutPageContent.vision.body}</p>
          </div>
          <div id="mission" className="scroll-mt-28">
            <span className="eyebrow">Mission</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.mission.title}</h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-sandalwood">{aboutPageContent.mission.body}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">Mission & Values</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">What guides our work</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPageContent.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-maroon/10 p-5 transition-shadow hover:shadow-[0_10px_24px_rgba(11,15,140,0.08)]">
                <h3 className="font-display text-base text-maroon">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sandalwood">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">Areas we serve</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.areasWeServe.title}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-sandalwood">
            {aboutPageContent.areasWeServe.body}
          </p>
          <div className="mt-6 rounded-2xl border border-maroon/10 p-5">
            <p className="font-display text-lg text-maroon">{aboutPageContent.areasWeServe.verifiedAreas}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">What makes us different</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">{aboutPageContent.differentiators.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-sandalwood">
            {aboutPageContent.differentiators.intro}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {aboutPageContent.differentiators.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-maroon/10 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/10 text-maroon">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-maroon">{item.title}</h3>
                <p className="mt-3 text-sm text-sandalwood">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-20">
        <div className="container-seva">
          <span className="eyebrow">Founder & Trustees</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">Leadership information</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-maroon/20 bg-white/70 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-maroon text-ivory font-display text-3xl">
                  <UserRound className="h-9 w-9" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-sandalwood">Founder</span>
                  <p className="font-display text-2xl text-maroon">{aboutPageContent.founder.name}</p>
                  <p className="text-sm font-semibold text-marigold">{aboutPageContent.founder.position}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-sandalwood">
                {aboutPageContent.founder.bio}
              </p>
              <div className="mt-6 rounded-xl border border-maroon/10 p-4">
                <p className="font-display text-base text-maroon">Founder message</p>
                <p className="mt-3 text-sm leading-relaxed text-sandalwood">
                  {aboutPageContent.founder.message}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutPageContent.trustees.map((trustee, idx) => (
                <div key={idx} className="rounded-[1.8rem] border border-maroon/10 bg-white/60 p-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-marigold/10 text-maroon">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div className="mt-5 text-center">
                    <p className="font-display text-lg text-maroon">{trustee.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sandalwood">{trustee.role}</p>
                    <p className="mt-4 text-xs leading-relaxed text-sandalwood">{trustee.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
