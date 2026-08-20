import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import sitemap from "../src/app/sitemap";
import { AudiencePage as AudiencePageView } from "../src/components/audience-page";
import {
  type AudiencePage,
  audiencePages,
} from "../src/content/audience-pages";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

const renderedText = (html: string) =>
  normalize(
    html
      .replace(/<[^>]+>/g, " ")
      .replaceAll("&amp;", "&")
      .replaceAll("&#x27;", "'")
      .replaceAll("&quot;", '"'),
  );

const expected: Record<string, AudiencePage> = {
  gpPractices: {
    slug: "/for-gp-practices",
    eyebrow: "Capacity that leaves your list",
    title: "Hypertension case-finding that runs without your clinical time",
    introduction:
      "Capacity+ connects your practice to a local community pharmacy so blood pressure work is delivered, recorded and returned — while diagnosis, prescribing and oversight stay with you.",
    primaryCta: { label: "Book a call", href: "/contact" },
    secondaryCta: { label: "See how it works →", href: "/how-it-works" },
    sections: [
      {
        heading: "Work that leaves the practice, not work that moves sideways",
        paragraphs: [
          "Delegating usually means someone in the practice still owns the chasing, the booking and the follow-up. That isn't capacity, it's redistribution.",
          "In the St Giles pilot, 51 of 52 patients were managed end to end without GP involvement. Patients were identified, invited, booked, seen at the pharmacy, and their results returned to the practice record. Approximately 75 hours of GP clinical time were released across the year.",
          "The work left the list. It didn't move down the corridor.",
        ],
      },
      {
        heading:
          "Supporting your QOF position on hypertension and cardiovascular disease",
        paragraphs: [
          "Five QOF indicators depend directly on getting blood pressure measured, recorded and controlled: HYP010 and HYP011 for the hypertension register, CD001 and CD002 for patients with coronary heart disease, stroke or TIA, and BP002 for routine adult blood pressure recording.",
          "Together these carry 128 QOF points, worth approximately £29,000* in 2026/27.",
          "Capacity+ doesn't earn those points. Your practice does. What we do is remove the bottleneck: getting patients measured, getting ABPM done, and getting the reading back into your system so it counts.",
        ],
        table: {
          headers: ["Indicator", "What it measures", "Points"],
          rows: [
            ["HYP010", "Hypertension, under 80, BP 140/90 or less", "38"],
            ["HYP011", "Hypertension, 80+, BP 150/90 or less", "14"],
            ["CD001", "CHD, stroke or TIA, under 80, BP 140/90 or less", "41"],
            ["CD002", "CHD, stroke or TIA, 80+, BP 150/90 or less", "20"],
            ["BP002", "Patients 45+ with a BP recorded in five years", "15"],
            ["Total", "", "128"],
          ],
        },
        footnote:
          "* Value at an average-sized practice. QOF payments are adjusted for practice list size and disease prevalence, so the figure for your practice will differ. Based on the 2026/27 QOF point value of £227.95.",
      },
      {
        heading: "You keep clinical control",
        paragraphs: [
          "Community pharmacy delivers the appointment under NHS service specifications, using independently indemnified clinicians. Everything clinical stays with you:",
          "Capacity+ does not diagnose, prescribe or deprescribe. Concerning readings, safeguarding issues and urgent escalations come straight back to the practice.",
        ],
        bullets: [
          "Diagnosis",
          "Prescribing",
          "Treatment decisions",
          "Escalation and clinical oversight",
        ],
      },
      {
        heading: "It works inside the systems you already use",
        paragraphs: [
          "Referrals, bookings and outcomes flow through EMIS or SystmOne. There is no separate portal for your team to learn and no parallel record to reconcile. Patient invitations are sent by SMS, only where you've authorised them.",
        ],
      },
      {
        heading: "A standing relationship, reviewed quarterly",
        paragraphs: [
          "Every quarter your practice and the pharmacy meet to review how the pathway is performing and where it could extend further. This isn't a project that ends. It's how the two organisations work together from here.",
        ],
      },
      {
        heading: "Early evidence from a practical starting point",
        paragraphs: [
          "Results from the single-site St Giles pilot in South East London, serving approximately 8,000 patients in year one:",
          "Pilot results are site-specific and are not a guarantee of future outcomes.",
        ],
        bullets: [
          "150+ ABPMs delivered",
          "Approximately 75 GP clinical hours released",
          "51 of 52 patients managed without GP involvement",
        ],
      },
    ],
    finalCta: {
      heading: "Start with the pressure you can already see",
      body: "Tell us where capacity is most constrained and we can discuss a practical starting point.",
      label: "Book a call",
      href: "/contact",
    },
  },
  pharmacies: {
    slug: "/for-pharmacies",
    eyebrow: "Structured NHS activity",
    title: "Referrals that arrive because the practice is set up to send them",
    introduction:
      "Capacity+ builds your pharmacy into how a local GP practice runs its hypertension work, so eligible patients are identified and booked to you — rather than hoping they notice a poster.",
    primaryCta: { label: "Book a call", href: "/contact" },
    secondaryCta: { label: "See how it works →", href: "/how-it-works" },
    sections: [
      {
        heading: "The problem isn't the service. It's the patients.",
        paragraphs: [
          "You're already commissioned to deliver hypertension case-finding and ABPM. The difficulty is volume: walk-ins are unpredictable, and practices rarely have a reliable way of sending patients to you.",
          "Capacity+ fixes the supply side. Eligible patients are identified from the practice list, invited by SMS, and booked directly into your clinic slots. The work comes to you.",
          "In the St Giles pilot, the partner pharmacy generated approximately £8,000 in NHS revenue in year one from 150+ ABPMs and associated case-finding activity.",
        ],
      },
      {
        heading: "Recurring activity, not a one-off campaign",
        paragraphs: [
          "Hypertension case-finding repeats by design. Patients need re-checking annually, ABPM needs re-running, and new cohorts come onto the register continuously.",
          "That means the referral flow doesn't stop when a launch period ends. It becomes part of how the practice operates, which makes your pharmacy a standing part of that practice's clinical delivery rather than an occasional add-on.",
        ],
      },
      {
        heading: "What Capacity+ handles",
        paragraphs: ["You focus on delivering the appointment."],
        bullets: [
          "Patient identification and eligibility, agreed with the practice",
          "SMS invitations and booking, so appointments land in your diary",
          "The system link, so outcomes reach the practice record",
          "Reporting back to the practice, so your delivery is visible and credited",
          "A quarterly review with the practice, to develop the relationship further",
        ],
        bulletsBeforeParagraphs: true,
      },
      {
        heading: "A seat at the table with the practice",
        paragraphs: [
          "Every quarter you and the practice sit down together to review how the pathway is performing and where it could extend. That's a direct working relationship with the practice team, built on delivery they can see.",
          "For most pharmacies, that access is the hardest thing to get.",
        ],
      },
      {
        heading: "Your clinical independence is unchanged",
        paragraphs: [
          "You deliver under NHS service specifications, using your own professional judgement and your own indemnity. Capacity+ coordinates the pathway; it does not direct your clinical practice or take responsibility for it.",
          "You remain an independent data controller for the records associated with the services you deliver.",
        ],
      },
    ],
    finalCta: {
      heading:
        "See what a structured referral flow would mean for your pharmacy",
      label: "Book a call",
      href: "/contact",
    },
  },
  commissioners: {
    slug: "/for-commissioners",
    eyebrow: "Integrated primary care, at neighbourhood scale",
    title: "Making integrated neighbourhood working real, not just policy",
    introduction:
      "Capacity+ coordinates GP practices and community pharmacies into one working pathway, built to scale across a neighbourhood rather than stop at a single practice.",
    primaryCta: { label: "Book a call", href: "/contact" },
    secondaryCta: { label: "See how it works →", href: "/how-it-works" },
    sections: [
      {
        heading: "A structured relationship, not a referral scheme",
        paragraphs: [
          "Most GP-pharmacy working is informal. A practice refers when it remembers to, a pharmacy delivers when a patient turns up, and nothing connects the two beyond goodwill.",
          "Capacity+ replaces that with structure. Patients are identified from the practice list, invited, booked into pharmacy clinics, and outcomes are returned to the practice record. Every referral and every outcome is visible to both organisations.",
          "Every quarter, the practice and the pharmacy meet to review how the pathway is performing and where they can extend it. That standing review is what turns two separate organisations into one working team, and it is what makes this an integrated neighbourhood pathway rather than a service one party happens to buy from another.",
        ],
      },
      {
        heading: "Hypertension as the operational backbone",
        paragraphs: [
          "Hypertension case-finding is the starting point because it is recurring by design. Patients need re-checking, ABPM needs re-running, and cohorts need re-reviewing every year. That recurrence is what keeps the practice and pharmacy connected month after month, rather than for the length of a campaign.",
          "It also sits directly on the cardiovascular prevention agenda. The 10 Year Health Plan commits to a modern service framework for cardiovascular disease aimed at reducing premature deaths from heart disease and stroke by 25% over the next decade. Blood pressure detection and control is the most immediate primary care lever available against that ambition, and community pharmacy has the physical capacity that general practice does not.",
        ],
      },
      {
        heading: "Recovering unnecessary NHS spend",
        paragraphs: [
          "Alongside hypertension case-finding, Capacity+ is developing an independent appliance review model. Stoma and catheter prescriptions are checked against published fair-usage guidance to identify waste that accumulates through auto-ordering, accidental issue, and bulk repeat requests. Unlike medicines, appliances are rarely reviewed at all, so this spend builds up unchallenged.",
          "In the St Giles pilot, approximately £2,000 in unnecessary spend was identified across a 90-day review period.",
          "Capacity+ is building a partnership with CQC-registered clinical nurses to deliver these reviews independently, sitting entirely outside the companies that supply and dispense the appliances being reviewed. That independence is the point: an organisation that profits from dispensing volume has no reason to reduce it. Capacity+ has no such conflict.",
        ],
      },
      {
        heading: "Designed to scale, not to stay a pilot",
        paragraphs: [
          "The model is built for PCN and ICB level from the outset.",
          "A single practice proves the pathway works. The value for a commissioner is in replication: the same referral structure, the same governance, the same reporting, running across a neighbourhood with visible activity and outcome data at every site.",
          "Practice-by-practice adoption requires three things to align at once — a willing practice, a willing pharmacy, and access governance. Commissioning at neighbourhood level resolves all three together.",
        ],
      },
      {
        heading: "Clear clinical responsibility",
        paragraphs: [
          "Capacity+ coordinates the pathway. Community pharmacy delivers clinical activity under NHS service specifications, with independently indemnified clinicians. Diagnosis, prescribing, oversight and liability remain with the GP practice.",
          "Capacity+ does not diagnose, prescribe or deprescribe, and does not hold clinical responsibility for patient care.",
        ],
      },
      {
        heading: "Early evidence from a practical starting point",
        paragraphs: [
          "Results from the single-site St Giles pilot in South East London, serving approximately 8,000 patients in year one:",
          "This is what one practice looks like. Pilot results are site-specific and are not a guarantee of future outcomes.",
        ],
        bullets: [
          "150+ ABPMs delivered",
          "Approximately 75 GP clinical hours released",
          "51 of 52 patients managed without GP involvement",
          "Approximately £8,000 NHS revenue generated for the partner pharmacy*",
          "Approximately £2,000 unnecessary appliance spend identified across a 90-day review",
        ],
        footnote:
          "* Activity delivered under existing national NHS service specifications. This is not additional commissioner spend; it is existing NHS funding drawn down against activity that would otherwise go undelivered.",
      },
    ],
    finalCta: {
      heading: "Explore what this could release across your neighbourhood",
      body: "Tell us where capacity is most constrained and we can discuss a practical starting point.",
      label: "Book a call",
      href: "/contact",
    },
  },
};

