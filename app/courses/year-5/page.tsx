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
      tag="Ages 9–10 · Most Popular"
      title="Year 5 — Full 11+ Preparation"
      intro="We focus on covering all topic areas in the depth required to ensure students gain mastery. Expert tutors work with students to transfer great subject knowledge into exam performance."
      details={[
        ["Frequency", "4 sessions per week"],
        ["Duration", "2 hours per session"],
        ["Locations", "Earley · Caversham · Slough · Online"],
        ["Class size", "Under 25 students"],
      ]}
      image="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/year5"
      description={`This course has been designed by our expert tutors to prepare students effectively for 11+ examinations held at the beginning of Year 6.\n\nFor students having done the Year 4 course, this course puts all of the hard work put in over the last two years together to perfect exam technique ready for the exams. It stretches their abilities in Maths, English, NVR, VR and Creative Writing depending on their exam.\n\nFor new students, we give it our all to quickly identify weaknesses and address them through targeted support, perfect their exam technique and loads more — all to still offer excellent preparation for the exams.`}
      keyFacts={[
        {
          title: "Prepares students gradually",
          detail: "Everyone gets the time they need to grasp each concept fully. We achieve this in Year 5 by offering unrivalled student support — just have a look at an example week on the course below.",
        },
        {
          title: "Includes all teaching material (value in excess of £1,400)",
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
          title: "Students starting here still see an exceptional success rate",
          detail: "Our track record speaks for itself.",
        },
      ]}
      scheduleIntro="We provide unmatched value and teaching support. Here's what a typical week on the Year 5 course looks like. We also offer additional free sessions when our experts identify a student needs extra support."
      weeklySchedule={[
        {
          day: "Monday",
          sessionName: "Vocabulary & Creative Writing",
          duration: "2 hours",
          description: "Students build and refine a varied vocabulary and develop their Creative Writing skills in one focused two-hour session.",
          color: "#dc2626",
        },
        {
          day: "Tuesday",
          sessionName: "Test Practice",
          duration: "2 hours",
          description: "Exam-realistic questions to track progress, train speed and accuracy, build confidence and apply learnt knowledge where it counts.",
          color: "#d97706",
        },
        {
          day: "Wednesday",
          sessionName: "Homework Help",
          duration: "2 hours",
          description: "Students bring questions they struggled with and receive expert step-by-step guidance from our tutors. All books and materials provided free.",
          color: "#dc2626",
        },
        {
          day: "Thursday",
          sessionName: "Test Session",
          duration: "2 hours",
          description: "Students observe experts solve difficult exam questions and learn effective strategies for completing the exam under timed conditions.",
          color: "#d97706",
        },
      ]}
      prev={{ label: "Year 4 courses", href: "/courses/year-4" }}
      next={{ label: "Mock exams", href: "/mock-exams" }}
    />
  );
}
