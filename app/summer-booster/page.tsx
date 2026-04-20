import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { ContactForm } from "@/components/shared/ContactForm";
import { Clock, CalendarDays, Zap } from "lucide-react";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Summer Booster Course | 11+ Intensive in Reading",
  description:
    "7-day intensive 11+ summer booster course in Reading. English, Maths, VR, NVR and Creative Writing. 21 hours of expert teaching plus 2 free mock exams. July–August 2025.",
  alternates: { canonical: "/summer-booster" },
  openGraph: {
    images: [{
      url: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_1200/brilliant-tutors/summer_booster_4",
      width: 1200,
      height: 630,
    }],
  },
};

const features = [
  {
    title: "Accelerated learning",
    desc: "Content across all subjects covered comprehensively over the seven day course — English, Maths, Verbal Reasoning, Non-Verbal Reasoning and Creative Writing, all in one intensive programme.",
  },
  {
    title: "21 hours of expert teaching",
    desc: "All classes are conducted by fully qualified expert teachers who have mastery in their relevant subjects. Three focused hours every day for seven consecutive days.",
  },
  {
    title: "2 free 11+ hall-based mock exams included",
    desc: "What better way to measure progress than sitting a realistic 11+ mock exam? Each student receives a copy of the exam and answer booklet to keep, plus a detailed report breaking down performance. Available in GL or FSCE formats.",
  },
  {
    title: "Individual support for each student",
    desc: "We work hard to ensure each student receives the attention they need to flourish. Our tutors move around the room and engage with students individually throughout every session.",
  },
  {
    title: "Suitable for all preparation levels",
    desc: "Students are taught how to approach tricky topics and challenging exam questions in a step-by-step manner, to ensure proficiency is achieved — whether they are just starting out or fine-tuning for September.",
  },
];

const COURSE_DATES = "27th July – 3rd August 2025";

const groups = [
  {
    label: "Group 1",
    dates: COURSE_DATES,
    time: "10:00 am – 1:00 pm",
    format: "Classroom",
    color: "#dc2626",
  },
  {
    label: "Group 2",
    dates: COURSE_DATES,
    time: "2:00 pm – 5:00 pm",
    format: "Classroom",
    color: "#1A3EBF",
  },
];

