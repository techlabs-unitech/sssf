export type EventCategory =
  | "annadanam"
  | "healthcare"
  | "education"
  | "school-development"
  | "women-empowerment"
  | "child-welfare"
  | "disaster-relief"
  | "spiritual-activities"
  | "volunteer-activities"
  | "community-events";

export type EventStatus = "upcoming" | "past" | "pending";

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  description: string;
  category?: EventCategory;
  status: EventStatus;
  registrationUrl?: string;
  image?: string;
  videoUrl?: string;
  beneficiaryInfo?: string;
  organizer?: string;
  contact?: string;
  purpose?: string;
  activities?: string[];
  galleryPhotos?: string[];
};

export const eventCategories: EventCategory[] = [
  "annadanam",
  "healthcare",
  "education",
  "school-development",
  "women-empowerment",
  "child-welfare",
  "disaster-relief",
  "spiritual-activities",
  "volunteer-activities",
  "community-events",
];

export const eventCategoryLabels: Record<EventCategory, string> = {
  annadanam: "Annadanam",
  healthcare: "Healthcare",
  education: "Education",
  "school-development": "School Development",
  "women-empowerment": "Women Empowerment",
  "child-welfare": "Child Welfare",
  "disaster-relief": "Disaster Relief",
  "spiritual-activities": "Spiritual Activities",
  "volunteer-activities": "Volunteer Activities",
  "community-events": "Community Events",
};

export const upcomingEventsContent: EventRecord[] = [];
export const pastEventsContent: EventRecord[] = [];
export const allEvents: EventRecord[] = [
  ...upcomingEventsContent,
  ...pastEventsContent,
];

export const eventEmptyStates = {
  upcoming: "No upcoming events are currently published. Please check back for upcoming seva activities and community programs.",
  past: "Past event records will be published here.",
  emptyDetails: "Registration details will be published when available.",
};
