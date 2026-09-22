import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/environment-protection");

export default function EnvironmentProtectionPage() {
  return <ProgramDetailPage program={programMap.get("environment-protection")!} />;
}
