import type { Metadata } from "next";
import { LegalReview } from "@/components/legal-review";
import { legalDocuments } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false, follow: false },
};
export default function PrivacyPage() {
  return <LegalReview document={legalDocuments.privacy} />;
}
