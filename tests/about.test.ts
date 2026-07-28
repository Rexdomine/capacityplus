import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const team = [
  {
    file: "os-joseph-ebare.webp",
    name: "Onosenadia (Os) Joseph-Ebare",
    role: "Founder, Capacity+",
  },
  {
    file: "radha-muthusamy.webp",
    name: "Radha Muthusamy",
    role: "Data Protection Officer",
  },
  {
    file: "ben-paddick.webp",
    name: "Ben Paddick",
    role: "IT Delivery Partner",
  },
] as const;

function readLossyWebpDimensions(asset: Buffer) {
  assert.equal(asset.subarray(12, 16).toString("ascii"), "VP8 ");
  const frame = 20;
  assert.deepEqual(
    [...asset.subarray(frame + 3, frame + 6)],
    [0x9d, 0x01, 0x2a],
  );
  return {
    width: asset.readUInt16LE(frame + 6) & 0x3fff,
    height: asset.readUInt16LE(frame + 8) & 0x3fff,
  };
}

test("About source presents all approved team members with truthful image text", async () => {
  const source = await readFile("src/app/about/page.tsx", "utf8");

  for (const member of team) {
    assert.ok(source.includes(member.name), `Missing ${member.name}`);
    assert.ok(source.includes(member.role), `Missing ${member.role}`);
    assert.match(source, new RegExp(`image: "/images/team/${member.file}"`));
  }
  assert.match(source, /alt=\{member\.name\}/);
  assert.match(source, /width=\{640\}/);
  assert.match(source, /height=\{640\}/);
  assert.match(source, /sizes=/);
});

test("About source keeps clinical and pilot evidence safely qualified", async () => {
  const source = await readFile("src/app/about/page.tsx", "utf8");
  const text = source.replace(/\s+/g, " ");

  for (const phrase of [
    "single-site St Giles pilot",
    "approximately 8,000 patients",
    "year one",
    "150+ ABPMs",
    "approximately 75 GP clinical hours",
    "51 of 52 patients completed the pathway without needing direct GP intervention",
    "GP oversight of diagnosis and treatment",
    "does not diagnose or prescribe",
    "registered pharmacy professionals within host-practice governance",
    "Pharmacy technicians work to protocol",
    "prescription change requires pharmacist or prescriber sign-off",
    "anti-money laundering and counter-terrorist financing",
    "IFRS 9",
    "BCBS 239",
  ]) {
    assert.ok(text.includes(phrase), `Missing evidence boundary: ${phrase}`);
  }
  assert.doesNotMatch(text, /Capacity\+ (?:diagnoses|prescribes)/i);
});

test("About has route metadata, a canonical and only the approved conversion CTA", async () => {
  const source = await readFile("src/app/about/page.tsx", "utf8");

  assert.match(source, /title: "About Capacity\+"/);
  assert.match(source, /alternates: \{ canonical: "\/about" \}/);
  assert.match(source, /<BookCallLink \/>/);
  assert.doesNotMatch(source, /Book a demo|Schedule a call|Request a demo/i);
});

test("team assets are square metadata-free WebP files no larger than 250 KB", async () => {
  for (const member of team) {
    const path = `public/images/team/${member.file}`;
    const [asset, metadata] = await Promise.all([readFile(path), stat(path)]);

    assert.equal(asset.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(asset.subarray(8, 12).toString("ascii"), "WEBP");
    assert.deepEqual(readLossyWebpDimensions(asset), {
      width: 640,
      height: 640,
    });
    assert.ok(metadata.size <= 250_000, `${member.file} exceeds 250 KB`);
    assert.equal(
      asset.includes(Buffer.from("EXIF")),
      false,
      `${member.file} has EXIF`,
    );
    assert.equal(
      asset.includes(Buffer.from("XMP ")),
      false,
      `${member.file} has XMP`,
    );
    assert.equal(
      asset.includes(Buffer.from("ICCP")),
      false,
      `${member.file} has ICC data`,
    );
  }
});

test("About is available in header and footer navigation", async () => {
  const [header, footer] = await Promise.all([
    readFile("src/components/header.tsx", "utf8"),
    readFile("src/components/footer.tsx", "utf8"),
  ]);

  assert.match(header, /href: "\/about", label: "About"/);
  assert.match(footer, /<Link href="\/about">About<\/Link>/);
});
