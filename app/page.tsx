import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { SchoolLogos } from "@/components/home/SchoolLogos";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CoursesCTA } from "@/components/home/CoursesCTA";
import { AssessmentBanner } from "@/components/home/AssessmentBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "11+ & GCSE Tutoring in Reading, Berkshire | Brilliant Tutors Academy",
  description:
    "Expert 11+ and GCSE preparation in Reading, Earley, Caversham and Slough. Trusted by hundreds of Berkshire families since 2015. Book a place today.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SchoolLogos />
      <HowItWorks />
      <Testimonials />
      <CoursesCTA />
      <AssessmentBanner />
      <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Get in touch</p>
            <h2 id="contact-heading" className="text-3xl font-extrabold text-primary tracking-tight mb-3">
              We&apos;d love to hear from you
            </h2>
            <p className="text-muted-foreground leading-7">
              Questions about a programme? Not sure which year group to enrol in?
              We&apos;re happy to help — we reply within one working day.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
