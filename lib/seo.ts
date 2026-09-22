import type { Metadata } from "next";
import { ORG } from "@/lib/orgConfig";
import { allEvents } from "@/lib/eventsContent";
import { beneficiaryStoriesContent } from "@/lib/beneficiaryStoriesContent";
import { caseStudiesContent } from "@/lib/caseStudiesContent";

/* -------------------------------------------------------------------------- */
/*  Site-wide constants                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The ONE canonical origin for the site. Every canonical URL, Open Graph URL,
 * sitemap entry and JSON-LD `url` is built from this value.
 *
 * Override with NEXT_PUBLIC_SITE_URL if the primary domain ever changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://srisaiswamysevafoundation.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Sri Sai Swamy Seva Foundation";
export const SITE_LOCALE = "en_IN";

/** Spelling variants people actually type. Fed to WebSite/NGO `alternateName`. */
export const SITE_ALT_NAMES = [
  "SSSF",
  "SSSF Foundation",
  "SriSai Swamy Seva Foundation",
  "Srisai Swamy Seva Foundation",
  "Sri Sai Swami Seva Foundation",
];

export const HOME_TITLE = "Sri Sai Swamy Seva Foundation – NGO in Chintamani, Karnataka";

export const HOME_DESCRIPTION =
  "Sri Sai Swamy Seva Foundation — Section 8 NGO in Chintamani, Karnataka. Health camps, annadanam, education support and rural development. 80G donations.";

/**
 * NOTE: Google ignores the meta keywords tag. It is kept because Bing/Yandex and
 * some directories still read it, and it costs nothing. Real ranking signal comes
 * from titles, descriptions, headings, structured data and links.
 */
export const SITE_KEYWORDS = [
  "Sri Sai Swamy Seva Foundation",
  "SriSai Swamy Seva Foundation",
  "SSSF Foundation",
  "Sai Swamy",
  "Dr. N.R. Malluraja",
  "NGO in Chintamani",
  "NGO in Chikkaballapura",
  "NGO in Karnataka",
  "charitable foundation Chintamani",
  "Section 8 non-profit Karnataka",
  "80G donation NGO Karnataka",
  "donate to NGO India",
  "annadanam",
  "food distribution NGO",
  "health camp Chikkaballapura",
  "education support poor students",
  "rural development Karnataka",
  "women empowerment NGO Karnataka",
  "volunteer NGO Karnataka",
];

export const ORG_TAGLINE = "Hope, Dignity, and Brighter Futures.";

/* -------------------------------------------------------------------------- */
/*  Per-page SEO copy — edit titles / descriptions HERE, in one place.         */
/*                                                                             */
/*  `title` gets " | Sri Sai Swamy Seva Foundation" appended by the layout     */
/*  template, so never repeat the brand name in it.                            */
/*  Descriptions are written to ~120–160 characters.                           */
/* -------------------------------------------------------------------------- */

export type PageSeo = {
  title: string;
  description: string;
  keywords?: string[];
  /** Headline printed on the social share image. Defaults to `title`. */
  ogHeadline?: string;
  /** Sub-line on the social share image. */
  ogSub?: string;
  noindex?: boolean;
};

