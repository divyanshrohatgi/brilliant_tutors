"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { label: "Courses", href: "/courses" },
  { label: "GCSE", href: "/gcse" },
  { label: "Mock Exams", href: "/mock-exams" },
  { label: "Timetable", href: "/timetable" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Free Assessment", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms & Conditions", href: "/terms" },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f1629" }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_120/brilliant-tutors/logo"
                alt="Brilliant Tutors Academy"
                width={38}
                height={38}
                className="rounded-full"
              />
              <span className="font-bold text-base">Brilliant Tutors</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Expert 11+ and GCSE tutoring in Reading, Berkshire. Empowering students to reach their potential.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/BTAcademyUK/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/brilliant-tutors-academy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-accent mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-accent mb-4">Contact</h3>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>St Peters Church Hall, Church Rd, Earley, Reading RG6 1EY</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:01184050184" className="hover:text-accent transition-colors">01184 050184</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:contact@brilliant-tutors.co.uk" className="hover:text-accent transition-colors break-all">
                  contact@brilliant-tutors.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p>Mon–Sat: 9am – 7pm</p>
                  <p>Sun: 9am – 5:30pm</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Get in touch CTA */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-accent mb-4">Get in Touch</h3>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              Have a question about our programmes? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full py-3 text-sm font-semibold bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
            >
              Send us a message
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Brilliant Tutors Academy Ltd. All rights reserved. Registered in England &amp; Wales.</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-accent transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
