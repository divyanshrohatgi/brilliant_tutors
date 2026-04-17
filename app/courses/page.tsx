import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "11+ Tutoring Courses in Reading",
  description:
    "Structured 11+ preparation courses for Years 3, 4 and 5 at Brilliant Tutors Academy. Centres in Earley, Caversham and Slough, plus online.",
  alternates: { canonical: "/courses" },
};

const years = [
  {
    year: "Year 3",
    ages: "Ages 7–8",
    href: "/courses/year-3",
    headline: "Early foundation",
    desc: "Build the core skills in English, Maths and Non-Verbal Reasoning that make 11+ preparation smoother. Our Year 3 programme creates confident, curious learners.",
    highlights: ["Weekly 2-hour sessions", "English, Maths & NVR", "Progress reports every half-term"],
  },
  {
    year: "Year 4",
    ages: "Ages 8–9",
    href: "/courses/year-4",
    headline: "Structured preparation",
    desc: "Introduce exam-style questions and Verbal Reasoning alongside continued Maths and English development. Year 4 is where 11+ habits are formed.",
    highlights: ["Weekly 2-hour sessions", "Verbal & Non-Verbal Reasoning", "Termly mock paper practice"],
  },
  {
    year: "Year 5",
    ages: "Ages 9–10",
    href: "/courses/year-5",
    headline: "Full 11+ preparation",
    desc: "Our most intensive programme. Weekly sessions, regular timed papers and monthly mock exams ensure your child is fully prepared for GL and CEM entrance tests.",
    highlights: ["Weekly 2-hour sessions", "Monthly mock exams", "Exam-day strategy coaching"],
  },
];

export default function CoursesPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">11+ Preparation Courses</h1>
          <p className="text-lg text-primary-foreground/80">
            Structured programmes from Year 3 through to the exam — building skills,
            confidence and exam technique at every stage.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="space-y-8" role="list">
            {years.map(({ year, ages, href, headline, desc, highlights }) => (
              <li key={href} className="bg-muted rounded-2xl border border-border p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-primary">{year}</h2>
                      <span className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full border border-border">
                        {ages}
                      </span>
                    </div>
                    <p className="text-accent font-semibold mb-2">{headline}</p>
                    <p className="text-muted-foreground leading-relaxed">{desc}</p>
                    <ul className="mt-4 space-y-1" role="list">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm">
                          <span className="text-accent font-bold">✓</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex lg:justify-end">
                    <Link
                      href={href}
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors min-h-[48px]"
                    >
                      View {year} courses →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
