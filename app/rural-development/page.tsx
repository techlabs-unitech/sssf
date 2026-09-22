import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/rural-development");

export default function RuralDevelopmentPage() {
  return <ProgramDetailPage program={programMap.get("rural-development")!} />;
}
