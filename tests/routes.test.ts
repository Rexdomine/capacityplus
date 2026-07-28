import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

import { permanentRedirects, securityHeaders } from "../next.config";
import sitemap from "../src/app/sitemap";
import { normalizeSiteUrl } from "../src/lib/site-url";

test("legacy public routes permanently redirect to approved destinations", () => {
  assert.deepEqual(permanentRedirects, [
    {
      source: "/services/digital-gp-pharmacy-integration",
      destination: "/how-it-works",
      permanent: true,
    },
    {
      source: "/services/life-leadership-coaching",
      destination: "/",
      permanent: true,
    },
    {
      source: "/services/social-media-visibility",
      destination: "/",
      permanent: true,
    },
  ]);
});

test("security headers cover framing, sniffing, referrers and device access", () => {
  const headers = Object.fromEntries(
    securityHeaders.map(({ key, value }) => [key, value]),
  );
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(
    headers["Permissions-Policy"],
    "camera=(), microphone=(), geolocation=()",
  );
});

test("site URL normalization is safe and removes path trailing slashes", () => {
  assert.equal(normalizeSiteUrl(undefined), "https://capacityplus.vercel.app");
  assert.equal(
    normalizeSiteUrl(" https://example.test/base/// "),
    "https://example.test/base",
  );
  assert.equal(
    normalizeSiteUrl("javascript:alert(1)"),
    "https://capacityplus.vercel.app",
  );
});

test("sitemap contains the five approved public routes, including About", () => {
  assert.deepEqual(
    sitemap().map(({ url }) => new URL(url).pathname),
    ["/", "/how-it-works", "/for-gp-practices", "/about", "/contact"],
  );
});

test("homepage places qualified evidence immediately after the hero", async () => {
  const source = await readFile("src/app/page.tsx", "utf8");
  const heroEnd = source.indexOf("</section>");
  const evidence = source.indexOf("<EvidenceStrip />");
  const pathway = source.indexOf('aria-labelledby="one-pathway"');

  assert.ok(heroEnd >= 0);
  assert.ok(evidence > heroEnd);
  assert.ok(evidence < pathway);
});

test("homepage uses the approved coordinated-care hero asset", async () => {
  const assetPath = "public/images/capacityplus-coordinated-care.webp";
  const [source, asset, metadata] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile(assetPath),
    stat(assetPath),
  ]);

  assert.match(source, /capacityplus-coordinated-care\.webp/);
  assert.match(
    source,
    /alt="Conceptual image of primary-care professionals coordinating a blood-pressure pathway"/,
  );
  assert.equal(asset.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(asset.subarray(8, 12).toString("ascii"), "WEBP");
  assert.ok(
    metadata.size <= 250_000,
    "Hero asset must remain at or below 250 KB",
  );
});

test("header and footer use the shared website logo asset", async () => {
  const [header, footer] = await Promise.all([
    readFile("src/components/header.tsx", "utf8"),
    readFile("src/components/footer.tsx", "utf8"),
  ]);

  assert.match(header, /capacity-logo-web\.png/);
  assert.match(footer, /capacity-logo-web\.png/);
  await access("public/images/capacity-logo-web.png");
});

test("website uses the approved complete-cross Capacity+ logo", async () => {
  const asset = await readFile("public/images/capacity-logo-web.png");
  const checksum = createHash("sha256").update(asset).digest("hex");

  assert.equal(
    checksum,
    "87b6aa80cd610a53ff21d1d76e858fe80ca68ecc2ddf8d7ff988fbf589c99164",
  );
});

test("sticky header uses a Safari-safe opaque paint layer", async () => {
  const stylesheet = await readFile("src/app/globals.css", "utf8");
  const headerRule = stylesheet.match(/\.site-header\s*\{(?<rule>[^}]*)\}/s);

  assert.ok(headerRule?.groups?.rule, "Expected a .site-header CSS rule");
  assert.match(headerRule.groups.rule, /background:\s*var\(--white\)/);
  assert.match(headerRule.groups.rule, /isolation:\s*isolate/);
  assert.doesNotMatch(headerRule.groups.rule, /backdrop-filter/);
});
