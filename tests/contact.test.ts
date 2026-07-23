import assert from "node:assert/strict";
import test from "node:test";

import {
  type ContactPayload,
  inertContactSubmitter,
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

test("default adapter is inert and confirms no send or storage", async () => {
  const result = await inertContactSubmitter(valid);
  assert.deepEqual(result, {
    ok: false,
    message:
      "Your enquiry was not sent or stored because the contact service is not yet connected.",
  });
});
