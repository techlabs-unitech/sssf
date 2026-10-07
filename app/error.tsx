"use client";

import Link from "next/link";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <section className="container-seva flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">Something went wrong</span>
      <h1 className="mt-4 font-display text-3xl text-maroon">We could not load this page.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-sandalwood">
        A temporary site error happened while trying to show this page. You can return home or try again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-ivory">
          Home
        </Link>
        <button onClick={reset} className="rounded-full border border-maroon px-7 py-3 text-sm font-semibold text-maroon">
          Try again
        </button>
      </div>
    </section>
  );
}
