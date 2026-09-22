import type { MetadataRoute } from "next";
import { SITE_URL, indexablePaths } from "@/lib/seo";
import { allEvents } from "@/lib/eventsContent";
import { beneficiaryStoriesContent } from "@/lib/beneficiaryStoriesContent";
import { caseStudiesContent } from "@/lib/caseStudiesContent";

/**
 * Only URLs that are meant to rank are listed. Pages marked `noindex` in
 * lib/seo.ts (empty collections, placeholder program pages) are left out
 * automatically, and appear here the moment real content is published.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(indexablePaths());

  for (const event of allEvents) paths.add(`/events/${event.slug || event.id}`);
  for (const story of beneficiaryStoriesContent) {
    if (story.published) paths.add(`/stories/${story.slug || story.id}`);
  }
  for (const study of caseStudiesContent) {
    if (study.published) paths.add(`/case-studies/${study.slug || study.id}`);
  }

  return Array.from(paths).map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
