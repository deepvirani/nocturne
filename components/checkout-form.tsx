"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { useCart } from "@/components/cart-provider";
import { ProductArt } from "@/components/product-art";
import { formatPrice } from "@/lib/format";
import { placeOrderAction } from "@/lib/actions";
import type { Customer } from "@/lib/types";

const emptyCustomer: Customer = {
  name: "",
  email: "",
  address: "",
  city: "",
  postcode: "",
  country: "United States",
};

type PlacedOrder = {
  id: string;
  total: number;
  email: string;
  items: { name: string; qty: number; price: number; art: string }[];
};

export function CheckoutForm() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [pending, startTransition] = useTransition();

  function update(field: keyof Customer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    startTransition(async () => {
      const snapshot = items.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        art: item.art,
      }));

      const result = await placeOrderAction({
        customer,
        items: items.map((item) => ({ id: item.id, qty: item.qty })),
      });

      if (!result.ok || !result.orderId || result.total === undefined) {
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setPlaced({
        id: result.orderId,
        total: result.total,
        email: customer.email,
        items: snapshot,
      });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (placed) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="border border-white/10 bg-onyx/60 p-8 text-center sm:p-14">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="eyebrow mt-7">Order received</p>
          <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
            Thank you, {customer.name.split(" ")[0] || "friend"}.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Your order is being prepared by the atelier. A confirmation has been sent
            to <span className="text-bone/80">{placed.email}</span> — this is a demo
            storefront, so no payment was taken.
          </p>

          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4 border-y border-white/10 py-5 text-left">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-muted">
                Order number
              </p>
              <p className="mt-1 font-display text-lg text-champagne">{placed.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.22em] text-muted">Total</p>
              <p className="mt-1 font-display text-lg text-champagne">
                {formatPrice(placed.total)}
              </p>
            </div>
          </div>

          <ul className="mx-auto mt-6 max-w-md space-y-3 text-left">
            {placed.items.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4">
                <span className="text-xs text-bone/65">
                  {item.name} <span className="text-muted">× {item.qty}</span>
                </span>
                <span className="text-xs text-bone/80">
                  {formatPrice(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="btn-gold">
              Continue exploring
            </Link>
            <Link href="/" className="btn-outline">
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12">
        <p className="text-sm text-muted">Preparing your bag…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
          Your bag is empty.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          Add a piece to your bag and it will appear here, ready for a considered
          checkout.
        </p>
        <Link href="/shop" className="btn-gold mt-8">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
      <form onSubmit={onSubmit} className="space-y-10">
        <section>
          <div className="flex items-baseline gap-3 border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.24em] text-gold">01</span>
            <h2 className="font-display text-2xl text-bone">Contact</h2>
          </div>
          <div className="mt-5">
            <label className="field-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={customer.email}
              onChange={(event) => update("email", event.target.value)}
              className="field"
              placeholder="you@example.com"
            />
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.24em] text-gold">02</span>
            <h2 className="font-display text-2xl text-bone">Delivery</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                value={customer.name}
                onChange={(event) => update("name", event.target.value)}
                className="field"
                placeholder="Elena Marsh"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                required
                autoComplete="street-address"
                value={customer.address}
                onChange={(event) => update("address", event.target.value)}
                className="field"
                placeholder="12 Chelsea Embankment"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                required
                autoComplete="address-level2"
                value={customer.city}
                onChange={(event) => update("city", event.target.value)}
                className="field"
                placeholder="London"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="postcode">
                Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                required
                autoComplete="postal-code"
                value={customer.postcode}
                onChange={(event) => update("postcode", event.target.value)}
                className="field"
                placeholder="SW3 4LE"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                name="country"
                required
                value={customer.country}
                onChange={(event) => update("country", event.target.value)}
                className="field"
              >
                {[
                  "United States",
                  "United Kingdom",
                  "France",
                  "Italy",
                  "Germany",
                  "Portugal",
                  "Spain",
                  "Switzerland",
                  "Japan",
                  "Australia",
                  "Canada",
                ].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.24em] text-gold">03</span>
            <h2 className="font-display text-2xl text-bone">Payment</h2>
            <span className="ml-auto text-[8px] uppercase tracking-[0.22em] text-gold/70">
              Demo
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="card">
                Card number
              </label>
              <input
                id="card"
                name="card"
                inputMode="numeric"
                required
                placeholder="4242 4242 4242 4242"
                className="field"
                autoComplete="cc-number"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="expiry">
                Expiry
              </label>
              <input
                id="expiry"
                name="expiry"
                required
                placeholder="MM / YY"
                className="field"
                autoComplete="cc-exp"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="cvc">
                CVC
              </label>
              <input
                id="cvc"
                name="cvc"
                required
                placeholder="123"
                inputMode="numeric"
                className="field"
                autoComplete="cc-csc"
              />
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-relaxed tracking-[0.04em] text-muted/70">
            No payment is processed and card details are not stored. Enter anything to
            complete the demo order.
          </p>
        </section>

        {error ? (
          <p className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-xs leading-relaxed text-red-200">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={pending} className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? "Placing order…" : `Place order · ${formatPrice(subtotal)}`}
        </button>

        <p className="text-center text-[9px] uppercase tracking-[0.18em] text-muted/70">
          By placing this order you agree to our terms — and to being looked after.
        </p>
      </form>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-white/10 bg-onyx/60 p-6 sm:p-8">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-2xl text-bone">Your order</h2>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          <ul className="divide-y divide-white/[0.06]">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <div className="w-16 shrink-0 border border-white/10">
                  <ProductArt art={item.art} className="aspect-[4/5] w-full" />
                </div>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-base text-bone">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted">
                      {item.category} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-bone/85">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-bone">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span className="text-gold">Complimentary</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-bone/70">
                Total
              </span>
              <span className="font-display text-2xl text-champagne">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-[10px] leading-relaxed text-muted">
            <p>· Insured, tracked delivery worldwide</p>
            <p>· Thirty-day returns, collected from your door</p>
            <p>· Lifetime servicing at the atelier</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
