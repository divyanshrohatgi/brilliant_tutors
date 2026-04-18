import Link from "next/link";
import { CheckCircle } from "lucide-react";

const perks = [
  "No obligation, completely free",
  "Identifies strengths & gaps",
  "Personalised programme from day one",
];

export function AssessmentBanner() {
  return (
    <section className="relative overflow-hidden py-20" aria-labelledby="assessment-banner-heading"
      style={{ background: "linear-gradient(135deg, #1A3EBF 0%, #122D91 100%)" }}
    >
      {/* Subtle background circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Limited spaces each term</p>
            <h2 id="assessment-banner-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Book a <span className="text-accent">FREE</span> assessment today
            </h2>
            <p className="text-white/70 leading-7 max-w-md mx-auto lg:mx-0">
              Not sure where your child stands? Our free assessment identifies strengths and gaps so we can build the right programme from day one.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/90 text-sm">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:bg-accent/90 transition-colors min-h-[52px] text-base shadow-lg"
            >
              Claim your free assessment →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
