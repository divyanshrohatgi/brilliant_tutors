import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { CalendarCheck } from "lucide-react";

export const metadata: Metadata = { title: "My bookings" };

const statusStyles: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-muted text-muted-foreground",
};

export default async function BookingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { product: true, variant: true },
  });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <CalendarCheck className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-primary text-lg">My bookings</h1>
          <span className="ml-auto text-xs text-muted-foreground">{bookings.length} total</span>
        </div>

        {!bookings.length ? (
          <div className="px-6 py-14 text-center">
            <p className="text-muted-foreground text-sm mb-4">No bookings yet.</p>
            <Link
              href="/mock-exams"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book a mock exam
            </Link>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-border">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary text-sm">{booking.product.name}</p>
                  {booking.variant && (
                    <p className="text-xs text-muted-foreground mt-0.5">{booking.variant.name}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Booked {formatDate(booking.createdAt)}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyles[booking.status] ?? "bg-muted text-muted-foreground"}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
