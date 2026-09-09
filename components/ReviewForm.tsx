"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

const RELATIONSHIPS = ["Wellwisher", "Friend", "Volunteer", "Donor", "Beneficiary", "Partner"];

export default function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          relationship: formData.get("relationship"),
          message: formData.get("message"),
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-marigold/40 bg-ivory-soft dark:bg-charcoal-soft p-10 text-center h-fit">
        <CheckCircle2 className="mx-auto h-8 w-8 text-maroon dark:text-marigold" strokeWidth={1.75} />
        <h2 className="mt-4 font-display text-2xl text-maroon dark:text-marigold">Thank you.</h2>
        <p className="mt-3 text-sm text-sandalwood dark:text-ivory-soft/70">
          Your words mean a lot to us. Our team will review your message shortly,
          and it may be featured on our homepage.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className="text-xs text-sandalwood dark:text-ivory-soft/60">Full name</label>
          <input
            id="r-name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
        <div>
          <label htmlFor="r-email" className="text-xs text-sandalwood dark:text-ivory-soft/60">Email (optional)</label>
          <input
            id="r-email"
            name="email"
            type="email"
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="r-relationship" className="text-xs text-sandalwood dark:text-ivory-soft/60">You are a</label>
        <select
          id="r-relationship"
          name="relationship"
          defaultValue="Wellwisher"
          className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
        >
          {RELATIONSHIPS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <span className="text-xs text-sandalwood dark:text-ivory-soft/60">Your rating</span>
        <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label="Rating out of 5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={rating === star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  (hoverRating || rating) >= star
                    ? "fill-marigold text-marigold"
                    : "text-maroon/20 dark:text-marigold/25"
                }`}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="r-message" className="text-xs text-sandalwood dark:text-ivory-soft/60">Your review</label>
        <textarea
          id="r-message"
          name="message"
          required
          rows={5}
          maxLength={1000}
          placeholder="Tell us about your experience with the Foundation..."
          className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold resize-none"
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-vermillion" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-full bg-maroon dark:bg-marigold py-3.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-10"
      >
        {submitting ? "Submitting..." : "Submit your review"}
      </button>

      <p className="mt-4 text-xs text-sandalwood dark:text-ivory-soft/50">
        Reviews are moderated and may be featured on our homepage after approval.
      </p>
    </form>
  );
}
