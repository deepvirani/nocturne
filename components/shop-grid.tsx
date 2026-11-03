"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type SortKey = "curated" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "curated", label: "Curated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
];

export function ShopGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("curated");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        needle.length === 0 ||
        `${product.name} ${product.category} ${product.tagline}`
          .toLowerCase()
          .includes(needle);

      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return [...result].sort(
          (a, b) => Number(b.featured) - Number(a.featured),
        );
    }
  }, [products, query, category, sort]);

  const hasFilters = query.trim().length > 0 || category !== "All";

  return (
    <div>
      <div className="border-y border-white/10 bg-onyx/60">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="relative w-full lg:max-w-xs">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the collection"
              aria-label="Search the collection"
              className="w-full border border-white/12 bg-white/[0.025] py-2.5 pl-10 pr-4 text-sm text-bone outline-none transition-colors placeholder:text-muted/70 focus:border-gold/60"
            />
          </div>

          <div className="hide-scrollbar flex items-center gap-1 overflow-x-auto">
            {["All", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  category === item
                    ? "border border-gold/40 bg-gold/10 text-champagne"
                    : "border border-transparent text-bone/55 hover:text-bone"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-muted lg:hidden">
              {filtered.length} pieces
            </span>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="border border-white/12 bg-ink px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-bone outline-none transition-colors focus:border-gold/60"
                aria-label="Sort products"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
            Showing <span className="text-bone">{filtered.length}</span> of{" "}
            {products.length} pieces
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSort("curated");
              }}
              className="text-[10px] uppercase tracking-[0.2em] text-gold/80 transition-colors hover:text-gold"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-white/10 bg-onyx/40 px-6 py-24 text-center">
            <p className="font-display text-3xl text-bone">Nothing quite matches.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Try a different search, or browse the full collection by category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="btn-outline mt-7"
            >
              Reset the collection
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
