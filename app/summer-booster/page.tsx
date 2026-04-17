import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Summer Booster Course Reading | 11+ & GCSE",
  description:
    "Intensive summer booster programme for 11+ and GCSE pupils in Reading and Berkshire. Consolidate skills and get ahead before the new school year.",
  alternates: { canonical: "/summer-booster" },
};

export default function SummerBoosterPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Summer programme</p>
          <h1 className="text-4xl font-bold mb-4">Summer Booster Course</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Make the most of the summer holidays. Our booster programme consolidates the
            year&apos;s learning, fills gaps, and gives pupils a confident head start for
            the year ahead.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Who is it for?</h2>
            <ul className="space-y-3 mb-10" role="list">
              {[
                "Year 4 pupils preparing to start 11+ tuition in Year 5",
                "Year 5 pupils who want an intensive push before exam season",
                "Year 6 pupils needing GCSE foundation preparation",
                "GCSE students targeting grade improvements in August resits",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Programme details</h2>
            <dl className="space-y-3 text-sm">
              {[
                ["Dates", "July–August (dates TBC)"],
                ["Duration", "Half-day or full-day options"],
                ["Locations", "Earley · Caversham · Reading"],
                ["Class size", "Maximum 8 pupils"],
              ].map(([dt, dd]) => (
                <div key={dt as string} className="flex gap-4">
                  <dt className="font-semibold text-primary w-28 shrink-0">{dt}</dt>
                  <dd className="text-muted-foreground">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Register interest</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Summer places are limited. Get in touch early to secure a spot.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
