import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "GCSE Tutor Reading Berkshire | Maths & English",
  description:
    "Expert GCSE Maths and English tuition in Reading, Berkshire. Small groups, experienced tutors and a proven record of Grade 7+ results at Brilliant Tutors Academy.",
  alternates: { canonical: "/gcse" },
};

export default function GCSEPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Ages 14–16</p>
          <h1 className="text-4xl font-bold mb-4">GCSE Tuition in Reading</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Targeted Maths and English support for Years 10 and 11. Our GCSE tutors know
            the AQA and Edexcel specs inside out — and how to turn a Grade 4 into a Grade 7.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Subjects &amp; topics</h2>
            <div className="space-y-8">
              {subjects.map(({ name, topics }) => (
                <div key={name}>
                  <h3 className="font-semibold text-primary mb-3">{name}</h3>
                  <ul className="space-y-2" role="list">
                    {topics.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span className="text-muted-foreground">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-primary mt-10 mb-4">Session details</h2>
            <dl className="space-y-3 text-sm">
              {[
                ["Frequency", "Once or twice per week"],
                ["Duration", "2 hours per session"],
                ["Locations", "Reading · Online"],
                ["Class size", "Maximum 6 pupils"],
                ["Spec coverage", "AQA · Edexcel · OCR"],
              ].map(([dt, dd]) => (
                <div key={dt as string} className="flex gap-4">
                  <dt className="font-semibold text-primary w-36 shrink-0">{dt}</dt>
                  <dd className="text-muted-foreground">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Book a place</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Tell us your child&apos;s current grade and target — we&apos;ll recommend the right programme.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

const subjects = [
  {
    name: "GCSE Maths",
    topics: [
      "Number, algebra and ratio",
      "Geometry and measures",
      "Probability and statistics",
      "Past paper technique and exam timing",
      "Calculator and non-calculator papers",
    ],
  },
  {
    name: "GCSE English Language & Literature",
    topics: [
      "Reading comprehension and analysis",
      "Creative and descriptive writing",
      "AQA Language Papers 1 & 2",
      "Set text analysis (Literature)",
      "Unseen poetry and comparison",
    ],
  },
];
