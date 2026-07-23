import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a call with Capacity+ to discuss integrated GP–community-pharmacy working in your local pathway.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Book a call</p>
          <h1>Start with your local capacity challenge</h1>
          <p className="lede">
            Share a short, non-clinical overview of your organisation and the
            pathway you want to explore.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>What we can discuss</h2>
            <p>
              We can explore current workflow pressure, local
              GP–community-pharmacy relationships and whether a coordinated
              pathway is appropriate.
            </p>
            <p className="statement">
              Do not submit patient-identifiable or clinical information through
              this form.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
