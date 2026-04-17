import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";

export type CourseDetail = [label: string, value: string];

type Props = {
  tag: string;
  title: string;
  intro: string;
  curriculum: string[];
  details: CourseDetail[];
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  ctaHeading?: string;
  ctaNote?: string;
};

export function CoursePage({
  tag,
  title,
  intro,
  curriculum,
  details,
  prev,
  next,
  ctaHeading = "Enrol or find out more",
  ctaNote = "Contact us to check availability and discuss the right session for your child.",
}: Props) {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">{tag}</p>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">{intro}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">What&apos;s covered</h2>
            <ul className="space-y-3 mb-10" role="list">
              {curriculum.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5" aria-hidden="true">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Session details</h2>
            <dl className="space-y-3 text-sm">
              {details.map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <dt className="font-semibold text-primary w-36 shrink-0">{label}</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-8">
            <h2 className="text-xl font-bold text-primary mb-2">{ctaHeading}</h2>
            <p className="text-muted-foreground text-sm mb-6">{ctaNote}</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {(prev || next) && (
        <nav className="py-8 bg-muted border-t border-border" aria-label="Course navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
            {prev ? (
              <Link href={prev.href} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                ← {prev.label}
              </Link>
            ) : <span />}
            {next && (
              <Link href={next.href} className="text-sm font-semibold text-primary hover:text-accent transition-colors">
                {next.label} →
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
