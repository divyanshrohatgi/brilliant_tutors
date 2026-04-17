import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const schema = z.object({
  promoCode: z.string().nullable(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Sign in to checkout" }, { status: 401 });

  const clerkUser = await currentUser();
  if (!clerkUser) return NextResponse.json({ error: "Sign in to checkout" }, { status: 401 });

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
  const user = await db.user.upsert({
    where: { clerkId: userId },
    create: { clerkId: userId, email, name },
    update: { email, name },
  });

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  // Find cart — prefer user cart, fall back to session cart, then migrate it
  let cart = await db.cart.findFirst({
    where: { userId: user.id },
    include: { items: { include: { product: true, variant: true } } },
  });

  if (!cart && sessionId) {
    const sessionCart = await db.cart.findUnique({ where: { sessionId } });
    if (sessionCart) {
      cart = await db.cart.update({
        where: { id: sessionCart.id },
        data: { userId: user.id, sessionId: null },
        include: { items: { include: { product: true, variant: true } } },
      });
    }
  }

  if (!cart?.items.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

  // Recalculate totals from DB — never trust client prices
  const lineItems = cart.items.map((item) => {
    const unitAmount = item.variant?.priceOverride ?? item.product.salePrice ?? item.product.basePrice;
    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.product.name,
          description: item.variant?.name ?? undefined,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });

  const subtotal = lineItems.reduce((sum, li) => sum + li.price_data.unit_amount * li.quantity, 0);

  let discountAmount = 0;
  let promoCodeRecord = null;
  if (parsed.data.promoCode) {
    promoCodeRecord = await db.promoCode.findUnique({
      where: { code: parsed.data.promoCode, isActive: true },
    });
    if (promoCodeRecord) {
      discountAmount =
        promoCodeRecord.discountType === "PERCENT"
          ? Math.round((subtotal * promoCodeRecord.discountValue) / 100)
          : Math.min(promoCodeRecord.discountValue, subtotal);
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "gbp",
    line_items: lineItems,
    ...(discountAmount > 0 && {
      discounts: [],
    }),
    customer_email: user.email,
    metadata: {
      userId: user.id,
      cartId: cart.id,
      promoCodeId: promoCodeRecord?.id ?? "",
      discount: discountAmount.toString(),
    },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  }, {
    idempotencyKey: `checkout-${user.id}-${cart.id}-${Date.now()}`,
  });

  // Create a pending order
  const total = subtotal - discountAmount;
  await db.order.create({
    data: {
      userId: user.id,
      stripeSessionId: stripeSession.id,
      status: "PENDING",
      subtotal,
      discount: discountAmount,
      total,
      promoCodeId: promoCodeRecord?.id ?? null,
      items: {
        create: cart.items.map((item) => ({
          productId: item.product.id,
          variantId: item.variant?.id ?? null,
          quantity: item.quantity,
          unitPrice: item.variant?.priceOverride ?? item.product.salePrice ?? item.product.basePrice,
        })),
      },
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
