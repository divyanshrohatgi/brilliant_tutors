import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = "Brilliant Tutors Academy <no-reply@brilliant-tutors.co.uk>";
export const CONTACT_ADDRESS = "contact@brilliant-tutors.co.uk";
