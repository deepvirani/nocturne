"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { saveProductAction } from "@/lib/actions";
import type { Product } from "@/lib/types";

const artOptions = [
  "watch",
  "bag",
  "fragrance",
  "headphones",
  "lamp",
  "chair",
  "eyewear",
  "sneaker",
  "ring",
  "candle",
  "necklace",
];

export function AdminProductForm({
  product,
  categories,
  onClose,
}: {
  product: Product | null;
  categories: string[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveProductAction, {
    ok: false,
  } as { ok: boolean; error?: string });

  useEffect(() => {
    if (state.ok) {
      router.refresh();
      onClose();
    }
  }, [state.ok, router, onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const categoryOptions = Array.from(
    new Set([...categories, "Watches", "Leather", "Fragrance", "Jewellery", "Objects"]),
  ).sort();

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm animate-fade-in sm:p-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close form"
        onClick={onClose}
      />

      <div className="relative my-auto w-full max-w-3xl border border-white/12 bg-onyx shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.26em] text-gold/70">
              {product ? "Edit piece" : "New piece"}
            </p>
            <h2 className="mt-1 font-display text-2xl text-bone">
              {product ? product.name : "Add to the collection"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-bone/60 transition-colors hover:text-gold"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form action={formAction} className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6">
          {product ? <input type="hidden" name="id" value={product.id} /> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="name">
                Name *
              </label>
              <input
                id="name"
                name="name"
                required
                defaultValue={product?.name ?? ""}
                className="field"
                placeholder="Nocturne Automatic"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="slug">
                Slug (optional)
              </label>
              <input
                id="slug"
                name="slug"
                defaultValue={product?.slug ?? ""}
                className="field"
                placeholder="nocturne-automatic"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={product?.category ?? "Objects"}
                className="field"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="tagline">
                Tagline
              </label>
              <input
                id="tagline"
                name="tagline"
                defaultValue={product?.tagline ?? ""}
                className="field"
                placeholder="A midnight dial in brushed titanium."
              />
            </div>

            <div>
              <label className="field-label" htmlFor="price">
                Price (USD) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                step="1"
                required
                defaultValue={product?.price ?? ""}
                className="field"
                placeholder="4850"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="stock">
                Stock *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={product?.stock ?? 10}
                className="field"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="art">
                Artwork
              </label>
              <select
                id="art"
                name="art"
                defaultValue={product?.art ?? "watch"}
                className="field"
              >
                {artOptions.map((art) => (
                  <option key={art} value={art}>
                    {art}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="badge">
                Badge (optional)
              </label>
              <input
                id="badge"
                name="badge"
                defaultValue={product?.badge ?? ""}
                className="field"
                placeholder="Signature"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={product?.description ?? ""}
                className="field resize-y"
                placeholder="The story behind the piece…"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="specs">
                Details — one per line
              </label>
              <textarea
                id="specs"
                name="specs"
                rows={4}
                defaultValue={product?.specs.join("\n") ?? ""}
                className="field resize-y"
                placeholder={"41mm titanium case\nSwiss automatic movement"}
              />
            </div>

            <label className="flex items-center gap-3 sm:col-span-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={product?.featured ?? false}
                className="h-4 w-4 accent-[#c9a86a]"
              />
              <span className="text-[11px] uppercase tracking-[0.18em] text-bone/70">
                Feature on the storefront
              </span>
            </label>
          </div>

          {state.error ? (
            <p className="mt-4 border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-200">
              {state.error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline px-6 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="btn-gold px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Saving…" : product ? "Save changes" : "Add piece"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
