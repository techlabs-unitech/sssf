"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { volunteerOpportunities } from "@/lib/volunteerContent";

type VolunteerContact = {
  phoneDisplay: string;
  emailDisplay: string;
  addressDisplay: string;
};

export default function VolunteerForm({ contact }: { contact: VolunteerContact }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    areas: "",
    skills: "",
    availability: "",
    experience: "",
    motivation: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    function applyRequestedArea() {
      const url = new URL(window.location.href);
      const hashQuery = url.hash.includes("?")
        ? new URLSearchParams(url.hash.slice(url.hash.indexOf("?") + 1))
        : null;
      const requestedArea = url.searchParams.get("area") ?? hashQuery?.get("area");

      if (!requestedArea || !volunteerOpportunities.some((opportunity) => opportunity.title === requestedArea)) {
        return;
      }

      setForm((current) => ({ ...current, areas: requestedArea }));
      const formSection = document.getElementById("volunteer-form");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        formSection.focus?.();
      }
    }

    applyRequestedArea();
    window.addEventListener("hashchange", applyRequestedArea);

    return () => window.removeEventListener("hashchange", applyRequestedArea);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not submit your volunteer interest. Please try again.");
        return;
      }

      setSuccess("Thank you. Your volunteer interest has been submitted successfully and is waiting for foundation review.");
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        areas: "",
        skills: "",
        availability: "",
        experience: "",
        motivation: "",
      });
    } catch {
      setError("Could not submit your volunteer interest. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="volunteer-form" tabIndex={-1} className="py-16 md:py-20">
      <div className="container-seva">
        <div className="rounded-[2rem] border border-maroon/10 bg-white/50 p-8 md:p-10">
          <div className="max-w-2xl">
            <span className="eyebrow">Volunteer application</span>
            <h2 className="mt-4 font-display text-3xl text-maroon">Express your interest</h2>
            <p className="mt-4 text-sm leading-relaxed text-sandalwood">
              Use the form below to begin a volunteer interest request. Volunteer applications are currently being connected. Please use the verified contact details below to reach the foundation if you would like to volunteer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Full name <span className="text-vermillion">*</span></label>
                <input id="fullName" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Email <span className="text-vermillion">*</span></label>
                <input id="email" name="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Phone <span className="text-vermillion">*</span></label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
              <div>
                <label htmlFor="location" className="text-xs uppercase tracking-[0.14em] text-sandalwood">City / Location <span className="text-vermillion">*</span></label>
                <input id="location" name="location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="areas" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Areas of interest <span className="text-vermillion">*</span></label>
                <select id="areas" name="areas" required value={form.areas} onChange={(e) => setForm({ ...form, areas: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold">
                  <option value="">Select area</option>
                  {volunteerOpportunities.map((opportunity) => (
                    <option key={opportunity.title}>{opportunity.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="skills" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Skills <span className="text-vermillion">*</span></label>
                <input id="skills" name="skills" required value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="availability" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Availability <span className="text-vermillion">*</span></label>
                <input id="availability" name="availability" required value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
              <div>
                <label htmlFor="experience" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Experience</label>
                <input id="experience" name="experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold" />
              </div>
            </div>

            <div>
              <label htmlFor="motivation" className="text-xs uppercase tracking-[0.14em] text-sandalwood">Message / Motivation <span className="text-vermillion">*</span></label>
              <textarea id="motivation" name="motivation" rows={4} required value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="mt-2 w-full rounded-xl border border-maroon/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold resize-none" />
            </div>

            <div className="flex items-start gap-3">
              <input id="volunteer-consent" type="checkbox" required className="mt-1 h-4 w-4" />
              <label htmlFor="volunteer-consent" className="text-sm leading-relaxed text-sandalwood">
                I understand that this form is a volunteer interest request and submission handling will be connected before launch. I agree that the foundation may use the details provided to coordinate volunteer opportunities and follow up appropriately.
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <button type="submit" disabled={submitting} className="rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-[1.02] disabled:opacity-70">
                {submitting ? "Submitting..." : "Submit interest"}
              </button>
              <span className="inline-flex items-center rounded-full border border-maroon/10 px-5 py-3 text-xs uppercase tracking-[0.14em] text-sandalwood">
                Volunteer applications are currently being connected.
              </span>
            </div>
            {error ? <p className="text-sm text-vermillion">{error}</p> : null}
            {success ? <p className="text-sm text-maroon">{success}</p> : null}
          </form>

          <div className="mt-8 grid gap-4 border-t border-maroon/10 pt-8 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-marigold" />
              <a href={`tel:${contact.phoneDisplay.replace(/\s/g, "")}`}>{contact.phoneDisplay}</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-marigold" />
              <a href={`mailto:${contact.emailDisplay}`}>{contact.emailDisplay}</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-marigold" />
              <span>{contact.addressDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
