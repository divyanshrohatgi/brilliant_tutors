import type { Metadata } from "next";
import { CoursePage } from "@/components/shared/CoursePage";

export const metadata: Metadata = {
  title: "Year 5 11+ Preparation in Reading | Earley & Caversham",
  description:
    "Intensive Year 5 11+ preparation in Reading, Earley and Caversham. Weekly sessions, monthly mock exams and exam strategy for Kendrick, Reading School and FSCE.",
  alternates: { canonical: "/courses/year-5" },
};

export default function Year5Page() {
  return (
    <CoursePage
      tag="Ages 9–10"
      title="Year 5 — Full 11+ Preparation"
      intro="Our most comprehensive programme. Weekly tuition, monthly mock exams under real conditions, and detailed feedback — everything your child needs to earn a place at Kendrick, Reading School or their grammar of choice."
      curriculum={[
        "GL and CEM paper formats — all question types",
        "Verbal and Non-Verbal Reasoning mastery",
        "English — comprehension, SPaG, creative writing",
        "Maths — all Year 5/6 topics plus problem-solving",
        "Monthly full mock exams with written feedback",
        "Timed exam practice every session",
        "Exam-day strategy and stress management",
        "School selection advice (Kendrick, Reading School, FSCE)",
      ]}
      details={[
        ["Frequency", "Once per week + monthly mock"],
        ["Duration", "2–3 hours per session"],
        ["Locations", "Earley · Caversham · Slough · Online"],
        ["Class size", "Maximum 8 pupils"],
        ["Reports", "Half-termly written progress reports"],
      ]}
      prev={{ label: "Year 4 courses", href: "/courses/year-4" }}
      next={{ label: "Mock exams", href: "/mock-exams" }}
      ctaNote="Places fill quickly. Contact us to check availability."
    />
  );
}
