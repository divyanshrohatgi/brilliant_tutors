import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Brilliant Tutors Academy courses, bookings and payments.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">Terms &amp; Conditions</h1>
      <p className="text-muted-foreground text-sm mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-foreground">
        {terms.map(({ heading, body }) => (
          <section key={heading}>
            <h2 className="text-xl font-bold text-primary mb-3">{heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

const terms = [
  {
    heading: "1. Bookings",
    body: "All course places must be booked and paid for in advance via our website or by contacting us directly. A place is only confirmed once payment has been received. We reserve the right to refuse or cancel bookings at our discretion.",
  },
  {
    heading: "2. Payment",
    body: "All prices are quoted in GBP and include VAT where applicable. Payment is processed securely via Stripe. We accept card, Apple Pay and Google Pay. Monthly subscription fees are charged in advance.",
  },
  {
    heading: "3. Cancellations & refunds",
    body: "Cancellations made more than 14 days before the course start date are eligible for a full refund. Cancellations within 14 days are non-refundable unless the course is cancelled by us. Mock exam bookings are non-refundable within 7 days of the exam date.",
  },
  {
    heading: "4. Attendance",
    body: "We cannot offer refunds or make-up sessions for missed classes. If a session is cancelled by us due to unforeseen circumstances, we will reschedule or offer a credit.",
  },
  {
    heading: "5. Conduct",
    body: "We expect all pupils to attend sessions ready to learn and to treat tutors and other pupils with respect. We reserve the right to remove a pupil from a programme without refund if their conduct is disruptive.",
  },
  {
    heading: "6. Results",
    body: "While we are proud of our track record, we cannot guarantee exam results. Outcomes depend on many factors including attendance, effort and natural ability.",
  },
  {
    heading: "7. Governing law",
    body: "These terms are governed by the law of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    heading: "8. Contact",
    body: "For any questions about these terms, contact us at contact@brilliant-tutors.co.uk or call 01184 050184.",
  },
];
