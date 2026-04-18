import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { ContactForm } from "@/components/shared/ContactForm";
import { ClipboardCheck, FileText, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "11+ Mock Exams Reading | GL & FSCE Papers",
  description:
    "Realistic GL and FSCE 11+ mock exams in Reading and Berkshire. Timed conditions, full written feedback and school-specific preparation at Brilliant Tutors Academy.",
  alternates: { canonical: "/mock-exams" },
};

const steps = [
  {
    icon: ClipboardCheck,
    title: "Book and sit the exam",
    desc: "Choose your exam type — Reading School, Kendrick, Slough and more. Your child sits a full-length realistic mock in a quiet, invigilated setting at our Reading venue. Our team is on hand to help them settle in.",
  },
  {
    icon: FileText,
    title: "Take home the paper",
    desc: "After the exam, you receive the full paper your child completed. Review it together in your own time, revisit tricky questions, and use it as a revision resource.",
  },
  {
    icon: BarChart3,
    title: "Receive a detailed report",
    desc: "Within a few days, you receive a precise breakdown of your child's performance by topic area and subject, benchmarked against peers who sat the same exam.",
  },
];

const fscePoints = [
  {
    title: "Adventure Paper",
    tag: "Multiple Choice",
    desc: "Tests English, maths and other curriculum subjects. Assesses comprehension, vocabulary, problem-solving, and factual knowledge.",
  },
  {
    title: "Beacon Paper",
    tag: "Short Answers",
    desc: "Requires written responses to subject-based questions. Assesses accuracy, reasoning, spelling and mental calculation.",
  },
  {
    title: "Compass Paper",
    tag: "Multiple Choice",
    desc: "Similar to Adventure, with a mix of subjects and question types. Focuses on curriculum knowledge under time pressure.",
  },
  {
    title: "Discovery Paper",
    tag: "Creative Response",
    desc: "A written task testing imagination and expression. Assesses creativity, coherence, language, and original thinking.",
  },
];

const glPoints = [
  {
    title: "English",
    tag: "Comprehension & Vocabulary",
    desc: "Tests reading comprehension, grammar and punctuation. Assesses inference, spelling, synonyms, sentence structure.",
  },
  {
    title: "Mathematics",
    tag: "Numerical Reasoning",
    desc: "Covers KS2 maths topics (up to Year 6). Assesses calculation, word problems, logic, and number sense.",
  },
  {
    title: "Verbal Reasoning",
    tag: "Not taught in school",
    desc: "Tests word patterns and logic. Assesses code-cracking, sequences, analogies, letter/word relationships.",
  },
  {
    title: "Non-Verbal Reasoning",
    tag: "Not taught in school",
    desc: "Tests spatial and pattern recognition. Assesses shape sequences, rotations, and visual logic.",
  },
];

