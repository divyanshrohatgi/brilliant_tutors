"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { PromoCodeInput } from "@/components/shared/PromoCodeInput";
import type { Product, ProductVariant } from "@/app/generated/prisma/client";

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
  variant: ProductVariant | null;
};

type PromoResult = {
  code: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  discountAmount: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promo, setPromo] = useState<PromoResult | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function removeItem(id: string) {
    await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    window.dispatchEvent(new Event("cart-updated"));
  }

  async function checkout() {
    setCheckingOut(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promoCode: promo?.code ?? null }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setCheckingOut(false);
  }

  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.priceOverride ?? item.product.salePrice ?? item.product.basePrice;
    return sum + price * item.quantity;
  }, 0);

  const discount = promo?.discountAmount ?? 0;
  const total = Math.max(0, subtotal - discount);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-muted-foreground">Loading cart…</div>;

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link href="/shop" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = item.variant?.priceOverride ?? item.product.salePrice ?? item.product.basePrice;
            return (
              <div key={item.id} className="bg-white rounded-xl border border-border p-4 flex gap-4">
                {item.product.images[0] && (
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm truncate">{item.product.name}</p>
                  {item.variant && <p className="text-xs text-muted-foreground mt-0.5">{item.variant.name}</p>}
                  <p className="font-bold text-primary mt-2">{formatPrice(price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors text-sm shrink-0"
                  aria-label={`Remove ${item.product.name}`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-muted rounded-xl border border-border p-6 space-y-4">
            <PromoCodeInput subtotal={subtotal} applied={promo} onApply={setPromo} />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <dt>Discount</dt>
                  <dd>−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between font-bold text-primary border-t border-border pt-2 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={checkout}
              disabled={checkingOut}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 disabled:opacity-60 transition-colors min-h-[48px]"
            >
              {checkingOut ? "Redirecting…" : "Checkout"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Secure checkout via Stripe — card, Apple Pay &amp; Google Pay accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
