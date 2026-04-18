import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = { title: "My orders" };

const statusStyles: Record<string, string> = {
  PAID: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELLED: "bg-muted text-muted-foreground",
  REFUNDED: "bg-blue-100 text-blue-800",
};

export default async function OrdersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const orders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true, variant: true } } },
  });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-primary text-lg">My orders</h1>
          <span className="ml-auto text-xs text-muted-foreground">{orders.length} total</span>
        </div>

        {!orders.length ? (
          <div className="px-6 py-14 text-center">
            <p className="text-muted-foreground text-sm mb-4">No orders yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-border">
            {orders.map((order) => (
              <li key={order.id} className="px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{formatDate(order.createdAt)}</p>
                    <p className="font-semibold text-primary text-sm">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[order.status] ?? "bg-muted text-muted-foreground"}`}>
                      {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                    </span>
                    <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                  </div>
                </div>

                {order.items.length > 0 && (
                  <ul className="border-t border-border pt-3 space-y-1.5" role="list">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.product.name}{item.variant ? ` — ${item.variant.name}` : ""}</span>
                        <span>{formatPrice(item.unitPrice)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
