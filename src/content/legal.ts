export type LegalDocument = {
  title: string;
  summary: string;
  requiredInputs: string[];
};

export const legalDocuments = {
  privacy: {
    title: "Privacy",
    summary: "The approved privacy policy has not yet been supplied.",
    requiredInputs: [
      "Data controller identity and contact details",
      "ICO registration details",
      "Approved processing, retention and rights wording",
    ],
  },
  cookies: {
    title: "Cookie policy",
    summary: "The approved cookie policy has not yet been supplied.",
    requiredInputs: [
      "Approved cookie inventory",
      "Approved consent and retention wording",
    ],
  },
  terms: {
    title: "Terms",
    summary: "The approved website terms have not yet been supplied.",
    requiredInputs: [
      "Contracting entity details",
      "Approved website use, liability and jurisdiction wording",
    ],
  },
} satisfies Record<string, LegalDocument>;
