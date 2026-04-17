import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Mock Mastery Programme | 11+ Exam Preparation Reading",
  description:
    "The Mock Mastery programme combines weekly tuition with monthly mock exams for complete 11+ preparation in Reading and Berkshire.",
  alternates: { canonical: "/mock-mastery" },
};

export default function MockMasteryPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Premium programme</p>
          <h1 className="text-4xl font-bold mb-4">Mock Mastery</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Our most comprehensive 11+ programme — combining weekly group tuition with monthly
            mock exams and one-to-one feedback sessions. Designed for pupils targeting the most
            competitive schools.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">What&apos;s included</h2>
            <ul className="space-y-3 mb-10" role="list">
              {[
                "Weekly 2-hour group tuition (max 8 pupils)",
                "Monthly full mock exam under timed conditions",
                "Individual feedback session after each mock",
                "Written progress report every half-term",
                "Access to our online practice question bank",
                "Parent progress meetings on request",
                "Exam-day strategy and wellbeing coaching",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
              <p className="text-sm font-semibold text-primary mb-1">Who is this for?</p>
              <p className="text-sm text-muted-foreground">
                Year 5 pupils targeting Kendrick School, Reading School, FSCE or other highly
                selective grammar schools. We recommend starting Mock Mastery in September of Year 5.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Apply for Mock Mastery</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Places are strictly limited. Contact us to discuss suitability and availability.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
