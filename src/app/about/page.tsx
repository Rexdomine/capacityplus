import type { Metadata } from "next";
import Image from "next/image";
import { BookCallLink } from "@/components/site-sections";

export const metadata: Metadata = {
  title: "About Capacity+",
  description:
    "Meet the team behind Capacity+ and learn how we coordinate governed GP–community-pharmacy pathways while preserving GP clinical oversight.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Onosenadia (Os) Joseph-Ebare",
    role: "Founder, Capacity+",
    image: "/images/team/os-joseph-ebare.webp",
    objectPosition: "50% 36%",
    bio: (
      <>
        <p>
          Os is a pharmacist trained at King&apos;s College London. His work
          spans the pharmaceutical industry and public health, including
          national antimicrobial-resistance campaign work.
        </p>
        <p>
          He founded Capacity+ to remove friction from primary care rather than
          add another platform. His focus is practical coordination between GP
          practices and community pharmacy, with clear responsibilities and
          visible outcomes.
        </p>
      </>
    ),
  },
  {
    name: "Radha Muthusamy",
    role: "Data Protection Officer",
    image: "/images/team/radha-muthusamy.webp",
    objectPosition: "50% 50%",
    bio: (
      <>
        <p>
          Radha is a regulatory compliance consultant specialising in data
          protection, privacy, information security and risk governance. She
          holds a Fellowship in Information Privacy and the CIPP/E, CIPM, CISM,
          CISA and CRISC credentials.
        </p>
        <p>
          Her work includes data governance, policy, privacy, security and
          internal audit across healthcare and the NHS, banking, telecoms,
          justice, higher education, technology and charities. She has led data
          protection assessments and cross-functional governance frameworks.
        </p>
        <p>
          Her wider regulatory experience includes anti-money laundering and
          counter-terrorist financing, IFRS 9 financial reporting, and BCBS 239
          risk-data aggregation and reporting.
        </p>
      </>
    ),
  },
  {
    name: "Ben Paddick",
    role: "IT Delivery Partner",
    image: "/images/team/ben-paddick.webp",
    objectPosition: "50% 50%",
    bio: (
      <>
        <p>
          Ben brings more than 20 years of IT experience across construction,
          legal services, telecommunications and technology consultancy. He
          delivers strategic objectives through high-performing technical teams.
        </p>
        <p>
          His work combines project delivery and mentoring with an
          entrepreneurial, big-picture approach. He adapts technology to complex
          business problems while maintaining a practical understanding across
          technical and organisational levels.
        </p>
      </>
    ),
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero about-hero">
        <div className="container narrow">
          <p className="eyebrow">About Capacity+</p>
          <h1>The team behind coordinated local pathways</h1>
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

      <section className="section team-section" aria-labelledby="team-title">
        <div className="container">
          <div className="team-heading narrow">
            <p className="eyebrow">Our team</p>
            <h2 id="team-title">Experience around the whole pathway</h2>
            <p className="lede">
              Clinical context, information governance and technical delivery
              inform how Capacity+ approaches each local partnership.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <article className="team-card" key={member.name}>
                <Image
                  className="team-photo"
                  src={member.image}
                  width={640}
                  height={640}
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 42vw, calc(100vw - 2rem)"
                  style={{ objectPosition: member.objectPosition }}
                  alt={member.name}
                />
                <div className="team-card-body">
                  <p className="team-role">{member.role}</p>
                  <h3>{member.name}</h3>
                  {member.bio}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
