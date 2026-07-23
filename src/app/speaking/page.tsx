import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking",
  robots: { index: false, follow: false },
};

export default function SpeakingPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Speaking</p>
          <h1>This page is under client review</h1>
          <p className="lede">
            Speaking content is not part of the current website release scope.
          </p>
        </div>
      </section>
    </main>
  );
}
