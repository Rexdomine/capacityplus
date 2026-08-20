import assert from "node:assert/strict";
import test from "node:test";

import {
  evidenceQualificationErrors,
  extractVisibleText,
} from "../scripts/public-content-validation.mjs";

const approvedPharmacyPilotSentence =
  "In the St Giles pilot, the partner pharmacy generated approximately £8,000 in NHS revenue in year one from 150+ ABPMs and associated case-finding activity.";
const qualificationErrors = [
  "single-site St Giles pilot",
  "approximately 8,000 patients",
  "year one",
];
const qualificationText = qualificationErrors.join(" ");

for (const [container, markup] of [
  ["script", `<script>${qualificationText}</script>`],
  ["style", `<style>${qualificationText}</style>`],
  ["template", `<template>${qualificationText}</template>`],
  ["hidden element", `<div hidden>${qualificationText}</div>`],
] as const) {
  test(`built HTML qualification ignores text inside a ${container}`, () => {
    const visibleText = extractVisibleText(
      `<main><p>150+ ABPMs delivered.</p>${markup}</main>`,
      true,
    );

    assert.deepEqual(
      evidenceQualificationErrors(
        ".next/server/app/for-gp-practices.html",
        visibleText,
      ),
      qualificationErrors,
    );
  });
}

test("built HTML qualification includes visually rendered aria-hidden text", () => {
  const visibleText = extractVisibleText(
    `<main><div aria-hidden="true">150+ ABPMs delivered. ${qualificationText}</div></main>`,
    true,
  );

  assert.equal(visibleText, `150+ ABPMs delivered. ${qualificationText}`);
  assert.deepEqual(
    evidenceQualificationErrors(
      ".next/server/app/for-gp-practices.html",
      visibleText,
    ),
    [],
  );
});

test("built HTML validation ignores evidence duplicated in RSC serialization", () => {
  const builtHtml = `<main><p>${approvedPharmacyPilotSentence}</p></main>
    <SCRIPT type="text/javascript">
      self.__next_f.push([1,${JSON.stringify(approvedPharmacyPilotSentence)}])
    </SCRIPT>
    <StYlE>
      .serialized-evidence::after { content: "150+ ABPMs and £8,000"; }
    </StYlE>`;
  const visibleText = extractVisibleText(builtHtml, true);

  assert.equal(visibleText, approvedPharmacyPilotSentence);
  assert.deepEqual(
    evidenceQualificationErrors(
      ".next/server/app/for-pharmacies.html",
      visibleText,
    ),
    [],
  );
});

test("the exact approved built pharmacy pilot sentence is narrowly qualified", () => {
  assert.deepEqual(
    evidenceQualificationErrors(
      ".next/server/app/for-pharmacies.html",
      approvedPharmacyPilotSentence,
    ),
    [],
  );
});

test("the approved pharmacy evidence remains unqualified on another route", () => {
  assert.deepEqual(
    evidenceQualificationErrors(
      ".next/server/app/for-commissioners.html",
      approvedPharmacyPilotSentence,
    ),
    ["single-site St Giles pilot", "approximately 8,000 patients"],
  );
});

test("altered or partial pharmacy pilot copy is not narrowly qualified", () => {
  const alteredSentence = approvedPharmacyPilotSentence.replace(
    "associated case-finding activity",
    "related case-finding activity",
  );
  const partialSentence =
    "The partner pharmacy generated approximately £8,000 in NHS revenue in year one from 150+ ABPMs.";

  for (const sentence of [alteredSentence, partialSentence]) {
    assert.deepEqual(
      evidenceQualificationErrors(
        ".next/server/app/for-pharmacies.html",
        sentence,
      ),
      ["single-site St Giles pilot", "approximately 8,000 patients"],
    );
  }
});

test("evidence with every global qualification remains qualified", () => {
  assert.deepEqual(
    evidenceQualificationErrors(
      ".next/server/app/for-gp-practices.html",
      "Results from the single-site St Giles pilot, serving approximately 8,000 patients in year one: 150+ ABPMs delivered.",
    ),
    [],
  );
});
