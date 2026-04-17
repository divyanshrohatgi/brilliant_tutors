import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Brilliant Tutors Academy account.",
};

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SignIn />
    </div>
  );
}
