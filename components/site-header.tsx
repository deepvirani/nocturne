"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#story", label: "The Atelier" },
  { href: "/#journal", label: "Journal" },
  { href: "/admin", label: "Admin" },
];

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 8h12l1 12H5L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[74px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex flex-1 items-center gap-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-bone/80 transition-colors hover:text-gold lg:hidden"
              aria-label="Open menu"
            >
              <IconMenu />
            </button>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(0, 3).map((link) => {
                const active =
                  link.href === "/shop"
                    ? pathname.startsWith("/shop")
                    : false;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="link-underline text-[11px] uppercase tracking-[0.24em] text-bone/70 transition-colors hover:text-bone"
                    data-active={active}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Link
            href="/"
            className="group flex flex-col items-center"
            aria-label="Maison Nocturne home"
          >
            <span className="font-display text-[19px] uppercase tracking-[0.34em] text-bone transition-colors group-hover:text-champagne sm:text-[22px]">
              Nocturne
            </span>
            <span className="mt-0.5 text-[7px] uppercase tracking-[0.5em] text-gold/70">
              Maison
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6">
            <Link
              href="/admin"
              className="hidden text-[10px] uppercase tracking-[0.24em] text-bone/50 transition-colors hover:text-gold sm:block"
            >
              Admin
            </Link>
            <Link
              href="/shop"
              aria-label="Search the collection"
              className="text-bone/75 transition-colors hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative text-bone/80 transition-colors hover:text-gold"
              aria-label="Open shopping bag"
            >
              <IconBag />
              {hydrated && count > 0 ? (
                <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-ink">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/98 backdrop-blur-xl animate-fade-in">
          <div className="flex h-[74px] items-center justify-between px-5 sm:px-8">
            <span className="font-display text-lg uppercase tracking-[0.32em]">Nocturne</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-bone/80 transition-colors hover:text-gold"
              aria-label="Close menu"
            >
              <IconClose />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {[...navLinks, { href: "/#contact", label: "Contact" }].map((link, index) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 border-b border-white/8 py-4"
              >
                <span className="text-[10px] tracking-[0.3em] text-gold/60">
                  0{index + 1}
                </span>
                <span className="font-display text-3xl text-bone transition-colors group-hover:text-gold">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-8 pb-10 text-[10px] uppercase tracking-[0.28em] text-muted">
            Complimentary worldwide delivery
          </div>
        </div>
      ) : null}
    </>
  );
}
