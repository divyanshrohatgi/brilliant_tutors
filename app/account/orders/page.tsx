import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "My orders" };

const statusColours: Record<string, string> = {
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">My orders</h1>

      {!orders.length ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <ul className="space-y-4" role="list">
          {orders.map((order) => (
            <li key={order.id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{formatDate(order.createdAt)}</p>
                  <p className="font-semibold text-primary">
                    {order.items.map((i) => i.product.name).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColours[order.status] ?? "bg-muted text-muted-foreground"}`}>
                    {order.status.toLowerCase()}
                  </span>
                  <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>

              {order.items.length > 0 && (
                <ul className="space-y-1 border-t border-border pt-3" role="list">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm text-muted-foreground">
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
  );
}
