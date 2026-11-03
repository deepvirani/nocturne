import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product, 3);
  const inStock = product.stock > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "Maison Nocturne" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 pt-8 sm:px-8 lg:px-12">
        <nav className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-muted">
          <Link href="/" className="transition-colors hover:text-bone">
            Home
          </Link>
          <span className="text-muted/40">/</span>
          <Link href="/shop" className="transition-colors hover:text-bone">
            Collection
          </Link>
          <span className="text-muted/40">/</span>
          <span className="text-gold/80">{product.category}</span>
          <span className="text-muted/40">/</span>
          <span className="text-bone/70">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12 lg:py-14">
        <div>
          <div className="relative overflow-hidden border border-white/10">
            <ProductArt art={product.art} className="aspect-[4/5] w-full" />
            {product.badge ? (
              <span className="absolute left-5 top-5 border border-gold/30 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-champagne backdrop-blur-sm">
                {product.badge}
              </span>
            ) : null}
            <div className="absolute bottom-5 right-5 border border-white/15 bg-black/40 px-3 py-1.5 text-[8px] uppercase tracking-[0.24em] text-bone/70 backdrop-blur-sm">
              Nº {product.id.replace(/\D/g, "").padStart(3, "0")}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="overflow-hidden border border-white/10">
              <ProductArt
                art={product.art}
                tone="warm"
                className="aspect-[4/3] w-full scale-125"
              />
            </div>
            <div className="overflow-hidden border border-white/10">
              <ProductArt
                art={product.art}
                className="aspect-[4/3] w-full scale-150"
              />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-muted">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-4">
            <p className="font-display text-3xl text-champagne">
              {formatPrice(product.price)}
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
              Duties included
            </p>
          </div>

          <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-bone/65">
            {product.description}
          </p>

          <div className="mt-7">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                inStock ? "bg-emerald-400/80" : "bg-red-400/80"
              }`}
            />
            <span className={inStock ? "text-bone/60" : "text-red-300"}>
              {inStock
                ? `${product.stock} in stock · ships in 2–3 working days`
                : "Currently unavailable"}
            </span>
          </div>

          <div className="mt-8 border-t border-white/10">
            <h2 className="pt-6 text-[10px] uppercase tracking-[0.26em] text-gold/80">
              The details
            </h2>
            <ul className="mt-4 space-y-2.5">
              {product.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-3 text-xs leading-relaxed text-bone/60"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-gold/70">
                Delivery
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Complimentary insured shipping worldwide. Dispatched from the atelier
                within 2–3 working days.
              </p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-gold/70">
                Returns
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Thirty days to decide. Returns are collected from your door at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-white/10 bg-onyx">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Complete the set</p>
                <h2 className="mt-3 font-display text-3xl text-bone sm:text-4xl">
                  Considered alongside.
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden text-[10px] uppercase tracking-[0.24em] text-bone/60 transition-colors hover:text-gold sm:block"
              >
                All pieces →
              </Link>
            </div>

            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <div className="aspect-[4/5] w-full animate-pulse border border-white/10 bg-charcoal" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="aspect-[4/3] animate-pulse border border-white/10 bg-charcoal" />
            <div className="aspect-[4/3] animate-pulse border border-white/10 bg-charcoal" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-2 w-24 animate-pulse bg-charcoal" />
          <div className="h-12 w-3/4 animate-pulse bg-charcoal" />
          <div className="h-3 w-1/2 animate-pulse bg-charcoal" />
          <div className="h-8 w-32 animate-pulse bg-charcoal" />
          <div className="mt-8 h-12 w-full animate-pulse bg-charcoal" />
          <div className="h-12 w-full animate-pulse bg-charcoal" />
          <div className="mt-6 space-y-3">
            {[0, 1, 2, 3].map((line) => (
              <div key={line} className="h-3 w-full animate-pulse bg-charcoal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
