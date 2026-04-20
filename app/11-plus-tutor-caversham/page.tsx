import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "11+ Tutor Caversham | 11+ Preparation Caversham Reading",
  description:
    "11+ tutoring in Caversham, Reading. Expert preparation for Kendrick School, Reading School and grammar schools. Small groups, experienced tutors.",
  alternates: { canonical: "/11-plus-tutor-caversham" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://brilliant-tutors.co.uk/11-plus-tutor-caversham/#localbusiness",
  parentOrganization: { "@id": "https://brilliant-tutors.co.uk/#organization" },
  areaServed: { "@type": "City", name: "Caversham" },
};

export default function CavershamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(localBusinessJsonLd) }}
      />
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Caversham, Reading</p>
          <h1 className="text-4xl font-bold mb-4">11+ Tutor Caversham</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Our Caversham centre serves families north of Reading — Caversham, Emmer Green,
            Sonning Common and beyond. The same expert tutors, same small groups, same results.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Caversham centre details</h2>
            <dl className="space-y-3 text-sm mb-10">
              {[
                ["Location", "Caversham, Reading (exact address on booking)"],
                ["Parking", "Street parking available nearby"],
                ["Sessions", "Tue, Thu evenings + Saturday mornings"],
                ["Years", "Year 3, 4 and 5"],
              ].map(([dt, dd]) => (
                <div key={dt as string} className="flex gap-4">
                  <dt className="font-semibold text-primary w-24 shrink-0">{dt}</dt>
                  <dd className="text-muted-foreground">{dd}</dd>
                </div>
              ))}
            </dl>

            <h2 className="text-2xl font-bold text-primary mb-4">Programmes at Caversham</h2>
            <ul className="space-y-2" role="list">
              {[
                "Year 3 Early Foundation",
                "Year 4 Structured Preparation",
                "Year 5 Full 11+ Preparation",
                "Online sessions also available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">Enquire about Caversham</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Check timetable and availability at our Caversham centre.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
