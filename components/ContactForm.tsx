"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [notice, setNotice] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not submit your message. Please try again.");
        return;
      }

      setNotice("Thank you. Your enquiry has been submitted successfully. The foundation team will respond through the contact details provided in the website coordination record.");
      setForm({ name: "", email: "", subject: "General inquiry", message: "" });
    } catch {
      setError("Could not submit your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-maroon/10 p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="text-xs text-sandalwood">Full name</label>
          <input
            id="c-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="text-xs text-sandalwood">Email</label>
          <input
            id="c-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-subject" className="text-xs text-sandalwood">Subject</label>
        <select
          id="c-subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
        >
          <option>General inquiry</option>
          <option>Volunteering</option>
          <option>Partnership / CSR</option>
          <option>Donation query</option>
          <option>Media & press</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className="text-xs text-sandalwood">Message</label>
        <textarea
          id="c-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-full bg-maroon py-3.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.01] sm:w-auto sm:px-10 disabled:opacity-70"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>

      {error ? (
        <p className="mt-5 rounded-xl border border-vermillion/40 bg-vermillion/8 px-4 py-3 text-sm leading-relaxed text-sandalwood">
          {error}
        </p>
      ) : null}

      {notice ? (
        <p className="mt-5 rounded-xl border border-marigold/30 bg-marigold/8 px-4 py-3 text-sm leading-relaxed text-sandalwood">
          {notice}
        </p>
      ) : null}
    </form>
  );
}
