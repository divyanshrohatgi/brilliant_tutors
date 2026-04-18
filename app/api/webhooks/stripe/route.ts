import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { resend, FROM_ADDRESS, paymentReceiptEmail } from "@/lib/mail";

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
      include: {
        items: { include: { product: true, variant: true } },
        user: true,
      },
    });

    if (!order) {
      console.warn("[stripe-webhook] Order not found for session");
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "PAID") {
      return NextResponse.json({ ok: true });
    }

    await db.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });

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

        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      if (order.promoCodeId) {
        await tx.promoCode.update({
          where: { id: order.promoCodeId },
          data: { usedCount: { increment: 1 } },
        });
      }

      const cart = await tx.cart.findFirst({ where: { userId: order.userId } });
      if (cart) {
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      }
    });

    // Send receipt email
    const customerEmail = order.user?.email ?? session.customer_details?.email;
    const firstName = order.user?.name?.split(" ")[0] ?? session.customer_details?.name?.split(" ")[0] ?? "there";

    if (customerEmail) {
      const receipt = paymentReceiptEmail({
        firstName,
        orderId: order.id,
        items: order.items.map((item) => ({
          name: item.product.name,
          variant: item.variant?.name ?? null,
          quantity: item.quantity,
          price: item.unitPrice,
        })),
        total: order.total,
      });

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: customerEmail,
        subject: "Your booking is confirmed — Brilliant Tutors Academy",
        html: receipt.html,
        text: receipt.text,
      }).catch(() => console.warn("[stripe-webhook] Failed to send receipt email"));
    }
  }

  return NextResponse.json({ ok: true });
}
