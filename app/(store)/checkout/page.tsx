import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Maison Nocturne order.",
};

export default function CheckoutPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-onyx/40">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.04] text-bone sm:text-5xl">
              A considered finish.
            </h1>
          </div>

          <ol className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em]">
            <li className="text-muted">Bag</li>
            <li className="h-px w-6 bg-gold/40" />
            <li className="text-gold">Details</li>
            <li className="h-px w-6 bg-white/15" />
            <li className="text-muted">Confirmation</li>
          </ol>
        </div>
      </section>

      <CheckoutForm />
    </div>
  );
}
