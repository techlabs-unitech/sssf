import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MessageCircleHeart, ShieldCheck, Sparkles } from "lucide-react";
import UnityDivider from "@/components/UnityDivider";
import ReviewForm from "@/components/ReviewForm";

export const metadata: Metadata = pageMetadata("/reviews");

export default function ReviewsPage() {
  return (
    <>
      <section className="container-seva py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Reviews & Feedback</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-maroon leading-tight">
            Tell us what our seva means to you.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sandalwood">
            Whether you&rsquo;ve volunteered with us, received support, partnered
            with us, or simply wish us well from afar — we&rsquo;d love to hear
            your thoughts. Your words help others trust and join this journey.
          </p>
        </div>
      </section>

      <div className="text-maroon/30">
        <UnityDivider />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-seva grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ReviewForm />

          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon/10 p-7 space-y-6">
              <div className="flex items-start gap-4">
                <MessageCircleHeart className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Speak from the heart</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    Share what our programs, our volunteers, or your experience with the
                    Foundation has meant to you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Gently moderated</h3>
                  <p className="mt-1 text-sm text-sandalwood">
                    Every review is read by our team before it goes live, so our
                    homepage stays a genuine, trustworthy space.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sparkles className="h-5 w-5 shrink-0 text-maroon mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-base text-maroon">Featured on our homepage</h3>
                  <p className="mt-1 text-sm text-sandalwood">
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
