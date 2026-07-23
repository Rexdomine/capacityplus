import type { Metadata } from "next";
import {
  ClinicalResponsibility,
  EvidenceStrip,
  FinalCta,
} from "@/components/site-sections";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how Capacity+ coordinates referrals, community-pharmacy delivery, outcomes and clinical oversight.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    number: "01",
    title: "Agree the pathway",
    text: "The GP practice and community pharmacy establish eligibility, hand-offs and escalation routes around NHS service specifications.",
  },
  {
    number: "02",
    title: "Coordinate referral",
    text: "Capacity+ supports a clear referral workflow so the right information reaches the right team at the right point.",
  },
  {
    number: "03",
    title: "Deliver in pharmacy",
    text: "The community pharmacy provides eligible clinical activity under the relevant NHS service specification.",
  },
  {
    number: "04",
    title: "Return the outcome",
    text: "Outcomes are returned into the agreed pathway, supporting GP oversight and a traceable patient journey.",
  },
];

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">How it works</p>
          <h1>A clear route from referral to outcome</h1>
          <p className="lede">
            Capacity+ coordinates the operational pathway around GP and
            community-pharmacy teams, reducing ambiguity without moving clinical
            accountability.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section tinted">
        <div className="container split">
          <div>
            <p className="eyebrow">Current backbone</p>
            <h2>Proven through hypertension case-finding and ABPM</h2>
          </div>
          <div>
            <p>
              The current pathway experience starts with hypertension
              case-finding and ambulatory blood pressure monitoring. The
              coordination model is designed to support broader primary-care
              capacity opportunities where local services and governance allow.
            </p>
            <p className="statement">
              Transparent by design. Every referral. Every outcome. Fully
              trackable.
            </p>
          </div>
        </div>
      </section>
      <EvidenceStrip />
      <section className="section">
        <div className="container narrow">
          <ClinicalResponsibility />
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
