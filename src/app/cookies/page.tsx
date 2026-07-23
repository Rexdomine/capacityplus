import type { Metadata } from "next";
import { LegalReview } from "@/components/legal-review";
import { legalDocuments } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie policy",
  robots: { index: false, follow: false },
};
export default function CookiesPage() {
  return <LegalReview document={legalDocuments.cookies} />;
}
