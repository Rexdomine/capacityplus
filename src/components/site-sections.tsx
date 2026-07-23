import Link from "next/link";

export const BOOK_A_CALL = "Book a call";

export function BookCallLink({
  className = "button-primary",
}: {
  className?: string;
}) {
  return (
    <Link className={className} href="/contact">
      {BOOK_A_CALL}
    </Link>
  );
}

export function EvidenceStrip() {
  return (
    <section className="evidence" aria-labelledby="evidence-title">
      <div className="container">
        <p className="eyebrow">Early pathway evidence</p>
        <h2 id="evidence-title">
          Early evidence from a practical starting point
        </h2>
        <p className="evidence-context">
          Results from the single-site St Giles pilot, serving approximately
          8,000 patients in year one:
        </p>
        <dl className="metrics">
          <div>
            <dt>150+</dt>
            <dd>ABPMs delivered</dd>
          </div>
          <div>
            <dt>Approximately 75</dt>
            <dd>GP clinical hours released</dd>
          </div>
          <div>
            <dt>Approximately £8,000</dt>
            <dd>NHS revenue generated for the partner pharmacy</dd>
          </div>
        </dl>
        <p className="fine-print">
          Pilot results are site-specific and are not a guarantee of future
          outcomes.
        </p>
      </div>
    </section>
  );
}

export function ClinicalResponsibility() {
  return (
    <aside
      className="clinical-boundary"
      aria-labelledby="clinical-boundary-title"
    >
      <h2 id="clinical-boundary-title">Clear clinical responsibility</h2>
      <p>
        Capacity+ coordinates the pathway. Community pharmacy delivers clinical
        activity under NHS service specifications. Diagnosis, prescribing,
        oversight and liability remain with the GP practice. Capacity+ does not
        independently diagnose, prescribe or deprescribe.
      </p>
    </aside>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container narrow">
        <p className="eyebrow">Start with the pathway pressure you can see</p>
        <h2 id="final-cta-title">
          Explore what integrated working could release
        </h2>
        <p>
          Tell us where capacity is constrained and we can discuss a practical
          starting point.
        </p>
        <BookCallLink />
      </div>
    </section>
  );
}
