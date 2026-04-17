import Link from "next/link";
import { GraduationCap } from "lucide-react";

const footerLinks = {
  Programmes: [
    { label: "Year 3 Courses", href: "/courses/year-3" },
    { label: "Year 4 Courses", href: "/courses/year-4" },
    { label: "Year 5 Courses", href: "/courses/year-5" },
    { label: "GCSE Tuition", href: "/gcse" },
    { label: "Summer Booster", href: "/summer-booster" },
    { label: "Mock Exams", href: "/mock-exams" },
  ],
  Locations: [
    { label: "11+ Tutor Reading", href: "/11-plus-tutor-reading" },
    { label: "11+ Tutor Earley", href: "/11-plus-tutor-earley" },
    { label: "11+ Tutor Caversham", href: "/11-plus-tutor-caversham" },
  ],
  Company: [
    { label: "Blog", href: "/blog" },
    { label: "Shop", href: "/shop" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <GraduationCap className="h-7 w-7 text-accent" aria-hidden="true" />
              <span>Brilliant Tutors</span>
            </Link>

            {/* Official badge */}
            <img
              src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_100/brilliant-tutors/logo"
              alt="Brilliant Tutors Academy official badge"
              width={100}
              height={100}
              className="mb-5"
            />

            <p className="text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              Expert 11+ and GCSE tutoring in Reading, Berkshire. Centres in Earley,
              Caversham and Slough.
            </p>
            <address className="not-italic text-sm text-primary-foreground/70 space-y-1">
              <p>
                <a href="tel:01184050184" className="hover:text-accent transition-colors">
                  01184 050184
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@brilliant-tutors.co.uk"
                  className="hover:text-accent transition-colors"
                >
                  contact@brilliant-tutors.co.uk
                </a>
              </p>
            </address>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-sm mb-4 text-accent">{heading}</h3>
              <ul className="space-y-2" role="list">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Brilliant Tutors Academy Ltd. All rights reserved.</p>
          <p>Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
  );
}
