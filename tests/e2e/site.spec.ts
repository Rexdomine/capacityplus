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
    path: "/for-pharmacies",
    canonical: "https://capacityplus.vercel.app/for-pharmacies",
  },
  {
    path: "/for-commissioners",
    canonical: "https://capacityplus.vercel.app/for-commissioners",
  },
  {
    path: "/about",
    canonical: "https://capacityplus.vercel.app/about",
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
    const header = page.locator(".site-header");
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
    const headerAtPageTop = await header.boundingBox();
    expect(headerAtPageTop).not.toBeNull();
    expect(headerAtPageTop?.y).toBe(0);
    expect(headerAtPageTop?.height).toBeGreaterThan(64);
    expect(
      await page.evaluate(() =>
        Boolean(
          document
            .elementFromPoint(window.innerWidth / 2, 1)
            ?.closest(".site-header"),
        ),
      ),
    ).toBe(true);
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
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, document.body.scrollHeight);
    });
    await expect(header).toBeInViewport();
    const stickyHeader = await header.boundingBox();
    expect(stickyHeader).not.toBeNull();
    expect(stickyHeader?.y).toBe(0);
    expect(
      await page.evaluate(() =>
        Boolean(
          document
            .elementFromPoint(window.innerWidth / 2, 1)
            ?.closest(".site-header"),
        ),
      ),
    ).toBe(true);
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
  const links = [
    "Home",
    "How it works",
    "For GP practices",
    "For pharmacies",
    "For commissioners",
    "About",
    "Contact",
  ];

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
  ] as const;

  for (const [source, destination] of redirects) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
});

test("About presents the real team photos and qualified pilot evidence", async ({
  page,
}) => {
  await page.goto("/about", { waitUntil: "networkidle" });

  for (const name of [
    "Onosenadia (Os) Joseph-Ebare",
    "Radha Muthusamy",
    "Ben Paddick",
  ]) {
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    const photo = page.getByRole("img", { name, exact: true });
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect
      .poll(() =>
        photo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    expect(
      await photo.evaluate(
        (image) =>
          (image as HTMLImageElement).naturalWidth ===
          (image as HTMLImageElement).naturalHeight,
      ),
    ).toBe(true);
  }

  await expect(
    page.getByText("single-site St Giles pilot", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "51 of 52 patients completed the pathway without needing direct GP intervention",
      { exact: false },
    ),
  ).toBeVisible();
  const clinicalCopy = page.locator(".about-intro-copy");
  await expect(
    clinicalCopy.getByText("GP oversight of diagnosis and treatment", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    clinicalCopy.getByText("does not diagnose or prescribe", { exact: false }),
  ).toBeVisible();
  await expect(
    clinicalCopy.getByText("registered pharmacy professionals", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    clinicalCopy.getByText("prescription change requires", { exact: false }),
  ).toBeVisible();
});

test("contact form confirms success and resets only after the API confirms", async ({
  page,
}) => {
  let submitted: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    });
  });
  await page.goto("/contact", { waitUntil: "networkidle" });
  await page.getByLabel("Name").fill("QA Reviewer");
  await page.getByLabel("Organisation").fill("CapacityPlus QA");
  await page.getByLabel("Email").fill("qa@example.test");
  await page
    .getByLabel("Short message")
    .fill("This is a non-clinical review enquiry.");
  await page.getByRole("button", { name: "Book a call", exact: true }).click();

  await expect(page.getByRole("status")).toContainText("has been sent");
  await expect(page.getByLabel("Name")).toHaveValue("");
  expect(submitted?.name).toBe("QA Reviewer");
  expect(submitted?.submissionId).toMatch(/^[0-9a-f-]{36}$/i);
});

test("contact form locks and retries the same immutable enquiry after uncertain failure", async ({
  page,
}) => {
  const submissions: Array<Record<string, unknown>> = [];
  await page.route("**/api/contact", async (route) => {
    submissions.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({
      status: submissions.length === 1 ? 503 : 200,
      contentType: "application/json",
      body: submissions.length === 1 ? '{"ok":false}' : '{"ok":true}',
    });
  });
  await page.goto("/contact", { waitUntil: "networkidle" });
  await page.getByLabel("Name").fill("QA Reviewer");
  await page.getByLabel("Organisation").fill("CapacityPlus QA");
  await page.getByLabel("Email").fill("qa@example.test");
  await page
    .getByLabel("Short message")
    .fill("This is a non-clinical review enquiry.");
  const name = page.getByLabel("Name");
  const organisation = page.getByLabel("Organisation");
  const email = page.getByLabel("Email");
  const message = page.getByLabel("Short message");
  const submit = page.getByRole("button", {
    name: "Book a call",
    exact: true,
  });
  await submit.click();
  await expect.poll(() => submissions.length).toBe(1);
  const failureStatus = await page.getByRole("status").textContent();
  const retryLabel = await page.locator('button[type="submit"]').textContent();
  const lockedFields = await Promise.all(
    [name, organisation, email, message].map((field) => field.isDisabled()),
  );
  await expect(name).toHaveValue("QA Reviewer");
  let editWasRejected = false;
  try {
    await name.fill("Changed after failure", { timeout: 250 });
  } catch {
    editWasRejected = true;
  }
  await page.locator('button[type="submit"]').click();

  await expect.poll(() => submissions.length).toBe(2);
  expect(submissions[1]).toEqual(submissions[0]);
  expect(editWasRejected).toBe(true);
  expect(lockedFields).toEqual([true, true, true, true]);
  expect(retryLabel).toBe("Try same enquiry again");
  expect(failureStatus).toBe(
    "We could not confirm the full submission. Capacity+ may already have received your enquiry. Please try again using the same details.",
  );
  await expect(page.getByRole("status")).toContainText("has been sent");
  for (const field of [name, organisation, email, message]) {
    await expect(field).toBeEnabled();
    await expect(field).toHaveValue("");
  }
  await expect(
    page.getByRole("button", { name: "Book a call", exact: true }),
  ).toBeEnabled();
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
