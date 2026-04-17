import { targetSchools } from "@/lib/data";

export function SchoolLogos() {
  return (
    <section className="py-12 bg-white border-y border-border" aria-label="Schools our pupils attend">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          Our pupils earn places at
        </p>
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6" role="list">
          {targetSchools.map((school) => (
            <li key={school} className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-primary border border-border">
              {school}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
