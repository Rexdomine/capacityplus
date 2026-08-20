export type ContactPayload = {
  name: string;
  organisation: string;
  email: string;
  message: string;
  website: string;
};

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactSubmitResult = { ok: boolean; message: string };
export type ContactSubmitter = (
  payload: ContactPayload,
  submissionId: string,
  startedAt: number,
) => Promise<ContactSubmitResult>;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!payload.name.trim()) errors.name = "Enter your name.";
  else if (payload.name.trim().length > 100) {
    errors.name = "Keep your name to 100 characters or fewer.";
  }
  if (!payload.organisation.trim()) {
    errors.organisation = "Enter your organisation.";
  } else if (payload.organisation.trim().length > 160) {
    errors.organisation = "Keep your organisation to 160 characters or fewer.";
  }
  if (
    payload.email.trim().length > 254 ||
    !/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(payload.email.trim())
  ) {
    errors.email = "Enter a valid email address.";
  }
  if (payload.message.trim().length < 10) {
    errors.message = "Enter a short message of at least 10 characters.";
  } else if (payload.message.trim().length > 2000) {
    errors.message = "Keep your message to 2,000 characters or fewer.";
  }
  if (payload.website.trim()) {
    errors.website = "Unable to submit this enquiry.";
  }
  return errors;
}

const failure: ContactSubmitResult = {
  ok: false,
  message:
    "Your enquiry could not be sent. Your entries remain in the form so you can try again.",
};

/** Posts a contact attempt to the same-origin server endpoint. */
export async function fetchContactSubmitter(
  payload: ContactPayload,
  submissionId: string,
  startedAt: number,
  fetcher: typeof fetch = fetch,
): Promise<ContactSubmitResult> {
  try {
    const response = await fetcher("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, submissionId, startedAt }),
    });
    if (!response.ok) return failure;
    return {
      ok: true,
      message: "Thank you. Your enquiry has been sent to Capacity+.",
    };
  } catch {
    return failure;
  }
}
