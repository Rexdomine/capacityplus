"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import {
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  type ContactSubmitter,
  fetchContactSubmitter,
  validateContact,
} from "@/lib/contact";

const initialValues: ContactPayload = {
  name: "",
  organisation: "",
  email: "",
  message: "",
  website: "",
};
const fields: Array<Exclude<ContactField, "website">> = [
  "name",
  "organisation",
  "email",
  "message",
];

export function ContactForm({
  submitter = fetchContactSubmitter,
}: {
  submitter?: ContactSubmitter;
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const submissionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(Date.now());
  const [status, setStatus] = useState(
    "Complete the form and Capacity+ will respond to your enquiry.",
  );

  function update(field: ContactField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateContact(next)[field],
      }));
    }
  }

  function validateField(field: ContactField) {
    setErrors((current) => ({
      ...current,
      [field]: validateContact(values)[field],
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid =
      fields.find((field) => nextErrors[field]) ??
      (nextErrors.website ? "website" : undefined);
    if (firstInvalid) {
      setStatus(
        "Check the highlighted fields. Your enquiry was not sent or stored.",
      );
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    pendingRef.current = true;
    setPending(true);
    setStatus("Submitting your enquiry…");
    try {
      submissionIdRef.current ??= crypto.randomUUID();
      const result = await submitter(
        values,
        submissionIdRef.current,
        startedAtRef.current,
      );
      setStatus(result.message);
      if (result.ok) {
        setValues(initialValues);
        setErrors({});
        submissionIdRef.current = null;
        startedAtRef.current = Date.now();
      }
    } catch {
      setStatus(
        "Your enquiry was not sent. Your entries remain in the form so you can try again later.",
      );
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <Field
        label="Name"
        name="name"
        value={values.name}
        error={errors.name}
        onChange={update}
        onBlur={validateField}
        autoComplete="name"
      />
      <Field
        label="Organisation"
        name="organisation"
        value={values.organisation}
        error={errors.organisation}
        onChange={update}
        onBlur={validateField}
        autoComplete="organization"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={update}
        onBlur={validateField}
        autoComplete="email"
      />
      <div className="field">
        <label htmlFor="message">Short message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => validateField("message")}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>
      <p className="form-warning">
        <strong>
          Do not include patient-identifiable or clinical information.
        </strong>
      </p>
      <output className="form-status" aria-live="polite">
        {status}
      </output>
      <button className="button-primary" type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Book a call"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: "name" | "organisation" | "email";
  type?: string;
  value: string;
  error?: string;
  autoComplete: string;
  onChange: (field: ContactField, value: string) => void;
  onBlur: (field: ContactField) => void;
};

function Field({
  label,
  name,
  type = "text",
  value,
  error,
  autoComplete,
  onChange,
  onBlur,
}: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
      />
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
