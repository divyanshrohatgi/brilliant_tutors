import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "11+ Tutor Reading | 11+ Preparation Reading Berkshire",
  description:
    "Expert 11+ tutors in Reading, Berkshire. Helping pupils prepare for Kendrick School, Reading School and FSCE since 2015. Small groups, proven results.",
  alternates: { canonical: "/11-plus-tutor-reading" },
};

export default function ReadingPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Reading, Berkshire</p>
          <h1 className="text-4xl font-bold mb-4">11+ Tutor Reading</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Brilliant Tutors Academy has been helping Reading families prepare for the 11+
            since 2015. Our Reading centre offers small-group tuition led by specialist
            tutors who know exactly what Kendrick, Reading School and FSCE are looking for.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Why Reading families choose us</h2>
            <ul className="space-y-3 mb-10" role="list">
              {[
                "Specialist knowledge of Kendrick and Reading School entrance tests",
                "Consistent 95%+ pass rate for pupils on our full programme",
                "Small groups of maximum 8 — every child gets attention",
                "Experienced DBS-checked tutors",
                "Regular mock exams with detailed written feedback",
                "Parent progress updates every half-term",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Target schools from Reading</h2>
            <ul className="grid grid-cols-2 gap-2" role="list">
              {["Kendrick School", "Reading School", "Abbey School", "Holyport College", "FSCE Grammar", "Upton Court Grammar"].map((s) => (
                <li key={s} className="text-sm bg-muted border border-border rounded-lg px-3 py-2 text-primary font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Book a place in Reading</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Check availability at our Reading centre and discuss the right programme for your child.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
