import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/disaster-relief");

export default function DisasterReliefPage() {
  return <ProgramDetailPage program={programMap.get("disaster-relief")!} />;
}
