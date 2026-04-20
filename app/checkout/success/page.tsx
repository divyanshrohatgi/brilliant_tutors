import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Booking confirmed" };

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const { userId } = await auth();

  let customerEmail = "";

  if (session_id && userId) {
    // Verify the session belongs to this user before exposing any data
    const order = await db.order.findFirst({
      where: { stripeSessionId: session_id, user: { clerkId: userId } },
    });

    if (order) {
      try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        customerEmail = session.customer_email ?? "";
      } catch {
        // Session retrieval failing shouldn't break the success page
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 mb-8">
        <div className="text-5xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-primary mb-3">Booking confirmed!</h1>
        <p className="text-muted-foreground leading-relaxed">
          Thank you for booking with Brilliant Tutors Academy.
          {customerEmail && ` A confirmation has been sent to ${customerEmail}.`}
        </p>
      </div>

      <p className="text-muted-foreground text-sm mb-8">
        We&apos;ll be in touch with session details and joining instructions. If you have any
        questions, contact us at{" "}
        <a href="mailto:contact@brilliant-tutors.co.uk" className="text-primary underline">
          contact@brilliant-tutors.co.uk
        </a>.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/account/bookings" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
          View my bookings
        </Link>
        <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-semibold rounded-md hover:bg-muted transition-colors">
          Book another course
        </Link>
      </div>
    </div>
  );
}

