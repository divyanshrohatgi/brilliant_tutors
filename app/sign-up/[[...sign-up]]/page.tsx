import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Brilliant Tutors Academy account to manage bookings and track your child's progress.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SignUp />
    </div>
  );
}
