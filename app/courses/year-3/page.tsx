import type { Metadata } from "next";
import { CoursePage } from "@/components/shared/CoursePage";

export const metadata: Metadata = {
  title: "Year 3 11+ Tuition in Reading",
  description:
    "Early 11+ foundation for Year 3 pupils in Reading and Berkshire. English, Maths and Non-Verbal Reasoning at Brilliant Tutors Academy.",
  alternates: { canonical: "/courses/year-3" },
};

export default function Year3Page() {
  return (
    <CoursePage
      tag="Ages 7–8"
      title="Year 3 — Early Foundation"
      intro="The earlier your child begins, the more confident and prepared they'll be. Our Year 3 programme builds the core skills that make 11+ preparation natural — not stressful."
      curriculum={[
        "English comprehension and creative writing",
        "Mental Maths and arithmetic fluency",
        "Introduction to Non-Verbal Reasoning",
        "Spelling, punctuation and vocabulary building",
        "Reading for meaning and inference",
      ]}
      details={[
        ["Frequency", "Once per week"],
        ["Duration", "2 hours per session"],
        ["Locations", "Earley · Caversham · Online"],
        ["Class size", "Maximum 8 pupils"],
      ]}
      next={{ label: "Year 4 courses", href: "/courses/year-4" }}
    />
  );
}
