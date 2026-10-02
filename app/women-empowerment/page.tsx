import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/women-empowerment");

export default function WomenEmpowermentPage() {
  return <ProgramDetailPage program={programMap.get("women-empowerment")!} />;
}
