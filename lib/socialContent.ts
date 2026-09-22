import { ORG } from "@/lib/orgConfig";

export type SocialPlatform = "Instagram" | "Facebook" | "YouTube" | "LinkedIn" | "WhatsApp";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  label: string;
  status: string;
};

export const socialContent: SocialLink[] = [
  {
    platform: "Instagram",
    url: ORG.instagram,
    label: "Follow on Instagram",
    status: "Active",
  },
  {
    platform: "Facebook",
    url: ORG.facebook,
    label: "Follow on Facebook",
    status: "Active",
  },
  {
    platform: "YouTube",
    url: "",
    label: "YouTube",
    status: "Verified YouTube link to be added",
  },
  {
    platform: "LinkedIn",
    url: ORG.linkedin,
    label: "Follow on LinkedIn",
    status: "Active",
  },
  {
    platform: "WhatsApp",
    url: "",
    label: "WhatsApp",
    status: "Verified WhatsApp contact link to be added",
  },
];

// Platforms with an empty url are hidden on the site until a verified link is added.
export const socialSectionStatus = "Follow us for updates from the field.";
