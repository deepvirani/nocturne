import Link from "next/link";

import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { formatPrice } from "@/lib/format";
import { getFeaturedProducts, getProducts } from "@/lib/products";

const marqueeWords = [
  "Swiss movements",
  "Full-grain leather",
  "Small-batch fragrance",
  "Hand-finished in Europe",
  "Lifetime servicing",
];

const categories = [
  { name: "Watches", art: "watch", note: "Mechanical, quietly" },
  { name: "Leather", art: "bag", note: "Cut and finished by hand" },
  { name: "Fragrance", art: "fragrance", note: "Composed in Grasse" },
  { name: "Jewellery", art: "ring", note: "Set in recycled gold" },
];

const journal = [
  {
    art: "watch",
    date: "November 2026",
    title: "The quiet mechanics of a Nocturne movement",
    excerpt:
      "Inside the Swiss calibre we chose for its silence as much as its precision.",
  },
  {
    art: "bag",
    date: "October 2026",
    title: "Why we still finish every edge by hand",
    excerpt:
      "Seven passes of paint and wax. A machine can do it faster, not better.",
  },
  {
    art: "fragrance",
    date: "September 2026",
    title: "A note on restraint, and the art of wearing less",
    excerpt:
      "Our perfumer on why the most memorable scents leave something unsaid.",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function HomePage() {
  const [featured, products] = await Promise.all([
    getFeaturedProducts(4),
    getProducts(),
  ]);

  const heroProduct =
    products.find((product) => product.slug === "nocturne-automatic") ?? featured[0];

  const countByCategory = (category: string) =>
    products.filter((product) => product.category === category).length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] -top-[30%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.16)_0%,rgba(201,168,106,0.04)_38%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(90deg,white_0,white_1px,transparent_1px,transparent_140px)]" />
          <div className="absolute inset-0 grain opacity-[0.08]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-12 lg:pb-28 lg:pt-20">
          <div className="relative z-10">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                The Winter Edit — MMXXVI
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 max-w-[13ch] font-display text-[clamp(2.9rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.02em] text-bone">
                Objects of{" "}
                <span className="block italic text-champagne">quiet luxury.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-[46ch] text-sm leading-relaxed text-bone/60 sm:text-[15px]">
                Considered pieces in small batches — watches, leather, fragrance, and
                jewellery made to be kept for decades, not seasons.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/shop" className="btn-gold">
                  Explore the collection
                  <Arrow />
                </Link>
                <Link href="/#story" className="btn-outline">
                  Our philosophy
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
                {[
                  { value: `${products.length}`, label: "Pieces in the house" },
                  { value: "06", label: "Ateliers across Europe" },
                  { value: "30", label: "Days to decide" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-2xl text-champagne">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-[9px] uppercase leading-relaxed tracking-[0.2em] text-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

            <div className="relative animate-float-slow">
              <div className="overflow-hidden rounded-t-[260px] border border-gold/25 bg-onyx shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
                <ProductArt art={heroProduct?.art ?? "watch"} className="aspect-[4/5] w-full" />
              </div>

              <div className="absolute -left-4 bottom-10 w-[230px] border border-white/10 bg-ink/90 p-4 backdrop-blur-md sm:-left-10">
                <p className="text-[8px] uppercase tracking-[0.3em] text-gold/70">
                  Signature piece
                </p>
                <p className="mt-2 font-display text-xl text-bone">
                  {heroProduct?.name ?? "Nocturne Automatic"}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-champagne">
                    {formatPrice(heroProduct?.price ?? 4850)}
                  </span>
                  <Link
                    href={heroProduct ? `/product/${heroProduct.slug}` : "/shop"}
                    className="text-[9px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-gold"
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="absolute -right-2 top-6 border border-gold/25 bg-ink/80 px-4 py-3 backdrop-blur-md sm:-right-6">
                <p className="text-[8px] uppercase tracking-[0.26em] text-bone/70">
                  Made in small batches
                </p>
                <p className="mt-1 font-display text-sm italic text-gold">
                  Nº 001 — 012
                </p>
              </div>
            </div>

            <span className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[7px] uppercase tracking-[0.6em] text-muted/50 lg:block">
              Maison Nocturne
            </span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 bg-onyx py-4">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeWords.map((word) => (
                <div key={`${copy}-${word}`} className="flex items-center">
                  <span className="px-8 text-[9px] uppercase tracking-[0.32em] text-bone/45">
                    {word}
                  </span>
                  <span className="h-1 w-1 rotate-45 bg-gold/50" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">The signature edit</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
              Pieces that define the house.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-bone/60 transition-colors hover:text-gold"
            >
              View all pieces
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-y border-white/10 bg-onyx">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[460px]">
              <div className="absolute -inset-4 border border-gold/15" />
              <div className="overflow-hidden border border-white/10">
                <ProductArt art="bag" tone="warm" className="aspect-[4/5] w-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden border border-white/10 bg-ink px-6 py-5 sm:block">
                <p className="font-display text-3xl text-champagne">01 / 12</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.28em] text-muted">
                  Hand-finished in Florence
                </p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">The atelier</p>
              <h2 className="mt-5 max-w-[16ch] font-display text-4xl leading-[1.06] text-bone sm:text-5xl">
                Made slowly.
                <span className="italic text-champagne"> Kept for decades.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-bone/60">
                Nocturne began with a simple frustration: too many beautiful things
                were being made to be replaced. We work with six family-run ateliers
                across Europe, in batches small enough that every piece passes through
                a pair of hands that knows it.
              </p>
              <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-bone/60">
                The result is a house of quiet objects — mechanical watches, vegetable-
                tanned leather, composed fragrance — designed to disappear into a life
                and stay there.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-9 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {[
                  { title: "Small batches", copy: "Twelve pieces per run, never more." },
                  { title: "Honest materials", copy: "Titanium, oak, brass, calfskin." },
                  { title: "Service for life", copy: "Repairs and refinishing, always." },
                ].map((item) => (
                  <div key={item.title}>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold/80">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{item.copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <Link
                href="/shop"
                className="group mt-9 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-bone/70 transition-colors hover:text-gold"
              >
                Discover the collection
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Explore the house</p>
              <h2 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
                By category.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted">
              Four disciplines, one standard. Each piece is made by an atelier we have
              worked with for years.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/shop"
              className="group relative block overflow-hidden border border-white/10 transition-colors hover:border-gold/40"
            >
              <ProductArt
                art={category.art}
                className="aspect-[3/4] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.28em] text-gold/75">
                    {countByCategory(category.name)} pieces · {category.note}
                  </p>
                  <p className="mt-2 font-display text-2xl text-bone">
                    {category.name}
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-bone/70 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="border-t border-white/10 bg-onyx">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">From the journal</p>
                <h2 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
                  Notes on making.
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-muted">
                Occasional writing from the atelier — on materials, patience, and the
                things we choose not to do.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journal.map((entry) => (
              <article key={entry.title} className="group">
                <div className="overflow-hidden border border-white/10">
                  <ProductArt
                    art={entry.art}
                    className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[9px] uppercase tracking-[0.28em] text-gold/65">
                  {entry.date}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-bone">
                  {entry.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{entry.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-y border-white/10 py-10 sm:grid-cols-3">
          {[
            {
              title: "Complimentary delivery",
              copy: "Insured and tracked, anywhere in the world.",
              icon: (
                <path d="M3 7h11v10H3V7Zm11 4h4l3 3v3h-7v-6ZM7 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              ),
            },
            {
              title: "Lifetime servicing",
              copy: "Every piece can be repaired, refinished, and kept.",
              icon: (
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" />
              ),
            },
            {
              title: "Thirty days to decide",
              copy: "A considered purchase deserves considered time.",
              icon: (
                <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5" />
              ),
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="mt-0.5 text-gold/70">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-bone/85">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
