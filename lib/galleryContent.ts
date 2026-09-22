export type GalleryMetadata = {
  category?: string;
  location?: string;
  date?: string;
  activity?: string;
  description?: string;
};

export type GalleryCategory = {
  title: string;
  description: string;
  status: "verified" | "pending";
};

export const galleryCategoriesContent: GalleryCategory[] = [
  {
    title: "Annadanam",
    description: "Food and community meal support activity.",
    status: "pending",
  },
  {
    title: "Medical Camps",
    description: "Healthcare outreach and medical camp activity.",
    status: "pending",
  },
  {
    title: "Education",
    description: "Education support and learning activity.",
    status: "pending",
  },
  {
    title: "School Development",
    description: "School development and education infrastructure activity.",
    status: "pending",
  },
  {
    title: "Women Empowerment",
    description: "Women empowerment and community-skilling activity.",
    status: "pending",
  },
  {
    title: "Disaster Relief",
    description: "Disaster relief and emergency support activity.",
    status: "pending",
  },
  {
    title: "Spiritual Activities",
    description: "Spiritual and community seva activity.",
    status: "pending",
  },
  {
    title: "Volunteers",
    description: "Volunteer participation and foundation service activity.",
    status: "pending",
  },
  {
    title: "Events",
    description: "Community events and activity records.",
    status: "pending",
  },
];

export const galleryCategoryStatus =
  "Gallery categories and verified collection metadata will be published here as records are reviewed.";

export const galleryMetadataExample: GalleryMetadata = {
  category: "Annadanam",
  location: "Publication Pending",
  date: "Publication Pending",
  activity: "Publication Pending",
  description: "Verified collection metadata will be published when records are available.",
};
