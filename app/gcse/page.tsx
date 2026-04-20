import type { Metadata } from "next";
import { CoursePage } from "@/components/shared/CoursePage";

export const metadata: Metadata = {
  title: "GCSE Tuition in Reading | Maths, English & Science",
  description:
    "Expert GCSE tuition in Reading for Maths, English and Science. Small groups, experienced tutors and a proven record of Grade 7+ results at Brilliant Tutors Academy.",
  alternates: { canonical: "/gcse" },
  openGraph: {
    images: [{
      url: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_1200/brilliant-tutors/blog5",
      width: 1200,
      height: 630,
    }],
  },
};

export default function GCSEPage() {
  return (
    <CoursePage
      tag="Ages 14–16 · Years 10 & 11"
      title="GCSE Tuition"
      intro="We work with GCSE students to give them the skills and confidence needed to flourish in their exams."
      details={[
        ["Frequency", "1–2 sessions per week"],
        ["Duration", "2 hours per session"],
        ["Locations", "Reading · Online"],
        ["Class size", "Maximum 6 pupils"],
      ]}
      image="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/blog5"
      description={`Available for Mathematics, English (Language and Literature), Science (combined and triple) and more.\n\nAll of our courses and classes fill up quickly, so save your spot today. Select GCSE in the dropdown menu in our contact form and our brilliant team will quickly be on hand to discuss the next steps and answer any of your questions.`}
      keyFacts={[
        {
          title: "Prepares students comprehensively",
          detail: "Everyone gets the time they need to grasp each concept fully — no rushing through topics.",
        },
        {
          title: "Includes all teaching material",
          detail: "You won't have to worry about purchasing books or resources. It's all included.",
        },
        {
          title: "Progress tracking",
          detail: "Constant feedback from our tutors ensures you know exactly how your child is progressing.",
        },
        {
          title: "1-to-1 support for each student",
          detail: "We work hard to ensure each student receives the attention they need to flourish.",
        },
      ]}
      prev={{ label: "Courses", href: "/courses" }}
      next={{ label: "Mock Exams", href: "/mock-exams" }}
    />
  );
}
