import type { Metadata } from "next";
import { LegalReview } from "@/components/legal-review";
import { legalDocuments } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: false, follow: false },
};
export default function TermsPage() {
  return <LegalReview document={legalDocuments.terms} />;
}