export default async function MockExamsPage() {
  const products = await db.product.findMany({
    where: {
      isActive: true,
      category: { contains: "mock", mode: "insensitive" },
    },
    orderBy: { createdAt: "asc" },
    include: { variants: { select: { stock: true } } },
  });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #1A3EBF 0%, #122D91 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-4">Year 5 &amp; 6</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            11+ Mock Exams
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The closest experience to the real exam. Realistic papers, invigilated conditions,
            and a detailed performance report — for Reading School, Kendrick, Slough and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center px-7 py-3 bg-accent text-accent-foreground font-bold rounded-full hover:bg-accent/90 transition-colors min-h-[48px]"
            >
              Book a mock exam
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-7 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:border-accent hover:text-accent transition-colors min-h-[48px]"
            >
              How it works
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-white/60">
            {["Expert-written papers", "Held in person at our Reading venue", "Detailed feedback report included"].map((t) => (
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

      {/* ── Book now ── */}
      <section id="book" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Available now</p>
              <h2 className="text-3xl font-extrabold text-primary">Book your mock exam</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Regular <span className="line-through">£55</span> &nbsp;·&nbsp;
              Sale <span className="font-bold text-primary">£45</span>
            </p>
          </div>

          {products.length === 0 ? (
            <div className="bg-muted rounded-2xl border border-border p-12 text-center">
              <p className="text-muted-foreground mb-2 font-medium">No mock exam dates are currently listed.</p>
              <p className="text-sm text-muted-foreground mb-6">New dates are added each term — contact us to be notified.</p>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors">
                Get notified
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-16 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-3xl font-extrabold text-primary">How our mock exams work</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Our papers are created by expert teachers who have spent hundreds of hours analysing the real exams — the difficulty, the format, the feel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border z-0" aria-hidden="true" />

            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative bg-white rounded-2xl border border-border p-7 flex flex-col gap-4 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-4xl font-extrabold text-primary/10 leading-none select-none">{i + 1}</span>
                </div>
                <h3 className="font-bold text-primary text-base">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exam types ── */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Know the format</p>
            <h2 className="text-3xl font-extrabold text-primary">Which exam does your child need?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Different schools use different formats. Make sure you&apos;re preparing for the right one.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FSCE */}
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="px-8 py-5 flex items-center justify-between" style={{ backgroundColor: "#dc2626" }}>
                <div>
                  <h3 className="text-xl font-extrabold text-white">FSCE 11+ Exam</h3>
                  <p className="text-white/70 text-xs mt-0.5">For Reading School applicants</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-3 py-1.5 rounded-full shrink-0">
                  New 2025
                </span>
              </div>
              <div className="p-8 bg-white">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  FSCE is based on the national curriculum (up to Year 5) — no separate reasoning papers. It tests how well children apply what they&apos;ve learned in school. Split across four papers:
                </p>
                <ul className="space-y-4">
                  {fscePoints.map((p) => (
                    <li key={p.title} className="flex gap-4">
                      <span className="mt-1 w-2 h-2 rounded-full bg-[#dc2626] shrink-0" />
                      <div>
                        <span className="font-bold text-primary text-sm">{p.title}</span>
                        <span className="ml-2 text-[11px] text-white bg-[#dc2626]/80 px-2 py-0.5 rounded-full font-medium">{p.tag}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="inline-flex items-center mt-6 text-sm font-semibold text-[#dc2626] hover:underline underline-offset-4">
                  Read our full FSCE guide →
                </Link>
              </div>
            </div>

            {/* GL */}
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="px-8 py-5 flex items-center justify-between" style={{ backgroundColor: "#d97706" }}>
                <div>
                  <h3 className="text-xl font-extrabold text-white">GL 11+ Exam</h3>
                  <p className="text-white/70 text-xs mt-0.5">For Kendrick, Slough &amp; other grammar schools</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-3 py-1.5 rounded-full shrink-0">
                  Multiple choice
                </span>
              </div>
              <div className="p-8 bg-white">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  GL exams test core academic skills across four subjects. Two of them — Verbal and Non-Verbal Reasoning — are not taught in school, making specialist preparation essential.
                </p>
                <ul className="space-y-4">
                  {glPoints.map((p) => (
                    <li key={p.title} className="flex gap-4">
                      <span className="mt-1 w-2 h-2 rounded-full bg-[#d97706] shrink-0" />
                      <div>
                        <span className="font-bold text-primary text-sm">{p.title}</span>
                        <span className="ml-2 text-[11px] text-white bg-[#d97706]/80 px-2 py-0.5 rounded-full font-medium">{p.tag}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="inline-flex items-center mt-6 text-sm font-semibold text-[#d97706] hover:underline underline-offset-4">
                  Read our full GL guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="py-20 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Not sure?</p>
            <h2 className="text-3xl font-extrabold text-primary mb-3">We&apos;ll help you choose</h2>
            <p className="text-muted-foreground">
              Tell us your child&apos;s target schools and we&apos;ll advise on the right exam format and upcoming dates.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
