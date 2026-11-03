"use client";

import { useEffect, useRef, useState } from "react";

import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";

type AddToCartButtonProps = {
  product: Product;
  variant?: "overlay" | "solid" | "outline";
  label?: string;
  className?: string;
};

export function AddToCartButton({
  product,
  variant = "solid",
  label = "Add to bag",
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleClick() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      art: product.art,
      category: product.category,
    });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  const base =
    variant === "overlay"
      ? "w-full bg-bone px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold"
      : variant === "outline"
        ? "btn-outline w-full"
        : "btn-gold w-full";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} ${className}`}
      aria-live="polite"
    >
      {added ? "Added to bag ✓" : label}
    </button>
  );
}
