"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/format";
import { readOrders, writeOrders } from "@/lib/orders";
import { readProducts, writeProducts } from "@/lib/products";
import type { Customer, Order, OrderItem, Product } from "@/lib/types";

type ActionState = { ok: boolean; error?: string; slug?: string };

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function number(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

export async function saveProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }

  const id = text(formData, "id");
  const name = text(formData, "name");
  const price = number(formData, "price");
  const stock = number(formData, "stock");

  if (!name) return { ok: false, error: "A product name is required." };
  if (price <= 0) return { ok: false, error: "Price must be greater than zero." };
  if (stock < 0) return { ok: false, error: "Stock cannot be negative." };

  const products = await readProducts();
  const existing = products.find((product) => product.id === id);
  const baseSlug = slugify(text(formData, "slug") || name) || `piece-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;

  while (products.some((product) => product.slug === slug && product.id !== id)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const product: Product = {
    id: existing?.id ?? `p${Date.now().toString(36)}`,
    slug,
    name,
    tagline: text(formData, "tagline"),
    description: text(formData, "description"),
    price,
    category: text(formData, "category") || "Objects",
    art: text(formData, "art") || "watch",
    stock,
    featured: formData.get("featured") === "on",
    badge: text(formData, "badge") || null,
    specs: text(formData, "specs")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  };

  const nextProducts = existing
    ? products.map((item) => (item.id === existing.id ? product : item))
    : [product, ...products];

  await writeProducts(nextProducts);

  updateTag("products");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/product/${slug}`);
  revalidatePath("/admin");
  if (existing && existing.slug !== slug) {
    revalidatePath(`/product/${existing.slug}`);
  }

  return { ok: true, slug };
}

export async function deleteProductAction(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }

  const products = await readProducts();
  const target = products.find((product) => product.id === id);
  if (!target) return { ok: false, error: "That piece no longer exists." };

  await writeProducts(products.filter((product) => product.id !== id));

  updateTag("products");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/product/${target.slug}`);
  revalidatePath("/admin");

  return { ok: true };
}

export async function placeOrderAction(input: {
  customer: Customer;
  items: { id: string; qty: number }[];
}): Promise<{ ok: boolean; error?: string; orderId?: string; total?: number }> {
  const customer = input.customer;
  const required: (keyof Customer)[] = [
    "name",
    "email",
    "address",
    "city",
    "postcode",
    "country",
  ];

  for (const field of required) {
    if (!customer[field]?.trim()) {
      return { ok: false, error: "Please complete every delivery field." };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: "Your bag is empty." };
  }

  const products = await readProducts();
  const items: OrderItem[] = [];

  for (const entry of input.items) {
    const product = products.find((item) => item.id === entry.id);
    const qty = Math.max(1, Math.floor(entry.qty));

    if (!product) {
      return { ok: false, error: "One of the pieces in your bag is no longer available." };
    }
    if (product.stock < qty) {
      return {
        ok: false,
        error: `Only ${product.stock} of ${product.name} remain. Please adjust your bag.`,
      };
    }

    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order: Order = {
    id: `ATL-${randomBytes(3).toString("hex").toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Processing",
    customer: {
      name: customer.name.trim(),
      email: customer.email.trim(),
      address: customer.address.trim(),
      city: customer.city.trim(),
      postcode: customer.postcode.trim(),
      country: customer.country.trim(),
    },
    items,
    subtotal,
    shipping: 0,
    total: subtotal,
  };

  const orders = await readOrders();
  await writeOrders([order, ...orders]);

  revalidatePath("/admin");

  return { ok: true, orderId: order.id, total: order.total };
}
