import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience-page";
import { audiencePages } from "@/content/audience-pages";

export const metadata: Metadata = {
  title: "For GP practices",
  description:
    "Explore a governed, trackable approach to integrated GP–community-pharmacy working with Capacity+.",
  alternates: { canonical: "/for-gp-practices" },
};

export default function ForGpPracticesPage() {
  return (
    <AudiencePage
      content={audiencePages.gpPractices}
      image={{
        src: "/images/gp-practice-hypertension-pathway.webp",
        alt: "Conceptual scene of a GP reviewing a blood-pressure care pathway",
      }}
    />
  );
}
