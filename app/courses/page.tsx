import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
    tag: "Early Foundation",
    href: "/courses/year-3",
    image: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/lvl3",
    desc: "Starting early can mean all the difference. We work with young students to build foundational skills in English, Maths and Non-Verbal Reasoning — in a way that sets them up for success in the exams without the pressure.",
    highlights: ["5 sessions per week", "English, Maths & NVR", "Progress reports every half-term", "100% success rate for students starting here"],
    accent: "#dc2626",
  },
  {
    year: "Year 4",
    ages: "Ages 8–9",
    tag: "Structured Preparation",
    href: "/courses/year-4",
    image: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/year4",
    desc: "Year 4 is the perfect opportunity for students to get to grips with all the topic areas ahead of Year 5. We work with students to ensure they master every subject — Maths, English, Verbal and Non-Verbal Reasoning.",
    highlights: ["5 sessions per week", "Verbal & Non-Verbal Reasoning", "Termly mock paper practice", "98% success rate for students starting here"],
    accent: "#d97706",
  },
  {
    year: "Year 5",
    ages: "Ages 9–10",
    tag: "Full 11+ Preparation",
    href: "/courses/year-5",
    image: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/year5",
    desc: "We focus on covering all topic areas in the depth required to ensure students gain mastery. Expert tutors work with students to transfer great subject knowledge into exam performance — for GL, FSCE and all leading grammar schools.",
    highlights: ["4 sessions per week · 2 hours each", "Monthly mock exams", "Exam-day strategy coaching", "All materials included (value £1,400+)"],
    accent: "#1A3EBF",
  },
];


export default function CoursesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #1A3EBF 0%, #122D91 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-4">Year 3, 4 &amp; 5</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            11+ Preparation Courses
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Structured programmes from Year 3 through to the exam — building skills,
            confidence and exam technique at every stage.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-white/60">
            {["Expert tutors", "Earley · Caversham · Slough · Online", "All materials included"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 40h1440V20C1200 0 960 40 720 40S240 0 0 20V40z" fill="white" />
          </svg>
        </div>
        <div className="h-10" aria-hidden="true" />
      </section>

      {/* ── Course rows ── */}
      {years.map(({ year, ages, tag, href, image, desc, highlights, accent }, i) => {
        const imageLeft = i % 2 === 0;
        return (
          <section
            key={year}
            className={`py-0 border-b border-border ${i % 2 === 1 ? "bg-muted" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${imageLeft ? "" : "lg:grid-flow-dense"}`}>
                {/* Image */}
                <div className={`relative h-72 sm:h-96 lg:h-[480px] ${imageLeft ? "" : "lg:col-start-2"}`}>
                  <Image
                    src={image}
                    alt={`${year} 11+ preparation course`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay tag */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-widest text-white px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    >
                      {tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center px-8 py-12 lg:px-14 ${imageLeft ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">{year}</h2>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border font-medium">
                      {ages}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-7 text-[15px]">{desc}</p>

                  <ul className="space-y-2.5 mb-8">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-primary">
                        <span className="mt-0.5 text-accent font-bold shrink-0">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={href}
                      className="inline-flex items-center px-7 py-3 text-white font-bold rounded-full hover:opacity-90 transition-opacity min-h-[48px]"
                      style={{ backgroundColor: accent }}
                    >
                      View {year} course →
                    </Link>
                    <Link
                      href="#contact"
                      className="inline-flex items-center px-7 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors min-h-[48px]"
                    >
                      Enrol Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Summer Booster promo strip ── */}
      <div className="border-b border-amber-200" style={{ background: "linear-gradient(90deg, #fffbeb 0%, #fef3c7 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-white px-2.5 py-1 rounded-full shrink-0">
              Summer 2025
            </span>
            <p className="text-sm font-semibold text-amber-900">
              Summer Booster Course — 7-day intensive with 2 free mock exams included.
              <span className="font-normal text-amber-700 ml-1 hidden sm:inline">27 Jul – 3 Aug · Morning &amp; afternoon groups.</span>
            </p>
          </div>
          <Link
            href="/summer-booster"
            className="shrink-0 text-sm font-bold text-amber-700 border border-amber-400 bg-white hover:bg-amber-50 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Read more →
          </Link>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Not sure where to start?</p>
          <h2 className="text-3xl font-extrabold mb-4">We&apos;ll guide you to the right course</h2>
          <p className="text-white/70 mb-8">
            Tell us your child&apos;s year group and target schools and we&apos;ll recommend the best programme for them.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:bg-accent/90 transition-colors min-h-[48px]"
          >
            Book a free assessment
          </Link>
        </div>
      </section>
    </>
  );
}
