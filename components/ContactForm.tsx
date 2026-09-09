"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-marigold/40 bg-ivory-soft dark:bg-charcoal-soft p-10 text-center h-fit">
        <CheckCircle2 className="mx-auto h-8 w-8 text-maroon dark:text-marigold" strokeWidth={1.75} />
        <h2 className="mt-4 font-display text-2xl text-maroon dark:text-marigold">Message sent.</h2>
        <p className="mt-3 text-sm text-sandalwood dark:text-ivory-soft/70">
          Thank you for reaching out — our team will get back to you within 2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="text-xs text-sandalwood dark:text-ivory-soft/60">Full name</label>
          <input
            id="c-name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="text-xs text-sandalwood dark:text-ivory-soft/60">Email</label>
          <input
            id="c-email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-subject" className="text-xs text-sandalwood dark:text-ivory-soft/60">Subject</label>
        <select
          id="c-subject"
          className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
        >
          <option>General inquiry</option>
          <option>Volunteering</option>
          <option>Partnership / CSR</option>
          <option>Donation query</option>
          <option>Media & press</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className="text-xs text-sandalwood dark:text-ivory-soft/60">Message</label>
        <textarea
          id="c-message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold resize-none"
        />
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-maroon dark:bg-marigold py-3.5 text-sm font-semibold text-ivory dark:text-charcoal transition-transform hover:scale-[1.01] sm:w-auto sm:px-10"
      >
        Send message
      </button>
    </form>
  );
}
