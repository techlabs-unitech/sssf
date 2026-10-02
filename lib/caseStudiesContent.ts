export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  program?: string;
  location?: string;
  year?: string;
  problem: string;
  intervention: string;
  resources?: string[];
  implementation?: string;
  beforeState?: string;
  afterState?: string;
  result?: string;
  testimonial?: string;
  photos?: string[];
  videos?: string[];
  published: boolean;
};

export const caseStudiesContent: CaseStudy[] = [];

export const caseStudiesStatus = "Case studies will be published as documented projects are verified.";
