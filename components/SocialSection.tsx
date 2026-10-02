import { Globe2, Instagram, Facebook, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { socialContent } from "@/lib/socialContent";

const iconMap = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
};

export default function SocialSection() {
  const links = socialContent.filter((item) => item.url);

  if (links.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container-seva">
        <div className="max-w-2xl">
          <span className="eyebrow">Social media</span>
          <h2 className="mt-4 font-display text-3xl text-maroon">Stay connected</h2>
          <p className="mt-4 text-sm leading-relaxed text-sandalwood">
            Follow the foundation for updates, events and stories from the field.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => {
            const PlatformIcon = iconMap[item.platform as keyof typeof iconMap] || Globe2;
            return (
              <div key={item.platform} className="group rounded-[2rem] border border-maroon/10 bg-white/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-marigold/50 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/15 text-marigold transition-transform duration-300 group-hover:scale-105">
                  <PlatformIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-maroon">{item.platform}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-sandalwood">{item.status}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-maroon"
                >
                  {item.label} →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
