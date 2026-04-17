import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My bookings",
};

export default async function BookingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
      variant: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">My bookings</h1>

      {!bookings.length ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="mb-4">No bookings yet.</p>
          <a href="/shop" className="text-primary font-medium hover:underline">
            Browse our courses →
          </a>
        </div>
      ) : (
        <ul className="space-y-4" role="list">
          {bookings.map((booking) => (
            <li key={booking.id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{booking.product.name}</p>
                  {booking.variant && (
                    <p className="text-sm text-muted-foreground mt-0.5">{booking.variant.name}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Booked {formatDate(booking.createdAt)}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {booking.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
