import assert from "node:assert/strict";
import test from "node:test";

import { handleContactRequest, POST } from "../src/app/api/contact/route";
import {
  BODY_LIMIT_BYTES,
  type BrevoMessage,
  buildContactEmails,
  createInMemoryRateLimiter,
  sendContactEmails,
  validateContactRequest,
} from "../src/lib/contact-server";

const submissionId = "123e4567-e89b-42d3-a456-426614174000";
const now = Date.parse("2026-08-20T12:00:00.000Z");
const receivedAt = "2026-08-20T12:00:00.000Z";
const valid = {
  submissionId,
  startedAt: now - 5_000,
  name: "  Dr Ada Lovelace  ",
  organisation: "  Example GP Practice  ",
  email: "ada@example.nhs.uk",
  message: "  We would like to discuss an integrated pathway.  ",
  website: "",
};

function jsonRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://capacityx.co.uk/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

function isolatedDependencies() {
  return {
    now: () => now,
    rateLimiter: createInMemoryRateLimiter({
      maxRequests: 5,
      windowMs: 60_000,
      maxEntries: 10,
    }),
  };
}

test("server validation trims valid fields and enforces strict bounds", () => {
  assert.deepEqual(validateContactRequest(valid), {
    ok: true,
    value: {
      submissionId,
      startedAt: now - 5_000,
      name: "Dr Ada Lovelace",
      organisation: "Example GP Practice",
      email: "ada@example.nhs.uk",
      message: "We would like to discuss an integrated pathway.",
      website: "",
    },
  });

  for (const [field, value] of [
    ["name", "n".repeat(101)],
    ["organisation", "o".repeat(161)],
    ["email", `${"a".repeat(245)}@example.com`],
    ["message", "m".repeat(2001)],
  ] as const) {
    const result = validateContactRequest({ ...valid, [field]: value });
    assert.equal(result.ok, false, `${field} must have a maximum length`);
  }

  for (const payload of [
    null,
    [],
    "payload",
    { ...valid, name: " " },
    { ...valid, message: "too short" },
    { ...valid, email: "bad@example" },
    { ...valid, email: "ada@example.com\r\nBcc: victim@example.com" },
    { ...valid, submissionId: "not-a-uuid" },
    { ...valid, startedAt: "not-a-number" },
    { ...valid, startedAt: -1 },
    { ...valid, website: "spam.invalid" },
    { ...valid, unexpected: "field" },
    { ...valid, name: "Ada\u0000Lovelace" },
    { ...valid, organisation: "Practice\u001fName" },
    { ...valid, email: "ada\u007f@example.com" },
    { ...valid, message: "Normal line\nNormal tab\tbut NUL\u0000" },
  ]) {
    assert.equal(validateContactRequest(payload).ok, false);
  }
});

test("email templates escape user content and set exact envelope fields", () => {
  const input = {
    ...valid,
    name: 'Ada <script>alert("x")</script>',
    organisation: "A & B",
    message: "Hello <b>team</b> & goodbye",
  };
  const result = validateContactRequest(input);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  const [internal, acknowledgement] = buildContactEmails(
    result.value,
    receivedAt,
  );
  assert.deepEqual(internal.sender, {
    name: "Capacity+",
    email: "hello@capacityx.co.uk",
  });
  assert.deepEqual(internal.to, [{ name: "Os", email: "Os@capacityx.co.uk" }]);
  assert.deepEqual(internal.replyTo, {
    name: result.value.name,
    email: "ada@example.nhs.uk",
  });
  assert.deepEqual(acknowledgement.sender, internal.sender);
  assert.deepEqual(acknowledgement.to, [
    { name: result.value.name, email: "ada@example.nhs.uk" },
  ]);
  assert.equal(acknowledgement.replyTo, undefined);

  for (const email of [internal, acknowledgement]) {
    assert.match(
      email.htmlContent,
      /<img[^>]+src="https:\/\/www\.capacityx\.co\.uk\/images\/capacity-logo-web\.png"[^>]+alt="Capacity\+"[^>]+width="240"[^>]+height="122"[^>]+style="[^"]*display:block[^"]*border:0[^"]*max-width:100%[^"]*width:240px[^"]*height:auto/i,
    );
    assert.doesNotMatch(email.htmlContent, />Capacity\+ logo</i);
    assert.doesNotMatch(email.htmlContent, /Capacity<span[^>]*>\+<\/span>/i);
    assert.match(email.htmlContent, /Capacity\+/);
    assert.match(email.htmlContent, /#[0-9A-Fa-f]{6}/);
    assert.match(email.textContent, /Capacity\+/);
    assert.match(email.htmlContent, /123e4567-e89b-42d3-a456-426614174000/);
    assert.doesNotMatch(email.htmlContent, /<script>|<b>team<\/b>/);
    for (const colour of [
      "#082f49",
      "#052235",
      "#15803d",
      "#0f766e",
      "#ccfbf1",
      "#132a36",
      "#526772",
      "#cbd9df",
      "#f4f8f8",
      "#ffffff",
    ]) {
      assert.match(email.htmlContent, new RegExp(colour, "i"));
    }
    assert.match(email.htmlContent, /display:none[^>]*>[^<]+/i);
  }
  assert.match(internal.htmlContent, /Name/);
  assert.match(internal.htmlContent, /Organisation/);
  assert.match(internal.htmlContent, /Email/);
  assert.match(internal.htmlContent, /Message/);
  assert.match(internal.textContent, /A & B/);
  assert.match(
    internal.textContent,
    /Received at \(UTC\): 2026-08-20T12:00:00.000Z/,
  );
  assert.match(internal.htmlContent, /Received at \(UTC\)/);
  assert.match(acknowledgement.textContent, /respond/i);
  assert.match(
    acknowledgement.textContent,
    /patient-identifiable or clinical information/i,
  );
  assert.doesNotMatch(
    acknowledgement.textContent,
    /Hello <b>team<\/b> & goodbye/,
  );
  assert.doesNotMatch(
    acknowledgement.htmlContent,
    /Hello &lt;b&gt;team&lt;\/b&gt; &amp; goodbye/,
  );
  assert.match(internal.textContent, /Hello <b>team<\/b> & goodbye/);
});

