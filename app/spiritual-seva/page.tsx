import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProgramDetailPage from "@/components/ProgramDetailPage";
import { programMap } from "@/lib/programsContent";

export const metadata: Metadata = pageMetadata("/spiritual-seva");

export default function SpiritualSevaPage() {
  return <ProgramDetailPage program={programMap.get("spiritual-seva")!} />;
}
