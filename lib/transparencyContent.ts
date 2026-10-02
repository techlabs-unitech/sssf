export type VerificationStatus = "verified" | "pending" | "not-published";

export type FinancialDocumentCategory =
  | "annual-report"
  | "audit"
  | "income-expenditure"
  | "balance-sheet"
  | "supporting-financial-record"
  | "project-report"
  | "utilization"
  | "compliance";

export type FinancialDocument = {
  id: string;
  title: string;
  year?: string;
  category: FinancialDocumentCategory;
  description?: string;
  href?: string;
  sourceFilenames?: string[];
  status: VerificationStatus;
};

export type FundCategory = {
  title: string;
  description: string;
};

export type TransparencyOverview = {
  heroTitle: string;
  heroDescription: string;
  whereDonationsSupportTitle: string;
  whereDonationsSupportDescription: string;
  howFundsMayBeUsedTitle: string;
  howFundsMayBeUsedDescription: string;
  allocationTitle: string;
  allocationDescription: string;
  allocationPending: string;
  costExamplesTitle: string;
  costExamplesDescription: string;
  costExamplesPending: string;
  donationUtilizationTitle: string;
  donationUtilizationDescription: string;
  targetsTitle: string;
  targetsDescription: string;
  targetsPending: string;
};

export const transparencyOverview: TransparencyOverview = {
  heroTitle: "Transparency & Accountability",
  heroDescription:
    "The foundation aims to share clear information about its work, donation use, and public accountability. Financial documents and project records will be published where verified information is available.",
  whereDonationsSupportTitle: "Where donations support our work",
  whereDonationsSupportDescription:
    "Donations may support service categories such as education, healthcare, food distribution, child welfare, women empowerment, disaster relief, spiritual/community seva, and necessary administration and operations. These are activity categories only, and future utilization records will describe verified allocation where available.",
  howFundsMayBeUsedTitle: "How funds may be used",
  howFundsMayBeUsedDescription:
    "Funds may be used for food and essential supplies, medicines and medical camp materials, educational materials, school improvement resources, beneficiary support, transportation, event and logistics expenses, and necessary administrative and operational needs. This description is a framework for public communication and should not imply that every donation is spent on every category.",
  allocationTitle: "Program vs administrative spending",
  allocationDescription:
    "Financial allocation data will be published here after verification.",
  allocationPending: "Financial allocation data will be published here after verification.",
  costExamplesTitle: "Verified cost examples",
  costExamplesDescription:
    "Verified cost examples will be published here as supporting records become available.",
  costExamplesPending: "Verified cost examples will be published here as supporting records become available.",
  donationUtilizationTitle: "Donation utilization",
  donationUtilizationDescription:
    "This represents the intended reporting pathway from donation receipt through allocation, program delivery, supporting records, and utilization reporting. It is a transparency framework and does not imply that every step is already publicly documented.",
  targetsTitle: "Annual targets",
  targetsDescription:
    "Annual targets will be published here.",
  targetsPending: "Annual targets will be published here.",
};

export const fundUtilizationCategories: FundCategory[] = [
  { title: "Education & School Support", description: "Education assistance and school-linked resources." },
  { title: "Healthcare & Medical Camps", description: "Health camps, medicines, and related outreach support." },
  { title: "Annadanam / Food Distribution", description: "Food supply and meal distribution support." },
  { title: "Child Welfare", description: "Child-focused care and support activities." },
  { title: "Women Empowerment", description: "Women-focused welfare and skills support areas." },
  { title: "Disaster Relief", description: "Emergency relief and supporting field response." },
  { title: "Spiritual / Community Seva", description: "Community gathering and service-oriented activities." },
  { title: "Administration & Operations", description: "Operational and organizational support." },
];

export const howFundsMayBeUsed = [
  "Food and essential supplies",
  "Medicines and medical camp materials",
  "Educational materials",
  "School improvement resources",
  "Beneficiary support",
  "Transportation",
  "Event and logistics expenses",
  "Necessary administrative and operational expenses",
];

export const financialDocuments: FinancialDocument[] = [
  {
    id: "income-expenditure-2021-22",
    title: "2021-22 Financial Statements",
    year: "FY 2021-22",
    category: "income-expenditure",
    description: "Two-page statement containing the receipt and payment account, income and expenditure account, and balance sheet for the year ending 31 March 2022.",
    href: "/documents/financial/financial-statements-2021-22.pdf",
    sourceFilenames: ["2022 SSSF B L.pdf"],
    status: "verified",
  },
  {
    id: "balance-sheet-2024",
    title: "2024 Income & Expenditure and Balance Sheet",
    year: "FY 2023-24",
    category: "balance-sheet",
    description: "Source document containing the income and expenditure account and balance sheet as on 31 March 2024.",
    href: "/documents/financial/2024-income-expenditure-and-balance-sheet.pdf",
    sourceFilenames: ["2024 balance sheet 2.pdf"],
    status: "verified",
  },
  {
    id: "receipts-payments-2024",
    title: "2024 Receipts & Payments Account",
    year: "FY 2023-24",
    category: "supporting-financial-record",
    description: "Receipt and payment account for the year ending 31 March 2024.",
    href: "/documents/financial/2024-receipts-and-payments-account.pdf",
    sourceFilenames: ["2024 balance sheet .pdf"],
    status: "verified",
  },
  {
    id: "financial-statement-2025",
    title: "2025 Financial Statement",
    year: "Source period shown in document",
    category: "supporting-financial-record",
    description: "Financial statement document supplied under the 20251 filename.",
    href: "/documents/financial/2025-financial-statement.pdf",
    sourceFilenames: ["20251.pdf", "20251 (1).pdf"],
    status: "verified",
  },
  {
    id: "audit-document-2026",
    title: "2026 Audit Document",
    year: "Source period shown in document",
    category: "audit",
    description: "Original two-page financial document supplied under the SSSF 2026 AUDIT filename.",
    href: "/documents/financial/2026-audit-document.pdf",
    sourceFilenames: ["SSSF 2026 AUDIT.pdf", "SSSF 2026 AUDIT (1).pdf"],
    status: "verified",
  },
  {
    id: "account-period-2025-26",
    title: "Account-Period Financial Record",
    year: "01 April 2025 - 31 March 2026",
    category: "supporting-financial-record",
    description: "Account-period document supplied for the period 01 April 2025 to 31 March 2026.",
    href: "/documents/financial/account-period-2025-26.pdf",
    sourceFilenames: ["99XXXXX391_01-04-2025_31-03-2026.pdf"],
    status: "verified",
  },
];

export const financialDocumentCategoryLabels: Record<FinancialDocumentCategory, string> = {
  "annual-report": "Annual reports",
  audit: "Audited financial statements",
  "income-expenditure": "Income & expenditure statements",
  "balance-sheet": "Balance sheets",
  "supporting-financial-record": "Supporting financial records",
  "project-report": "Major project reports",
  utilization: "Donation / utilization reports",
  compliance: "Compliance & legal documents",
};

export const verificationLabels: Record<VerificationStatus, string> = {
  verified: "VERIFIED",
  pending: "PUBLICATION PENDING",
  "not-published": "NOT PUBLISHED",
};

export const documentStatusMap: Record<VerificationStatus, string> = {
  verified: "Verified information / document is publicly linked",
  pending: "Information / document is intended to be published but is not connected yet",
  "not-published": "No public document is currently available",
};
