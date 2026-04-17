import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  code: z.string().min(1).max(50),
  subtotal: z.number().int().min(0),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { code, subtotal } = parsed.data;
  const now = new Date();

  const promo = await db.promoCode.findUnique({ where: { code: code.toUpperCase() } });

  if (!promo || !promo.isActive) return NextResponse.json({ error: "Code not found" }, { status: 404 });
  if (promo.validFrom && promo.validFrom > now) return NextResponse.json({ error: "Code not yet valid" }, { status: 400 });
  if (promo.validUntil && promo.validUntil < now) return NextResponse.json({ error: "Code has expired" }, { status: 400 });
  if (promo.maxUses && promo.usedCount >= promo.maxUses) return NextResponse.json({ error: "Code has reached its usage limit" }, { status: 400 });
  if (promo.minOrderValue && subtotal < promo.minOrderValue) {
    return NextResponse.json({ error: `Minimum order value of £${promo.minOrderValue / 100} required` }, { status: 400 });
  }

  const discountAmount =
    promo.discountType === "PERCENT"
      ? Math.round((subtotal * promo.discountValue) / 100)
      : Math.min(promo.discountValue, subtotal);

  return NextResponse.json({
    code: promo.code,
    discountType: promo.discountType,
    discountValue: promo.discountValue,
    discountAmount,
  });
}
