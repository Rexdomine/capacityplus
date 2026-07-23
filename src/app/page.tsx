import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookCallLink,
  ClinicalResponsibility,
  EvidenceStrip,
  FinalCta,
} from "@/components/site-sections";

export const metadata: Metadata = {
  title: "Integrated GP and community pharmacy pathways",
  description:
    "Capacity+ coordinates integrated GP–community-pharmacy working to increase primary-care capacity.",
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Integrated primary care</p>
            <h1>More capacity through coordinated local care</h1>
            <p className="lede">
              Capacity+ coordinates integrated GP–community-pharmacy working to
              increase primary-care capacity.
            </p>
            <div className="actions">
              <BookCallLink />
              <Link className="text-link" href="/how-it-works">
                See how it works <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <Image
            className="hero-image"
            src="/images/flow-of-care.jpg"
            width={720}
            height={520}
            priority
            alt="Primary care professionals working together around a care pathway"
          />
        </div>
      </section>

      <EvidenceStrip />

      <section className="section" aria-labelledby="one-pathway">
        <div className="container split">
          <div>
            <p className="eyebrow">One coordinated pathway</p>
            <h2 id="one-pathway">
              Make the best use of skills across primary care
            </h2>
          </div>
          <div>
            <p>
              Capacity+ connects referral, delivery and outcome workflows so
              each organisation can act with clarity. Hypertension case-finding
              and ambulatory blood pressure monitoring (ABPM) are the proven
              backbone today—not the limit of the model.
            </p>
            <p className="statement">
              Transparent by design. Every referral. Every outcome. Fully
              trackable.
            </p>
          </div>
        </div>
      </section>

      <section className="section tinted" aria-labelledby="audiences">
        <div className="container">
          <p className="eyebrow">Built for local systems</p>
          <h2 id="audiences">Shared value across the partnership</h2>
          <div className="cards three">
            <article>
              <h3>GP practices</h3>
              <p>
                Release clinical time while retaining oversight of diagnosis,
                prescribing and patient care.
              </p>
              <Link className="text-link" href="/for-gp-practices">
                For GP practices <span aria-hidden="true">→</span>
              </Link>
            </article>
            <article>
              <h3>Community pharmacies</h3>
              <p>
                Receive structured referrals and deliver eligible activity under
                NHS service specifications.
              </p>
            </article>
            <article>
              <h3>NHS commissioners</h3>
              <p>
                Support consistent pathways with visible referral and outcome
                information across local teams.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <ClinicalResponsibility />
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
