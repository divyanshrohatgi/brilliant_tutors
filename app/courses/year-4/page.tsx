import type { Metadata } from "next";
import { CoursePage } from "@/components/shared/CoursePage";

export const metadata: Metadata = {
  title: "Year 4 11+ Tuition in Reading",
  description:
    "11+ preparation for Year 4 pupils in Reading and Berkshire. Verbal Reasoning, Maths and English at Brilliant Tutors Academy.",
  alternates: { canonical: "/courses/year-4" },
};

export default function Year4Page() {
  return (
    <CoursePage
      tag="Ages 8–9"
      title="Year 4 — Structured Preparation"
      intro="Year 4 is when 11+ habits are formed. Our programme introduces Verbal Reasoning and exam-style questions alongside continued Maths and English development."
      curriculum={[
        "Verbal Reasoning — all 21 question types",
        "Non-Verbal Reasoning patterns and sequences",
        "Advanced English comprehension",
        "Maths: fractions, decimals, problem-solving",
        "Timed paper practice (half-termly)",
        "Vocabulary enrichment programme",
      ]}
      details={[
        ["Frequency", "Once per week"],
        ["Duration", "2 hours per session"],
        ["Locations", "Earley · Caversham · Slough · Online"],
        ["Class size", "Maximum 8 pupils"],
      ]}
      prev={{ label: "Year 3 courses", href: "/courses/year-3" }}
      next={{ label: "Year 5 courses", href: "/courses/year-5" }}
    />
  );
}
