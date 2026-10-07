export type ImpactMetricStatus =
  | "verified"
  | "pending";

export type ImpactMetric = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  period?: string;
  location?: string;
  program?: string;
  context?: string;
  status: ImpactMetricStatus;
};

export const impactMetrics: ImpactMetric[] = [];
