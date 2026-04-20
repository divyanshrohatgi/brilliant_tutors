import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { resend, FROM_ADDRESS, paymentReceiptEmail } from "@/lib/mail";

// Fail fast at startup — a missing secret means ALL webhooks silently fail
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const body = await req.text();
  let event: ReturnType<typeof stripe.webhooks.constructEvent>;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Delayed payment methods (Bacs, SEPA) complete the session but payment_status
    // is "unpaid" until funds clear — handle async_payment_succeeded for those.
    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: true, message: "Awaiting payment confirmation" });
    }

    const order = await db.order.findUnique({
      where: { stripeSessionId: session.id },
      include: {
        items: { include: { product: true, variant: true } },
        user: true,
      },
    });

    if (!order) {
      // Return 200 so Stripe stops retrying — the order genuinely doesn't exist
      console.warn("[stripe-webhook] Order not found for session", session.id);
      return NextResponse.json({ received: true, warning: "Order not found" });
    }

    if (order.status === "PAID") {
      return NextResponse.json({ ok: true });
    }

    await db.$transaction(async (tx: any) => {
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
        items: order.items.map((item: any) => ({
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

