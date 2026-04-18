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
      tag="Ages 8–9 · Structured Preparation"
      title="Year 4 — Full 11+ Preparation"
      intro="Year 4 is the perfect opportunity for students to get to grips with all the topic areas ahead of Year 5. We work with students to ensure they master every subject."
      details={[
        ["Frequency", "5 sessions per week"],
        ["Duration", "1–2.5 hours per session"],
        ["Locations", "Earley · Caversham · Slough · Online"],
        ["Class size", "Under 25 students"],
      ]}
      image="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/year4"
      description={`This course has been designed by our expert tutors to prepare students effectively for 11+ examinations held at the beginning of Year 6.\n\nFor students having done the Year 3 course, this course builds on the strong foundations and helps students further their knowledge in Maths, English, NVR, VR and Creative Writing depending on the exam.\n\nFor new students, this course helps build up their skills to a similar level and prepares them effectively for success in Year 5 and in the final exams.`}
      keyFacts={[
        {
          title: "Prepares students gradually",
          detail: "Everyone gets the time they need to grasp each concept fully — no rushing.",
        },
        {
          title: "Includes all teaching material (value in excess of £1,000)",
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
        {
          title: "Students starting here see a 98% success rate",
          detail: "Yes, you read that right.",
        },
      ]}
      scheduleIntro="We provide unmatched value and teaching support. Here's what a typical week on the Year 4 course looks like. We also offer additional free sessions when our experts identify a student needs extra support."
      weeklySchedule={[
        {
          day: "Monday",
          sessionName: "Test Session",
          duration: "1 hour",
          description: "Students observe experts solve difficult exam questions and learn effective strategies for completing the exam.",
          color: "#dc2626",
        },
        {
          day: "Tuesday",
          sessionName: "Vocabulary",
          duration: "1 hour",
          description: "A focused session to build and refine a varied vocabulary — a key skill required for success in the exams.",
          color: "#d97706",
        },
        {
          day: "Wednesday",
          sessionName: "Creative Writing",
          duration: "1 hour",
          description: "Targeted Creative Writing practice to help students refine this unique skill without taking away from other components.",
          color: "#dc2626",
        },
        {
          day: "Thursday",
          sessionName: "Homework Help",
          duration: "2 hours",
          description: "Students bring questions they struggled with and receive expert step-by-step guidance from our tutors.",
          color: "#d97706",
        },
        {
          day: "Saturday",
          sessionName: "Main Session",
          duration: "2.5 hours",
          description: "Build skills across all subject areas under expert guidance. Multiple assistants on hand for individual support. Class sizes under 25 students.",
          color: "#1A3EBF",
        },
      ]}
      prev={{ label: "Year 3 courses", href: "/courses/year-3" }}
      next={{ label: "Year 5 courses", href: "/courses/year-5" }}
    />
  );
}
