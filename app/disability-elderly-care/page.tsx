import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/disability-elderly-care");

export default function DisabilityElderlyCarePage() {
  return <ProgramDetailPage program={programMap.get("disability-elderly-care")!} />;
}
