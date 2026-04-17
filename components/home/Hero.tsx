import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
              Reading&apos;s trusted 11+ specialists
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Give your child the{" "}
              <span className="text-accent">best possible</span> start
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              Expert 11+ and GCSE preparation in Reading, Berkshire. Helping pupils
              earn places at Kendrick, Reading School and Grammar Schools across the
              county since 2015.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors min-h-[48px]"
              >
                View our courses
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-md hover:border-accent hover:text-accent transition-colors min-h-[48px]"
              >
                Get in touch
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/70">
              <div>
                <span className="block text-2xl font-bold text-accent">500+</span>
                pupils prepared
              </div>
              <div>
                <span className="block text-2xl font-bold text-accent">95%</span>
                pass rate
              </div>
              <div>
                <span className="block text-2xl font-bold text-accent">10+</span>
                years experience
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
              <p className="text-accent font-semibold mb-4">Upcoming sessions</p>
              <ul className="space-y-4" role="list">
                {upcomingSessions.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-start gap-4 border-b border-primary-foreground/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="bg-accent/20 text-accent rounded-md px-2 py-1 text-xs font-semibold shrink-0">
                      {s.tag}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{s.label}</p>
                      <p className="text-primary-foreground/60 text-xs mt-0.5">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                className="mt-6 block text-center text-sm font-semibold text-accent hover:underline"
              >
                See all available places →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const upcomingSessions = [
  { tag: "Year 5", label: "11+ Intensive — Earley Centre", detail: "Saturdays · 9am–12pm · from £180" },
  { tag: "Year 4", label: "Weekly Tuition — Caversham", detail: "Thursdays · 4pm–6pm · from £120/month" },
  { tag: "GCSE", label: "Maths Booster — Reading", detail: "Sundays · 10am–1pm · from £150" },
  { tag: "Mock", label: "GL Mock Exam — Slough Centre", detail: "Sat 14 June · All day · £45" },
];
