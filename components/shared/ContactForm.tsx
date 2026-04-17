"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  studentName: z.string().optional(),
  desiredCourse: z.string().optional(),
  message: z.string().min(10, "Please give us a little more detail (min 10 characters)"),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const PROGRAMME_OPTIONS = [
  "Year 3 Tuition",
  "Year 4 Tuition",
  "Year 5 11+ Preparation",
  "GCSE Tuition",
  "Summer Booster",
  "Mock Exams",
  "Other",
];

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentName: "",
    desiredCourse: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Fields;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-800 font-semibold text-lg mb-2">Message sent!</p>
        <p className="text-green-700 text-sm">
          Thanks for getting in touch. We&apos;ll reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="First name" name="firstName" value={fields.firstName} error={errors.firstName} onChange={handleChange} required />
        <TextField label="Last name" name="lastName" value={fields.lastName} error={errors.lastName} onChange={handleChange} required />
      </div>
      <TextField label="Email address" name="email" type="email" inputMode="email" value={fields.email} error={errors.email} onChange={handleChange} required />
      <TextField label="Phone number" name="phone" type="tel" inputMode="tel" value={fields.phone ?? ""} onChange={handleChange} />
      <TextField label="Child's name" name="studentName" value={fields.studentName ?? ""} onChange={handleChange} />
      <SelectField
        label="Programme of interest"
        name="desiredCourse"
        value={fields.desiredCourse ?? ""}
        onChange={handleChange}
        options={PROGRAMME_OPTIONS}
      />
      <TextareaField
        label="Message"
        name="message"
        value={fields.message}
        error={errors.message}
        onChange={handleChange}
        required
        placeholder="Tell us a bit about your child and what you're hoping to achieve..."
      />

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:contact@brilliant-tutors.co.uk" className="underline">
            contact@brilliant-tutors.co.uk
          </a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 disabled:opacity-60 transition-colors min-h-[48px]"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[48px]";

function TextField({
  label,
  name,
  type = "text",
  inputMode,
  value,
  error,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={onChange} className={inputClass}>
        <option value="">Select a programme</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  error,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
