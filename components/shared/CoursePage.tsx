import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/shared/ContactForm";
import { Clock, MapPin, Users, BookOpen } from "lucide-react";

export type CourseDetail = [label: string, value: string];

export type KeyFact = {
  title: string;
  detail: string;
};

export type DaySchedule = {
  day: string;
  sessionName: string;
  duration: string;
  description: string;
  color: string;
};

type Props = {
  tag: string;
  title: string;
  intro: string;
  details: CourseDetail[];
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  // Rich content
  image?: string;
  description?: string;
  keyFacts?: KeyFact[];
  weeklySchedule?: DaySchedule[];
  scheduleIntro?: string;
};

const detailIcons = [Clock, MapPin, Users, BookOpen];

export function CoursePage({
  tag,
  title,
  intro,
  details,
  prev,
  next,
  image,
  description,
  keyFacts,
  weeklySchedule,
  scheduleIntro,
}: Props) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${image ? "lg:grid-cols-2" : ""} gap-12 items-center`}>
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-4">{tag}</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight mb-6">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {intro}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                {details.map(([label, value], i) => {
                  const Icon = detailIcons[i % detailIcons.length];
                  return (
                    <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span><strong className="text-primary font-semibold">{label}:</strong> {value}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-colors min-h-[48px]"
                >
                  Enrol Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary hover:text-white transition-colors min-h-[48px]"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {image && (
              <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Course description + key facts ── */}
      {(description || keyFacts?.length) && (
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {description && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">About this course</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
                </div>
              )}

              {keyFacts?.length && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Key facts</h2>
                  <ul className="space-y-5">
                    {keyFacts.map((fact) => (
                      <li key={fact.title}>
                        <p className="font-bold text-primary text-sm">{fact.title}</p>
                        <p className="text-muted-foreground text-sm mt-0.5">{fact.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Weekly schedule ── */}
      {weeklySchedule?.length && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-2">A week on the course</h2>
            {scheduleIntro && (
              <p className="text-muted-foreground mb-8 max-w-2xl">{scheduleIntro}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {weeklySchedule.map((day) => (
                <div
                  key={day.day}
                  className="relative rounded-2xl overflow-hidden flex flex-col text-white shadow-md"
                  style={{ background: `linear-gradient(160deg, ${day.color}ee 0%, ${day.color} 100%)` }}
                >
                  {/* Top accent strip */}
                  <div className="h-1 w-full bg-white/30" />

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    {/* Day badge */}
                    <span className="self-start text-[10px] font-extrabold uppercase tracking-[0.15em] bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {day.day}
                    </span>

                    {/* Session info */}
                    <div>
                      <p className="font-extrabold text-lg leading-tight">{day.sessionName}</p>
                      <p className="text-white/60 text-xs font-medium mt-0.5">{day.duration}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/20" />

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed flex-1">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact form ── */}
      <section id="contact" className="py-20 bg-muted border-t border-border" aria-labelledby="course-contact-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Get started</p>
            <h2 id="course-contact-heading" className="text-3xl font-extrabold text-primary tracking-tight mb-3">
              Reserve your spot
            </h2>
            <p className="text-muted-foreground">
              Spaces fill up quickly. Fill in your details and we&apos;ll be in touch within one working day.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-8">
            <ContactForm submitLabel="Reserve My Spot" />
          </div>
        </div>
      </section>

      {/* ── Prev / Next nav ── */}
      {(prev || next) && (
        <nav className="py-8 bg-white border-t border-border" aria-label="Course navigation">
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
