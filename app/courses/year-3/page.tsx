import type { Metadata } from "next";
import { CoursePage } from "@/components/shared/CoursePage";
import { safeJsonLdString } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Year 3 11+ Tuition in Reading",
  description:
    "Early 11+ foundation for Year 3 pupils in Reading and Berkshire. English, Maths and Non-Verbal Reasoning at Brilliant Tutors Academy.",
  alternates: { canonical: "/courses/year-3" },
  openGraph: {
    images: [{
      url: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_1200/brilliant-tutors/lvl3",
      width: 1200,
      height: 630,
    }],
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Year 3 — Full 11+ Preparation",
  description: "Early 11+ foundation for Year 3 pupils in Reading and Berkshire. English, Maths and Non-Verbal Reasoning.",
  provider: { "@id": "https://brilliant-tutors.co.uk/#organization" },
};

export default function Year3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(courseJsonLd) }}
      />
      <CoursePage
        tag="Ages 7–8 · Early Foundation"
      title="Year 3 — Full 11+ Preparation"
      intro="Starting early can make all the difference. We work with young students to build foundational skills in a way that sets them up for success — without the pressure."
      details={[
        ["Frequency", "5 sessions per week"],
        ["Duration", "1–2 hours per session"],
        ["Locations", "Earley · Caversham · Online"],
        ["Class size", "Under 25 students"],
      ]}
      image="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors/lvl3"
      description={`This course has been designed by our expert tutors to prepare students effectively for 11+ examinations held at the beginning of Year 6.\n\nBy starting this early, students can take their time to develop core skills gradually in Maths, English, NVR, VR and Creative Writing depending on their exam type.`}
      keyFacts={[
        {
          title: "Prepares students gradually",
          detail: "Everyone gets the time they need to grasp each concept fully — no rushing.",
        },
        {
          title: "Includes all teaching material (value in excess of £900)",
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
          title: "Students starting here see a 100% success rate",
          detail: "Yes, you read that right.",
        },
      ]}
      scheduleIntro="We provide unmatched value and teaching support. Here's what a typical week on the Year 3 course looks like. We also offer additional free sessions when our experts identify a student needs extra support."
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
          duration: "1 hour",
          description: "Students bring questions they struggled with and receive expert step-by-step guidance from our tutors.",
          color: "#d97706",
        },
        {
          day: "Saturday",
          sessionName: "Main Session",
          duration: "2 hours",
          description: "Build skills across all subject areas under expert guidance. Multiple assistants on hand for individual support.",
          color: "#1A3EBF",
        },
      ]}
      next={{ label: "Year 4 courses", href: "/courses/year-4" }}
    />
    </>
  );
}
