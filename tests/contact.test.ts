import assert from "node:assert/strict";
import test from "node:test";

import {
  type ContactPayload,
  fetchContactSubmitter,
  validateContact,
} from "../src/lib/contact";

const valid: ContactPayload = {
  name: "Dr Ada Lovelace",
  organisation: "Example GP Practice",
  email: "ada@example.nhs.uk",
  message: "We would like to discuss an integrated pathway.",
  website: "",
};

test("validates every required contact field", () => {
  assert.deepEqual(validateContact({ ...valid, name: "" }), {
    name: "Enter your name.",
  });
  assert.deepEqual(validateContact({ ...valid, organisation: "" }), {
    organisation: "Enter your organisation.",
  });
  assert.deepEqual(validateContact({ ...valid, email: "not-an-email" }), {
    email: "Enter a valid email address.",
  });
  assert.deepEqual(validateContact({ ...valid, message: "short" }), {
    message: "Enter a short message of at least 10 characters.",
  });
  assert.deepEqual(validateContact(valid), {});
});

test("honeypot submissions are rejected", () => {
  assert.deepEqual(validateContact({ ...valid, website: "spam.example" }), {
    website: "Unable to submit this enquiry.",
  });
});

test("fetch submitter posts typed JSON and reports confirmed success", async () => {
  let request: { input: string; init?: RequestInit } | undefined;
  const result = await fetchContactSubmitter(
    valid,
    "123e4567-e89b-42d3-a456-426614174000",
    1_724_328_000_000,
    async (input, init) => {
      request = { input: String(input), init };
      return Response.json({ ok: true });
    },
  );

  assert.deepEqual(result, {
    ok: true,
    message: "Thank you. Your enquiry has been sent to Capacity+.",
  });
  assert.equal(request?.input, "/api/contact");
  assert.equal(request?.init?.method, "POST");
  assert.equal(
    new Headers(request?.init?.headers).get("content-type"),
    "application/json",
  );
  assert.deepEqual(JSON.parse(String(request?.init?.body)), {
    ...valid,
    submissionId: "123e4567-e89b-42d3-a456-426614174000",
    startedAt: 1_724_328_000_000,
  });
});

test("fetch submitter returns a generic failure without throwing", async () => {
  for (const response of [
    new Response(null, { status: 503 }),
    new Response("not json", { status: 400 }),
  ]) {
    const result = await fetchContactSubmitter(
      valid,
      "123e4567-e89b-42d3-a456-426614174000",
      1_724_328_000_000,
      async () => response,
    );
    assert.deepEqual(result, {
      ok: false,
      message:
        "Your enquiry could not be sent. Your entries remain in the form so you can try again.",
    });
  }
});

test("fetch submitter aborts after 30 seconds with a generic failure", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | null = null;
  const submission = fetchContactSubmitter(
    valid,
    "123e4567-e89b-42d3-a456-426614174000",
    1_724_328_000_000,
    async (_input, init) => {
      signal = init?.signal ?? null;
      return await new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener("abort", () => reject(signal?.reason));
      });
    },
  );

  assert.equal(signal?.aborted, false);
  t.mock.timers.tick(29_999);
  assert.equal(signal?.aborted, false);
  t.mock.timers.tick(1);
  assert.equal(signal?.aborted, true);
  assert.deepEqual(await submission, {
    ok: false,
    message:
      "Your enquiry could not be sent. Your entries remain in the form so you can try again.",
  });
});

test("fetch submitter clears its timeout after a completed request", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let signal: AbortSignal | null = null;

  const result = await fetchContactSubmitter(
    valid,
    "123e4567-e89b-42d3-a456-426614174000",
    1_724_328_000_000,
    async (_input, init) => {
      signal = init?.signal ?? null;
      return Response.json({ ok: true });
    },
  );

  assert.equal(result.ok, true);
  assert.equal(signal?.aborted, false);
  t.mock.timers.runAll();
  assert.equal(signal?.aborted, false);
});
