import Image from "next/image";
import Link from "next/link";
import type { AudiencePage as AudiencePageContent } from "@/content/audience-pages";

interface AudiencePageProps {
  content: AudiencePageContent;
  image: { src: string; alt: string };
}

export function AudiencePage({ content, image }: AudiencePageProps) {
  return (
    <main id="main-content" className="audience-page">
      <section className="page-hero audience-hero">
        <div className="container audience-hero-grid">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="lede">{content.introduction}</p>
            <div className="actions">
              <Link className="button-primary" href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Link>
              <Link className="text-link" href={content.secondaryCta.href}>
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>
          <Image
            className="audience-hero-image"
            src={image.src}
            width={1200}
            height={800}
            priority
            alt={image.alt}
          />
        </div>
      </section>

      <div className="audience-sections">
        {content.sections.map((section) => (
          <section className="section audience-section" key={section.heading}>
            <div className="container narrow">
              <h2>{section.heading}</h2>
              {!section.bulletsBeforeParagraphs && (
                <p>{section.paragraphs[0]}</p>
              )}
              {section.table && (
                // biome-ignore-start lint/a11y: Keyboard users need a focusable named region to scroll the overflowing table.
                <div
                  className="table-scroll"
                  tabIndex={0}
                  role="region"
                  aria-label={`${section.heading} table`}
                >
                  <table>
                    <thead>
                      <tr>
                        {section.table.headers.map((header) => (
                          <th scope="col" key={header}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("-")}>
                          <th scope="row">{row[0]}</th>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                // biome-ignore-end lint/a11y: End table scroll region exception.
              )}
              {section.bullets && (
                <ul className="evidence-list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {(section.bulletsBeforeParagraphs
                ? section.paragraphs
                : section.paragraphs.slice(1)
              ).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.footnote && (
                <p className="footnote">{section.footnote}</p>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="final-cta audience-final-cta">
        <div className="container narrow">
          <h2>{content.finalCta.heading}</h2>
          {content.finalCta.body && <p>{content.finalCta.body}</p>}
          <Link className="button-primary" href={content.finalCta.href}>
            {content.finalCta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
