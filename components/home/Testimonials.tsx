import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-16 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-primary mb-3">
            What parents say
          </h2>
          <p className="text-muted-foreground">
            Hundreds of Berkshire families trust us with their children&apos;s education.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {testimonials.map(({ quote, author, detail }) => (
            <li key={author} className="bg-muted rounded-xl p-6 flex flex-col border border-border">
              <svg
                className="h-6 w-6 text-accent mb-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-sm leading-relaxed text-foreground flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <footer className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-primary">{author}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
