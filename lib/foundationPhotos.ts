export type FoundationPhotoCategory =
  | "Education"
  | "Healthcare"
  | "Annadanam"
  | "Child Welfare"
  | "Spiritual / Community Seva"
  | "Volunteers"
  | "Events"
  | "Foundation Activities";

export type FoundationPhoto = {
  id: number;
  src: string;
  category: FoundationPhotoCategory;
  alt: string;
  caption: string;
};

const categoryText: Record<FoundationPhotoCategory, { alt: string; caption: string }> = {
  Education: {
    alt: "School improvement activity at a Foundation-supported school",
    caption: "School improvement activity captured during Foundation service.",
  },
  Healthcare: {
    alt: "Healthcare camp activity",
    caption: "Healthcare camp activity captured during Foundation service.",
  },
  Annadanam: {
    alt: "Food distribution activity",
    caption: "Food distribution activity captured during Foundation service.",
  },
  "Child Welfare": {
    alt: "Children participating in a community activity",
    caption: "Children participating in a Foundation/community activity.",
  },
  "Spiritual / Community Seva": {
    alt: "Community and spiritual activity",
    caption: "Community activity captured during Foundation service.",
  },
  Volunteers: {
    alt: "Foundation volunteers participating in a community activity",
    caption: "Foundation volunteers participating in a community activity.",
  },
  Events: {
    alt: "Foundation community event activity",
    caption: "Community activity captured during a Foundation event.",
  },
  "Foundation Activities": {
    alt: "Foundation activity",
    caption: "Foundation activity captured in the field.",
  },
};

function createPhoto(id: number, category: FoundationPhotoCategory): FoundationPhoto {
  return {
    id,
    src: `/images/foundation-gallery/foundation-${String(id).padStart(3, "0")}.jpeg`,
    category,
    ...categoryText[category],
  };
}

const definitions: Array<[number, FoundationPhotoCategory]> = [
  [1, "Education"], [2, "Foundation Activities"], [3, "Foundation Activities"],
  [4, "Education"], [5, "Education"], [6, "Education"], [7, "Volunteers"],
  [8, "Events"], [9, "Foundation Activities"], [10, "Foundation Activities"],
  [11, "Education"], [12, "Education"], [13, "Education"], [14, "Volunteers"],
  [15, "Volunteers"], [16, "Volunteers"], [17, "Foundation Activities"],
  [18, "Volunteers"], [19, "Volunteers"], [20, "Events"], [21, "Events"],
  [22, "Events"], [23, "Spiritual / Community Seva"], [24, "Events"], [25, "Events"],
  [26, "Events"], [27, "Spiritual / Community Seva"], [28, "Healthcare"], [29, "Events"],
  [30, "Healthcare"], [31, "Healthcare"], [32, "Healthcare"], [33, "Child Welfare"],
  [34, "Annadanam"], [35, "Annadanam"], [36, "Annadanam"], [37, "Child Welfare"],
  [38, "Child Welfare"], [39, "Healthcare"], [40, "Healthcare"], [43, "Foundation Activities"],
  [45, "Education"], [46, "Education"], [47, "Education"], [48, "Education"],
  [49, "Education"], [50, "Education"], [51, "Education"], [52, "Education"],
  [53, "Education"], [54, "Education"], [56, "Foundation Activities"],
  [57, "Foundation Activities"], [58, "Foundation Activities"], [59, "Foundation Activities"],
  [60, "Foundation Activities"], [61, "Foundation Activities"], [62, "Foundation Activities"],
  [63, "Foundation Activities"], [64, "Events"], [66, "Spiritual / Community Seva"],
  [67, "Events"], [68, "Spiritual / Community Seva"], [69, "Child Welfare"],
  [70, "Child Welfare"], [71, "Child Welfare"], [72, "Events"], [73, "Events"],
  [74, "Education"],
];

export const foundationPhotoCatalog = definitions.map(([id, category]) => createPhoto(id, category));

