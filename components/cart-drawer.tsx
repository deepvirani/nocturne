"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useCart } from "@/components/cart-provider";
import { ProductArt } from "@/components/product-art";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    setQty,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={closeCart}
        aria-label="Close shopping bag"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-white/10 bg-onyx shadow-[-30px_0_80px_rgba(0,0,0,0.55)] animate-drawer-in"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-2xl text-bone">Your bag</h2>
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
              {count} {count === 1 ? "piece" : "pieces"}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-bone/60 transition-colors hover:text-gold"
            aria-label="Close bag"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 text-gold/60">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 8h12l1 12H5L6 8Z" strokeLinejoin="round" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-2xl text-bone">Nothing here yet</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Our most considered pieces are waiting in the collection.
              </p>
            </div>
            <Link
              href="/shop"
              onClick={closeCart}
              className="btn-gold mt-2 w-full"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="block w-20 shrink-0 border border-white/10"
                    >
                      <ProductArt art={item.art} className="aspect-[4/5] w-full" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[11px] uppercase tracking-[0.22em] text-gold/70">
                            {item.category}
                          </p>
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="mt-1 block truncate font-display text-lg text-bone transition-colors hover:text-champagne"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <p className="shrink-0 text-sm text-bone">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-white/12">
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="px-2.5 py-1 text-bone/70 transition-colors hover:text-gold"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span className="min-w-7 text-center text-xs text-bone">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="px-2.5 py-1 text-bone/70 transition-colors hover:text-gold"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 bg-charcoal/60 px-6 py-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-bone">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Delivery</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-bone/70">
                    Total
                  </span>
                  <span className="font-display text-2xl text-bone">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-gold mt-5 w-full"
              >
                Proceed to checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full py-2 text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-bone"
              >
                Continue shopping
              </button>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted/70">
                Duties included · 30-day returns
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
