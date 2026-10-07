import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  GraduationCap,
  ShieldPlus,
  Users,
  Flame,
  Utensils,
  Baby,
  Tractor,
  Leaf,
  Accessibility,
} from "lucide-react";
import { foundationProgramPhotos } from "@/lib/foundationPhotos";

export type ProgramStatus = "verified" | "pending";

export type ProgramContent = {
  slug: string;
  title: string;
  tag: string;
  shortIntro: string;
  problem: string;
  whatWeDo: string[];
  whoBenefits: string[];
  locations: string;
  impact: string;
  photos: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  howToHelp: string[];
  image: string;
  icon: LucideIcon;
  accent: "sky" | "magenta" | "leaf" | "rust";
  ctaLabel: string;
  ctaHref: string;
};

export const programsContent: ProgramContent[] = [
  {
    slug: "education",
    title: "Education",
    tag: "Education",
    shortIntro: "Formal and non-formal education, school improvement, school materials, and career guidance for rural and urban poor students.",
    problem: "The source identifies education and school support needs for children, students, and rural and urban communities requiring improved access to learning and opportunity.",
    whatWeDo: [
      "The source-supported educational work includes formal and non-formal education, rural education, career guidance for rural and urban poor students, and distribution of school bags and educational materials.",
      "The source also describes plastering and painting of government school buildings and renovation of decayed school compound walls.",
    ],
    whoBenefits: [
      "Rural and urban poor students.",
      "Children in need, adolescent girls, and other students seeking learning continuity and opportunity.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source provides activity examples such as school building improvement and educational-material distribution. Those examples are presented as activity context, not as cumulative impact metrics.",
    photos: [
      ...foundationProgramPhotos.education,
    ],
    howToHelp: [
      "Contact the foundation for verified education program coordination.",
      "Support education work through donation and program coordination when documented.",
      "Share verified project records that can be added to the public program record.",
    ],
    image: foundationProgramPhotos.education[0].src,
    icon: GraduationCap,
    accent: "magenta",
    ctaLabel: "Support education",
    ctaHref: "/donate",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    tag: "Healthcare",
    shortIntro: "Rural health services and general rural health camps for underserved communities.",
    problem: "The source supports healthcare and welfare activity that responds to community health needs through field healthcare services.",
    whatWeDo: [
      "The source identifies general rural health camps as a healthcare activity example.",
      "The source also describes free food and healthcare support for 34 disadvantaged elderly people as a source-supported activity example.",
    ],
    whoBenefits: [
      "Disadvantaged elderly people.",
      "Communities requiring rural health services and healthcare support.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The organization’s source examples include a general rural health camp and a free food and healthcare support example for 34 disadvantaged elderly people. These are activity examples and should not be converted into total impact counters.",
    photos: [
      ...foundationProgramPhotos.healthcare,
    ],
    howToHelp: [
      "Donate toward healthcare outreach and community health support.",
      "Coordinate verified healthcare support where field documentation is available.",
      "Contact the foundation for current healthcare program information.",
    ],
    image: foundationProgramPhotos.healthcare[0].src,
    icon: Stethoscope,
    accent: "sky",
    ctaLabel: "Support healthcare",
    ctaHref: "/donate",
  },
  {
    slug: "annadanam",
    title: "Annadanam",
    tag: "Food & Relief",
    shortIntro: "Feeding hunger through free food and dry-ration support for underserved communities.",
    problem: "The source includes feeding hunger as a major initiative and activity example involving food support for poor students and families.",
    whatWeDo: [
      "The source describes free food and dry-ration support to 150 poor students and their families.",
      "The source also describes free food and healthcare support for 34 disadvantaged elderly people.",
    ],
    whoBenefits: [
      "Poor students and families.",
      "Disadvantaged elderly people.",
      "Communities requiring effective food support and hunger-relief coordination.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source example describes free food and dry-ration support for 150 poor students and their families and free food and healthcare support for 34 disadvantaged elderly people. These numbers are presented as activity examples, not cumulative impact statistics.",
    photos: [
      ...foundationProgramPhotos.annadanam,
    ],
    howToHelp: [
      "Donate toward food support and hunger-relief coordination.",
      "Volunteer to help organize or support practical food service activities.",
      "Contact the foundation for current annadanam coordination and documentation.",
    ],
    image: foundationProgramPhotos.annadanam[0].src,
    icon: Utensils,
    accent: "rust",
    ctaLabel: "Support annadanam",
    ctaHref: "/donate",
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    tag: "Women & Families",
    shortIntro: "Women in distress, rural livelihood, menstrual hygiene awareness, and vocational skills training for rural women.",
    problem: "The source identifies women in distress and rural livelihood as important thematic areas requiring attention and sustainable development support.",
    whatWeDo: [
      "The source-supported activity examples include job-oriented vocational skills training for rural women and menstrual hygiene awareness with sanitary pad distribution for adolescent rural girl children.",
      "The foundation’s program model connects women’s empowerment, education, health awareness, rural development, and livelihood support.",
    ],
    whoBenefits: [
      "Women in distress.",
      "Rural women who need vocational skills and livelihood opportunity.",
      "Adolescent rural girl children who need menstrual hygiene awareness and sanitary pad distribution.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source-supported activity examples are vocational training and menstrual hygiene awareness and sanitary pad distribution. These are activity examples and should not be converted into unsupported cumulative impact numbers.",
    photos: [],
    howToHelp: [
      "Donate toward women-centered welfare, livelihood, and health awareness initiatives.",
      "Volunteer or support awareness and community livelihood work where verified.",
      "Contact the foundation for verified program details and documentation.",
    ],
    image: "",
    icon: Users,
    accent: "magenta",
    ctaLabel: "Support women empowerment",
    ctaHref: "/donate",
  },
  {
    slug: "child-welfare",
    title: "Child Welfare",
    tag: "Children",
    shortIntro: "Support for children in need, adolescent girls, education continuity, and awareness on child sexual abuse.",
    problem: "The source identifies children in need and adolescent girl children as themes requiring education, welfare, and safety awareness support.",
    whatWeDo: [
      "The source describes child-focused awareness work including awareness programmes on child sexual abuse.",
      "The source also identifies children in need, education, and adolescent girls as themes for program attention.",
    ],
    whoBenefits: [
      "Children in need.",
      "Adolescent girl children.",
      "Students and families requiring support in education and welfare continuity.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source identifies child welfare themes and awareness work. No unsupported child-impact statistics are added.",
    photos: [
      ...foundationProgramPhotos.childWelfare,
    ],
    howToHelp: [
      "Donate to support child-focused welfare, education continuity, and awareness initiatives.",
      "Volunteer to participate in child-focused awareness and educational activities where verified.",
      "Contact the foundation for documented child welfare activities and project needs.",
    ],
    image: foundationProgramPhotos.childWelfare[0].src,
    icon: Baby,
    accent: "leaf",
    ctaLabel: "Support child welfare",
    ctaHref: "/donate",
  },
  {
    slug: "disaster-relief",
    title: "Disaster Relief",
    tag: "Relief",
    shortIntro: "Disaster-relief activity is not described in the verified source material supplied for this phase.",
    problem: "Disaster-relief field activity is not supported by the provided source material and remains pending verified documentation.",
    whatWeDo: [
      "No explicit disaster-relief activity examples are provided in the source material for this phase.",
      "This program description remains pending verified source-backed project details.",
    ],
    whoBenefits: [
      "Communities and groups will be identified when verified disaster-relief records are supplied.",
    ],
    locations: "Program locations — to be verified",
    impact: "Program impact data — to be verified and updated with documented results.",
    photos: [],
    howToHelp: [
      "Contact the foundation for verified disaster-relief activity details when source-supported records are available.",
      "Do not add unsupported disaster-response examples.",
    ],
    image: "",
    icon: ShieldPlus,
    accent: "rust",
    ctaLabel: "Support relief",
    ctaHref: "/donate",
  },
  {
    slug: "spiritual-seva",
    title: "Spiritual Seva",
    tag: "Spiritual Care",
    shortIntro: "Spiritual-seva activity is not described in the verified source material supplied for this phase.",
    problem: "The source material supplied for this phase does not identify explicit spiritual-seva programming or events.",
    whatWeDo: [
      "No explicit spiritual-seva activities are described in the supplied source material.",
      "This program description remains pending verified source-backed project details.",
    ],
    whoBenefits: [
      "Program participants and community groups will be identified when verified source-backed spiritual-seva records are supplied.",
    ],
    locations: "Program locations — to be verified",
    impact: "Program impact data — to be verified and updated with documented results.",
    photos: [...foundationProgramPhotos.spiritualSeva],
    howToHelp: [
      "Contact the foundation for verified spiritual-seva activity details when source-supported records are available.",
      "Do not add unsupported spiritual activities.",
    ],
    image: foundationProgramPhotos.spiritualSeva[0].src,
    icon: Flame,
    accent: "sky",
    ctaLabel: "Support spiritual seva",
    ctaHref: "/donate",
  },
  {
    slug: "rural-development",
    title: "Rural Development",
    tag: "Rural Development",
    shortIntro: "Rural infrastructure, rural livelihood, and youth entrepreneurship development across the villages we serve.",
    problem: "The source identifies rural development, rural infrastructure, and rural livelihood as core thematic areas needing sustained, participatory community action.",
    whatWeDo: [
      "The source-supported activity examples include plastering and painting of government school buildings and renovation of decayed school compound walls as part of rural infrastructure improvement.",
      "The foundation's thematic areas also include rural livelihood and youth entrepreneurship development, encouraging participatory approaches to rural growth.",
    ],
    whoBenefits: [
      "Rural households and village communities.",
      "Youth seeking entrepreneurship and livelihood opportunities.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source provides activity examples such as school infrastructure improvement. These are activity examples and should not be converted into unsupported cumulative impact numbers.",
    photos: [],
    howToHelp: [
      "Donate toward rural infrastructure and livelihood-building initiatives.",
      "Volunteer for community infrastructure and rural development activities where verified.",
      "Contact the foundation for current rural development coordination.",
    ],
    image: "",
    icon: Tractor,
    accent: "leaf",
    ctaLabel: "Support rural development",
    ctaHref: "/donate",
  },
  {
    slug: "environment-protection",
    title: "Environment Protection",
    tag: "Environment",
    shortIntro: "Environmental protection activities including tree planting and stray & wounded animal rescue and rehabilitation.",
    problem: "The source identifies environmental protection activities as a core thematic area, alongside the rescue and rehabilitation of stray and wounded animals.",
    whatWeDo: [
      "The source-supported activity examples include tree-planting and environmental care carried out by foundation members and volunteers.",
      "The foundation also engages in stray and wounded animal rescue and rehabilitation as part of its environmental and welfare commitments.",
    ],
    whoBenefits: [
      "Local communities benefiting from a cleaner, greener environment.",
      "Stray and wounded animals requiring rescue and rehabilitation.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source-supported activity examples include tree-planting drives and animal rescue and rehabilitation. These are activity examples and should not be converted into unsupported cumulative impact numbers.",
    photos: [
      { src: "/images/founder-tree-planting.jpeg", alt: "Foundation members planting a tree as part of an environmental seva activity", caption: "Environmental seva — tree planting in the community" },
    ],
    howToHelp: [
      "Donate toward tree-planting and environmental care initiatives.",
      "Volunteer for plantation drives and animal rescue and rehabilitation support.",
      "Contact the foundation for current environment protection program details.",
    ],
    image: "/images/founder-tree-planting.jpeg",
    icon: Leaf,
    accent: "leaf",
    ctaLabel: "Support environment protection",
    ctaHref: "/donate",
  },
  {
    slug: "disability-elderly-care",
    title: "Disability & Elderly Care",
    tag: "Disability & Elderly Care",
    shortIntro: "Awareness on disability and the disability act, plus food, healthcare and support for displaced and disadvantaged elderly people.",
    problem: "The source identifies disability and displaced and disadvantaged old age people as key thematic areas requiring awareness, care and access to services.",
    whatWeDo: [
      "The source describes awareness camps on the causes of disability and the disability act as a foundation activity.",
      "The source also describes free food and healthcare support for 34 disadvantaged elderly people as an activity example.",
    ],
    whoBenefits: [
      "People with disabilities requiring awareness support and access to services.",
      "Displaced and disadvantaged elderly people requiring food and healthcare support.",
    ],
    locations: "Rural and urban areas of Chikkaballapura district; Rural and urban areas of Kolar district; Throughout India in general.",
    impact: "The source example describes free food and healthcare support for 34 disadvantaged elderly people, along with disability awareness camps. These are activity examples and should not be converted into cumulative impact statistics.",
    photos: [],
    howToHelp: [
      "Donate toward disability awareness and elderly care support.",
      "Volunteer to support awareness camps and elderly care activities where verified.",
      "Contact the foundation for current disability and elderly care program details.",
    ],
    image: "",
    icon: Accessibility,
    accent: "sky",
    ctaLabel: "Support this program",
    ctaHref: "/donate",
  },
];

export const programDetails = Object.fromEntries(
  programsContent.map((p) => [p.slug, p])
) as Record<string, ProgramContent>;

export const programMap = new Map(programsContent.map((p) => [p.slug, p]));