test("audience page public copy and structure exactly match the approved contract", () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(audiencePages), (_key, value) =>
      typeof value === "string" ? normalize(value) : value,
    ),
    JSON.parse(JSON.stringify(expected), (_key, value) =>
      typeof value === "string" ? normalize(value) : value,
    ),
  );
});

test("every audience section renders its supplied content blocks in order", () => {
  for (const page of Object.values(audiencePages)) {
    const html = renderToStaticMarkup(
      createElement(AudiencePageView, {
        content: page,
        image: { src: "/test.webp", alt: "Test" },
      }),
    );
    const renderedSections = html.match(
      /<section class="section audience-section">.*?<\/section>/g,
    );

    assert.equal(renderedSections?.length, page.sections.length);
    page.sections.forEach((section, index) => {
      const text = renderedText(renderedSections?.[index] ?? "");
      const blocks = section.bulletsBeforeParagraphs
        ? [...(section.bullets ?? []), ...section.paragraphs]
        : [
            section.paragraphs[0],
            ...(section.table
              ? [section.table.headers[0], ...section.table.rows.flat()]
              : []),
            ...(section.bullets ?? []),
            ...section.paragraphs.slice(1),
            ...(section.footnote ? [section.footnote] : []),
          ];
      let previousPosition = -1;

      for (const block of blocks) {
        const position = text.indexOf(normalize(block), previousPosition + 1);
        assert.ok(
          position > previousPosition,
          `${page.slug} / ${section.heading}: ${JSON.stringify(block)} rendered out of order`,
        );
        previousPosition = position;
      }
    });
  }
});

