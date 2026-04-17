"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";

type PromoResult = {
  code: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  discountAmount: number;
};

type Props = {
  subtotal: number;
  onApply: (promo: PromoResult | null) => void;
  applied: PromoResult | null;
};

export function PromoCodeInput({ subtotal, onApply, applied }: Props) {
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function validate() {
    if (!code.trim()) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/promo-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid code");
        return;
      }
      onApply(data);
    } catch {
      setError("Could not validate code");
    } finally {
      setChecking(false);
    }
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <div>
          <span className="text-sm font-semibold text-green-800">{applied.code}</span>
          <span className="text-sm text-green-700 ml-2">— {formatPrice(applied.discountAmount)} off</span>
        </div>
        <button
          type="button"
          onClick={() => onApply(null)}
          className="text-xs text-green-700 hover:text-green-900 underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(null); }}
          onKeyDown={(e) => e.key === "Enter" && validate()}
          placeholder="Promo code"
          className="flex-1 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px]"
          aria-label="Promo code"
        />
        <button
          type="button"
          onClick={validate}
          disabled={checking || !code.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-60 transition-colors min-h-[44px]"
        >
          {checking ? "…" : "Apply"}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
