"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Students prepared" },
  { value: 95, suffix: "%", label: "Pass rate" },
  { value: 4, suffix: "", label: "Centre locations" },
  { value: 10, suffix: "+", label: "Years experience" },
];

function CountUp({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!run || reduced) { setCount(target); return; }
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [run, target, reduced]);

  return <>{count}{suffix}</>;
}

export function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-14" style={{ background: "#FAF7F2" }} aria-label="Key statistics">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4" role="list">
          {stats.map(({ value, suffix, label }, i) => (
            <li
              key={label}
              className="px-8 py-6 text-center"
              style={i < stats.length - 1 ? { borderRight: "1px solid #f5a62340" } : undefined}
            >
              <p className="text-4xl font-black text-accent tracking-tight mb-1">
                <CountUp target={value} suffix={suffix} run={inView} />
              </p>
              <p className="text-sm text-primary font-medium">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
