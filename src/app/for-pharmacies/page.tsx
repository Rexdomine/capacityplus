import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience-page";
import { audiencePages } from "@/content/audience-pages";

export const metadata: Metadata = {
  title: "For pharmacies",
  description:
    "Structured hypertension referrals for local community pharmacies.",
  alternates: { canonical: "/for-pharmacies" },
};

export default function ForPharmaciesPage() {
  return (
    <AudiencePage
      content={audiencePages.pharmacies}
      image={{
        src: "/images/pharmacy-blood-pressure-appointment.webp",
        alt: "Conceptual scene of a community pharmacist preparing a blood-pressure appointment",
      }}
    />
  );
}
