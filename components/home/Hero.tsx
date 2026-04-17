"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = "easeOut" as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-primary-foreground"
      style={{ background: "linear-gradient(135deg, #1b2b4b 0%, #243660 60%, #1e3a5f 100%)" }}
    >
      {/* Subtle background circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
      </div>

      {/* Left-column background photo — desktop only, clipped to left half */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 overflow-hidden pointer-events-none" aria-hidden="true">
        <img src="/images/hero-bg.svg" alt="" className="w-full h-full object-cover object-center" style={{ opacity: 0.13 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, #1e3a5f 100%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0, ease }}
              className="text-accent font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Reading&apos;s trusted 11+ specialists
            </motion.p>

            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Help your child{" "}
              <em className="not-italic text-accent">thrive</em>{" "}
              and succeed
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg text-primary-foreground/80 leading-7 mb-8 max-w-lg"
            >
              Expert 11+ and GCSE preparation in Reading, Berkshire. Helping pupils
              earn places at Kendrick, Reading School and grammar schools across the
              county since 2015.
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors min-h-[48px]"
              >
                Book free assessment
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-full hover:border-accent hover:text-accent transition-colors min-h-[48px]"
              >
                View courses
              </Link>
            </motion.div>

            {/* Decorative arrow pointing toward sessions card — desktop only */}
            <div className="hidden lg:block absolute top-[58%] right-[calc(50%-24px)] pointer-events-none" aria-hidden="true">
              <svg width="72" height="52" viewBox="0 0 72 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 46 C18 38, 38 20, 64 6" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
                <path d="M58 4 L64 6 L60 12" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
              </svg>
            </div>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="inline-flex items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/15 rounded-full px-4 py-2 text-sm">
                <span className="text-accent font-bold">500+</span>
                <span className="text-primary-foreground/80">students placed at grammar schools</span>
              </div>
              <img
                src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_60/brilliant-tutors/logo"
                alt="Brilliant Tutors Academy"
                width={60}
                height={60}
                className="opacity-90"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="hidden lg:block"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-5">
                Upcoming sessions
              </p>
              <ul className="space-y-4" role="list">
                {upcomingSessions.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="bg-accent/20 text-accent rounded-lg px-2.5 py-1 text-xs font-bold shrink-0">
                      {s.tag}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{s.label}</p>
                      <p className="text-primary-foreground/60 text-xs mt-0.5">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                className="mt-6 block text-center text-sm font-semibold text-accent hover:underline underline-offset-4"
              >
                See all available places →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 48h1440V24C1200 0 960 48 720 48S240 0 0 24V48z" fill="white" />
        </svg>
      </div>

      <div className="h-12" aria-hidden="true" />
    </section>
  );
}

const upcomingSessions = [
  { tag: "Year 5", label: "11+ Intensive — Earley Centre", detail: "Saturdays · 9am–12pm · from £180" },
  { tag: "Year 4", label: "Weekly Tuition — Caversham", detail: "Thursdays · 4pm–6pm · from £120/month" },
  { tag: "GCSE", label: "Maths Booster — Reading", detail: "Sundays · 10am–1pm · from £150" },
  { tag: "Mock", label: "GL Mock Exam — Slough Centre", detail: "Sat 14 June · All day · £45" },
];
