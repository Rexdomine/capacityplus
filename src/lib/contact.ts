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
) => Promise<ContactSubmitResult>;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!payload.name.trim()) errors.name = "Enter your name.";
  if (!payload.organisation.trim()) {
    errors.organisation = "Enter your organisation.";
  }
  if (!/^\S+@\S+\.\S+$/.test(payload.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (payload.message.trim().length < 10) {
    errors.message = "Enter a short message of at least 10 characters.";
  }
  if (payload.website.trim()) {
    errors.website = "Unable to submit this enquiry.";
  }
  return errors;
}

export const inertContactSubmitter: ContactSubmitter = async () => ({
  ok: false,
  message:
    "Your enquiry was not sent or stored because the contact service is not yet connected.",
});
