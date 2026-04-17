import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "11+ Tutor Earley | 11+ Preparation Earley Reading",
  description:
    "11+ tutoring in Earley, Reading. Expert small-group preparation for Kendrick School, Reading School and grammar schools across Berkshire.",
  alternates: { canonical: "/11-plus-tutor-earley" },
};

export default function EarleyPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Earley, Reading</p>
          <h1 className="text-4xl font-bold mb-4">11+ Tutor Earley</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Our Earley centre is our flagship location — conveniently located for families
            across East Reading, Woodley and the surrounding area. Weekly sessions run
            throughout the academic year.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Earley centre details</h2>
            <dl className="space-y-3 text-sm mb-10">
              {[
                ["Location", "Earley, Reading (exact address on booking)"],
                ["Parking", "Free on-site parking"],
                ["Sessions", "Mon, Wed, Thu evenings + Saturday mornings"],
                ["Years", "Year 3, 4 and 5"],
              ].map(([dt, dd]) => (
                <div key={dt as string} className="flex gap-4">
                  <dt className="font-semibold text-primary w-24 shrink-0">{dt}</dt>
                  <dd className="text-muted-foreground">{dd}</dd>
                </div>
              ))}
            </dl>

            <h2 className="text-2xl font-bold text-primary mb-4">Programmes at Earley</h2>
            <ul className="space-y-2" role="list">
              {[
                "Year 3 Early Foundation",
                "Year 4 Structured Preparation",
                "Year 5 Full 11+ Preparation",
                "Year 5 Mock Mastery (premium)",
                "Saturday Intensive Sessions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Enquire about Earley</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Check timetable and availability at our Earley centre.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
