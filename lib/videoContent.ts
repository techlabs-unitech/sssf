export type VideoRecord = {
  title: string;
  description: string;
  category: string;
  youtubeUrl?: string;
  thumbnail: string;
  date?: string;
  program: string;
  status: string;
};

export const videosContent: VideoRecord[] = [];

export const videoShowcaseStatus = "Videos will be added here as verified foundation activities are documented.";
