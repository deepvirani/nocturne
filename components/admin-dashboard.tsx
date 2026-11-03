"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { AdminProductForm } from "@/components/admin-product-form";
import { ProductArt } from "@/components/product-art";
import { deleteProductAction } from "@/lib/actions";
import { logoutAction } from "@/lib/admin-actions";
import { formatDate, formatPrice } from "@/lib/format";
import type { Order, Product } from "@/lib/types";

type Tab = "products" | "orders";

function StatusPill({ status }: { status: Order["status"] }) {
  const styles =
    status === "Fulfilled"
      ? "border-emerald-400/30 bg-emerald-400/5 text-emerald-300"
      : status === "Cancelled"
        ? "border-red-400/30 bg-red-400/5 text-red-300"
        : "border-gold/30 bg-gold/5 text-champagne";

  return (
    <span
      className={`inline-flex border px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] ${styles}`}
    >
      {status}
    </span>
  );
}

export function AdminDashboard({
  products,
  orders,
}: {
  products: Product[];
  orders: Order[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isDeleting, startDelete] = useTransition();

  const revenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.total, 0);
  const lowStock = products.filter((product) => product.stock <= 5).length;

  const stats = [
    {
      label: "Revenue",
      value: formatPrice(revenue),
      note: `${orders.length} orders recorded`,
    },
    {
      label: "Orders",
      value: String(orders.length).padStart(2, "0"),
      note: `${orders.filter((order) => order.status === "Processing").length} awaiting fulfilment`,
    },
    {
      label: "Pieces",
      value: String(products.length).padStart(2, "0"),
      note: `${products.filter((product) => product.featured).length} featured on the storefront`,
    },
    {
      label: "Low stock",
      value: String(lowStock).padStart(2, "0"),
      note: lowStock > 0 ? "Five units or fewer" : "Everything in good supply",
    },
  ];

  const openNew = useCallback(() => {
    setEditing(null);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((product: Product) => {
    setEditing(product);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => setFormOpen(false), []);

  function handleDelete(product: Product) {
    if (
      !window.confirm(
        `Delete “${product.name}”? This removes it from the storefront and cannot be undone.`,
      )
    ) {
      return;
    }

    setError("");
    setPendingDelete(product.id);

    startDelete(async () => {
      const result = await deleteProductAction(product.id);
      setPendingDelete(null);
      if (!result.ok) {
        setError(result.error ?? "Could not delete that piece.");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex flex-col">
            <span className="font-display text-base uppercase tracking-[0.34em] text-bone">
              Nocturne
            </span>
            <span className="text-[7px] uppercase tracking-[0.5em] text-gold/70">
              Atelier admin
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-[9px] uppercase tracking-[0.22em] text-bone/50 transition-colors hover:text-gold sm:block"
            >
              View storefront ↗
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="border border-white/15 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-bone/70 transition-colors hover:border-gold/50 hover:text-gold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Back of house</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.04] text-bone sm:text-5xl">
              The collection, at a glance.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Manage every piece in the house, review incoming orders, and keep the
              shelves honest. Changes appear on the storefront immediately.
            </p>
          </div>
          <Link href="/shop" className="btn-outline px-5 py-3 text-[9px]">
            Preview collection
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-white/10 bg-onyx/60 p-5 transition-colors hover:border-gold/25"
            >
              <p className="text-[9px] uppercase tracking-[0.24em] text-gold/70">
                {stat.label}
              </p>
              <p className="mt-3 font-display text-4xl text-bone">{stat.value}</p>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">{stat.note}</p>
            </div>
          ))}
        </div>

        {error ? (
          <p className="mt-6 border border-red-400/30 bg-red-400/5 px-4 py-3 text-xs text-red-200">
            {error}
          </p>
        ) : null}

        <div className="mt-10 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-1">
            {(["products", "orders"] as Tab[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`relative px-4 py-3 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                  tab === item ? "text-champagne" : "text-muted hover:text-bone"
                }`}
              >
                {item}
                <span className="ml-2 text-[9px] text-muted/60">
                  {item === "products" ? products.length : orders.length}
                </span>
                {tab === item ? (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gold" />
                ) : null}
              </button>
            ))}
          </div>

          {tab === "products" ? (
            <button type="button" onClick={openNew} className="btn-gold px-5 py-2.5 text-[9px]">
              + New piece
            </button>
          ) : null}
        </div>

        {tab === "products" ? (
          <div className="mt-6 overflow-x-auto border border-white/10 bg-onyx/40">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-[8px] uppercase tracking-[0.24em] text-muted">
                  <th className="px-5 py-3.5 font-normal">Piece</th>
                  <th className="px-5 py-3.5 font-normal">Category</th>
                  <th className="px-5 py-3.5 font-normal">Price</th>
                  <th className="px-5 py-3.5 font-normal">Stock</th>
                  <th className="px-5 py-3.5 font-normal">Featured</th>
                  <th className="px-5 py-3.5 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-sm text-muted">
                      The collection is empty. Add your first piece.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 shrink-0 border border-white/10">
                            <ProductArt art={product.art} className="aspect-[4/5] w-full" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-display text-base text-bone">
                              {product.name}
                            </p>
                            <p className="truncate text-[9px] uppercase tracking-[0.16em] text-muted/70">
                              /{product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-bone/60">
                        {product.category}
                      </td>
                      <td className="px-5 py-4 text-sm text-bone/85">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-sm ${
                            product.stock <= 5 ? "text-gold" : "text-bone/85"
                          }`}
                        >
                          {product.stock}
                        </span>
                        {product.stock <= 5 ? (
                          <span className="ml-2 text-[8px] uppercase tracking-[0.16em] text-gold/60">
                            Low
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4">
                        {product.featured ? (
                          <span className="inline-flex border border-gold/30 bg-gold/5 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-champagne">
                            Featured
                          </span>
                        ) : (
                          <span className="text-xs text-muted/50">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            className="text-[9px] uppercase tracking-[0.18em] text-bone/65 transition-colors hover:text-gold"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            disabled={isDeleting && pendingDelete === product.id}
                            className="text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-red-300 disabled:opacity-50"
                          >
                            {isDeleting && pendingDelete === product.id ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto border border-white/10 bg-onyx/40">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-[8px] uppercase tracking-[0.24em] text-muted">
                  <th className="px-5 py-3.5 font-normal">Order</th>
                  <th className="px-5 py-3.5 font-normal">Date</th>
                  <th className="px-5 py-3.5 font-normal">Customer</th>
                  <th className="px-5 py-3.5 font-normal">Pieces</th>
                  <th className="px-5 py-3.5 font-normal">Total</th>
                  <th className="px-5 py-3.5 text-right font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-sm text-muted">
                      No orders yet. Place one from the storefront to see it here.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const pieceCount = order.items.reduce(
                      (sum, item) => sum + item.qty,
                      0,
                    );
                    const firstItem = order.items[0];

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4 font-display text-base text-champagne">
                          {order.id}
                        </td>
                        <td className="px-5 py-4 text-xs text-bone/60">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-bone/85">{order.customer.name}</p>
                          <p className="text-[10px] text-muted/70">{order.customer.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-xs text-bone/70">
                            {pieceCount} {pieceCount === 1 ? "piece" : "pieces"}
                          </p>
                          <p className="max-w-[200px] truncate text-[10px] text-muted/60">
                            {firstItem ? `${firstItem.name}${order.items.length > 1 ? ` +${order.items.length - 1} more` : ""}` : "—"}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-sm text-bone/85">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <StatusPill status={order.status} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-[9px] leading-relaxed tracking-[0.08em] text-muted/60">
          Local demo — products and orders are stored in <span className="text-bone/50">data/products.json</span> and{" "}
          <span className="text-bone/50">data/orders.json</span>. The admin session lasts
          eight hours.
        </p>
      </div>

      {formOpen ? (
        <AdminProductForm
          key={editing?.id ?? "new"}
          product={editing}
          categories={Array.from(new Set(products.map((product) => product.category)))}
          onClose={closeForm}
        />
      ) : null}
    </div>
  );
}
