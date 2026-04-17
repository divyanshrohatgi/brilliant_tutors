import { targetSchools } from "@/lib/data";

export function SchoolLogos() {
  return (
    <section className="py-14 bg-white border-b border-border" aria-label="Schools our pupils attend">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          Our pupils earn places at
        </p>
        <ul className="flex flex-wrap justify-center gap-3" role="list">
          {targetSchools.map((school) => (
            <li
              key={school}
              className="px-4 py-2 bg-[#F0F4FF] rounded-full text-sm font-semibold text-primary border border-primary/10 hover:border-accent hover:text-accent transition-colors"
            >
              {school}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
