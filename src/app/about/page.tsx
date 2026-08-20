import type { Metadata } from "next";
import { BookCallLink } from "@/components/site-sections";

export const metadata: Metadata = {
  title: "About Capacity+",
  description:
    "Learn how Capacity+ coordinates governed GP–community-pharmacy pathways while preserving GP clinical oversight.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero about-hero">
        <div className="container narrow">
          <p className="eyebrow">About Capacity+</p>
          <h1>Coordinating accountable local pathways</h1>
          <p className="lede">
            Capacity+ brings operational, clinical, governance and technology
            experience together to help GP practices and community pharmacies
            work as one accountable local pathway.
          </p>
          <BookCallLink />
        </div>
      </section>

      <section className="section" aria-labelledby="why-capacity-plus">
        <div className="container about-intro">
          <div>
            <p className="eyebrow">Why Capacity+</p>
            <h2 id="why-capacity-plus">Remove friction, not GP oversight</h2>
          </div>
          <div className="about-intro-copy">
            <p>
              Capacity+ coordinates suitable work between GP practices and
              community pharmacy, starting with hypertension case-finding and
              ambulatory blood pressure monitoring (ABPM). The pathway keeps GP
              oversight of diagnosis and treatment: Capacity+ coordinates the
              work but does not diagnose or prescribe.
            </p>
            <p>
              Capacity+ also supports independent stoma and catheter
              prescription review against the relevant ICB fair-usage policy.
              Reviews are delivered by registered pharmacy professionals within
              host-practice governance. Pharmacy technicians work to protocol,
              and any prescription change requires pharmacist or prescriber
              sign-off.
            </p>
          </div>
        </div>
      </section>

      <section
        className="evidence about-evidence"
        aria-labelledby="pilot-evidence"
      >
        <div className="container">
          <p className="eyebrow">Early pathway evidence</p>
          <h2 id="pilot-evidence">
            A practical starting point at St Giles Surgery
          </h2>
          <p className="evidence-context">
            These are year one results from the single-site St Giles pilot,
            serving approximately 8,000 patients.
          </p>
          <dl className="metrics">
            <div>
              <dt>150+</dt>
              <dd>150+ ABPMs delivered</dd>
            </div>
            <div>
              <dt>Approximately 75</dt>
              <dd>approximately 75 GP clinical hours released</dd>
            </div>
            <div>
              <dt>51 of 52</dt>
              <dd>
                51 of 52 patients completed the pathway without needing direct
                GP intervention
              </dd>
            </div>
          </dl>
          <p className="fine-print">
            Pilot results are site-specific and are not a guarantee of future
            outcomes. Capacity+ is building towards PCN-level delivery across
            South East London while preserving GP oversight of diagnosis and
            treatment.
          </p>
        </div>
      </section>
    </main>
  );
}
