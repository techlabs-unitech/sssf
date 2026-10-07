import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/annadanam");

export default function AnnadanamPage() {
  return <ProgramDetailPage program={programMap.get("annadanam")!} />;
}
