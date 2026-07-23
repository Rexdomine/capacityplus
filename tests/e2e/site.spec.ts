import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  { path: "/", canonical: "https://capacityplus.vercel.app" },
  {
    path: "/how-it-works",
    canonical: "https://capacityplus.vercel.app/how-it-works",
  },
  {
    path: "/for-gp-practices",
    canonical: "https://capacityplus.vercel.app/for-gp-practices",
  },
  {
    path: "/contact",
    canonical: "https://capacityplus.vercel.app/contact",
  },
] as const;

for (const route of publicRoutes) {
  test(`${route.path} is responsive, accessible and release-safe`, async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => {
      failedRequests.push(
        `${request.method()} ${request.url()}: ${request.failure()?.errorText}`,
      );
    });

    const response = await page.goto(route.path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route.canonical,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);

    await page
      .getByRole("link", { name: "Book a call", exact: true })
      .first()
      .waitFor();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const brokenImages = await page
      .locator("img")
      .evaluateAll(async (images) => {
        await Promise.allSettled(
          images.map((image) => (image as HTMLImageElement).decode()),
        );
        return images
          .filter(
            (image) =>
              !(image as HTMLImageElement).complete ||
              (image as HTMLImageElement).naturalWidth === 0,
          )
          .map((image) => (image as HTMLImageElement).currentSrc);
      });
    expect(brokenImages).toEqual([]);

    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
}

test("navigation exposes approved labels and keyboard-safe mobile menu", async ({
  page,
}, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const viewportWidth = testInfo.project.use.viewport?.width ?? 1440;
  const links = ["Home", "How it works", "For GP practices", "Contact"];

  if (viewportWidth < 1024) {
    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    for (const label of links) {
      await expect(
        page
          .locator("#mobile-menu")
          .getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
    await page.keyboard.press("Escape");
    await expect(openButton).toBeFocused();
  } else {
    for (const label of links) {
      await expect(
        page
          .locator(".desktop-nav")
          .getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
  }
});

test("legacy routes are permanent redirects to approved destinations", async ({
  request,
}) => {
  const redirects = [
    ["/services/digital-gp-pharmacy-integration", "/how-it-works"],
    ["/services/life-leadership-coaching", "/"],
    ["/services/social-media-visibility", "/"],
    ["/about", "/"],
  ] as const;

  for (const [source, destination] of redirects) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
});

test("contact form is explicitly inert and retains the enquiry", async ({
  page,
}) => {
  await page.goto("/contact", { waitUntil: "networkidle" });
  await page.getByLabel("Name").fill("QA Reviewer");
  await page.getByLabel("Organisation").fill("CapacityPlus QA");
  await page.getByLabel("Email").fill("qa@example.test");
  await page
    .getByLabel("Short message")
    .fill("This is a non-clinical review enquiry.");
  await page.getByRole("button", { name: "Book a call", exact: true }).click();

  await expect(page.getByRole("status")).toContainText("not sent or stored");
  await expect(page.getByLabel("Name")).toHaveValue("QA Reviewer");
});

test("security headers and review-only noindex routes are enforced", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=()",
  );

  for (const route of ["/speaking", "/privacy", "/cookies", "/terms"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  }
});
