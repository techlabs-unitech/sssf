import Link from "next/link";
import SevaMark from "@/components/SevaMark";

export default function NotFound() {
  return (
    <div className="container-seva flex flex-col items-center justify-center py-32 text-center">
      <SevaMark size={44} />
      <h1 className="mt-6 font-display text-3xl text-maroon">
        This page has wandered off.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-sandalwood">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back home.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-ivory"
      >
        Back to home
      </Link>
    </div>
  );
}