test("table scroll regions expose accessible keyboard-scroll semantics", () => {
  for (const page of Object.values(audiencePages)) {
    const html = renderToStaticMarkup(
      createElement(AudiencePageView, {
        content: page,
        image: { src: "/test.webp", alt: "Test" },
      }),
    );
    const tableSections = page.sections.filter((section) => section.table);
    const tableScrollRegions = html.match(/<div class="table-scroll"[^>]*>/g);

    assert.equal(tableScrollRegions?.length ?? 0, tableSections.length);
    tableSections.forEach((section, index) => {
      const region = tableScrollRegions?.[index] ?? "";

      assert.match(region, /tabindex="0"/);
      assert.match(region, /role="region"/);
      assert.ok(
        region.includes(`aria-label="${section.heading} table"`),
        `${page.slug} / ${section.heading}: table region lacks its heading-derived accessible label`,
      );
    });
  }
});

test("audience navigation and sitemap contain all approved routes", async () => {
  const [header, footer] = await Promise.all([
    readFile("src/components/header.tsx", "utf8"),
    readFile("src/components/footer.tsx", "utf8"),
  ]);
  const routes = [
    ["/for-gp-practices", "For GP practices"],
    ["/for-pharmacies", "For pharmacies"],
    ["/for-commissioners", "For commissioners"],
  ];
  for (const [href, label] of routes) {
    assert.ok(header.includes(href) && header.includes(label));
    assert.ok(footer.includes(href) && footer.includes(label));
  }
  assert.match(header, /aria-controls="desktop-how-it-works-menu"/);
  assert.match(header, /aria-controls="mobile-how-it-works-menu"/);
  assert.match(header, /aria-expanded=/);
  assert.match(header, /event\.key (?:===|!==) "Escape"/);
  assert.match(header, /submenuButtonRef\.current\?\.focus\(\)/);
  assert.deepEqual(
    sitemap().map(({ url }) => new URL(url).pathname),
    [
      "/",
      "/how-it-works",
      "/for-gp-practices",
      "/for-pharmacies",
      "/for-commissioners",
      "/about",
      "/contact",
    ],
  );
});

test("footnotes render inside their relevant sections", async () => {
  const source = await readFile("src/components/audience-page.tsx", "utf8");
  const sectionStart = source.indexOf("content.sections.map");
  const footnote = source.indexOf("section.footnote", sectionStart);
  const sectionEnd = source.indexOf("</section>", sectionStart);

  assert.ok(sectionStart >= 0);
  assert.ok(footnote > sectionStart);
  assert.ok(footnote < sectionEnd);
});

test("CQC nurse partnership remains strictly forward-looking", () => {
  const copy = JSON.stringify(audiencePages);
  assert.match(
    copy,
    /is building a partnership with CQC-registered clinical nurses/,
  );
  assert.doesNotMatch(
    copy,
    /(?:has|works with|uses) (?:a )?CQC-registered clinical nurses/,
  );
});

test("complete-cross logo remains byte-for-byte unchanged", async () => {
  const logo = await readFile("public/images/capacity-logo-web.png");
  assert.equal(
    createHash("sha256").update(logo).digest("hex"),
    "87b6aa80cd610a53ff21d1d76e858fe80ca68ecc2ddf8d7ff988fbf589c99164",
  );
});
