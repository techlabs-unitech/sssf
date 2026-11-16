import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import FounderPortrait, { PortraitCornerAccents } from "./FounderPortrait";
import { aboutPageContent } from "@/lib/aboutContent";

export default function FounderStory() {
  const { founder } = aboutPageContent;

  return (
    <section className="py-20 md:py-24">
      <div className="container-seva">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">From the founder&rsquo;s desk</span>
          <h2 className="mt-4 font-display text-3xl text-maroon md:text-4xl">
            Founder&rsquo;s Message
          </h2>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-maroon/10 shadow-[0_20px_45px_rgba(11,15,140,0.08)] md:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative flex items-center justify-center overflow-hidden bg-ivory-soft px-10 py-16 md:min-h-[400px] md:py-12">
            <PortraitCornerAccents />
            <FounderPortrait
              src={founder.photo}
              alt={founder.name}
              className="w-full max-w-[280px] md:max-w-[320px]"
              priority
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col justify-center bg-maroon px-8 py-12 md:px-12 md:py-14">
            <Quote className="h-9 w-9 text-marigold/70" strokeWidth={1.5} />
            <blockquote className="mt-5 text-sm leading-relaxed text-ivory/90 md:text-base">
              &ldquo;{founder.message.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < founder.message.split('\n').length - 1 && <br />}
                </span>
              ))}&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-display text-lg text-marigold">{founder.name}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-ivory/60">{founder.position}</p>
            </div>
            <Link
              href="/about#story"
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-marigold transition-transform hover:translate-x-0.5"
            >
              Read our full story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
