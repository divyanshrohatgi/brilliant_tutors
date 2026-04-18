"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";

const UK_MOBILE_RE = /^(\+447\d{9}|07\d{9})$/;

const schema = z.object({
  parentFirstName: z.string().min(1, "Required"),
  parentLastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email address"),
  mobile: z.string().regex(UK_MOBILE_RE, "Enter a valid UK mobile (07xxxxxxxxx or +447xxxxxxxxx)"),
  studentFirstName: z.string().min(1, "Required"),
  studentLastName: z.string().min(1, "Required"),
  yearGroup: z.string().min(1, "Please select a year group"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  additionalInfo: z.string().optional(),
  termsConsent: z.boolean().refine((v) => v === true, {
    message: "You must agree to the privacy policy and terms",
  }),
});

type FormState = {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  mobile: string;
  studentFirstName: string;
  studentLastName: string;
  yearGroup: string;
  subjects: string[];
  additionalInfo: string;
  termsConsent: boolean;
  accountConsent: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const YEAR_GROUPS = ["Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11"];
const SUBJECTS = ["11+ Preparation", "Maths", "English", "Science"] as const;

const inputClass =
  "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px]";

export function ContactForm({ submitLabel = "Send Message" }: { submitLabel?: string }) {
  const [form, setForm] = useState<FormState>({
    parentFirstName: "", parentLastName: "", email: "", mobile: "",
    studentFirstName: "", studentLastName: "", yearGroup: "",
    subjects: [], additionalInfo: "", termsConsent: false, accountConsent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    if (errors[name as keyof FieldErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubject(subject: string, checked: boolean) {
    setForm((prev) => ({
      ...prev,
      subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
    }));
    if (errors.subjects) setErrors((prev) => ({ ...prev, subjects: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    const message = form.additionalInfo.trim() ||
      `Year Group: ${form.yearGroup}. Subjects: ${form.subjects.join(", ")}.`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.parentFirstName,
          lastName: form.parentLastName,
          email: form.email,
          phone: form.mobile,
          studentName: `${form.studentFirstName} ${form.studentLastName}`.trim(),
          desiredCourse: form.subjects.join(", "),
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-800 font-semibold text-lg mb-2">Booking request sent!</p>
        <p className="text-green-700 text-sm">
          Thanks for getting in touch. We&apos;ll confirm your free assessment within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Parent / Guardian */}
      <fieldset className="space-y-5">
        <legend className="text-base font-bold text-primary border-b border-border pb-2 w-full">
          Parent / Guardian Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField label="First Name" name="parentFirstName" value={form.parentFirstName} error={errors.parentFirstName} onChange={handleChange} required />
          <TextField label="Last Name" name="parentLastName" value={form.parentLastName} error={errors.parentLastName} onChange={handleChange} required />
        </div>
        <TextField label="Email Address" name="email" type="email" inputMode="email" value={form.email} error={errors.email} onChange={handleChange} required />
        <TextField label="Mobile Number" name="mobile" type="tel" inputMode="tel" placeholder="07xxxxxxxxx or +447xxxxxxxxx" value={form.mobile} error={errors.mobile} onChange={handleChange} required />
      </fieldset>

      {/* Student */}
      <fieldset className="space-y-5">
        <legend className="text-base font-bold text-primary border-b border-border pb-2 w-full">
          Student Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField label="First Name" name="studentFirstName" value={form.studentFirstName} error={errors.studentFirstName} onChange={handleChange} required />
          <TextField label="Last Name" name="studentLastName" value={form.studentLastName} error={errors.studentLastName} onChange={handleChange} required />
        </div>
        <SelectField label="Current Year Group" name="yearGroup" value={form.yearGroup} error={errors.yearGroup} onChange={handleChange} options={YEAR_GROUPS} placeholder="Select year group" required />
        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            Subjects of Interest <span aria-hidden="true">*</span>
          </p>
          <div
            className="grid grid-cols-2 gap-3"
            role="group"
            aria-label="Subjects of interest"
            aria-describedby={errors.subjects ? "subjects-error" : undefined}
          >
            {SUBJECTS.map((subject) => (
              <label key={subject} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.subjects.includes(subject)}
                  onChange={(e) => handleSubject(subject, e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary"
                />
                <span className="text-sm text-foreground">{subject}</span>
              </label>
            ))}
          </div>
          {errors.subjects && (
            <p id="subjects-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.subjects}</p>
          )}
        </div>
        <TextareaField label="Additional Information" name="additionalInfo" value={form.additionalInfo} onChange={handleChange} placeholder="Any additional context about your child's needs or goals (optional)" />
      </fieldset>

      {/* Consent */}
      <fieldset className="space-y-3">
        <legend className="sr-only">Consent</legend>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="accountConsent"
            checked={form.accountConsent}
            onChange={handleCheckbox}
            className="mt-0.5 w-4 h-4 rounded border-input accent-primary shrink-0"
          />
          <span className="text-sm text-muted-foreground">
            I consent to create a student account for ongoing access to resources and progress tracking
          </span>
        </label>
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="termsConsent"
              checked={form.termsConsent}
              onChange={handleCheckbox}
              aria-required="true"
              aria-invalid={!!errors.termsConsent}
              aria-describedby={errors.termsConsent ? "terms-error" : undefined}
              className="mt-0.5 w-4 h-4 rounded border-input accent-primary shrink-0"
            />
            <span className="text-sm text-muted-foreground">
              I agree to Brilliant Tutors Academy&apos;s{" "}
              <Link href="/privacy" className="text-primary underline hover:text-accent">privacy policy</Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary underline hover:text-accent">terms of service</Link>{" "}
              <span aria-hidden="true">*</span>
            </span>
          </label>
          {errors.termsConsent && (
            <p id="terms-error" role="alert" className="mt-1.5 text-xs text-destructive ml-7">{errors.termsConsent}</p>
          )}
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:contact@brilliant-tutors.co.uk" className="underline">contact@brilliant-tutors.co.uk</a>.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 disabled:opacity-60 transition-colors min-h-[48px]"
        >
          {status === "submitting" ? "Sending…" : submitLabel}
        </button>
        <p className="mt-3 text-xs text-muted-foreground">* Required fields</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {["No obligation", "Response within 1 working day", "Your data is never shared"].map((t) => (
            <li key={t} className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold">✓</span> {t}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

// ── helpers ───────────────────────────────────────────────────────────────────

function TextField({ label, name, type = "text", inputMode, placeholder, value, error, onChange, required }: {
  label: string; name: string; type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string; value: string; error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name} name={name} type={type} inputMode={inputMode}
        placeholder={placeholder} value={value} onChange={onChange}
        required={required} aria-required={required}
        aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, error, onChange, options, placeholder, required }: {
  label: string; name: string; value: string; error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <select
        id={name} name={name} value={value} onChange={onChange}
        required={required} aria-required={required}
        aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      >
        <option value="">{placeholder ?? "Select…"}</option>
        {options.map((opt) => <option key={opt}>{opt}</option>)}
      </select>
      {error && <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TextareaField({ label, name, value, error, onChange, required, placeholder }: {
  label: string; name: string; value: string; error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        id={name} name={name} rows={4} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
      />
      {error && <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
