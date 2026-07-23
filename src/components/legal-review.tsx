import type { LegalDocument } from "@/content/legal";

export function LegalReview({ document }: { document: LegalDocument }) {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Review state</p>
          <h1>{document.title}</h1>
          <p className="lede">{document.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <div className="review-notice">
            <h2>Not approved for publication</h2>
            <p>
              Final approved policy must be supplied before publication. This
              protected-preview route is marked noindex and does not present
              incomplete material as legal advice.
            </p>
            <h3>Client input required</h3>
            <ul>
              {document.requiredInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
