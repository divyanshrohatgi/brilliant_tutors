import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { CentreMap } from "@/components/contact/CentreMap";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Contact Us | Brilliant Tutors Academy",
  description:
    "Get in touch with Brilliant Tutors Academy. Find our tuition centres in Earley, Caversham, Reading and Slough, or send us a message and we'll reply within one working day.",
  alternates: { canonical: "/contact" },
};

const centres = [
  {
    name: "Earley Centre",
    address: "Earley Business Centre\n459 Wokingham Road\nEarley, Reading\nRG6 7HU",
    phone: "01184 050184",
    email: "earley@brilliant-tutors.co.uk",
    hours: "Mon–Fri 3:30pm–8pm · Sat 8:30am–1pm",
    mapUrl: "https://maps.google.com/?q=Wokingham+Road+Earley+Reading+RG6",
  },
  {
    name: "Caversham Centre",
    address: "Caversham Community Hall\n12 Church Road\nCaversham, Reading\nRG4 7AD",
    phone: "01184 050184",
    email: "caversham@brilliant-tutors.co.uk",
    hours: "Tue & Thu 3:30pm–8pm · Sat 8:30am–1pm",
    mapUrl: "https://maps.google.com/?q=Church+Road+Caversham+Reading+RG4",
  },
  {
    name: "Reading Centre",
    address: "Reading Education Hub\n35 Queens Road\nReading\nRG1 4AR",
    phone: "01184 050184",
    email: "reading@brilliant-tutors.co.uk",
    hours: "Mon–Fri 3:30pm–8pm · Sat 8:30am–1pm",
    mapUrl: "https://maps.google.com/?q=Queens+Road+Reading+RG1",
  },
  {
    name: "Slough Centre",
    address: "Slough Learning Centre\n78 High Street\nSlough\nSL1 1EL",
    phone: "01184 050184",
    email: "slough@brilliant-tutors.co.uk",
    hours: "Tue & Sat 9am–1pm",
    mapUrl: "https://maps.google.com/?q=High+Street+Slough+SL1",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://brilliant-tutors.co.uk/#localbusiness",
  name: "Brilliant Tutors Academy",
  description: "11+ and GCSE tuition centre in Reading, Berkshire",
  url: "https://brilliant-tutors.co.uk/contact",
  telephone: "01184 050184",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Earley Business Centre, 459 Wokingham Road",
    addressLocality: "Earley, Reading",
    addressRegion: "Berkshire",
    postalCode: "RG6 7HU",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.454,
    longitude: -0.974,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:30",
      closes: "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00"
    }
  ],
  priceRange: "$$",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(localBusinessJsonLd) }}
      />
      {/* Hero */}
      <section
        className="py-14 sm:py-20 px-4 text-primary-foreground"
        style={{ background: "linear-gradient(135deg, #1A3EBF 0%, #122D91 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Questions about a programme? Not sure which year group to enrol in?
            We&apos;re happy to help — we reply within one working day.
          </p>
        </div>
      </section>

      {/* Centres grid */}
      <section className="py-16 bg-muted" aria-labelledby="centres-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Locations</p>
            <h2 id="centres-heading" className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Our tuition centres
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {centres.map(({ name, address, phone, email, hours, mapUrl }) => (
              <li key={name} className="bg-white rounded-2xl border border-border p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">{name}</h3>
                  <address className="not-italic text-sm text-muted-foreground leading-relaxed flex flex-col gap-3">
                    <span className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{address}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{hours}</span>
                    </span>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span>{phone}</span>
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors break-all">
                      <Mail className="w-4 h-4 text-accent shrink-0" />
                      <span>{email}</span>
                    </a>
                  </address>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/5 border border-primary/15 text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  View on map
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive map */}
      <CentreMap />

      {/* General contact form */}
      <section className="py-16 bg-white" aria-labelledby="contact-form-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Send a message</p>
            <h2 id="contact-form-heading" className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mb-3">
              General enquiry
            </h2>
            <p className="text-muted-foreground leading-7">
              Fill in the form below and one of our team will get back to you within one working day.
            </p>
          </div>
          <div className="bg-muted rounded-2xl border border-border p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Quick contact bar */}
      <section className="py-10 border-t border-border bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">Call us</dt>
                <dd className="font-semibold text-primary">
                  <a href="tel:01184050184" className="hover:text-accent transition-colors">01184 050184</a>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">Email us</dt>
                <dd className="font-semibold text-primary">
                  <a href="mailto:contact@brilliant-tutors.co.uk" className="hover:text-accent transition-colors">
                    contact@brilliant-tutors.co.uk
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">Response time</dt>
                <dd className="font-semibold text-primary">Within one working day</dd>
              </div>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
