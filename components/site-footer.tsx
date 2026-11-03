import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Watches", href: "/shop" },
      { label: "Leather goods", href: "/shop" },
      { label: "Fragrance", href: "/shop" },
      { label: "Jewellery", href: "/shop" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "The atelier", href: "/#story" },
      { label: "Journal", href: "/#journal" },
      { label: "Contact", href: "/#contact" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Shipping & returns", href: "mailto:care@maisonnocturne.com?subject=Shipping" },
      { label: "Care guide", href: "mailto:care@maisonnocturne.com?subject=Care" },
      { label: "Repairs & servicing", href: "mailto:care@maisonnocturne.com?subject=Repairs" },
      { label: "Book an appointment", href: "mailto:care@maisonnocturne.com?subject=Appointment" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-onyx">
      <div id="contact" className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-20">
          <div>
            <p className="eyebrow">The Nocturne letter</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] text-bone sm:text-5xl">
              A slower kind of luxury,
              <span className="italic text-champagne"> delivered rarely.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              New pieces, atelier notes, and the occasional private preview. We write
              when there is something worth saying.
            </p>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-10">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[10px] uppercase tracking-[0.28em] text-gold/80">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone/65 transition-colors hover:text-bone"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-display text-lg uppercase tracking-[0.34em] text-bone">
              Nocturne
            </span>
            <span className="mt-1 text-[7px] uppercase tracking-[0.5em] text-gold/70">
              Maison · Paris · MMXXVI
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-muted">
            <span>© 2026 Maison Nocturne</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted/50 sm:block" />
            <span>Complimentary worldwide delivery</span>
          </div>
        </div>

        <p className="border-t border-white/[0.06] py-5 text-[10px] leading-relaxed tracking-[0.08em] text-muted/60">
          This is a demonstration storefront. No real payments are processed and all
          orders are simulated. Admin passcode: <span className="text-gold/70">atelier</span>
        </p>
      </div>
    </footer>
  );
}
