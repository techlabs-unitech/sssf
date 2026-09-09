import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

type Review = {
  id: string;
  name: string;
  relationship: string;
  message: string;
  rating: number | null;
};

async function getApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("id, name, relationship, message, rating")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Supabase fetch error (reviews):", error);
    return [];
  }

  return data ?? [];
}

export default async function Testimonials() {
  const reviews = await getApprovedReviews();

  // Keep the homepage clean until at least one review has been approved.
  if (reviews.length === 0) return null;

  return (
    <section className="bg-ivory-soft dark:bg-charcoal-soft py-20">
      <div className="container-seva">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">In their words</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-maroon dark:text-ivory">
              Voices of our community.
            </h2>
          </div>
          <Link
            href="/reviews"
            className="group flex items-center gap-2 text-sm font-semibold text-maroon dark:text-marigold"
          >
            Share your review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <TestimonialsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
