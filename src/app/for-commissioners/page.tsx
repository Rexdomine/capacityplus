import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience-page";
import { audiencePages } from "@/content/audience-pages";

export const metadata: Metadata = {
  title: "For commissioners",
  description:
    "Integrated primary care pathways designed to scale across a neighbourhood.",
  alternates: { canonical: "/for-commissioners" },
};

export default function ForCommissionersPage() {
  return (
    <AudiencePage
      content={audiencePages.commissioners}
      image={{
        src: "/images/neighbourhood-primary-care-planning.webp",
        alt: "Conceptual scene of primary-care leaders planning a neighbourhood pathway",
      }}
    />
  );
}
