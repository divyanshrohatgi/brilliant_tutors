import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

const addSchema = z.object({
  productSlug: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
});

async function resolveCart(userId: string | null, sessionId: string) {
  if (userId) {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (user) {
      return db.cart.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {},
      });
    }
  }

  return db.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value ?? randomUUID();

  const cart = await resolveCart(userId, sessionId);
  if (!cart) return NextResponse.json({ items: [] });

  const items = await db.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true, variant: true },
  });

  const response = NextResponse.json({ items });
  if (!cookieStore.get("cart_session")) {
    response.cookies.set("cart_session", sessionId, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { productSlug, variantId, quantity } = parsed.data;
  const { userId } = await auth();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value ?? randomUUID();

  const product = await db.product.findUnique({ where: { slug: productSlug } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const variant = await db.productVariant.findFirst({
    where: { id: variantId, productId: product.id },
  });
  if (!variant) return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  if (variant.stock === 0) return NextResponse.json({ error: "This session is sold out" }, { status: 409 });

  const cart = await resolveCart(userId, sessionId);
  if (!cart) return NextResponse.json({ error: "Could not resolve cart" }, { status: 500 });

  await db.cartItem.upsert({
    where: { cartId_productId_variantId: { cartId: cart.id, productId: product.id, variantId } },
    create: { cartId: cart.id, productId: product.id, variantId, quantity },
    update: { quantity },
  });

  const response = NextResponse.json({ ok: true });
  if (!cookieStore.get("cart_session")) {
    response.cookies.set("cart_session", sessionId, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cartItemId = searchParams.get("id");
  if (!cartItemId) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { userId } = await auth();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  const item = await db.cartItem.findUnique({ where: { id: cartItemId }, include: { cart: true } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cart = item.cart;
  const isOwner = (userId && cart.userId)
    ? (await db.user.findUnique({ where: { clerkId: userId } }))?.id === cart.userId
    : cart.sessionId === sessionId;

  if (!isOwner) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  await db.cartItem.delete({ where: { id: cartItemId } });
  return NextResponse.json({ ok: true });
}
