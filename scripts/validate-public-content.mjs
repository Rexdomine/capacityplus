import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scanRoots = ["src/app", "src/components", "src/content"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".css"]);

// Encoded to ensure this validator does not fail by containing the terms it guards.
const forbidden = [
  ["Life", "Leadership Coaching"].join(" & "),
  ["AI-Powered", "Social Media Visibility"].join(" "),
  ["Schedule", "Call"].join(" "),
  ["Request", "Demo"].join(" "),
  ["View", "Solutions"].join(" "),
  ["Check", "Availability"].join(" "),
  ["news", "letter"].join(""),
  ["£1", "700"].join(","),
  ["contra", "ception"].join(""),
  ["your-google", "site-verification-code"].join("-"),
  ["og-image", ".jpg"].join(""),
  ["up to", "40%"].join(" "),
  ["Join hundreds of", "healthcare leaders"].join(" "),
  ["Enterprise", "Security"].join(" "),
  ["Video embed", "goes here"].join(" "),
  ["24/7 pharmacy", "support"].join(" "),
  ["hyper", "realistic"].join("-"),
];

async function filesWithin(relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = [];
  for (const entry of entries) {
    const relative = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesWithin(relative)));
    else if (extensions.has(path.extname(entry.name))) files.push(relative);
  }
  return files;
}

const files = (await Promise.all(scanRoots.map(filesWithin))).flat();
const errors = [];
const evidenceValues = ["150+ ABPMs", "75 GP clinical hours", "£8,000"];
const qualification = [
  "single-site St Giles pilot",
  "approximately 8,000 patients",
  "year one",
];

for (const file of files) {
  const content = await readFile(path.join(root, file), "utf8");
  const visibleText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const phrase of forbidden) {
    if (
      visibleText
        .toLocaleLowerCase("en-GB")
        .includes(phrase.toLocaleLowerCase("en-GB"))
    ) {
      errors.push(`${file}: forbidden public phrase: ${phrase}`);
    }
  }
  if (/\b(Book Call|Book a demo|Send Message)\b/i.test(content)) {
    errors.push(
      `${file}: conversion labels must use the exact text “Book a call”`,
    );
  }
  if (/\b(TODO|FIXME|Lorem ipsum|coming soon)\b/i.test(content)) {
    errors.push(`${file}: placeholder or unfinished public copy`);
  }
  if (evidenceValues.some((value) => visibleText.includes(value))) {
    for (const term of qualification) {
      if (
        !visibleText
          .toLocaleLowerCase("en-GB")
          .includes(term.toLocaleLowerCase("en-GB"))
      ) {
        errors.push(
          `${file}: evidence appears without qualification “${term}”`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Public content validation failed:\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(
  `Public content validation passed (${files.length} files scanned).`,
);
