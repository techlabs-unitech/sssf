"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }
      router.push("/admin/gallery");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="container-seva flex min-h-[70vh] items-center justify-center py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-maroon/10 dark:border-marigold/15 p-8"
      >
        <h1 className="font-display text-2xl text-maroon dark:text-ivory">Admin sign in</h1>
        <p className="mt-2 text-sm text-sandalwood dark:text-ivory-soft/70">
          Enter the admin password to manage the gallery.
        </p>

        <div className="mt-6">
          <label htmlFor="password" className="text-xs text-sandalwood dark:text-ivory-soft/60">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
          />
        </div>

        {error && <p className="mt-3 text-sm text-vermillion">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-marigold px-4 py-3 text-sm font-medium text-white transition hover:bg-marigold-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
}