export default async function SummerBoosterPage() {
  const products = await db.product.findMany({
    where: {
      isActive: true,
      category: { contains: "summer", mode: "insensitive" },
    },
    orderBy: { createdAt: "asc" },
    include: { variants: { select: { stock: true } } },
  });

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: "Summer Booster Course",
    startDate: "2025-07-27",
    endDate: "2025-08-03",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Brilliant Tutors Academy",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Reading",
        addressRegion: "Berkshire",
        addressCountry: "GB",
      },
    },
    organizer: { "@id": "https://brilliant-tutors.co.uk/#organization" },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk"}/summer-booster`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(eventJsonLd) }}
      />
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 font-semibold text-xs uppercase tracking-widest mb-4">July – August 2025</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Summer Booster Course
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            A 7-day intensive programme covering everything a student needs to know to perform well in the 11+ exam.
            Perfect for those who wish to revise subject content in a short period of time, or kickstart revision ahead of September.
          </p>

          {/* Group badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {groups.map((g) => (
              <div key={g.label} className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold">
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>{g.label}: {g.time}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#reserve"
              className="inline-flex items-center px-7 py-3 bg-white text-amber-700 font-bold rounded-full hover:bg-white/90 transition-colors min-h-[48px]"
            >
              Reserve your spot
            </a>
            <a
              href="#what-is-included"
              className="inline-flex items-center px-7 py-3 border-2 border-white/40 text-white font-semibold rounded-full hover:border-white transition-colors min-h-[48px]"
            >
              What&apos;s included
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-white/70">
            {[
              "Reading School · Kendrick · Slough · Gloucester & more",
              "21 hours of teaching",
              "2 free mock exams included",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-white font-bold">✓</span> {t}
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

      {/* ── Dates ── */}
      <section className="py-14 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Course dates</p>
            <h2 className="text-3xl font-extrabold text-primary">Choose your group</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
              Both groups run on the same dates. Select a morning or afternoon slot to suit your family.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {groups.map((g) => (
              <div
                key={g.label}
                className="rounded-2xl border border-border overflow-hidden"
              >
                <div
                  className="px-7 py-4 text-white"
                  style={{ backgroundColor: g.color }}
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1">{g.format}</p>
                  <h3 className="text-xl font-extrabold">{g.label}</h3>
                </div>
                <div className="px-7 py-6 bg-white space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <CalendarDays className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-primary">Dates</p>
                      <p className="text-muted-foreground">{g.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-primary">Session times</p>
                      <p className="text-muted-foreground">{g.time} — 3 hours per day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-primary">Total teaching</p>
                      <p className="text-muted-foreground">21 hours across 7 days</p>
                    </div>
                  </div>
                  <a
                    href="#reserve"
                    className="inline-flex w-full items-center justify-center mt-2 px-5 py-3 text-white font-bold rounded-xl hover:opacity-90 transition-opacity min-h-[48px] text-sm"
                    style={{ backgroundColor: g.color }}
                  >
                    Reserve a spot in {g.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section id="what-is-included" className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Everything covered</p>
            <h2 className="text-3xl font-extrabold text-primary">What&apos;s included</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Feature list */}
            <div className="lg:col-span-2">
              <ol className="divide-y divide-border">
                {features.map(({ title, desc }, i) => (
                  <li key={title} className="flex gap-6 py-8 first:pt-0 last:pb-0">
                    <span className="text-4xl font-extrabold text-primary/10 leading-none shrink-0 w-10 text-right tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sticky summary box */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-2xl overflow-hidden">
                <div className="px-7 py-5 text-white" style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)" }}>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-white/70 mb-1">At a glance</p>
                  <p className="text-2xl font-extrabold">Summer Booster</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 px-7 py-6 space-y-4">
                  {[
                    ["7 days", COURSE_DATES],
                    ["21 hours", "of expert teaching"],
                    ["5 subjects", "English, Maths, VR, NVR, CW"],
                    ["2 mock exams", "GL or FSCE, included free"],
                    ["2 groups", "Morning 10–1 · Afternoon 2–5"],
                  ].map(([val, label]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 border-b border-amber-200 pb-4 last:border-0 last:pb-0">
                      <span className="font-extrabold text-amber-800 text-base">{val}</span>
                      <span className="text-amber-700/70 text-sm text-right">{label}</span>
                    </div>
                  ))}
                  <a
                    href="#reserve"
                    className="flex w-full items-center justify-center mt-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors min-h-[48px] text-sm"
                  >
                    Reserve your spot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shop items ── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-2">Secure your place</p>
              <h2 className="text-3xl font-extrabold text-primary">Book the Summer Booster</h2>
              <p className="text-muted-foreground mt-1 text-sm">Spaces are limited — all our courses fill up quickly.</p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-muted rounded-2xl border border-border p-12 text-center">
              <p className="text-muted-foreground mb-2 font-medium">Booking is not yet open for the Summer Booster.</p>
              <p className="text-sm text-muted-foreground mb-6">
                Places are released each year. Fill in your details below and we&apos;ll notify you as soon as they go live.
              </p>
              <a
                href="#reserve"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                Get notified
              </a>
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

      {/* ── Contact / Reserve ── */}
      <section id="reserve" className="py-20 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Limited spaces</p>
            <h2 className="text-3xl font-extrabold text-primary mb-3">Reserve your spot</h2>
            <p className="text-muted-foreground">
              All of our courses fill up quickly. Fill out a few details and select your child&apos;s year group —
              our team will be in touch within one working day to confirm your place and answer any questions.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-8">
            <ContactForm submitLabel="Reserve My Spot" />
          </div>
        </div>
      </section>

      {/* ── Prev / Next nav ── */}
      <nav className="py-8 bg-white border-t border-border" aria-label="Course navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
          <Link href="/courses/year-5" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            ← Year 5 courses
          </Link>
          <Link href="/mock-exams" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
            Mock exams →
          </Link>
        </div>
      </nav>
    </>
  );
}
