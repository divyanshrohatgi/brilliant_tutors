import type { Metadata } from "next";
import { WeeklySchedule } from "@/components/home/WeeklySchedule";

export const metadata: Metadata = {
  title: "Weekly Timetable | Brilliant Tutors Academy",
  description: "View our weekly tuition schedule across all four centres — Earley, Caversham, Reading and Slough.",
  alternates: { canonical: "/timetable" },
};

export default function TimetablePage() {
  return (
    <main>
      <WeeklySchedule />
    </main>
  );
}
