import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
        take: 3,
        include: { items: { include: { product: true } } },
      },
      bookings: { select: { id: true } },
    },
  });

  const savedCount = user
    ? await db.savedPost.count({ where: { userId: user.id } })
    : 0;

  const stats = [
    { label: "Bookings", value: user?.bookings.length ?? 0, href: "/account/bookings" },
    { label: "Orders", value: user?.orders.length ?? 0, href: "/account/orders" },
    { label: "Saved articles", value: savedCount, href: "/account/saved" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats strip */}
      <div className="bg-white rounded-xl border border-border divide-x divide-border flex overflow-hidden">
        {stats.map(({ label, value, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex-1 px-6 py-5 hover:bg-muted/40 transition-colors"
          >
            <p className="text-3xl font-extrabold text-primary tabular-nums">{value}</p>
            <p className="text-sm text-muted-foreground mt-0.5 group-hover:text-primary transition-colors">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-primary">Recent orders</h2>
          <Link href="/account/orders" className="text-xs font-semibold text-accent hover:underline underline-offset-4">
            View all →
          </Link>
        </div>

        {!user?.orders.length ? (
          <div className="px-6 py-10 text-center">
            <p className="text-muted-foreground text-sm mb-4">No orders yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <ul role="list">
            {user.orders.map((order, i) => (
              <li
                key={order.id}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${
                  i < user.orders.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-primary text-sm truncate">
                    {order.items.map((item) => item.product.name).join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                    Paid
                  </span>
                  <span className="font-semibold text-primary text-sm">{formatPrice(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-bold text-primary">Quick links</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: "Book a mock exam", href: "/mock-exams", desc: "Upcoming exam dates and booking" },
            { label: "Browse courses", href: "/courses", desc: "Year 3, 4, 5 and GCSE programmes" },
            { label: "Read the blog", href: "/blog", desc: "11+ tips, guides and exam advice" },
          ].map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium text-primary text-sm group-hover:text-accent transition-colors">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
