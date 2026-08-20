import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("all three homepage audience cards link to their audience pages", async () => {
  const source = await readFile("src/app/page.tsx", "utf8");
  const cards = [
    ["GP practices", "/for-gp-practices", "For GP practices"],
    ["Community pharmacies", "/for-pharmacies", "For pharmacies"],
    ["NHS commissioners", "/for-commissioners", "For commissioners"],
  ];

  for (const [heading, href, label] of cards) {
    const article = source.match(
      new RegExp(`<article>\\s*<h3>${heading}</h3>[\\s\\S]*?</article>`),
    )?.[0];

    assert.ok(article, `missing ${heading} audience card`);
    assert.match(
      article,
      new RegExp(
        `<Link className="text-link" href="${href}">\\s*${label}\\s*<span aria-hidden="true">→</span>\\s*</Link>`,
      ),
    );
  }
});
