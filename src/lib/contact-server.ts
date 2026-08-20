import type { ContactPayload } from "./contact";

export const BODY_LIMIT_BYTES = 16_384;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_TIMEOUT_MS = 10_000;
const sender = { name: "Capacity+", email: "hello@capacityx.co.uk" } as const;
const internalRecipient = { name: "Os", email: "Os@capacityx.co.uk" } as const;

export type ValidContactRequest = ContactPayload & {
  submissionId: string;
  startedAt: number;
};
export type BrevoMessage = {
  sender: { name: string; email: string };
  to: Array<{ name: string; email: string }>;
  replyTo?: { name: string; email: string };
  subject: string;
  htmlContent: string;
  textContent: string;
};

type ValidationResult =
  | { ok: true; value: ValidContactRequest }
  | { ok: false };

type SendDependencies = {
  apiKey: string | undefined;
  fetch?: typeof fetch;
  timeoutMs?: number;
  receivedAt?: string;
};

export type ContactRateLimiter = {
  allow: (key: string, now: number) => boolean;
  size: () => number;
};

/**
 * Creates bounded abuse protection. State is intentionally local to one
 * serverless instance, so it reduces bursts but is not a global quota.
 */
export function createInMemoryRateLimiter(config: {
  maxRequests: number;
  windowMs: number;
  maxEntries: number;
}): ContactRateLimiter {
  const entries = new Map<string, { count: number; resetAt: number }>();

  return {
    allow(key, now) {
      for (const [candidate, entry] of entries) {
        if (entry.resetAt <= now) entries.delete(candidate);
      }

      const current = entries.get(key);
      if (current) {
        if (current.count >= config.maxRequests) return false;
        current.count += 1;
        return true;
      }

      if (entries.size >= config.maxEntries) return false;
      entries.set(key, { count: 1, resetAt: now + config.windowMs });
      return true;
    },
    size: () => entries.size,
  };
}

const limits = {
  name: 100,
  organisation: 160,
  email: 254,
  message: 2_000,
} as const;
const emailPattern = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hasDisallowedControl(value: string, multiline = false) {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    if (code === 127) return true;
    if (!multiline) return code <= 31;
    return (
      code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31)
    );
  });
}

/** Validates and normalises the complete untrusted API payload. */
export function validateContactRequest(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false };
  }
  const candidate = payload as Record<string, unknown>;
  const stringFields = [
    "submissionId",
    "name",
    "organisation",
    "email",
    "message",
    "website",
  ] as const;
  const allowedFields = new Set([...stringFields, "startedAt"]);
  if (
    Object.keys(candidate).some((field) => !allowedFields.has(field)) ||
    stringFields.some((field) => typeof candidate[field] !== "string") ||
    typeof candidate.startedAt !== "number" ||
    !Number.isSafeInteger(candidate.startedAt) ||
    candidate.startedAt < 0
  ) {
    return { ok: false };
  }

  const value: ValidContactRequest = {
    submissionId: (candidate.submissionId as string).trim(),
    startedAt: candidate.startedAt,
    name: (candidate.name as string).trim(),
    organisation: (candidate.organisation as string).trim(),
    email: (candidate.email as string).trim(),
    message: (candidate.message as string).trim(),
    website: (candidate.website as string).trim(),
  };
  if (
    !uuidPattern.test(value.submissionId) ||
    hasDisallowedControl(value.name) ||
    hasDisallowedControl(value.organisation) ||
    hasDisallowedControl(value.email) ||
    hasDisallowedControl(value.message, true) ||
    !value.name ||
    value.name.length > limits.name ||
    !value.organisation ||
    value.organisation.length > limits.organisation ||
    !emailPattern.test(value.email) ||
    value.email.length > limits.email ||
    value.message.length < 10 ||
    value.message.length > limits.message ||
    value.website
  ) {
    return { ok: false };
  }
  return { ok: true, value };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function shell(
  title: string,
  intro: string,
  content: string,
  reference: string,
  preheader: string,
) {
  return `<!doctype html><html><body style="margin:0;background:#f4f8f8;color:#132a36;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${preheader}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f8f8"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #cbd9df;border-radius:12px;overflow:hidden"><tr><td style="background:#ffffff;padding:24px 32px;color:#052235;border-bottom:1px solid #15803d"><img src="https://www.capacityx.co.uk/images/capacity-logo-web.png" alt="Capacity+" width="240" height="122" style="display:block;border:0;max-width:100%;width:240px;height:auto"></td></tr><tr><td style="padding:32px;border-top:4px solid #0f766e"><h1 style="margin:0 0 16px;font-size:24px;color:#082f49">${title}</h1><p style="margin:0 0 24px;line-height:1.6;color:#526772">${intro}</p>${content}<p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #cbd9df;font-size:12px;color:#526772">Submission reference: ${reference}</p></td></tr><tr><td style="background:#ccfbf1;padding:18px 32px;font-size:12px;color:#132a36">Capacity+ · Integrated GP–community-pharmacy working</td></tr></table></td></tr></table></body></html>`;
}

