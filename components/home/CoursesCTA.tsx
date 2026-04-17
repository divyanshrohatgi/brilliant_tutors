import Link from "next/link";

const CDN = "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto/brilliant-tutors";

const cards = [
  {
    title: "Year 3",
    tag: "Ages 7–8",
    href: "/courses/year-3",
    tagline: "Building the foundations for 11+ success",
    outcome: "Prepares for: Core English & Maths",
    photo: `${CDN}/lvl3`,
    flagship: false,
  },
  {
    title: "Year 4",
    tag: "Ages 8–9",
    href: "/courses/year-4",
    tagline: "Technique, practice, confidence",
    outcome: "Prepares for: VR, NVR & Maths",
    photo: `${CDN}/year4`,
    flagship: false,
  },
  {
    title: "Year 5",
    tag: "Ages 9–10",
    href: "/courses/year-5",
    tagline: "The final push — intensive 11+ preparation",
    outcome: "Prepares for: GL, CEM, ISEB",
    photo: `${CDN}/year5`,
    flagship: true,
  },
  {
    title: "GCSE",
    tag: "Ages 14–16",
    href: "/gcse",
    tagline: "Grade 7–9 targeting for Maths and English",
    outcome: "Prepares for: AQA, Edexcel, OCR",
    photo: `${CDN}/blog5`,
    flagship: false,
  },
  {
    title: "Summer Booster",
    tag: "All years",
    href: "/summer-booster",
    tagline: "Stay sharp through the holidays",
    outcome: "Prepares for: the year ahead",
    photo: `${CDN}/summer`,
    flagship: false,
  },
  {
    title: "Mock Exams",
    tag: "Year 5–6",
    href: "/mock-exams",
    tagline: "Real exam conditions, real feedback",
    outcome: "Covers: GL & CEM papers",
    photo: `${CDN}/mock`,
    flagship: false,
  },
];

export function CoursesCTA() {
  return (
    <section className="py-20" style={{ background: "#FAF7F2" }} aria-labelledby="courses-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Programmes</p>
          <h2 id="courses-cta-heading" className="text-3xl font-extrabold text-primary tracking-tight mb-3">
            Every stage, every child
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-7">
            Structured programmes from Year 3 through to GCSE — tailored to your child&apos;s needs.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto" role="list">
          {cards.map(({ title, tag, href, tagline, outcome, photo, flagship }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden h-full"
              >
                {/* Photo area */}
                <div
                  className="relative w-full overflow-hidden shrink-0 h-44"
                >
                  <img
                    src={photo}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Bottom navy gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(27,43,75,0.55) 0%, transparent 55%)" }}
                  />

                  {/* Age badge — overlaps photo bottom-left */}
                  <span className="absolute bottom-3 left-3 text-xs font-semibold bg-white/90 text-primary px-3 py-1 rounded-full shadow-sm">
                    {tag}
                  </span>

                  {/* Most Popular pill — Year 5 only */}
                  {flagship && (
                    <span className="absolute top-3 right-3 text-xs font-bold bg-accent text-white px-3 py-1 rounded-full shadow">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-base text-muted-foreground mb-3 leading-snug">{tagline}</p>
                  <p className="text-sm font-semibold text-accent mb-4">{outcome}</p>
                  <span className="mt-auto text-sm font-semibold text-primary/60 group-hover:text-accent group-hover:underline underline-offset-4 transition-colors">
                    Find out more →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
