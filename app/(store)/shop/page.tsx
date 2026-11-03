import type { Metadata } from "next";

import { ShopGrid } from "@/components/shop-grid";
import { getCategories, getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Browse the full Maison Nocturne collection — watches, leather goods, fragrance, jewellery, and objects for the home.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 grain opacity-[0.06]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
          <p className="eyebrow">The collection</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-[16ch] font-display text-5xl leading-[1.02] text-bone sm:text-6xl">
              Everything we make,
              <span className="italic text-champagne"> in one place.</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {products.length} considered pieces across ten disciplines. Each is made
              in a small batch by an atelier we know by name — and built to be serviced,
              not replaced.
            </p>
          </div>
        </div>
      </section>

      <ShopGrid products={products} categories={categories} />
    </div>
  );
}
