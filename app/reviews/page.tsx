import type { Metadata } from "next";
import { MessageCircleHeart, ShieldCheck, Sparkles } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import ReviewForm from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Reviews & Feedback",
  description:
    "Share your experience with Sri Sai Swamy Seva Foundation. Reviews from our friends and wellwishers may be featured on our homepage.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Reviews & Feedback</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon dark:text-ivory leading-tight">
            Tell us what our seva means to you.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood dark:text-ivory-soft/70">
            Whether you&rsquo;ve volunteered with us, received support, partnered
            with us, or simply wish us well from afar — we&rsquo;d love to hear
            your thoughts. Your words help others trust and join this journey.
          </p>
        </div>
      </section>

      <div className="text-maroon/30 dark:text-marigold/20">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ReviewForm />

          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 space-y-6">
              <div className="flex items-start gap-4">
                <MessageCircleHeart className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Speak from the heart</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Share what our programs, our volunteers, or your experience with the
                    Foundation has meant to you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Gently moderated</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Every review is read by our team before it goes live, so our
                    homepage stays a genuine, trustworthy space.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sparkles className="h-5 w-5 shrink-0 text-maroon dark:text-marigold mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon dark:text-ivory">Featured on our homepage</h3>
                  <p className="mt-1 text-sm text-sandalwood dark:text-ivory-soft/70">
                    Approved reviews appear in the &ldquo;Voices of our
                    community&rdquo; section for everyone to see.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
