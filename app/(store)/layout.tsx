import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <div className="border-b border-white/[0.06] bg-black/40">
          <p className="mx-auto max-w-[1400px] px-5 py-2.5 text-center text-[9px] uppercase tracking-[0.28em] text-bone/55 sm:text-[10px]">
            Complimentary worldwide delivery
            <span className="mx-3 hidden text-gold/50 sm:inline">·</span>
            <span className="hidden sm:inline">Duties included</span>
            <span className="mx-3 hidden text-gold/50 sm:inline">·</span>
            <span className="hidden sm:inline">30-day returns</span>
          </p>
        </div>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