const hasEvents = allEvents.length > 0;
const hasStories = beneficiaryStoriesContent.some((s) => s.published);
const hasCaseStudies = caseStudiesContent.some((c) => c.published);

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ogHeadline: "Hope, dignity, and brighter futures.",
    ogSub: "NGO in Chintamani, Chikkaballapura · Karnataka",
  },

  "/about": {
    title: "About Us – Section 8 NGO in Chintamani",
    description:
      "Founded in 2021 by Dr. N.R. Malluraja (Sai Swamy), Sri Sai Swamy Seva Foundation is a Section 8 non-profit in Chintamani, Chikkaballapura, Karnataka.",
    keywords: ["about Sri Sai Swamy Seva Foundation", "Dr. N.R. Malluraja", "Sai Swamy founder", "Section 8 company NGO"],
    ogSub: "Section 8 non-profit · Founded 2021 · Chintamani, Karnataka",
  },

  "/programs": {
    title: "Our Programs – Health, Education & Food Support",
    description:
      "Sri Sai Swamy Seva Foundation's work: education, healthcare, annadanam, child welfare, women empowerment, rural development and elderly care in Karnataka.",
    keywords: ["NGO programs Karnataka", "community welfare programs", "NGO work Chikkaballapura", "NGO work Kolar"],
    ogSub: "Education · Healthcare · Annadanam · Rural development",
  },

  "/education": {
    title: "Education Support for Rural Students",
    description:
      "School improvement, school bags, learning materials and career guidance for rural and urban poor students in Chikkaballapura and Kolar districts.",
    keywords: ["education NGO Chintamani", "school support NGO Karnataka", "school bag distribution", "government school renovation"],
    ogSub: "School support · Learning materials · Career guidance",
  },

  "/healthcare": {
    title: "Rural Health Camps & Healthcare Support",
    description:
      "Rural health services and community health camps for underserved villages in Chikkaballapura and Kolar, by Sri Sai Swamy Seva Foundation, Chintamani.",
    keywords: ["health camp Chikkaballapura", "rural healthcare NGO Karnataka", "medical camp Chintamani"],
    ogSub: "Bringing care to underserved villages",
  },

  "/annadanam": {
    title: "Annadanam – Food & Dry-Ration Support",
    description:
      "Annadanam by Sri Sai Swamy Seva Foundation: free food and dry-ration support for hungry families in Chintamani, Chikkaballapura and Kolar. Help us feed more.",
    keywords: ["annadanam Chintamani", "food distribution NGO Karnataka", "feed the hungry", "dry ration distribution"],
    ogSub: "Feeding hunger with free food & dry rations",
  },

  "/women-empowerment": {
    title: "Women Empowerment & Vocational Training",
    description:
      "Support for women in distress, rural livelihood, menstrual hygiene awareness and vocational skills training for rural women in Chikkaballapura and Kolar.",
    keywords: ["women empowerment NGO Karnataka", "vocational training for rural women", "menstrual hygiene awareness"],
    ogSub: "Livelihood · Skills training · Hygiene awareness",
  },

  "/child-welfare": {
    title: "Child Welfare & Adolescent Girls Support",
    description:
      "Support for children in need and adolescent girls, education continuity and child sexual abuse awareness by Sri Sai Swamy Seva Foundation, Karnataka.",
    keywords: ["child welfare NGO Karnataka", "adolescent girls support", "child protection awareness"],
    ogSub: "Care, education continuity & child-safety awareness",
  },

  "/rural-development": {
    title: "Rural Development & Youth Entrepreneurship",
    description:
      "Rural infrastructure, livelihood and youth entrepreneurship development in the villages of Chikkaballapura and Kolar districts, Karnataka.",
    keywords: ["rural development NGO Karnataka", "youth entrepreneurship", "village livelihood support"],
    ogSub: "Infrastructure · Livelihood · Youth entrepreneurship",
  },

  "/environment-protection": {
    title: "Tree Planting & Animal Rescue",
    description:
      "Tree planting plus rescue and rehabilitation of stray and wounded animals in Chikkaballapura and Kolar, Karnataka — Sri Sai Swamy Seva Foundation.",
    keywords: ["tree plantation NGO Karnataka", "stray animal rescue", "environment protection NGO"],
    ogSub: "Tree planting · Stray & wounded animal rescue",
  },

  "/disability-elderly-care": {
    title: "Disability Awareness & Elderly Care",
    description:
      "Disability awareness plus food, healthcare and support for displaced and disadvantaged elderly people in Chikkaballapura and Kolar districts, Karnataka.",
    keywords: ["elderly care NGO Karnataka", "disability awareness", "old age support NGO"],
    ogSub: "Awareness · Food · Healthcare for the elderly",
  },

  // Placeholder program pages: the on-site copy says the activity is not yet
  // documented, so they are kept out of Google until real content exists.
  "/disaster-relief": {
    title: "Disaster Relief",
    description: "Disaster relief and emergency welfare coordination by Sri Sai Swamy Seva Foundation.",
    noindex: true,
  },
  "/spiritual-seva": {
    title: "Spiritual Seva",
    description: "Spiritual seva and community service by Sri Sai Swamy Seva Foundation.",
    noindex: true,
  },

  "/impact": {
    title: "Our Impact – Documented Community Service",
    description:
      "Documented education, healthcare and food-support activity by Sri Sai Swamy Seva Foundation across Chikkaballapura and Kolar districts, Karnataka.",
    ogSub: "Documented service across Chikkaballapura & Kolar",
  },

  "/gallery": {
    title: "Photo Gallery – Seva in Action",
    description:
      "Photos of health camps, annadanam food drives, school support and community events by Sri Sai Swamy Seva Foundation in Chintamani, Karnataka.",
    keywords: ["NGO photo gallery", "health camp photos", "annadanam photos"],
    ogSub: "Health camps · Food drives · School support",
  },

  // Empty collections: indexable only once real records are published.
  "/events": {
    title: "Events & Seva Activities",
    description:
      "Past and upcoming seva events, health camps and community programs of Sri Sai Swamy Seva Foundation in Chintamani, Chikkaballapura, Karnataka.",
    noindex: !hasEvents,
  },
  "/stories": {
    title: "Beneficiary Stories",
    description:
      "Stories of people and communities supported by Sri Sai Swamy Seva Foundation, shared with consent and verified project details.",
    noindex: !hasStories,
  },
  "/case-studies": {
    title: "Case Studies",
    description:
      "Documented projects, interventions and outcomes of Sri Sai Swamy Seva Foundation in Chikkaballapura and Kolar districts, Karnataka.",
    noindex: !hasCaseStudies,
  },

  "/donate": {
    title: "Donate Online – 80G Tax Benefit",
    description:
      "Donate online to Sri Sai Swamy Seva Foundation, an 80G-approved NGO in Chintamani, Karnataka. Support meals, health camps and school support.",
    keywords: ["donate to NGO India", "80G donation Karnataka", "donate online NGO", "tax exemption donation India"],
    ogHeadline: "Donate & make a difference",
    ogSub: "80G-approved NGO · Chintamani, Karnataka",
  },

  "/volunteer": {
    title: "Volunteer With Us",
    description:
      "Volunteer with Sri Sai Swamy Seva Foundation in Chintamani, Chikkaballapura — give your time and skills to health camps, food drives and education.",
    keywords: ["volunteer NGO Karnataka", "volunteer Chintamani", "volunteer opportunities Chikkaballapura"],
    ogSub: "Give your time and skills to seva",
  },

  "/reviews": {
    title: "Reviews & Testimonials",
    description:
      "Read reviews from volunteers, teachers and well-wishers about Sri Sai Swamy Seva Foundation, and share your own experience with the foundation.",
    keywords: ["Sri Sai Swamy Seva Foundation reviews", "NGO reviews Chintamani"],
    ogSub: "Voices of our community",
  },

  "/contact": {
    title: "Contact Us – NGO in Chintamani",
    description:
      "Contact Sri Sai Swamy Seva Foundation — Guttapalya, Chintamani, Chikkaballapura 563161, Karnataka. Call, email or visit to volunteer, partner or enquire.",
    keywords: ["Sri Sai Swamy Seva Foundation contact", "NGO Chintamani address", "NGO Guttapalya"],
    ogSub: "Guttapalya, Chintamani · Chikkaballapura, Karnataka",
  },

  "/awards": {
    title: "Registrations – 80G, 12A, CSR-1, NGO Darpan",
    description:
      "Sri Sai Swamy Seva Foundation is a Section 8 company with CSR-1, 12A, 80G and NGO Darpan registrations. View our registrations and compliance details.",
    keywords: ["80G registered NGO Karnataka", "12A NGO", "CSR-1 registered NGO", "NGO Darpan registration"],
    ogHeadline: "Registered & accountable",
    ogSub: "Section 8 · CSR-1 · 12A · 80G · NGO Darpan",
  },

  "/legal": {
    title: "Legal & Compliance",
    description:
      "Legal and compliance information for Sri Sai Swamy Seva Foundation, a Section 8 non-profit in Chintamani, Karnataka — registrations and document status.",
    ogSub: "Section 8 non-profit · Karnataka",
  },

  "/transparency": {
    title: "Transparency & Accountability",
    description:
      "How Sri Sai Swamy Seva Foundation reports on program activity and donation utilisation, with the current status of published documents.",
    ogSub: "Accountable to every donor",
  },

  "/financial-transparency": {
    title: "Financial Transparency",
    description:
      "Financial transparency at Sri Sai Swamy Seva Foundation — audited statements, annual reports and the status of published financial and compliance documents.",
    ogSub: "Audited statements & annual reports",
  },

  "/annual-reports": {
    title: "Annual Reports & Audited Statements",
    description:
      "Download annual reports and audited financial statements of Sri Sai Swamy Seva Foundation, including the 2025–26 report and the CSR-1 registration letter.",
    keywords: ["NGO annual report", "audited financial statement NGO", "Sri Sai Swamy Seva Foundation annual report"],
    ogSub: "Audited receipts, payments & balance sheets",
  },
};

