import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My account",
  description: "Manage your bookings and account settings.",
};

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      orders: {
        where: { status: "PAID" },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: { include: { product: true } } },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-primary">My account</h1>
        <img
          src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_48/brilliant-tutors/logo"
          alt="Brilliant Tutors Academy"
          width={48}
          height={48}
          className="opacity-80"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {accountLinks.map(({ label, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="bg-muted rounded-xl border border-border p-6 hover:border-accent transition-colors"
          >
            <p className="font-semibold text-primary mb-1">{label}</p>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>

      <section aria-labelledby="recent-orders-heading">
        <h2 id="recent-orders-heading" className="text-xl font-bold text-primary mb-4">
          Recent orders
        </h2>
        {!user?.orders.length ? (
          <p className="text-muted-foreground text-sm">No orders yet.</p>
        ) : (
          <ul className="space-y-4" role="list">
            {user.orders.map((order) => (
              <li key={order.id} className="bg-white rounded-xl border border-border p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">{formatPrice(order.total)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

const accountLinks = [
  { label: "Bookings", desc: "View your upcoming sessions", href: "/account/bookings" },
  { label: "Orders", desc: "Your purchase history", href: "/account/orders" },
  { label: "Settings", desc: "Manage your profile", href: "/account/settings" },
];