const byId = new Map(foundationPhotoCatalog.map((photo) => [photo.id, photo]));

function programPhoto(id: number, alt: string, caption: string): FoundationPhoto {
  const photo = byId.get(id);
  if (!photo) throw new Error(`Missing foundation photo ${id}`);
  return { ...photo, alt, caption };
}

export const foundationProgramPhotos = {
  education: [
    programPhoto(5, "School building and campus activity", "School campus activity captured during Foundation service."),
    programPhoto(13, "Volunteer painting an educational school mural", "School mural painting activity."),
    programPhoto(47, "Participants painting a school mural", "School improvement activity captured during Foundation service."),
    programPhoto(50, "Participants working on a school mural", "School improvement activity captured during Foundation service."),
    programPhoto(52, "School mural painting activity", "School improvement activity captured during Foundation service."),
    programPhoto(74, "Volunteers painting an educational mural", "School improvement activity captured during Foundation service."),
  ],
  healthcare: [
    programPhoto(28, "Healthcare team outside a primary health centre", "Healthcare camp activity."),
    programPhoto(30, "People receiving care at a healthcare camp", "Healthcare camp activity."),
    programPhoto(39, "Healthcare team outside a primary health centre", "Healthcare camp activity."),
    programPhoto(40, "People at a healthcare camp", "Healthcare camp activity."),
    programPhoto(32, "Healthcare camp registration activity", "Healthcare camp activity."),
  ],
  annadanam: [
    programPhoto(34, "People receiving food from volunteers", "Food distribution activity."),
    programPhoto(35, "Volunteers serving food", "Food distribution activity."),
    programPhoto(36, "Community members eating a served meal", "Food distribution activity."),
    programPhoto(38, "Children participating in a community activity", "Children participating in a Foundation/community activity."),
  ],
  childWelfare: [
    programPhoto(33, "Children participating in a community activity", "Children participating in a Foundation/community activity."),
    programPhoto(37, "Children gathered during a community activity", "Children participating in a Foundation/community activity."),
    programPhoto(38, "Children participating in a community activity", "Children participating in a Foundation/community activity."),
    programPhoto(69, "Schoolchildren gathered in a community setting", "Children participating in a Foundation/community activity."),
    programPhoto(70, "Schoolchildren participating in an activity", "Children participating in a Foundation/community activity."),
    programPhoto(71, "Schoolchildren gathered on a campus", "Children participating in a Foundation/community activity."),
  ],
  spiritualSeva: [
    programPhoto(27, "Community and spiritual activity", "Community and spiritual activity."),
    programPhoto(66, "Community activity with greenery", "Community activity captured during Foundation service."),
    programPhoto(68, "Community planting activity", "Community activity captured during Foundation service."),
    programPhoto(23, "Community and spiritual activity", "Community and spiritual activity."),
  ],
  volunteers: [
    programPhoto(7, "Foundation volunteers participating in a community activity", "Foundation volunteers participating in a community activity."),
    programPhoto(15, "Foundation volunteers gathered at a school activity", "Foundation volunteers participating in a community activity."),
    programPhoto(16, "Foundation volunteers gathered at a school activity", "Foundation volunteers participating in a community activity."),
    programPhoto(18, "Foundation volunteers holding certificates", "Foundation volunteers participating in a community activity."),
    programPhoto(19, "Foundation volunteers holding certificates", "Foundation volunteers participating in a community activity."),
  ],
  events: [
    programPhoto(25, "Community procession and event activity", "Community activity captured during a Foundation event."),
    programPhoto(29, "Formal Foundation event presentation", "Community activity captured during a Foundation event."),
    programPhoto(64, "Formal community event presentation", "Community activity captured during a Foundation event."),
    programPhoto(67, "School and community event activity", "Community activity captured during a Foundation event."),
    programPhoto(72, "Community gathering with seated participants", "Community activity captured during a Foundation event."),
    programPhoto(73, "Community gathering and presentation", "Community activity captured during a Foundation event."),
  ],
};

export const foundationPhotoById = byId;