import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const body = await req.text();
  let event: ReturnType<typeof stripe.webhooks.constructEvent>;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const order = await db.order.findUnique({
      where: { stripeSessionId: session.id },
      include: { items: true },
    });

    if (!order) {
      console.error("[stripe-webhook] Order not found for session", session.id);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Idempotency check
    if (order.status === "PAID") {
      return NextResponse.json({ ok: true });
    }

    await db.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });

      // Create bookings for each order item
      for (const item of order.items) {
        await tx.booking.create({
          data: {
            orderItemId: item.id,
            userId: order.userId,
            productId: item.productId,
            variantId: item.variantId ?? null,
            studentName: "",
            status: "confirmed",
          },
        });

        // Decrement stock
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // Increment promo code usage
      if (order.promoCodeId) {
        await tx.promoCode.update({
          where: { id: order.promoCodeId },
          data: { usedCount: { increment: 1 } },
        });
      }

      // Clear the cart
      const cart = await tx.cart.findFirst({ where: { userId: order.userId } });
      if (cart) {
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
    });
  }

  return NextResponse.json({ ok: true });
}
