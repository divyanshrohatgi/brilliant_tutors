import Link from "next/link";
import { programmes } from "@/lib/data";

export function CoursesCTA() {
  return (
    <section className="py-16 bg-muted" aria-labelledby="courses-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="courses-cta-heading" className="text-3xl font-bold text-primary mb-3">
            Our programmes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every child is different. We offer structured programmes from Year 3 through to GCSE.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {programmes.map(({ title, desc, href, tag }) => (
            <li key={href}>
              <Link
                href={href}
                className="group block bg-white rounded-xl border border-border p-6 h-full hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded">
                    {tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                  Find out more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
