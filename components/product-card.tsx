import Link from "next/link";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductArt } from "@/components/product-art";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden border border-white/[0.08] transition-colors duration-500 group-hover:border-gold/35">
        <Link href={`/product/${product.slug}`} className="block">
          <ProductArt
            art={product.art}
            className="aspect-[4/5] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </Link>

        {product.badge ? (
          <span className="absolute left-4 top-4 border border-gold/30 bg-black/45 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-champagne backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
          <AddToCartButton product={product} variant="overlay" />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.28em] text-gold/65">
            {product.category}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="mt-1.5 block truncate font-display text-xl text-bone transition-colors hover:text-champagne"
          >
            {product.name}
          </Link>
          <p className="mt-1 truncate text-xs text-muted">{product.tagline}</p>
        </div>
        <p className="shrink-0 pt-4 text-sm text-bone/90">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