/** Paths (in sitemap order) that Google should crawl and index. */
export function indexablePaths(): string[] {
  return Object.entries(PAGE_SEO)
    .filter(([, seo]) => !seo.noindex)
    .map(([path]) => path);
}

/* -------------------------------------------------------------------------- */
/*  Metadata builders                                                          */
/* -------------------------------------------------------------------------- */

export function ogImageUrl(path: string): string {
  return `/og?p=${encodeURIComponent(path)}`;
}

type BuildArgs = {
  path: string;
  title: string | { absolute: string };
  description: string;
  keywords?: string[];
  noindex?: boolean;
  ogTitle?: string;
  ogImage?: string;
};

export function buildMetadata({ path, title, description, keywords, noindex, ogTitle, ogImage }: BuildArgs): Metadata {
  const plainTitle = typeof title === "string" ? title : title.absolute;
  const socialTitle = ogTitle ?? (typeof title === "string" ? `${title} | ${SITE_NAME}` : title.absolute);
  const image = ogImage ?? ogImageUrl(path);

  return {
    title,
    description,
    keywords: [...(keywords ?? []), ...SITE_KEYWORDS],
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: socialTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${plainTitle} — ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

/** Trim copy to a meta-description-friendly length at a word boundary. */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

/** Metadata for a page registered in PAGE_SEO. */
export function pageMetadata(path: string): Metadata {
  const seo = PAGE_SEO[path];
  if (!seo) throw new Error(`No SEO entry for "${path}" — add it to PAGE_SEO in lib/seo.ts`);
  return buildMetadata({
    path,
    title: path === "/" ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    noindex: seo.noindex,
  });
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD (schema.org)                                                       */
/* -------------------------------------------------------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: ORG.legalName,
    alternateName: SITE_ALT_NAMES,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-full.png`,
    },
    image: `${SITE_URL}${ogImageUrl("/")}`,
    description: HOME_DESCRIPTION,
    slogan: ORG_TAGLINE,
    foundingDate: "2021-01-09",
    founder: {
      "@type": "Person",
      name: "Dr. N.R. Malluraja",
      alternateName: "Sai Swamy",
      jobTitle: "Founder & Chairman",
    },
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "13/7, Guttapalya Village, Gownipalli Post",
      addressLocality: "Chintamani",
      addressRegion: "Karnataka",
      postalCode: "563161",
      addressCountry: "IN",
    },
    hasMap: ORG.mapLinkUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Chikkaballapura district, Karnataka" },
      { "@type": "AdministrativeArea", name: "Kolar district, Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Education support",
      "Rural healthcare",
      "Annadanam and food relief",
      "Child welfare",
      "Women empowerment",
      "Rural development",
      "Environment protection",
      "Elderly care",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "donor and volunteer enquiries",
      telephone: ORG.phone,
      email: ORG.email,
      areaServed: "IN",
    },
    sameAs: [ORG.facebook, ORG.instagram, ORG.linkedin].filter(Boolean),
  };
}

/** Tells Google the preferred *site name* + alternate names shown in results. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
