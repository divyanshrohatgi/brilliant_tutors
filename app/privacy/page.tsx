import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Brilliant Tutors Academy — how we collect, use and protect your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-10">Last updated: April 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">1. Who we are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Brilliant Tutors Academy Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a tutoring
            business registered in England and Wales. Our registered address and contact details are:
            01184 050184 | contact@brilliant-tutors.co.uk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">2. What data we collect</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Name, email address and phone number (when you contact us or create an account)",
              "Your child's name and year group (when booking a course)",
              "Payment information — processed securely by Stripe; we never see your card details",
              "Usage data — pages visited, session duration (via analytics, with your consent)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">3. How we use your data</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use your data to fulfil bookings, respond to enquiries, send order confirmations and
            — with your explicit consent — to send marketing communications about our courses.
            We do not sell your data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">4. Children&apos;s data</h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect children&apos;s first names for booking purposes only. This data is not
            shared with third parties, is not used in analytics or marketing, and is stored
            securely. Accounts are held by parents or guardians.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">5. Data retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            Contact form submissions are retained for a maximum of 2 years where no order is
            placed. Order and booking records are retained for 7 years as required by UK tax law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">6. Your rights (UK GDPR)</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to access, correct, or request deletion of your personal data at
            any time. To exercise your rights, email{" "}
            <a href="mailto:contact@brilliant-tutors.co.uk" className="text-primary underline">
              contact@brilliant-tutors.co.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">7. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use essential cookies to keep you signed in and remember your cart. We use analytics
            cookies only with your consent. See our{" "}
            <a href="/cookies" className="text-primary underline">Cookie Policy</a> for details.
          </p>
        </section>
      </div>
    </div>
  );
}
