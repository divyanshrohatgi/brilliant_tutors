import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for Brilliant Tutors Academy — what cookies we use and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">Cookie Policy</h1>
      <p className="text-muted-foreground text-sm mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-bold text-primary mb-3">What are cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files stored on your device when you visit a website.
            They help the site remember your preferences and improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Cookies we use</h2>
          <div className="space-y-4">
            {cookieTypes.map(({ name, type, purpose }) => (
              <div key={name} className="bg-muted rounded-lg border border-border p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-primary text-sm">{name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${type === "Essential" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                    {type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Managing cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            You can control non-essential cookies via the cookie banner on your first visit.
            You can also clear cookies at any time through your browser settings. Note that
            disabling essential cookies may affect site functionality.
          </p>
        </section>
      </div>
    </div>
  );
}

const cookieTypes = [
  {
    name: "Authentication (Clerk)",
    type: "Essential",
    purpose: "Keeps you signed in to your account. Without this cookie you would need to sign in on every page.",
  },
  {
    name: "Session / cart",
    type: "Essential",
    purpose: "Remembers items in your shopping cart between visits.",
  },
  {
    name: "Analytics",
    type: "Analytics",
    purpose: "Helps us understand how visitors use the site so we can improve it. Only set with your consent.",
  },
];
