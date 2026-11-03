"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const max = Math.max(1, Math.min(product.stock, 10));

  function item() {
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      art: product.art,
      category: product.category,
    };
  }

  function add() {
    addItem(item(), qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  function buyNow() {
    addItem(item(), qty);
    router.push("/checkout");
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between border border-white/15 sm:w-36">
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            className="px-4 py-3.5 text-bone/70 transition-colors hover:text-gold"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-sm text-bone">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((value) => Math.min(max, value + 1))}
            className="px-4 py-3.5 text-bone/70 transition-colors hover:text-gold"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button type="button" onClick={add} className="btn-gold flex-1" aria-live="polite">
          {added ? "Added to bag ✓" : `Add to bag · ${formatPrice(product.price * qty)}`}
        </button>
      </div>

      <button
        type="button"
        onClick={buyNow}
        className="mt-3 w-full border border-gold/40 py-3.5 text-[10px] uppercase tracking-[0.22em] text-champagne transition-colors hover:bg-gold/10"
      >
        Buy it now
      </button>
    </div>
  );
}
