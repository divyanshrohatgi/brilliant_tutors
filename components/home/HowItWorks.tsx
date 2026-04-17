"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Free Assessment",
    desc: "We identify your child's strengths and gaps in a friendly 1-hour session.",
  },
  {
    number: "02",
    title: "Tailored Plan",
    desc: "Expert tutors design a programme matched to your child's target school and year group.",
  },
  {
    number: "03",
    title: "Weekly Sessions",
    desc: "Small group teaching, past paper practice, and regular mock exams.",
  },
  {
    number: "04",
    title: "Exam Success",
    desc: "Confidence on exam day, with families celebrating offers from top grammar schools.",
  },
];

function Step({ number, title, desc, index }: { number: string; title: string; desc: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center flex-1 relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      }}
    >
      <p
        className="font-black leading-none mb-4 select-none"
        style={{ fontSize: "5rem", color: "#f5a623", opacity: 0.4 }}
        aria-hidden="true"
      >
        {number}
      </p>
      {/* Dot on the line */}
      <div className="w-3 h-3 rounded-full bg-accent mb-4 shrink-0" />
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm text-primary/60 leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20" style={{ background: "#F0F4FA" }} aria-labelledby="how-it-works-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Our approach</p>
          <h2 id="how-it-works-heading" className="text-3xl font-extrabold text-primary tracking-tight mb-3">
            How we get results
          </h2>
          <p className="text-primary/60 text-lg max-w-md mx-auto">
            A structured path from foundation to success.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting dashed line — desktop only */}
          <div
            className="hidden md:block absolute top-[calc(5rem+1.5rem+0.375rem)] left-[calc(12.5%+0.375rem)] right-[calc(12.5%+0.375rem)] h-px pointer-events-none"
            aria-hidden="true"
            style={{ borderTop: "2px dashed #f5a62355" }}
          />

          {/* Steps row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4">
            {steps.map((step, i) => (
              <Step key={step.number} {...step} index={i} />
            ))}
          </div>

          {/* Connecting vertical dashed lines — mobile only, between steps */}
          <div className="md:hidden flex flex-col items-center -mt-6 mb-6 gap-0">
            {/* Just visual rhythm — handled by gap-10 above */}
          </div>
        </div>

      </div>
    </section>
  );
}
