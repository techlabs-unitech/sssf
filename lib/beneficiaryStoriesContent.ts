export type BeneficiaryStory = {
  id: string;
  slug?: string;
  firstName: string;
  age?: number;
  location?: string;
  program?: string;
  challenge: string;
  assistance: string;
  outcome?: string;
  quote?: string;
  image?: string;
  videoUrl?: string;
  consentStatus?: "verified" | "pending";
  year?: string;
  published: boolean;
};

export const beneficiaryStoriesContent: BeneficiaryStory[] = [];

export const beneficiaryStoriesStatus = "Documented beneficiary stories will be published with appropriate consent and verified project details.";
