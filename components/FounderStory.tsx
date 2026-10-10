import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { aboutPageContent } from "@/lib/aboutContent";

export default function FounderStory() {
  const { founder } = aboutPageContent;

  return (
    <section className="py-16 md:py-20">
      <div className="container-seva">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">From the founder&rsquo;s desk</span>
          <h2 className="mt-4 font-display text-3xl text-maroon md:text-4xl">
            Founder&rsquo;s Message
          </h2>
        </Reveal>

        <div className="mt-8 grid overflow-hidden rounded-xl border border-maroon/10 bg-white shadow-[0_20px_45px_rgba(23,47,64,0.08)] sm:mt-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-ivory md:aspect-auto md:min-h-[480px] md:mx-0 md:max-w-none">
            <Image
              src={founder.photo}
              alt={founder.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain object-center"
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col justify-center border-t border-marigold/25 bg-maroon px-5 py-8 sm:px-8 sm:py-10 md:border-l md:border-t-0 md:px-10 md:py-12 lg:px-12">
            <Quote className="h-9 w-9 text-marigold-light" strokeWidth={1.5} />
            <blockquote className="mt-4 font-display text-base italic leading-7 text-ivory sm:mt-5 sm:text-lg sm:leading-8">
              &ldquo;
              <span className="block">Tend to your Thoughts, for they ripen into Words.</span>
              <span className="block">Tend to your Words, for they take root as Actions.</span>
              <span className="block">Tend to your Actions, for they settle into Habits.</span>
              <span className="block">Tend to your Habits, for they shape your Character.</span>
              <span className="block">Tend to your Character, for it writes your Destiny,</span>
              <span className="block">And a Destiny lived in service becomes a Life that lights the path for others.</span>
              &rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-display text-xl font-medium text-marigold-light">{founder.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ivory/70 sm:text-sm">{founder.position}</p>
            </div>
            <p className="mt-5 text-sm leading-6 text-ivory/75">{founder.bio}</p>
            <Link
              href="/about#story"
              className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-marigold-light transition-colors hover:text-white"
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
