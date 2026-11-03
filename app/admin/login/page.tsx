import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { ProductArt } from "@/components/product-art";
import { isAdmin } from "@/lib/admin-auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Atelier sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.14)_0%,transparent_68%)]" />
        <div className="absolute inset-0 grain opacity-[0.06]" />
      </div>

      <div className="relative hidden w-[46%] border-r border-white/10 lg:block">
        <ProductArt art="watch" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 p-10">
          <p className="font-display text-3xl uppercase tracking-[0.34em] text-bone">
            Nocturne
          </p>
          <p className="mt-2 text-[8px] uppercase tracking-[0.5em] text-gold/70">
            Maison · Private
          </p>
        </div>
        <Link
          href="/"
          className="absolute left-10 top-10 text-[9px] uppercase tracking-[0.26em] text-bone/60 transition-colors hover:text-gold"
        >
          ← Storefront
        </Link>
      </div>

      <div className="relative flex w-full items-center justify-center px-6 py-16 lg:w-[54%]">
        <AdminLoginForm />
      </div>
    </div>
  );
}