function detailRow(label: string, value: string) {
  return `<tr><th align="left" valign="top" style="padding:10px 12px;background:#ccfbf1;color:#082f49;width:130px">${label}</th><td style="padding:10px 12px;border-bottom:1px solid #cbd9df;color:#132a36;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;
}

/** Builds the internal notification and visitor acknowledgement payloads. */
export function buildContactEmails(
  contact: ValidContactRequest,
  receivedAt: string,
): [BrevoMessage, BrevoMessage] {
  const safeReference = escapeHtml(contact.submissionId);
  const safeReceivedAt = escapeHtml(receivedAt);
  const details = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #cbd9df;border-radius:8px;overflow:hidden">${detailRow("Name", contact.name)}${detailRow("Organisation", contact.organisation)}${detailRow("Email", contact.email)}${detailRow("Message", contact.message)}${detailRow("Received at (UTC)", receivedAt)}</table>`;
  const receipt = `<div style="padding:18px;border-left:4px solid #15803d;background:#f4f8f8;color:#132a36"><strong>We have recorded your enquiry.</strong><br>Reference: ${safeReference}</div><p style="margin:24px 0 0;line-height:1.6;color:#526772"><strong>Privacy reminder:</strong> do not send patient-identifiable or clinical information by email or through this form.</p>`;

  return [
    {
      sender: { ...sender },
      to: [{ ...internalRecipient }],
      replyTo: { name: contact.name, email: contact.email },
      subject: "New Capacity+ website enquiry",
      htmlContent: shell(
        "New website enquiry",
        "A visitor has asked Capacity+ to discuss a local capacity challenge.",
        details,
        safeReference,
        `New Capacity+ enquiry received at ${safeReceivedAt}`,
      ),
      textContent: `Capacity+\n\nNew website enquiry\n\nName: ${contact.name}\nOrganisation: ${contact.organisation}\nEmail: ${contact.email}\nMessage: ${contact.message}\n\nReceived at (UTC): ${receivedAt}\nSubmission reference: ${contact.submissionId}`,
    },
    {
      sender: { ...sender },
      to: [{ name: contact.name, email: contact.email }],
      subject: "We have received your Capacity+ enquiry",
      htmlContent: shell(
        "Thank you for contacting Capacity+",
        "We have received your enquiry. A member of the Capacity+ team will respond to discuss your overview.",
        receipt,
        safeReference,
        `Your Capacity+ enquiry receipt — reference ${safeReference}`,
      ),
      textContent: `Capacity+\n\nThank you for contacting Capacity+. We have received your enquiry and a member of our team will respond.\n\nReceipt reference: ${contact.submissionId}\n\nPrivacy reminder: do not send patient-identifiable or clinical information by email or through this form.`,
    },
  ];
}

class ContactDeliveryError extends Error {}

async function sendOne(
  message: BrevoMessage,
  idempotencyKey: string,
  dependencies: Required<Pick<SendDependencies, "fetch" | "timeoutMs">> & {
    apiKey: string;
  },
) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new Error("Contact provider timeout")),
    dependencies.timeoutMs,
  );
  try {
    const response = await dependencies.fetch(BREVO_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": dependencies.apiKey,
        "content-type": "application/json",
        idempotencyKey,
      },
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    if (!response.ok) throw new ContactDeliveryError("Contact provider error");
  } catch (error) {
    if (controller.signal.aborted) {
      throw new ContactDeliveryError("Contact provider timeout");
    }
    if (error instanceof ContactDeliveryError) throw error;
    throw new ContactDeliveryError("Contact provider error");
  } finally {
    clearTimeout(timer);
  }
}

/** Sends both operations sequentially; Brevo deduplicates each stable operation key on retry. */
export async function sendContactEmails(
  contact: ValidContactRequest,
  dependencies: SendDependencies,
) {
  if (!dependencies.apiKey) {
    throw new ContactDeliveryError("Contact service configuration unavailable");
  }
  const runtime = {
    apiKey: dependencies.apiKey,
    fetch: dependencies.fetch ?? fetch,
    timeoutMs: dependencies.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  };
  const [internal, acknowledgement] = buildContactEmails(
    contact,
    dependencies.receivedAt ?? new Date().toISOString(),
  );
  await sendOne(internal, `contact-${contact.submissionId}-internal`, runtime);
  await sendOne(
    acknowledgement,
    `contact-${contact.submissionId}-acknowledgement`,
    runtime,
  );
}
