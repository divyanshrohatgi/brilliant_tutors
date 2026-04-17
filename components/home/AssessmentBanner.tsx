import Link from "next/link";

export function AssessmentBanner() {
  return (
    <section className="py-16 bg-accent" aria-labelledby="assessment-banner-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="assessment-banner-heading" className="text-3xl font-extrabold text-primary tracking-tight mb-3">
          Book a FREE assessment today
        </h2>
        <p className="text-primary/70 leading-7 mb-8 max-w-xl mx-auto">
          Not sure where your child stands? Our free assessment identifies strengths and gaps so we
          can build the right programme from day one.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors min-h-[52px] text-base"
        >
          Claim your free assessment
        </Link>
      </div>
    </section>
  );
}
