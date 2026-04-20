"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { ProductVariant } from "@prisma/client";

type Props = {
  variants: ProductVariant[];
  basePrice: number;
  productSlug: string;
};

export function VariantSelector({ variants, basePrice, productSlug }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    variants.find((v) => v.stock > 0)?.id ?? null
  );
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = variants.find((v) => v.id === selectedId);
  const price = selected?.priceOverride ?? basePrice;

  async function addToCart() {
    if (!selectedId) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, variantId: selectedId, quantity: 1 }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to add to cart");
      }
      setAdded(true);
      window.dispatchEvent(new Event("cart-updated"));
      setTimeout(() => setAdded(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary mb-3">Select a session</p>
        <ul className="space-y-2" role="list">
          {variants.map((variant) => {
            const soldOut = variant.stock === 0;
            const isSelected = variant.id === selectedId;
            return (
              <li key={variant.id}>
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={() => setSelectedId(variant.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors min-h-[48px] ${
                    soldOut
                      ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                      : isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white hover:border-primary text-foreground"
                  }`}
                >
                  <span className="font-medium text-sm">{variant.name}</span>
                  {variant.location && (
                    <span className="text-xs text-muted-foreground ml-2">· {variant.location}</span>
                  )}
                  {soldOut && <span className="text-xs text-destructive ml-2">Sold out</span>}
                  {!soldOut && variant.stock <= 3 && (
                    <span className="text-xs text-accent ml-2">{variant.stock} left</span>
                  )}
                  {variant.priceOverride && variant.priceOverride !== basePrice && (
                    <span className="text-xs font-semibold text-primary ml-2">
                      {formatPrice(variant.priceOverride)}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm">Total</span>
          <span className="text-2xl font-bold text-primary">{formatPrice(price)}</span>
        </div>

        {error && <p className="text-sm text-destructive mb-3">{error}</p>}

        <button
          type="button"
          disabled={!selectedId || adding}
          onClick={addToCart}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 disabled:opacity-60 transition-colors min-h-[48px]"
        >
          {adding ? "Adding…" : added ? "Added to cart ✓" : "Add to cart"}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