test("bounded per-instance limiter is deterministic and prunes expired keys", () => {
  const limiter = createInMemoryRateLimiter({
    maxRequests: 2,
    windowMs: 1_000,
    maxEntries: 2,
  });
  assert.equal(limiter.allow("192.0.2.1", 10_000), true);
  assert.equal(limiter.allow("192.0.2.1", 10_001), true);
  assert.equal(limiter.allow("192.0.2.1", 10_002), false);
  assert.equal(limiter.allow("192.0.2.2", 10_002), true);
  assert.equal(limiter.size(), 2);
  assert.equal(limiter.allow("192.0.2.3", 10_003), false);
  assert.equal(limiter.size(), 2);
  assert.equal(limiter.allow("192.0.2.3", 11_003), true);
  assert.equal(limiter.size(), 1);
});

test("Brevo sends two separately idempotent operations with stable keys", async () => {
  const calls: Array<{ url: string; init: RequestInit; body: BrevoMessage }> =
    [];
  const fakeFetch: typeof fetch = async (input, init = {}) => {
    calls.push({
      url: String(input),
      init,
      body: JSON.parse(String(init.body)) as BrevoMessage,
    });
    return new Response(null, { status: 201 });
  };
  const result = validateContactRequest(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  await sendContactEmails(result.value, {
    apiKey: "test-key",
    fetch: fakeFetch,
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://api.brevo.com/v3/smtp/email");
  assert.equal(new Headers(calls[0].init.headers).get("api-key"), "test-key");
  assert.equal(
    new Headers(calls[0].init.headers).get("idempotencyKey"),
    `contact-${submissionId}-internal`,
  );
  assert.equal(
    new Headers(calls[1].init.headers).get("idempotencyKey"),
    `contact-${submissionId}-acknowledgement`,
  );
});

test("partial failure retries safely with the same operation keys", async () => {
  const keys: string[] = [];
  let calls = 0;
  const fakeFetch: typeof fetch = async (_input, init = {}) => {
    calls += 1;
    keys.push(String(new Headers(init.headers).get("idempotencyKey")));
    if (calls === 2) return new Response(null, { status: 500 });
    return new Response(null, { status: 201 });
  };
  const result = validateContactRequest(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  await assert.rejects(
    sendContactEmails(result.value, { apiKey: "test-key", fetch: fakeFetch }),
  );
  await sendContactEmails(result.value, {
    apiKey: "test-key",
    fetch: fakeFetch,
  });
  assert.deepEqual(keys, [
    `contact-${submissionId}-internal`,
    `contact-${submissionId}-acknowledgement`,
    `contact-${submissionId}-internal`,
    `contact-${submissionId}-acknowledgement`,
  ]);
});

test("Brevo fails closed for missing config, provider errors and timeout", async () => {
  const result = validateContactRequest(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;

  await assert.rejects(
    sendContactEmails(result.value, {
      apiKey: undefined,
      fetch: async () => new Response(null, { status: 201 }),
    }),
    /configuration/i,
  );
  await assert.rejects(
    sendContactEmails(result.value, {
      apiKey: "test-key",
      fetch: async () =>
        new Response("provider body must stay private", { status: 429 }),
    }),
    /provider/i,
  );
  await assert.rejects(
    sendContactEmails(result.value, {
      apiKey: "test-key",
      timeoutMs: 1,
      fetch: async (_input, init) =>
        await new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(init.signal?.reason),
          );
        }),
    }),
    /timeout/i,
  );
});

test("route maps media type, origin, malformed, size, config/provider and success", async () => {
  assert.equal(
    (
      await handleContactRequest(
        new Request("https://capacityx.co.uk/api/contact", { method: "POST" }),
        async () => {},
        isolatedDependencies(),
      )
    ).status,
    415,
  );
  assert.equal(
    (
      await handleContactRequest(
        jsonRequest(valid, { origin: "https://evil.example" }),
        async () => {},
        isolatedDependencies(),
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handleContactRequest(
        new Request("https://capacityx.co.uk/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{broken",
        }),
        async () => {},
        isolatedDependencies(),
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handleContactRequest(
        new Request("https://capacityx.co.uk/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "x".repeat(BODY_LIMIT_BYTES + 1),
        }),
        async () => {},
        isolatedDependencies(),
      )
    ).status,
    413,
  );
  assert.equal(
    (
      await handleContactRequest(
        jsonRequest(valid),
        async () => {},
        isolatedDependencies(),
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await handleContactRequest(
        jsonRequest(valid),
        async () => {
          throw new Error("provider private detail");
        },
        isolatedDependencies(),
      )
    ).status,
    503,
  );
  assert.equal((await POST(jsonRequest({ ...valid, name: "" }))).status, 400);

  for (let attempt = 0; attempt < 6; attempt += 1) {
    assert.equal(
      (
        await handleContactRequest(
          jsonRequest(valid),
          async () => {},
          isolatedDependencies(),
        )
      ).status,
      200,
    );
  }
});

test("route accepts one normalized proxy origin and rejects unrelated origins", async () => {
  const dependencies = {
    now: () => now,
    rateLimiter: createInMemoryRateLimiter({
      maxRequests: 5,
      windowMs: 60_000,
      maxEntries: 10,
    }),
  };
  const forwarded = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://capacityx.co.uk",
      "x-forwarded-host": "capacityx.co.uk",
      "x-forwarded-proto": "https",
      "x-real-ip": "192.0.2.10",
    },
    body: JSON.stringify(valid),
  });
  let calls = 0;
  let injectedReceipt = "";
  assert.equal(
    (
      await handleContactRequest(
        forwarded,
        async (_contact, receipt) => {
          calls += 1;
          injectedReceipt = receipt;
        },
        dependencies,
      )
    ).status,
    200,
  );
  assert.equal(calls, 1);
  assert.equal(injectedReceipt, receivedAt);

  for (const headers of [
    {
      origin: "https://unrelated.example",
      "x-forwarded-host": "capacityx.co.uk",
      "x-forwarded-proto": "https",
    },
    {
      origin: "https://capacityx.co.uk",
      "x-forwarded-host": "capacityx.co.uk,evil.example",
      "x-forwarded-proto": "https",
    },
    {
      origin: "https://capacityx.co.uk",
      "x-forwarded-host": "capacityx.co.uk",
      "x-forwarded-proto": "https,http",
    },
  ]) {
    assert.equal(
      (
        await handleContactRequest(
          jsonRequest(valid, headers),
          async () => {
            calls += 1;
          },
          dependencies,
        )
      ).status,
      400,
    );
  }
  assert.equal(calls, 1);
});

test("fast and rate-limited submissions return no-store without provider calls", async () => {
  const limiter = createInMemoryRateLimiter({
    maxRequests: 1,
    windowMs: 60_000,
    maxEntries: 10,
  });
  const dependencies = { now: () => now, rateLimiter: limiter };
  let calls = 0;
  const send = async () => {
    calls += 1;
  };

  const fast = await handleContactRequest(
    jsonRequest(
      { ...valid, startedAt: now - 2_999 },
      { "x-real-ip": "192.0.2.20" },
    ),
    send,
    dependencies,
  );
  assert.equal(fast.status, 400);
  assert.equal(calls, 0);

  assert.equal(
    (
      await handleContactRequest(
        jsonRequest(valid, { "x-real-ip": "192.0.2.20" }),
        send,
        dependencies,
      )
    ).status,
    200,
  );
  const limited = await handleContactRequest(
    jsonRequest(valid, { "x-real-ip": "192.0.2.20" }),
    send,
    dependencies,
  );
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("cache-control"), "no-store");
  assert.deepEqual(await limited.json(), {
    ok: false,
    error: "Unable to process this enquiry.",
  });
  assert.equal(calls, 1);
});
