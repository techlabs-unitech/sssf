import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/child-welfare");

export default function ChildWelfarePage() {
  return <ProgramDetailPage program={programMap.get("child-welfare")!} />;
}
