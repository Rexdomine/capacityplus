import type { Metadata } from "next";
import Link from "next/link";
import {
  BookCallLink,
  ClinicalResponsibility,
  EvidenceStrip,
  FinalCta,
} from "@/components/site-sections";

export const metadata: Metadata = {
  title: "For GP practices",
  description:
    "Explore a governed, trackable approach to integrated GP–community-pharmacy working with Capacity+.",
  alternates: { canonical: "/for-gp-practices" },
};

export default function ForGpPracticesPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">For GP practices</p>
          <h1>Release capacity without losing clinical oversight</h1>
          <p className="lede">
            Build a structured working relationship with community pharmacy
            around eligible NHS services, with referrals and outcomes
            coordinated end to end.
          </p>
          <div className="actions">
            <BookCallLink />
            <Link className="text-link" href="/how-it-works">
              Understand the pathway <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">What the pathway supports</p>
          <h2>Practical coordination for busy teams</h2>
          <div className="cards three">
            <article>
              <h3>Defined hand-offs</h3>
              <p>
                Agree eligibility, referral information, escalation and outcome
                routes before activity begins.
              </p>
            </article>
            <article>
              <h3>Visible progress</h3>
              <p>
                Follow referrals and outcomes through the shared operational
                pathway.
              </p>
            </article>
            <article>
              <h3>Appropriate roles</h3>
              <p>
                Use community-pharmacy capability while the GP practice retains
                diagnosis, prescribing and oversight.
              </p>
            </article>
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
