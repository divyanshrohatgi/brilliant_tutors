import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "11+ Mock Exams Reading | GL & CEM Papers",
  description:
    "Realistic GL and CEM 11+ mock exams in Reading and Berkshire. Timed conditions, full written feedback and school-specific preparation at Brilliant Tutors Academy.",
  alternates: { canonical: "/mock-exams" },
};

export default function MockExamsPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Year 5 &amp; 6</p>
          <h1 className="text-4xl font-bold mb-4">11+ Mock Exams</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            There is no better preparation than sitting a real exam. Our mock days replicate
            actual 11+ conditions — same timing, same format, same pressure — so exam day
            holds no surprises.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {features.map(({ title, desc }) => (
              <div key={title} className="bg-muted rounded-xl border border-border p-6">
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">What&apos;s included</h2>
              <ul className="space-y-3 mb-10" role="list">
                {[
                  "Full GL or CEM paper under timed conditions",
                  "Invigilated — just like the real exam",
                  "Detailed written feedback report per pupil",
                  "Percentile score and target areas identified",
                  "Post-exam parent briefing available",
                  "School-specific paper formats (Kendrick, Reading School, FSCE)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">Upcoming dates</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Mock exam dates are released each term.{" "}
                <Link href="/shop" className="text-primary font-medium hover:underline">
                  Book via our shop
                </Link>{" "}
                to secure your child&apos;s place.
              </p>
            </div>

            <div className="bg-muted rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-primary mb-2">Enquire about mock exams</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Not sure which paper format your child needs? We&apos;ll advise based on their target schools.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    title: "Realistic conditions",
    desc: "Papers sat in a quiet, invigilated room with the same timing as the real entrance test — no shortcuts.",
  },
  {
    title: "Written feedback",
    desc: "Every pupil receives a detailed report identifying strengths, weaknesses and specific topics to focus on.",
  },
  {
    title: "GL & CEM formats",
    desc: "We run papers for both major test providers, as well as school-specific formats for Kendrick and Reading School.",
  },
];
